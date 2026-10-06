import type { BlogPost, EduCard, ExpJob, GallerySlide, Honor, LinkedInPost, Project, YouTubeVideo } from './types'
import projectPayload from '../../generated/projects.json'
import blogPayload from '../../generated/blog.json'
import experiencePayload from '../../generated/experience.json'
import { LINKEDIN_POSTS } from '../../data/linkedin-posts.js'
import { YOUTUBE_VIDEOS } from '../../data/youtube-videos.js'
import galleries from '../../data/galleries.json'

export const projects = projectPayload as { design: Project[]; dev: Project[] }
export const blogPosts = blogPayload as BlogPost[]
export const experience = experiencePayload as {
  summary: string
  jobs: ExpJob[]
  education: EduCard[]
  honors: Honor[]
}
export const linkedInPosts = LINKEDIN_POSTS as LinkedInPost[]
export const youtubeVideos = YOUTUBE_VIDEOS as YouTubeVideo[]
export const galleryMap = galleries as Record<string, GallerySlide[]>

export function allProjects(): Project[] {
  return [...projects.dev, ...projects.design]
}

export function projectById(id: string) {
  return allProjects().find((p) => p.id === id)
}

export function sortPortfolio(list: Project[]) {
  const now = new Date()
  const nowYM = now.getFullYear() * 100 + (now.getMonth() + 1)
  const tier = (c: Project) => {
    if (c.id.includes('example')) return 0
    if (c.dateSort >= nowYM) return 1
    if (c.ongoing) return 2
    return 3
  }
  return [...list].sort((a, b) => tier(a) - tier(b) || b.dateSort - a.dateSort)
}

export function featuredProjects() {
  const d = sortPortfolio(projects.design.filter((p) => p.featured)).slice(0, 1)
  const v = sortPortfolio(projects.dev.filter((p) => p.featured)).slice(0, 3)
  return [...v, ...d].slice(0, 4)
}

export function expSnippets(jobs: ExpJob[]) {
  return jobs.map((j) => ({
    title: `${j.title} · ${j.company}`,
    lines: [j.bullets[0] || j.subroles?.[0]?.bullets[0] || j.location, j.dateLabel].filter(Boolean) as string[],
  }))
}

