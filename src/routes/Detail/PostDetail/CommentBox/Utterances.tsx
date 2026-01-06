import { CONFIG } from "site.config"
import { useEffect, useState } from "react"
import styled from "@emotion/styled"
import useScheme from "src/hooks/useScheme"
import { useRouter } from "next/router"

//TODO: useRef?

type Props = {
  issueTerm: string
}

const Utterances: React.FC<Props> = ({ issueTerm }) => {
  const [scheme] = useScheme()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const theme = `github-${scheme}`
    const anchor = document.getElementById("comments")
    if (!anchor) return

    // 기존 iframe / script 제거 (테마 변경 대응)
    anchor.innerHTML = ""
    setLoaded(false)

    const script = document.createElement("script")
    script.src = "https://utteranc.es/client.js"
    script.async = true
    script.crossOrigin = "anonymous"

    script.setAttribute("issue-term", issueTerm)
    script.setAttribute("theme", theme)

    const config: Record<string, string> = CONFIG.utterances.config
    Object.entries(config).forEach(([key, value]) => {
      script.setAttribute(key, value)
    })

    // iframe 생성 감지
    script.onload = () => {
      setTimeout(() => setLoaded(true), 300)
    }

    anchor.appendChild(script)
  }, [scheme, issueTerm])

  return (
    <StyledWrapper>
      {!loaded && (
        <LoadingBox>
          <span>💬 댓글을 불러오는 중입니다…</span>
        </LoadingBox>
      )}
      <div id="comments" />
    </StyledWrapper>
  )
}

export default Utterances

const StyledWrapper = styled.section`
  margin-top: 4rem;

  @media (min-width: 768px) {
    margin-left: -4rem;
  }
`

const LoadingBox = styled.div`
  padding: 2.5rem 1rem;
  margin-bottom: 1rem;
  text-align: center;
  font-size: 0.95rem;
  color: var(--fg-secondary, #888);
  border: 1px dashed var(--border-color, #e5e7eb);
  border-radius: 8px;
`
