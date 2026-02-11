import React, { useEffect } from "react"
import styled from "@emotion/styled"
import NotionRenderer from "../components/NotionRenderer"
import usePostQuery from "src/hooks/usePostQuery"
import useFullWidth from "src/hooks/useFullWidth"
type Props = {}

const PageDetail: React.FC<Props> = () => {
  const data = usePostQuery()
  const [fullWidth] = useFullWidth()

  if (!data) return null
  return (
    <StyledWrapper data-full-width={fullWidth}>
      <NotionRenderer recordMap={data.recordMap} />
    </StyledWrapper>
  )
}

export default PageDetail

const StyledWrapper = styled.div`
  margin: 0 auto;
  max-width: 64rem;
  transition: max-width 0.3s ease-in-out;
  &[data-full-width="true"] {
    max-width: calc(100% - 2rem);
  }
`
