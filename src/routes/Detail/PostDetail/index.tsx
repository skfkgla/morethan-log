import React, { useEffect } from "react"
import PostHeader from "./PostHeader"
import Footer from "./PostFooter"
import CommentBox from "./CommentBox"
import Category from "src/components/Category"
import styled from "@emotion/styled"
import NotionRenderer from "../components/NotionRenderer"
import usePostQuery from "src/hooks/usePostQuery"
import useFullWidth from "src/hooks/useFullWidth"

type Props = {}

const PostDetail: React.FC<Props> = () => {
  const data = usePostQuery()
  const [fullWidth] = useFullWidth()

  if (!data) return null

  const category = (data.category && data.category?.[0]) || undefined

  return (
    <StyledWrapper data-full-width={fullWidth}>
      <article>
        {category && (
          <div css={{ marginBottom: "0.5rem" }}>
            <Category readOnly={data.status?.[0] === "PublicOnDetail"}>
              {category}
            </Category>
          </div>
        )}
        {data.type[0] === "Post" && <PostHeader data={data} />}
        <div>
          <NotionRenderer recordMap={data.recordMap} />
        </div>
        {data.type[0] === "Post" && (
          <>
            <Footer />
            <CommentBox data={data} />
          </>
        )}
      </article>
    </StyledWrapper>
  )
}

export default PostDetail

const StyledWrapper = styled.div`
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-top: 3rem;
  padding-bottom: 3rem;
  border-radius: 1.5rem;
  max-width: 64rem;
  background-color: ${({ theme }) =>
    theme.scheme === "light" ? "white" : theme.colors.gray4};
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  margin: 0 auto;
  transition: max-width 0.3s ease-in-out;

  &[data-full-width="true"] {
    max-width: calc(100% - 2rem);
  }

  > article {
    margin: 0 auto;
    max-width: 52rem;
    transition: max-width 0.3s ease-in-out;
  }

  &[data-full-width="true"] > article {
    max-width: calc(100% - 4rem);
  }
`
