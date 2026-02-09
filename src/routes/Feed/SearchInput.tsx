import styled from "@emotion/styled"
import React, { InputHTMLAttributes, ReactNode } from "react"
import { Emoji } from "src/components/Emoji"

interface Props extends InputHTMLAttributes<HTMLInputElement> { }

const SearchInput: React.FC<Props> = ({ ...props }) => {
  return (
    <StyledWrapper>
      <div className="mid-wrapper">
        <input className="mid" type="text" placeholder="검색..." {...props} />
      </div>
    </StyledWrapper>
  )
}

export default SearchInput

const StyledWrapper = styled.div`
  flex-grow: 1;
  margin-left: 1rem;
  margin-right: 1rem;

  .mid-wrapper {
    display: flex;
    align-items: center;
    background-color: ${({ theme }) =>
    theme.scheme === "light" ? theme.colors.gray3 : theme.colors.gray4};
    border: 1px solid
      ${({ theme }) =>
    theme.scheme === "light" ? theme.colors.gray7 : theme.colors.gray6};
    border-radius: 0.5rem;
    padding-left: 0.3rem;
    transition: all 0.2s ease;

    :focus-within {
      border-color: ${({ theme }) =>
    theme.scheme === "light" ? theme.colors.gray8 : theme.colors.gray8};
      background-color: ${({ theme }) =>
    theme.scheme === "light" ? theme.colors.gray4 : theme.colors.gray5};
      box-shadow: 0 0 0 1px
        ${({ theme }) =>
    theme.scheme === "light" ? theme.colors.gray6 : "transparent"};
    }

    .icon {
      font-size: 0.9rem;
      opacity: 0.5;
    }

    .mid {
      padding-top: 0.4rem;
      padding-bottom: 0.4rem;
      padding-left: 0.5rem;
      padding-right: 0.75rem;
      border-radius: 0.5rem;
      outline-style: none;
      width: 100%;
      background-color: transparent;
      border: none;
      font-size: 0.9rem;
      color: ${({ theme }) => theme.colors.gray12};

      ::placeholder {
        color: ${({ theme }) => theme.colors.gray10};
      }
    }
  }
`
