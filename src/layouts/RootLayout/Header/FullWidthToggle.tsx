import React from "react"
import styled from "@emotion/styled"
import useFullWidth from "src/hooks/useFullWidth"
import usePostQuery from "src/hooks/usePostQuery"

const FullWidthToggle: React.FC = () => {
  const [fullWidth, setFullWidth] = useFullWidth()
  const post = usePostQuery()

  if (!post) return null

  return (
    <StyledWrapper onClick={() => setFullWidth(!fullWidth)}>
      <div className="label">Wide View</div>
      <div className={`switch ${fullWidth ? "active" : ""}`}>
        <div className="handle" />
      </div>
    </StyledWrapper>
  )
}

export default FullWidthToggle

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  cursor: pointer;
  padding: 0.25rem;
  user-select: none;

  .label {
    font-size: 0.75rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray10};
    transition: color 0.2s ease;
  }

  &:hover .label {
    color: ${({ theme }) => theme.colors.gray12};
  }

  .switch {
    width: 2.25rem;
    height: 1.15rem;
    background-color: ${({ theme }) =>
    theme.scheme === "light" ? theme.colors.gray4 : theme.colors.gray6};
    border-radius: 1rem;
    position: relative;
    transition: background-color 0.2s ease;

    &.active {
      background-color: ${({ theme }) => theme.colors.blue9};
      .handle {
        transform: translateX(1.1rem);
      }
    }

    .handle {
      width: 0.9rem;
      height: 0.9rem;
      background-color: white;
      border-radius: 50%;
      position: absolute;
      top: 0.125rem;
      left: 0.125rem;
      transition: transform 0.2s ease;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }
  }
`
