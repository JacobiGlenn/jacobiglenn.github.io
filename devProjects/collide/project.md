---
title: "[CollIDE]"
description: "An AI-powered collaborative IDE for teams. Shared AI awareness, real-time multiplayer presence, and conflict prevention built in from day one."
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

<p class="project-detail-lead"><strong>CollIDE</strong> is a collaborative, AI-powered code editor designed for teams. Every AI coding tool out there is built around a single developer. CollIDE is built around the whole team, where each person's AI assistant understands what everyone else is working on and can prevent conflicts before they ever happen.</p>

<p>This is early. Right now it lives as a README and a design document while I figure out the right form factor. A standalone editor or an extension are both on the table. I am still thinking through the best path forward.</p>

<h2 class="project-detail-h2">The problem</h2>
<p>At a hackathon, an AI assistant renamed a file for readability. A teammate had unpushed changes referencing the old filename and when they pushed, everything broke. This is not an edge case. It happens constantly on teams using AI tools because the AI has no idea what anyone else is doing.</p>

<p>CollIDE is designed so that scenario never plays out. Each developer's AI has a shared, read-only view of the team's active work. Before taking any action, it knows what files are open, what changes are in flight, and who is working on what. It warns instead of guessing.</p>

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
<p>Live cursors, real-time typing, and a cursor follow mode give teams a Figma-like presence layer inside their code editor. Layered on top of that is per-file threaded chat, an embedded task board, and in-app voice calls. The goal is to keep everything in one place so engineers stop bouncing between Zoom, Slack, Jira, and their IDE just to stay in sync.</p>

<p>The team-aware AI context is the part I find most compelling. Rather than each assistant operating in isolation, every prompt includes a structured snapshot of what the team is actively doing. That context is what allows the AI to say something like "your teammate is already handling that, I will stub this and connect it once their work lands" instead of quietly creating a duplicate or breaking something downstream.</p>

<h2 class="project-detail-h2">Where it is now</h2>
<p>Concept and architecture stage. I have a detailed design document covering all the major systems and have been thinking hard about what the first shippable version looks like. The GitHub repo is a placeholder for now. Active development has not started yet, but this is the project I am thinking about the most.</p>

<h2 class="project-detail-h2">Reflection</h2>
<p>This started from a real moment of frustration. At a hackathon, an AI refactor silently broke a teammate's work and I kept thinking about why no tool was designed to prevent that. The more I looked into it, the more I realized the pieces already exist. They just have not been put together with team-aware AI as the central goal. That is the gap CollIDE is trying to fill.</p>

<p><strong>Repository:</strong> <a href="https://github.com/JacobiGlenn/collide" target="_blank" rel="noopener noreferrer" class="clean-link">github.com/JacobiGlenn/collide</a></p>
