import { NextApiRequest, NextApiResponse } from 'next'
import { getPosts } from 'src/apis/notion-client/getPosts'
import { sendSlackMessage } from 'src/libs/utils/slack'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // Vercel Cron Jobs는 특정 헤더를 포함할 수 있지만, 
    // 여기서는 단순히 getPosts를 실행하여 내부의 Slack 알림 로직을 트리거합니다.
    try {
        console.log('Cron Job: Checking Notion API structure...')
        await getPosts()

        // 크론잡이 성공적으로 실행되었음을 알리는 메시지 추가
        await sendSlackMessage('✅ [himlog] 정기 노션 API 체크 결과: 정상 (getPosts 호출 완료)')

        res.status(200).json({ message: 'Success: getPosts triggered' })
    } catch (error) {
        console.error('Cron Job Error:', error)
        await sendSlackMessage(`🚨 [himlog] 정기 노션 API 체크 중 에러 발생: ${error instanceof Error ? error.message : String(error)}`)
        res.status(500).json({ error: 'Failed to trigger getPosts' })
    }
}
