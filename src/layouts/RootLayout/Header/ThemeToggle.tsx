import styled from "@emotion/styled"
import React from "react"
import { IoSunny, IoMoon } from "react-icons/io5"
import useScheme from "src/hooks/useScheme"

type Props = {}

const ThemeToggle: React.FC<Props> = () => {
  const [scheme, setScheme] = useScheme()

  const handleClick = () => {
    setScheme(scheme === "light" ? "dark" : "light")
  }

  return (
    <StyledWrapper onClick={handleClick}>
      {scheme === "light" ? (
        <IoSunny className="sun" />
      ) : (
        <IoMoon className="moon" />
      )}
    </StyledWrapper>
  )
}

export default ThemeToggle

const StyledWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.75rem;
  font-size: 1.25rem;
  transition: all 0.2s ease;

  :hover {
    background-color: ${({ theme }) => theme.colors.gray4};
    transform: scale(1.1);
  }

  .sun {
    color: #ffb100;
  }
  .moon {
    color: #facc15;
  }
`
