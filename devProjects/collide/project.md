---
title: "[CollIDE]"
description: "An AI-powered collaborative IDE for teams — shared AI context, real-time multiplayer presence, and conflict prevention built in."
github: https://github.com/JacobiGlenn/collide
kind: dev
cover: CARD.svg
header: COVER.svg
date: "03/2026"
ongoing: true
---

<figure style="margin:0 0 1.5rem; max-width:420px;">
  <img src="devProjects/collide/LOGO.svg" alt="CollIDE logo" style="width:100%; height:auto; display:block;">
</figure>

<p class="project-detail-lead"><strong>CollIDE</strong> is an AI-powered collaborative IDE built for teams. The core idea is simple: every AI coding tool today is built for a single developer. CollIDE is built for the whole team — where each person's AI assistant has shared awareness of what everyone else is working on, so it can prevent conflicts before they happen instead of after.</p>

<p>This is early. Right now it is a README and a design document. I am still figuring out the right form factor — it might ship as a standalone VS Code fork (similar to how Cursor is built), or it might make more sense as a Cursor extension. Both are on the table.</p>

<h2 class="project-detail-h2">The problem</h2>
<p>At a hackathon, an AI assistant renamed a file for readability. A teammate had unpushed changes referencing the old filename. When they pushed, everything broke. This is not an edge case — it happens constantly on teams using AI coding tools. The AI has no idea what anyone else is doing.</p>

<p>CollIDE fixes this at the architecture level. Each developer's AI assistant has read-only access to a shared context: what files each person has open, what they are editing, and what changes are in flight. Before the AI renames a file, it checks whether a teammate has uncommitted changes that reference it. If so, it warns instead of acting.</p>

<h2 class="project-detail-h2">Planned tech stack</h2>
<div class="tech-stack">
  <a href="https://www.typescriptlang.org" target="_blank" rel="noopener noreferrer" class="tech-badge tech-badge--ts">TypeScript</a>
  <a href="https://code.visualstudio.com/api" target="_blank" rel="noopener noreferrer" class="tech-badge tech-badge--ext">VS Code API</a>
  <a href="https://docs.yjs.dev" target="_blank" rel="noopener noreferrer" class="tech-badge tech-badge--node">Yjs (CRDT)</a>
  <a href="https://socket.io" target="_blank" rel="noopener noreferrer" class="tech-badge tech-badge--node">WebSockets</a>
  <a href="https://www.anthropic.com" target="_blank" rel="noopener noreferrer" class="tech-badge tech-badge--ai">Claude API</a>
  <a href="https://livekit.io" target="_blank" rel="noopener noreferrer" class="tech-badge tech-badge--vite">LiveKit (WebRTC)</a>
  <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" class="tech-badge tech-badge--supabase">Supabase</a>
</div>

<h2 class="project-detail-h2">Key ideas</h2>
<p>Real-time multiplayer presence (live cursors, live typing, cursor follow mode) gives teams a Figma-like experience in their code editor. Combined with per-file threaded chat, an embedded task system, and in-app voice calls, the goal is to eliminate the context-switching tax of using Zoom, Slack, Jira, and an IDE all at the same time.</p>

<p>The team-aware AI context is the part I find technically most interesting. Every AI prompt is prefaced with a structured read-only block describing what each teammate has open, what they are editing, and what tasks they are assigned. This is what lets the AI say "Steven is already building that — I'll stub this and wire it up once his branch lands" instead of silently creating a duplicate.</p>

<h2 class="project-detail-h2">Where it is now</h2>
<p>Concept and architecture stage. I have a detailed technical blueprint covering the collaboration layer (Yjs/CRDT), AI context system, auto-branching conflict resolution, and the task system. The GitHub repo is a placeholder while I decide on the build approach. Active development has not started yet — this is the project I am thinking about the most right now.</p>

<h2 class="project-detail-h2">Reflection</h2>
<p>This idea came out of a real frustration I had at a hackathon where an AI refactor silently broke a teammate's work. I kept thinking about why no existing tool solves this and I could not find a good reason. The technical pieces all exist — CRDT libraries, WebRTC, large-context AI models — they just have not been assembled with team-aware AI as the primary goal. That is what CollIDE is trying to be.</p>

<p><strong>Repository:</strong> <a href="https://github.com/JacobiGlenn/collide" target="_blank" rel="noopener noreferrer" class="clean-link">github.com/JacobiGlenn/collide</a></p>
