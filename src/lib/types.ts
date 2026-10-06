export type Project = {
  id: string
  title: string
  description: string
  github: string
  kind: 'dev' | 'design'
  galleryId: string
  coverUrl: string
  coverSize: string
  headerUrl: string
  dateLabel: string
  dateSort: number
  ongoing: boolean
  featured: boolean
  bodyHtml: string
}

export type BlogPost = {
  id: string
  title: string
  date: string
  dateDisplay: string
  dateSort: number
  banner: string
  coverUrl: string
  excerpt: string
  bodyHtml: string
}

export type LiMedia = { type: 'image' | 'video'; src: string; alt?: string }

export type LinkedInPost = {
  id: string
  date: string
  text: string
  media: LiMedia[]
  thumb: string
}

export type YouTubeVideo = {
  id: string
  videoId: string
  date: string
  title: string
  description: string
}

export type GallerySlide =
  | { kind: 'img'; src: string; caption: string }
  | { kind: 'solid'; color: string; caption: string }
  | { kind: 'smiley'; caption: string }
  | { kind: 'shapes'; caption: string }

export type ExpSubrole = {
  role: string
  date: string
  bullets: string[]
}

export type ExpJob = {
  id: string
  company: string
  title: string
  location: string
  start: string
  end: string
  dateLabel: string
  dateSort: number
  companyHref?: string
  bullets: string[]
  tags: string[]
  category: string
  logo: { bg: string; color: string; letter: string; size?: string }
  galleryId?: string
  photos: string[]
  subroles?: ExpSubrole[]
}

export type EduCard = {
  school: string
  degree: string
  minor: string
  date: string
  galleryId?: string
}

export type Honor = {
  title: string
  issuer: string
  desc: string
}
