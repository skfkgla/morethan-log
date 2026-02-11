import { CONFIG } from "site.config"
import React from "react"
import { AiFillCodeSandboxCircle } from "react-icons/ai"
import styled from "@emotion/styled"
import { Emoji } from "src/components/Emoji"

const ServiceCard: React.FC = () => {
  if (!CONFIG.projects) return null
  return (
    <>
      <StyledTitle>
        <Emoji>🌟</Emoji> Project
      </StyledTitle>
      <StyledWrapper>
        {CONFIG.projects.map((project, idx) => {
          const [title, description] = project.name.split('\n')
          return (
            <a
              key={idx}
              href={project.href}
              rel="noreferrer"
              target="_blank"
            >
              <AiFillCodeSandboxCircle className="icon" />
              <div className="name">
                <div className="title">{title}</div>
                <div className="description">{description}</div>
              </div>
            </a>
          )
        })}
      </StyledWrapper>
    </>
  )
}

export default ServiceCard

const StyledTitle = styled.div`
  padding: 0.25rem;
  margin-bottom: 0.75rem;
`

const StyledWrapper = styled.div`
  display: flex;
  padding: 0.25rem;
  margin-bottom: 1rem;
  flex-direction: column;
  border-radius: 1rem;
  background-color: ${({ theme }) =>
    theme.scheme === "light" ? "white" : theme.colors.gray4};
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05),
    0 2px 4px -1px rgba(0, 0, 0, 0.03);
  > a {
    display: flex;
    padding: 0.75rem;
    gap: 0.75rem;
    align-items: center;
    border-radius: 1rem;
    color: ${({ theme }) => theme.colors.gray11};
    cursor: pointer;

    :hover {
      color: ${({ theme }) => theme.colors.gray12};
      background-color: ${({ theme }) => theme.colors.gray5};
    }
    .icon {
      font-size: 1.5rem;
      line-height: 2rem;
      flex-shrink: 0;
      min-width: 1.5rem;
    }
    .name {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      
      .title {
        font-size: 0.875rem;
        line-height: 1.25rem;
        color: ${({ theme }) => theme.colors.gray12};
      }
      
      .description {
        font-size: 0.75rem;
        line-height: 1.2;
        color: ${({ theme }) => theme.colors.gray10};
      }
    }
  }
`