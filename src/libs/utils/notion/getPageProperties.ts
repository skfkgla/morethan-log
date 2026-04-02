import { NotionAPI } from "notion-client"
import { idToUuid } from "notion-utils"
import { BlockMap, CollectionPropertySchemaMap } from "notion-types"
import { getTextContent } from "notion-utils"

async function getPageProperties(
  id: string,
  block: BlockMap,
  schema: CollectionPropertySchemaMap
) {
  const blockId = id.includes("-") ? id : idToUuid(id)
  
  // Recursive helper to get the true 'value' regardless of depth
  const getVal = (data: any) => {
    let res = data
    if (!res) return null
    while (Array.isArray(res) || res?.value) {
      if (Array.isArray(res)) res = res[0]
      else if (res?.value) res = res.value
      else break
    }
    return res
  }

  const blockData = block?.[blockId] || block?.[id]
  const blockValue = getVal(blockData)

  if (!blockValue?.properties || !schema) return null

  const rawProperties = Object.entries(blockValue.properties)
  const excludeProperties = ["date", "select", "multi_select", "person", "file"]
  const properties: any = { id }

  for (const [key, val] of rawProperties) {
    const s = schema[key]
    if (!s) continue

    if (s.type && !excludeProperties.includes(s.type)) {
      properties[s.name] = getTextContent(val as any)
    } else {
      switch (s.type) {
        case "date": {
          const dateProperty = val?.[0]?.[1]?.[0]?.[1]
          if (dateProperty && typeof dateProperty === "object") {
            properties[s.name] = dateProperty
          } else {
            const text = getTextContent(val as any)
            properties[s.name] = text ? { start_date: text } : null
          }
          break
        }
        case "select": {
          const selects = getTextContent(val as any)
          properties[s.name] = selects ? [selects] : []
          break
        }
        case "multi_select": {
          const selects = getTextContent(val as any)
          properties[s.name] = selects ? selects.split(",") : []
          break
        }
        case "person": {
          const rawUsers = (val as any)?.filter((v: any) => v[0] === "u")
          const userIds = rawUsers?.map((u: any) => u[1]) || []
          properties[s.name] = userIds
          break
        }
        case "file": {
          const rawFileUrl =
            (val as any)?.[0]?.[1]?.[0]?.[1] || (val as any)?.[0]?.[0]
          if (rawFileUrl && rawFileUrl.startsWith("attachment:")) {
            // attachment: URL → Notion 이미지 프록시 URL로 변환
            properties[s.name] = `https://www.notion.so/image/${encodeURIComponent(rawFileUrl)}?table=block&id=${blockId}`
          } else {
            properties[s.name] = rawFileUrl
          }
          break
        }
        default:
          break
      }
    }
  }

  // Ensure type and status are always arrays
  if (properties.type && !Array.isArray(properties.type)) {
    properties.type = [properties.type]
  }
  if (properties.status && !Array.isArray(properties.status)) {
    properties.status = [properties.status]
  }

  return properties
}

export { getPageProperties as default }
