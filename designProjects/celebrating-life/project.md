---
title: Commit the Change x CLCHC
description: "Quota Tracking and Audit Log Menu's for Celebrating Life Community Health Center Staff. Worked as a designer with Commit the Change at UCI."
kind: design
tags:
  - UI/UX
cover: card.png
header: header.png
card_fit: contain
cover_bg: "#ffffff"
date: "10/2025 – 03/2026"
wip: false
---

<p class="project-detail-lead">Hello everyone! This is by far the biggest design project I have worked on and I have a loooooottt to go over, so I'd get a snack ;p <br></p>

<h2 class="ctc-history-h2">Background</h2>

<p> Before we get started on what I worked on, let me first introduce you to some things...

<br><br>
CTC, or Commit the Change, is a club at UCI that partners with non-profit orginizations and builds them software based on their specific needs. 

<br><br>
Celebrating Life and Community Health Center is a non-profit organization committed to providing high-quality and accessible health care to underserved populations across Orange County through an expanding network of healthcare practitioners, regardless of patients’ ability to pay. 

<br><br>
The call center at Celebrating Life Community Health Center (CLC) currently relies on a manual and fragmented process to track and manage daily provider appointment goals. This disjointed workflow uses static lists, team messages, and separate documents. The team often faces challenges such as overscheduling, inconsistent real-time communication, and difficulty maintaining accurate records across multiple clinic locations. 

<br><br>
To combat these problems, we designed a centralized appoitment management platform that blended:
- Daily appointment quota creation: allowing managers to set, assign, and update provider goals across all locations.<br>
- Live quota-progress tracking: enabling real-time monitoring of appointment bookings and progress toward daily targets.<br>
- Version logs: providing transparency and accountability for changes made throughout the day.<br>
-Tiered permission portals: offering secure, role-based access for call center managers, staff, and leadership to view or update data as appropriate.

<br><br>
I was on a team of 4 UI/UX designers who worked under the CLC design lead and was specifically tasked with the Quota Tracking Menu. We had weekly "Design Sprints" which are meetings where we would spend an hour to catch up on progress and get feedback on our designs, and during the second sprint we got our tasking (Prior to that we did user research to understand our clients needs).
</p>

<figure class="project-detail-fig" style="max-width:720px;">
<br>
  <div class="project-video-wrap">
    <iframe src="https://www.youtube.com/embed/7NqFim_ag9o" title="Celebrating Life quota demo" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy"></iframe>
  </div>
  <figcaption>Demo of the quota tool.</figcaption>
</figure>

<h2 class="project-detail-h2">Who uses it</h2>
<p>Four roles. Master is one person, and that seat can be handed off. Call center managers run the directory and the quotas. Call center staff can move a provider's progress up or down, but they cannot push it past the quota. Higher management can look, and that is it. Everyone signs in with Google.</p>
<p>A quota is the number of appointments a provider is expected to hit that day. Progress is how many they have actually finished. The quota can be calculated from their hours, and a manager can override it.</p>

<h2 class="project-detail-h2">User flows</h2>
<p>Before any screens, we drew what a person would press and why. Which button opens which panel, what has to be filled before it saves, and which role is allowed to keep going. The sketches came after this, once the paths were settled.</p>
<div class="ctc-split">
<figure>
  <img src="/designProjects/celebrating-life/flow-create.png" alt="User flow for creating a quota, from the dashboard through a permission check, the create menu, required fields, and a confirm step" loading="lazy" decoding="async">
  <figcaption>Creating a quota. Press Create, and only a call center manager or the master gets the menu. Notes are optional. Everything else has to be filled, then you confirm, and it shows up on the dashboard.</figcaption>
</figure>
<figure>
  <img src="/designProjects/celebrating-life/flow.jpg" alt="User flow from the quota main page through the info screen, an edit step limited to a call center manager or the master, confirm, and back" loading="lazy" decoding="async">
  <figcaption>Editing one. The edit icon is only there for a manager or the master. Cancel, or a no, drops you back on the list with nothing saved.</figcaption>
</figure>
</div>
<p>The wide one is the whole system. Roles, where a quota is stored, and the branches for a change, a delete, and the log.</p>
<figure class="project-detail-fig">
  <img src="/designProjects/celebrating-life/flow-system.png" alt="System user flow for quota tracking, with role branches, quota entry, edit and delete decisions, and where each change is stored" loading="lazy" decoding="async">
  <figcaption>Every path off the quota dashboard, including who can write and what gets logged.</figcaption>
</figure>

<h2 class="project-detail-h2">The card</h2>
<p>The day is split into blocks, like 1–2pm and 2–3pm. Each block is one card. Date, in person or online or N/A, hours, location, a slider for the quota, and notes. Save, cancel, delete. Managers and the master can create, edit, and delete. Staff only touch the progress.</p>
<div class="ctc-three">
<figure>
  <img src="/designProjects/celebrating-life/sketch-hours.jpg" alt="Notebook sketch of a dashboard list, John at 17 hours, and add and subtract controls on 13 of 20 hours" loading="lazy" decoding="async">
  <figcaption>Early pass. A list of providers, John at 17 hours, and add or subtract on 13 of 20.</figcaption>
</figure>
<figure>
  <img src="/designProjects/celebrating-life/sketch-card.jpg" alt="Notebook sketch of a provider card with an online location, a quota, and a save button" loading="lazy" decoding="async">
  <figcaption>The card started as a provider, a location, and a quota you could save.</figcaption>
</figure>
<figure>
  <img src="/designProjects/celebrating-life/sketch-notes.jpg" alt="Notebook sketch of the same provider card next to a notes card marked 17 hours" loading="lazy" decoding="async">
  <figcaption>Notes split off so the card did not have to hold the whole day.</figcaption>
</figure>
</div>
<figure class="project-detail-wide">
  <img src="/designProjects/celebrating-life/sketch-board.jpg" alt="Notebook page of the dashboard, a provider popup, and two time blocks with hours, location, and notes" loading="lazy" decoding="async">
  <figcaption>The page I kept. Dashboard, the provider popup, then a block per time slot with save, cancel, and delete.</figcaption>
</figure>

<h2 class="project-detail-h2">The popup</h2>
<p>Next I redrew the edit screen. A board of little frames first, then a paper page for create, then one popup I kept opening back up.</p>
<div class="poster-grid">
<figure>
  <img src="/designProjects/celebrating-life/sketch-edit-board.png" alt="Gray wireframes of the edit screen, a cancel confirm, an hours dialog, and a quota field" loading="lazy" decoding="async">
  <figcaption>Hours, date, location, and type as their own little dialogs. Save brings you back. Cancel asks if the edits should be thrown out.</figcaption>
</figure>
<figure>
  <img src="/designProjects/celebrating-life/sketch-create.png" alt="Notebook sketch of a create-quota screen with provider, location, type, notes, and a quota box" loading="lazy" decoding="async">
  <figcaption>Create, on paper. Provider, location, type, notes, then the quota. I was still deciding if the button said done, save, or add.</figcaption>
</figure>
</div>
<figure class="project-detail-wide">
  <img src="/designProjects/celebrating-life/sketch-edit-popup.png" alt="Sketch of an Edit Provider Quota popup with a 5 of 20 ring, increment controls, hours, and an override field" loading="lazy" decoding="async">
  <figcaption>The popup. Provider, location, type, date, and hours across the top. Quota is a ring you can bump, type, or override. Notes sit under it, and the box grows down when you write.</figcaption>
</figure>
<div class="poster-grid">
<figure>
  <img src="/designProjects/celebrating-life/sketch-edit-notes-a.png" alt="Annotated Edit Provider Quota sketch with sticky notes about tags, the date, and where the layout should tighten" loading="lazy" decoding="async">
  <figcaption>Same popup, marked up. Tags under the provider or beside the date, and the boxes needed to be less sloppy.</figcaption>
</figure>
<figure>
  <img src="/designProjects/celebrating-life/sketch-edit-notes-b.png" alt="Second annotated pass of the Edit Provider Quota sketch, asking if the provider name can be clicked to add" loading="lazy" decoding="async">
  <figcaption>A minute later. Still asking if you can click the name to add a provider, and whether cancel should warn you on hover.</figcaption>
</figure>
</div>
<figure class="project-detail-shot">
  <img src="/designProjects/celebrating-life/sketch-edit-expand.jpg" alt="Edit Provider Quota sketch with the notes field expanded down the panel and a small quota ring" loading="lazy" decoding="async">
  <figcaption>Notes open, and the panel gets taller. The ring shrinks so the writing has room.</figcaption>
</figure>

<h2 class="project-detail-h2">The pieces</h2>
<p>Then each control on its own, before it went back into a screen.</p>
<div class="poster-grid">
<figure>
  <img src="/designProjects/celebrating-life/wire-blocks.png" alt="Wireframe blocks for progress at 5 of 20, location, visit type, provider, hours, and date" loading="lazy" decoding="async">
  <figcaption>Progress, location, type, provider, hours, date. Pick a block instead of typing the whole card.</figcaption>
</figure>
<figure>
  <img src="/designProjects/celebrating-life/wire-provider.png" alt="Close-up of a provider dropdown reading Dr. First, Last, over a directory table" loading="lazy" decoding="async">
  <figcaption>The provider menu. This is how a quota gets assigned to someone.</figcaption>
</figure>
</div>

<h2 class="project-detail-h2">Wired together</h2>
<p>Once the pieces existed, I put them on a page and wrote on top of it. Create uses the same side panel as edit. It opens empty, and it will not save until the fields are filled.</p>
<figure class="project-detail-wide">
  <img src="/designProjects/celebrating-life/wire-version.png" alt="Early version log with a master badge, a search field, and two quota changes for Dr. Sarah Chen and Dr. Michael Torres" loading="lazy" decoding="async">
  <figcaption>First version log. Who changed a quota, up or down, and which provider it belonged to.</figcaption>
</figure>
<figure class="project-detail-tall">
  <img src="/designProjects/celebrating-life/wire-sidebars.png" alt="Two tall side panels, Edit Quota with a 5 of 20 progress block and Edit Daily Note with a long note" loading="lazy" decoding="async">
  <figcaption>The panel, twice. Left is the quota. Right is the daily note taking the whole panel over.</figcaption>
</figure>
<div class="poster-grid">
<figure>
  <img src="/designProjects/celebrating-life/wire-example-a.png" alt="Annotated example of an edit quota panel beside the quota tracking page, with notes on each control" loading="lazy" decoding="async">
  <figcaption>Annotated over the wireframe. Press the pencil and the panel pushes out.</figcaption>
</figure>
<figure>
  <img src="/designProjects/celebrating-life/wire-example-b.png" alt="Second annotated example spelling out that create is the same side panel as edit, empty until every field is filled" loading="lazy" decoding="async">
  <figcaption>The notes got clearer right after. Create is that same panel, empty, and it stays shut until the info is in.</figcaption>
</figure>
</div>

<h2 class="project-detail-h2">Hi-fi</h2>
<p>Chakra, in the client's purple. The slider is the quota. Hours and location stay editable on the card, and notes sit under it. The orange marks are mine, from review.</p>
<figure class="project-detail-wide">
  <img src="/designProjects/celebrating-life/card.jpg" alt="Purple quota card for Provider1 on 01/26/2025, with in person, online, and N/A, hours, location, a quota slider, notes, and save, cancel, delete" loading="lazy" decoding="async">
  <figcaption>Provider1, January 26. In person, online, or N/A, then hours, location, quota, notes.</figcaption>
</figure>
<p>The menus came after the card. Same job, a full page. An empty day first, then one that has not started and already needs attention.</p>
<div class="poster-grid">
<figure>
  <img src="/designProjects/celebrating-life/screen-empty.png" alt="Empty quota tracking page beside a blank create quota panel, with nothing to show yet in the table" loading="lazy" decoding="async">
  <figcaption>Nothing on the list yet. Create opens on the side, and Save stays quiet until the form is filled.</figcaption>
</figure>
<figure>
  <img src="/designProjects/celebrating-life/screen-preedit.png" alt="Quota tracking at 0 of 5 with one provider who needs attention, beside an edit quota panel set to 0 of 5" loading="lazy" decoding="async">
  <figcaption>Dr. Sarah Chen at 0 of 5. Needs attention is already 1, and the edit panel is the same form with her info in it.</figcaption>
</figure>
</div>
<figure class="project-detail-wide">
  <img src="/designProjects/celebrating-life/screen-version.png" alt="Version log for the master role, with quota plus one, a note added, a provider change, and a quota created" loading="lazy" decoding="async">
  <figcaption>The log, filled in. Quota up, a note, a provider change, a quota created. Each row says who, when, and which day it was for.</figcaption>
</figure>
<p>Create, edit, and delete share that side panel. Create asks you to confirm the new quota before it lands on the list.</p>
<figure class="project-detail-fig">
  <img src="/designProjects/celebrating-life/screen-create.png" alt="Create quota form, a confirm step for Dr. Sarah Chen, and the quota tracking page with two providers" loading="lazy" decoding="async">
  <figcaption>Create, then the confirm, then she is on the list. 3 of 5 and 3 of 80, with the day's notes on the row.</figcaption>
</figure>
<p>Edit stays in that panel until you confirm. Delete stops and shows the quota you are about to remove.</p>
<figure class="project-detail-wide">
  <img src="/designProjects/celebrating-life/screen-edit.png" alt="Edit and delete quota panels, including confirm steps, on the quota tracking page with a row selected" loading="lazy" decoding="async">
  <figcaption>Four steps across. The tracking page sits at the end, with one row selected.</figcaption>
</figure>
<div class="ctc-split">
<figure>
  <img src="/designProjects/celebrating-life/screen-tracking.png" alt="Quota tracking for the master role on 2/11/2026, with progress bars, up and down controls, and notes for three providers" loading="lazy" decoding="async">
  <figcaption>The day, for the master. Up and down on the bar, 4 of 8, 2 of 5, 0 of 2. Total progress reads 1 of 5, so the rate is 20%.</figcaption>
</figure>
<figure>
  <img src="/designProjects/celebrating-life/screen-audit.png" alt="Audit log for the master role listing who incremented each provider quota and when" loading="lazy" decoding="async">
  <figcaption>Audit log beside it. Who bumped a quota, by how much, and which provider it landed on.</figcaption>
</figure>
</div>

<h2 class="project-detail-h2">Their header</h2>
<p>Last pass wears the Celebrating Life mark. Master can move the numbers. A viewer can look, and that is the whole permission.</p>
<div class="poster-grid">
<figure>
  <img src="/designProjects/celebrating-life/brand-tracking.png" alt="Celebrating Life quota tracking for the master role, 14 of 20, with location and type pills and plus minus progress" loading="lazy" decoding="async">
  <figcaption>Master. Plus and minus on the bar, location and type as pills, notes on the right.</figcaption>
</figure>
<figure>
  <img src="/designProjects/celebrating-life/brand-viewer.png" alt="Celebrating Life quota tracking for a viewer, progress bars with no plus or minus controls" loading="lazy" decoding="async">
  <figcaption>Viewer. Same rows, no plus or minus. 8 of 10, and the date is the only control up top.</figcaption>
</figure>
</div>
<figure class="project-detail-wide">
  <img src="/designProjects/celebrating-life/brand-create.png" alt="Create quota form and a blue confirm step for Nathan Duc Nguyen at Costa Mesa, 4 of 5" loading="lazy" decoding="async">
  <figcaption>Create, in their blue. Pick the provider, the day, the hours, the clinic, the type. Confirm shows it back before it saves.</figcaption>
</figure>
<figure class="project-detail-fig">
  <img src="/designProjects/celebrating-life/brand-edit.png" alt="Four edit quota panels in a row: the form, a provider reassignment, a blue confirm, and a red delete confirm" loading="lazy" decoding="async">
  <figcaption>Edit in a line. Change it, confirm it in blue, or delete it in red. Back to editing if that was the wrong call.</figcaption>
</figure>
<figure class="project-detail-shot">
  <img src="/designProjects/celebrating-life/brand-audit.png" alt="Celebrating Life audit log for a call center manager, four quota plus one rows on March 9" loading="lazy" decoding="async">
  <figcaption>Call center manager on the audit log. Four people each moved Nathan Duc Nguyen up by one, all at 7:00pm.</figcaption>
</figure>

<figure class="project-detail-fig" style="max-width:720px;">
  <img src="/assets/experience/ctc/team.jpg" alt="Commit the Change team photo" loading="lazy" decoding="async">
  <figcaption>Commit the Change.</figcaption>
</figure>
