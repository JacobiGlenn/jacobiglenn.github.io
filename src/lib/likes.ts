function headers() {
  const key = window.JSONBIN_KEY || ''
  return {
    'Content-Type': 'application/json',
    'X-Master-Key': key,
  }
}

function binUrl() {
  const id = window.JSONBIN_BIN_ID || ''
  return `https://api.jsonbin.io/v3/b/${id}`
}

export async function getLikeCount(videoId: string) {
  if (!window.JSONBIN_BIN_ID || !window.JSONBIN_KEY) return 0
  try {
    const res = await fetch(`${binUrl()}/latest`, { headers: headers() })
    const json = await res.json()
    return Number(json?.record?.likes?.[videoId] || 0)
  } catch {
    return 0
  }
}

export async function setLikeCount(videoId: string, count: number) {
  if (!window.JSONBIN_BIN_ID || !window.JSONBIN_KEY) return
  try {
    const res = await fetch(`${binUrl()}/latest`, { headers: headers() })
    const json = await res.json()
    const record = json?.record || { likes: {} }
    record.likes = record.likes || {}
    record.likes[videoId] = count
    await fetch(binUrl(), { method: 'PUT', headers: headers(), body: JSON.stringify(record) })
  } catch {
    /* ignore */
  }
}

export async function youtubeStats(videoId: string) {
  const key = window.YOUTUBE_API_KEY
  if (!key) return null
  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${key}`,
    )
    const json = await res.json()
    const s = json?.items?.[0]?.statistics
    if (!s) return null
    return { views: s.viewCount as string, likes: s.likeCount as string }
  } catch {
    return null
  }
}
