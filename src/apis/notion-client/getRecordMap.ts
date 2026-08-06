import { NotionAPI } from "notion-client"

import { NOTION_GOT_OPTIONS } from "./gotOptions"

export const getRecordMap = async (pageId: string) => {
  const api = new NotionAPI()
  const recordMap = await api.getPage(pageId, { gotOptions: NOTION_GOT_OPTIONS })

  // Recursive helper to unwrap nested 'value' fields (Depth Fix)
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

  // Normalize recordMap structure for the renderer
  if (recordMap.block) {
    Object.keys(recordMap.block).forEach((key) => {
      const val = getVal(recordMap.block[key])
      if (val) recordMap.block[key] = { ...recordMap.block[key], value: val }
    })
  }

  if (recordMap.collection) {
    Object.keys(recordMap.collection).forEach((key) => {
      const val = getVal(recordMap.collection[key])
      if (val) recordMap.collection[key] = { ...recordMap.collection[key], value: val }
    })
  }

  if (recordMap.collection_view) {
    Object.keys(recordMap.collection_view).forEach((key) => {
      const val = getVal(recordMap.collection_view[key])
      if (val) recordMap.collection_view[key] = { ...recordMap.collection_view[key], value: val }
    })
  }

  return recordMap
}
