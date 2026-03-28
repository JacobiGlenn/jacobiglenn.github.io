---
title: Zotletics
description: "UCI fitness platform that generates personalized workout plans built around the gym equipment in Mesa Court and Middle Earth housing."
github: https://github.com/JacobiGlenn/Zotletics
kind: dev
cover: CARD.svg
header: COVER.svg
---

<p class="project-detail-lead"><strong>Zotletics</strong> is a fitness planning web app I am actively building for UCI students. The goal is to generate personalized workout plans that only use equipment available in Mesa Court and Middle Earth housing gyms, so every exercise is actually doable on campus for free. Authentication is working. The rest is in progress, with a target launch in 2027.</p>

<div style="margin:0 0 0.25rem;">
  <span class="project-award">&#127942; Best Healthcare Project — ICSSC WebJam 2025 (as "Anteater Gym Service")</span>
</div>

<p>The project started as a hackathon entry at ICSSC WebJam 2025 under the name <em>Anteater Gym Service</em>, where it won Best Healthcare Project. After the competition I decided to do a full rebuild under a new name with a much bigger scope: AI-powered workout generation, a social layer inspired by Strava, and a school expansion system that can swap branding and gym data for any university at signup.</p>

<h2 class="project-detail-h2">Tech stack</h2>
<div class="tech-stack">
  <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" class="tech-badge tech-badge--next">Next.js 14</a>
  <a href="https://www.typescriptlang.org" target="_blank" rel="noopener noreferrer" class="tech-badge tech-badge--ts">TypeScript</a>
  <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" class="tech-badge tech-badge--tailwind">Tailwind CSS</a>
  <a href="https://ui.shadcn.com" target="_blank" rel="noopener noreferrer" class="tech-badge tech-badge--next">shadcn/ui</a>
  <a href="https://clerk.com" target="_blank" rel="noopener noreferrer" class="tech-badge tech-badge--clerk">Clerk</a>
  <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" class="tech-badge tech-badge--supabase">Supabase</a>
  <a href="https://www.anthropic.com" target="_blank" rel="noopener noreferrer" class="tech-badge tech-badge--ai">Claude API</a>
  <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" class="tech-badge tech-badge--vercel">Vercel</a>
  <a href="https://www.figma.com" target="_blank" rel="noopener noreferrer" class="tech-badge tech-badge--figma">Figma</a>
</div>

<h2 class="project-detail-h2">What it will do</h2>
<p>Students sign up with their <code>@uci.edu</code> email and go through a guided onboarding flow collecting height, weight, goals, experience level, and housing community. From there the app generates a personalized weekly workout split using Claude, constrained to only include exercises possible with the actual equipment in their gym. The plan includes daily workout logging, a calendar view, and a social feed where friends can share progress and hold workout streaks.</p>

<p>The school expansion system is designed to support other universities by swapping gym equipment data, branding, color schemes, and even the app name through a school config at signup. UCI is the first target.</p>

<h2 class="project-detail-h2">Planned AI integration</h2>
<p>The workout generation pipeline will work like this: a Next.js API route pulls the user's full profile and workout history from Supabase, loads the equipment list for their selected housing gym, and bundles everything into a structured prompt. Claude returns a JSON workout plan that gets parsed directly into the card UI. A lighter version of the same call handles individual exercise swaps, asking Claude to find an alternative targeting the same muscle group using only available equipment.</p>

<p>A hardcoded algorithm will handle the scaffolding (muscle group rotation, rest day placement) and Claude handles personalization and coaching. The AI companion will also be able to answer questions about form and adjust the plan conversationally through a floating chat panel.</p>

<h2 class="project-detail-h2">Hackathon origin</h2>
<p>At WebJam 2025 I led the Figma wireframes, built the workout dictionary (the function that maps goals and BMI to exercise selections), implemented the BMI calculation, and created the hotlink feature that connects exercise cards to tutorial videos. The team was four people and we built the whole thing in 48 hours for a working demo on GitHub Pages. Winning Best Healthcare was a surprise given it was the first React project for most of the team.</p>

<p>The hackathon version had a bug where it could generate the same exercise multiple times in a plan due to a broken dedup check. That was the first thing I planned to fix in the rebuild.</p>

<h2 class="project-detail-h2">Reflection</h2>
<p>This is the first project I have owned end-to-end from initial Figma design through a full architectural plan. Writing the technical blueprint before touching the rebuild forced me to think seriously about schema design, auth flows, and what it actually takes to make something maintainable at scale. That habit of planning before coding is something I picked up from the hackathon experience, where we had too many ideas and not enough structure, and it has changed how I approach every project since.</p>

<p>The AI integration is the part I am most interested in building. Getting a model to return structured JSON consistently, handling edge cases, and writing prompts that account for full user context is a real engineering problem worth solving well. I am taking my time with this one.</p>
