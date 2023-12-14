import type { WebsiteStatsResponse } from '@/types/website'
import { set } from 'date-fns'

export const fetchWebsiteStats = async () => {
  try {
    const websiteStatsEndpoint = process.env.WEBSITE_STATS_ENDPOINT as string
    const websiteStatsToken = process.env.WEBSITE_STATS_TOKEN as string

    const today = set(new Date(), {
      hours: 23,
      minutes: 59,
      seconds: 59,
      milliseconds: 999,
    })
    const url = new URL(websiteStatsEndpoint)

    url.searchParams.append('startAt', '1657645200000')
    url.searchParams.append('endAt', new Date(today).valueOf().toString())

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${websiteStatsToken}` },
    })
    const {
      pageviews: { value: viewCount },
      uniques: { value: visitorCount },
    }: WebsiteStatsResponse = await response.json()

    return {
      viewCount: viewCount,
      visitorCount: visitorCount,
    }
  } catch (error) {
    console.error(error)
    return null
  }
}
