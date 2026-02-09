import { CONFIG } from "site.config"
import { NotionAPI } from "notion-client"
import { idToUuid } from "notion-utils"

import getAllPageIds from "src/libs/utils/notion/getAllPageIds"
import getPageProperties from "src/libs/utils/notion/getPageProperties"
import { TPosts } from "src/types"
import { sendSlackMessage } from "src/libs/utils/slack"

/**
 * @param {{ includePages: boolean }} - false: posts only / true: include pages
 */

// TODO: react query를 사용해서 처음 불러온 뒤로는 해당데이터만 사용하도록 수정
export const getPosts = async () => {
  try {
    let id = CONFIG.notionConfig.pageId as string
    const api = new NotionAPI()

    const response = await api.getPage(id)
    id = idToUuid(id)
    const collectionKey = Object.keys(response.collection)[0]
    const collectionValue = response.collection[collectionKey]?.value as any
    const isDoubleWrapped = !!collectionValue?.value
    const collection = isDoubleWrapped ? collectionValue.value : collectionValue

    const block = response.block
    const schema = collection?.schema

    const rawMetadataValue = block[id].value as any
    const isMetadataDoubleWrapped = !!rawMetadataValue?.value
    const rawMetadata = isMetadataDoubleWrapped ? rawMetadataValue.value : rawMetadataValue

    // Check Type
    if (
      rawMetadata?.type !== "collection_view_page" &&
      rawMetadata?.type !== "collection_view"
    ) {
      await sendSlackMessage(`🚨 [himlog] 노션 JSON 반환 구조가 변경된 것으로 보입니다. 페이지 타입(${rawMetadata?.type})이 예상과 다릅니다.`)
      return []
    } else {
      // Construct Data
      const pageIds = getAllPageIds(response)

      if (pageIds.length === 0) {
        await sendSlackMessage(`🚨 [himlog] 노션 컬렉션에서 페이지 ID를 찾을 수 없습니다. (개수: 0) JSON 구조 변경이 의심됩니다.`)
      }

      const data = []
      for (let i = 0; i < pageIds.length; i++) {
        const id = pageIds[i]
        const properties = (await getPageProperties(id, block, schema)) || null
        const blockValue = (block[id].value as any)?.value || block[id].value
        // Add fullwidth, createdtime to properties
        if (properties) {
          properties.createdTime = new Date(
            blockValue?.created_time
          ).toString()
          properties.fullWidth =
            (blockValue?.format as any)?.page_full_width ?? false

          data.push(properties)
        }
      }

      // Sort by date
      data.sort((a: any, b: any) => {
        const dateA: any = new Date(a?.date?.start_date || a.createdTime)
        const dateB: any = new Date(b?.date?.start_date || b.createdTime)
        return dateB - dateA
      })

      const posts = data as TPosts
      return posts
    }
  } catch (error: any) {
    console.error("getPosts 예외 발생:", error)
    await sendSlackMessage(`🚨 [himlog] 게시글을 가져오는 중 예외가 발생했습니다: ${error.message}`)
    return []
  }
}
