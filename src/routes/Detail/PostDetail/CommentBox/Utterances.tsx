import { CONFIG } from "site.config"
import { useEffect } from "react"
import styled from "@emotion/styled"
import useScheme from "src/hooks/useScheme"
import { useRouter } from "next/router"

//TODO: useRef?

type Props = {
  issueTerm: string
}

const Utterances: React.FC<Props> = ({ issueTerm }) => {
  const [scheme] = useScheme()
  const router = useRouter()

  useEffect(() => {
    const theme = `github-${scheme}`
    const script = document.createElement("script")
    const anchor = document.getElementById("comments")
    if (!anchor) return
  
    script.src = "https://utteranc.es/client.js"
    script.async = true
    script.crossOrigin = "anonymous"
    script.setAttribute("issue-term", issueTerm)
    script.setAttribute("theme", theme)
  
    const config: Record<string, string> = CONFIG.utterances.config
    Object.entries(config).forEach(([key, value]) => {
      script.setAttribute(key, value)
    })
  
    anchor.appendChild(script)
  
    return () => {
      anchor.innerHTML = ""
    }
  }, [scheme, issueTerm])
  return (
    <>
      <StyledWrapper id="comments">
        <div className="utterances-frame"></div>
      </StyledWrapper>
    </>
  )
}

export default Utterances

const StyledWrapper = styled.div`
  @media (min-width: 768px) {
    margin-left: -4rem;
  }
`