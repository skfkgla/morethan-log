import { CONFIG } from "site.config"
import axios from "axios"

export const sendSlackMessage = async (message: string) => {
    if (!CONFIG.slack.enable || !CONFIG.slack.config.url) return

    try {
        await axios.post(CONFIG.slack.config.url, {
            text: message,
        })
    } catch (error) {
        console.error("Slack 알림 전송 실패:", error)
    }
}
