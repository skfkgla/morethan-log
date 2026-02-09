import { TCategories } from "src/types"
import React from "react"
import CategorySelect from "./CategorySelect"
import OrderButtons from "./OrderButtons"
import styled from "@emotion/styled"

import SearchInput from "../SearchInput"

type Props = {
  q: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const FeedHeader: React.FC<Props> = ({ q, onChange }) => {
  return (
    <StyledWrapper>
      <CategorySelect />
      <SearchInput value={q} onChange={onChange} />
      <OrderButtons />
    </StyledWrapper>
  )
}

export default FeedHeader

const StyledWrapper = styled.div`
  display: flex;
  margin-bottom: 1rem;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray6};
`
