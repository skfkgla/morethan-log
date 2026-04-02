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
    
    // Recursive helper to unwrap nested 'value' fields (Depth Fix)
    const getVal = (obj: any, key: string) => {
      let res = obj?.[key]
      if (!res) return null
      while (Array.isArray(res) || res?.value) {
        if (Array.isArray(res)) res = res[0]
        else if (res?.value) res = res.value
        else break
      }
      return res
    }

    const collectionKey = Object.keys(response.collection || {})[0]
    const collection = getVal(response.collection, collectionKey)
    const schema = collection?.schema

    const rawMetadata = getVal(response.block, id)

    // Construct Data
    let pageIds = getAllPageIds(response)
    
    // Fallback: collection_query가 비어있으면 getCollectionData로 직접 요청
    if (pageIds.length === 0) {
      const collectionKey = Object.keys(response.collection || {})[0]
      const collectionViewId = Object.keys(response.collection_view || {})[0]

      if (collectionKey && collectionViewId) {
        const collectionView = getVal(response.collection_view, collectionViewId)
        const collectionData = (await api.getCollectionData(
          collectionKey,
          collectionViewId,
          collectionView,
          { loadContentCover: false }
        )) as any

        // 실제 블록 데이터를 response.block에 병합
        const recordMapBlocks = collectionData?.recordMap?.block || {}
        Object.assign(response.block, recordMapBlocks)

        // collection_query 채우기
        const blockIds: string[] =
          collectionData?.result?.reducerResults?.collection_group_results
            ?.blockIds ||
          collectionData?.result?.blockIds ||
          []

        if (blockIds.length > 0) {
          response.collection_query = {
            [collectionKey]: {
              [collectionViewId]: {
                collection_group_results: { blockIds, total: blockIds.length },
              },
            },
          } as any
          pageIds = getAllPageIds(response)
        }

        // 그래도 없으면 page_sort 사용
        if (pageIds.length === 0) {
          pageIds = collectionView?.page_sort || []
        }
      }
    }

    const data = []
    for (let i = 0; i < pageIds.length; i++) {
      const pid = pageIds[i]
      const properties = (await getPageProperties(pid, response.block, schema)) || null
      const blockValue = getVal(response.block, pid)
      
      if (properties && properties.title) {
        properties.createdTime = new Date(
          blockValue?.created_time || Date.now()
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

    return data as TPosts
  } catch (error: any) {
    console.error("getPosts 예외 발생:", error)
    await sendSlackMessage(`🚨 [himlog] 게시글을 가져오는 중 예외가 발생했습니다: ${error.message}`)
    return []
  }
}
