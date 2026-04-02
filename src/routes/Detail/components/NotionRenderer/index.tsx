import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"
import { ExtendedRecordMap } from "notion-types"
import useScheme from "src/hooks/useScheme"

// core styles shared by all of react-notion-x (required)
import "react-notion-x/src/styles.css"

// used for code syntax highlighting (optional)
import "prismjs/themes/prism-tomorrow.css"

// used for rendering equations (optional)

import "katex/dist/katex.min.css"
import { FC } from "react"
import styled from "@emotion/styled"

const _NotionRenderer = dynamic(
  () => import("react-notion-x").then((m) => m.NotionRenderer),
  { ssr: false }
)

const Code = dynamic(() =>
  import("react-notion-x/build/third-party/code").then(async (m) => m.Code)
)

const Collection = dynamic(() =>
  import("react-notion-x/build/third-party/collection").then(
    (m) => m.Collection
  )
)
const Equation = dynamic(() =>
  import("react-notion-x/build/third-party/equation").then((m) => m.Equation)
)
const Pdf = dynamic(
  () => import("react-notion-x/build/third-party/pdf").then((m) => m.Pdf),
  {
    ssr: false,
  }
)
const Modal = dynamic(
  () => import("react-notion-x/build/third-party/modal").then((m) => m.Modal),
  {
    ssr: false,
  }
)

const mapPageUrl = (id: string) => {
  if (!id) return ""
  return "https://www.notion.so/" + id.replace(/-/g, "")
}

type Props = {
  recordMap: ExtendedRecordMap
}

const NotionRenderer: FC<Props> = ({ recordMap }) => {
  const [scheme] = useScheme()
  return (
    <StyledWrapper>
      <_NotionRenderer
        darkMode={scheme === "dark"}
        recordMap={recordMap}
        components={{
          Code,
          Collection,
          Equation,
          Modal,
          Pdf,
          nextImage: Image,
          nextLink: Link,
        }}
        mapPageUrl={mapPageUrl}
      />
    </StyledWrapper>
  )
}

export default NotionRenderer

const StyledWrapper = styled.div`
  /* // TODO: why render? */
  .notion-collection-page-properties {
    display: none !important;
  }
  .notion-page {
    padding: 0;
    width: 100% !important;
    max-width: 100% !important;
    transition: max-width 0.3s ease-in-out;
  }
  .notion-list {
    width: 100%;
  }
  .notion-asset-wrapper,
  .notion-asset-wrapper-full,
  .notion-asset-wrapper-center,
  .notion-image-block,
  .notion-video-block,
  .notion-file-block,
  .notion-audio-block,
  .notion-full-width,
  .notion-image-full {
    width: 100% !important;
    max-width: 100% !important;
    margin-left: auto !important;
    margin-right: auto !important;
  }

  .notion-asset-wrapper > div,
  .notion-image-block > div {
    height: auto !important;
    aspect-ratio: auto !important;
  }

  .notion-asset-wrapper img,
  .notion-asset-wrapper video,
  .notion-image-block img {
    width: 100% !important;
    height: auto !important;
    object-fit: contain !important;
  }
`
