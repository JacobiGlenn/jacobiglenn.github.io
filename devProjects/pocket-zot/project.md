---
title: PocketZot
description: "IrvineHacks 2026 winner: a Chrome extension with a Tamagotchi-style anteater mascot that grades your AI prompts in real time."
github: https://github.com/antsuh1028/PocketZot
kind: dev
cover: CARD.png
header: COVER.png
cover_size: cover
---

<p class="project-detail-lead"><strong>PocketZot</strong> is a Chrome extension built at IrvineHacks 2026. It monitors your prompts to AI assistants and grades how much cognitive work you are actually doing. Your virtual anteater mascot gains health when you prompt thoughtfully and loses it when you let the AI do all the thinking.</p>

<div style="margin:0 0 0.25rem;">
  <span class="project-award">&#127942; Best Neuro Hack — Cognitive Science Association at UCI, IrvineHacks 2026</span>
</div>

<figure class="project-detail-fig tall-img" style="max-width:720px;">
  <div class="project-video-wrap">
    <iframe src="https://www.youtube.com/embed/JknUSpljYZo" title="PocketZot demo" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy"></iframe>
  </div>
  <figcaption>IrvineHacks 2026 demo — gravity, animations, prompt classification, and the shop in action.</figcaption>
</figure>

<h2 class="project-detail-h2">Tech stack</h2>
<div class="tech-stack">
  <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noopener noreferrer" class="tech-badge tech-badge--js">JavaScript</a>
  <a href="https://react.dev" target="_blank" rel="noopener noreferrer" class="tech-badge tech-badge--react">React</a>
  <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer" class="tech-badge tech-badge--vite">Vite</a>
  <a href="https://www.python.org" target="_blank" rel="noopener noreferrer" class="tech-badge tech-badge--py">Python</a>
  <a href="https://fastapi.tiangolo.com" target="_blank" rel="noopener noreferrer" class="tech-badge tech-badge--fast">FastAPI</a>
  <a href="https://platform.openai.com" target="_blank" rel="noopener noreferrer" class="tech-badge tech-badge--openai">OpenAI API</a>
  <a href="https://www.postgresql.org" target="_blank" rel="noopener noreferrer" class="tech-badge tech-badge--pg">PostgreSQL</a>
  <a href="https://developer.chrome.com/docs/extensions/mv3" target="_blank" rel="noopener noreferrer" class="tech-badge tech-badge--ext">Chrome MV3</a>
</div>

<h2 class="project-detail-h2">What it does</h2>
<p>Every time you send a prompt to ChatGPT, Claude, Gemini, or Perplexity, PocketZot intercepts it and runs it through a fine-tuned LLM classifier. The classifier scores the prompt on a scale from -3 to +2 based on how much higher-order reasoning you are actually contributing versus offloading entirely to the AI. A score near +2 means you are asking for clarification or validation while keeping the thinking on your end. A score of -3 means the AI is doing all the work for you. That score feeds directly into your anteater's health bar, creating a real-time feedback loop that nudges you toward better habits.</p>

<div style="display:flex;gap:1rem;flex-wrap:wrap;justify-content:center;margin:1.25rem 0;">
  <figure class="project-detail-fig" style="max-width:260px;flex:1 1 200px;margin:0;">
    <img src="devProjects/pocket-zot/main-popup.png" alt="PocketZot main popup showing Bobby the anteater, health bar, and ants" loading="lazy" decoding="async">
    <figcaption>Main popup — Bobby's stats, health bar, and ant count.</figcaption>
  </figure>
  <figure class="project-detail-fig" style="max-width:260px;flex:1 1 200px;margin:0;">
    <img src="devProjects/pocket-zot/study-summary.png" alt="Study summary screen showing prompt breakdown and ants earned" loading="lazy" decoding="async">
    <figcaption>Study summary — prompt breakdown, good vs bad, ants earned.</figcaption>
  </figure>
</div>

<h2 class="project-detail-h2">Physics system</h2>
<p>The anteater mascot runs as a content script injected into the page, floating on top of the browser viewport in a fixed-position <code>div</code>. Building convincing movement meant writing a full physics engine from scratch. All positions and velocities are in <strong>pixels per frame</strong> at 60fps; delta-time is passed every tick so the simulation stays consistent under frame drops.</p>

<p>The first decision was gravity. Too high and the anteater feels heavy and mechanical; too low and it looks like it is floating on the moon. After a lot of tuning, <code>GRAVITY = 0.16</code> hit the sweet spot — slow enough to feel light and lively, while <code>TERMINAL_VEL = 14</code> keeps falls from becoming instant drops:</p>

<div class="project-detail-code-wrap"><div class="project-detail-code-label">physics.js — tuning constants</div><pre class="project-detail-pre">var GRAVITY         = 0.16;   // low → floaty, forgiving feel
var TERMINAL_VEL    = 14;     // px/frame max fall speed
var BOUNCE_FACTOR   = 0.28;   // 28% of impact velocity reflected back up
var BOUNCE_STOP     = 1.2;    // settle to rest when vy < this value
var THROW_AIR_DAMP  = 0.97;   // vx and vy multiplied every frame while airborne
var FRICTION        = 0.80;   // applied to vx on floor landing after a throw
var MAX_THROW_SPEED = 22;     // caps drag-release velocity</pre></div>

<p>The core <code>step()</code> method runs once per animation frame. It applies gravity, integrates velocity into position, then resolves collisions against the four viewport edges. The floor collision has the most nuance: after a throw the velocity is reflected upward by <code>BOUNCE_FACTOR</code>, but the bounce is suppressed entirely once the reflected speed drops below <code>BOUNCE_STOP</code> so the anteater settles cleanly instead of vibrating in place:</p>

<div class="project-detail-code-wrap"><div class="project-detail-code-label">physics.js — PhysicsBody.step()</div><pre class="project-detail-pre">PhysicsBody.prototype.step = function (viewportW, viewportH, isDragging) {
  if (isDragging) return this; // drag controller owns position while held

  // Gravity
  if (!this.onGround) {
    this.vy = Math.min(this.vy + GRAVITY, TERMINAL_VEL);
  }
  // Air damping decays both axes while thrown (feels like drag/air resistance)
  if (this.thrown) {
    this.vx *= THROW_AIR_DAMP;
    this.vy *= THROW_AIR_DAMP;
  }

  this.x += this.vx;
  this.y += this.vy;

  // Floor collision
  var floorY = viewportH - this.h - FLOOR_OFFSET;
  if (this.y >= floorY) {
    this.y = floorY;
    if (this.thrown) {
      var bounced = -this.vy * BOUNCE_FACTOR;
      if (Math.abs(bounced) < BOUNCE_STOP) {
        this.vy = 0;
        this.thrown = false;  // stop bouncing, settle to walk
      } else {
        this.vy = bounced;    // keep bouncing with energy loss
      }
      this.vx *= FRICTION;
    } else {
      this.vy = 0;
    }
    this.onGround = true;
  }

  // Left / right walls bounce at 50% horizontal velocity
  if (this.x < 0) {
    this.x = 0;
    if (this.thrown) this.vx = Math.abs(this.vx) * 0.5;
  }
  if (this.x + this.w > viewportW) {
    this.x = viewportW - this.w;
    if (this.thrown) this.vx = -Math.abs(this.vx) * 0.5;
  }
};</pre></div>

<h2 class="project-detail-h2">Drag, throw, and velocity estimation</h2>
<p>When the user grabs and flings the anteater, the throw velocity can't just come from the final <code>mousemove</code> delta — that sample is too noisy. Instead, <code>DragController</code> records a rolling history of up to 10 cursor positions timestamped in milliseconds. On release, it filters to the last 100ms window, then scales the displacement from first to last sample into px/frame at 60fps. The result is capped at <code>MAX_THROW = 24px/frame</code> to prevent the anteater from flying off screen:</p>

<div class="project-detail-code-wrap"><div class="project-detail-code-label">dragcontroller.js — history-window velocity estimation</div><pre class="project-detail-pre">var HISTORY_WINDOW_MS = 100;  // only use cursor samples from last 100ms
var MAX_THROW         = 24;   // px/frame velocity cap
var ASSUMED_FPS_MS    = 16.67; // normalize to 60fps

DragController.prototype._computeVelocity = function () {
  var now    = performance.now();
  var recent = this._history.filter(function (p) {
    return now - p.t <= HISTORY_WINDOW_MS;
  });
  if (recent.length < 2) return { vx: 0, vy: 0 };

  var first = recent[0];
  var last  = recent[recent.length - 1];
  var dt    = last.t - first.t;
  if (dt === 0) return { vx: 0, vy: 0 };

  // Convert px/ms → px/frame at 60fps
  var scale = ASSUMED_FPS_MS / dt;
  var vx = (last.x - first.x) * scale;
  var vy = (last.y - first.y) * scale;

  return {
    vx: Math.max(-MAX_THROW, Math.min(MAX_THROW, vx)),
    vy: Math.max(-MAX_THROW, Math.min(MAX_THROW, vy)),
  };
};</pre></div>

<p>There is also a "Grab State" idle detection: if the user holds the anteater still for 300ms without moving the cursor, the direction flag resets to neutral and the sprite switches to a centered grab pose, distinct from the left/right drag poses. This felt much more natural than snapping to a drag frame the instant the mouse button went down.</p>

<h2 class="project-detail-h2">State machine and the cursor-grab prank</h2>
<p>All mascot behavior is driven by a seven-state machine: <code>FALLING</code> → <code>LANDING</code> → <code>WALKING</code> ↔ <code>IDLE</code>, plus <code>DRAGGED</code>, <code>THROWN</code>, and the standout feature — <code>MOUSE_GRAB</code>. Each state owns its own transition logic and is updated once per frame alongside the physics step.</p>

<p>The most interesting state is <code>MOUSE_GRAB</code>. While walking, the anteater has a tiny random chance each frame of deciding to steal your cursor. At 60fps, <code>MOUSE_GRAB_CHANCE_PER_FRAME = 0.0002</code> means this fires roughly once every 83 seconds — rare enough to feel like a genuine surprise:</p>

<div class="project-detail-code-wrap"><div class="project-detail-code-label">statemachine.js — MOUSE_GRAB trigger</div><pre class="project-detail-pre">var MOUSE_GRAB_CHANCE_PER_FRAME = 0.0002; // ~1x per 83s at 60fps
var MOUSE_GRAB_DURATION_MS      = 5000;   // lasts 5 seconds then returns to WALKING

case STATES.WALKING:
  if (body.onGround && Math.random() < MOUSE_GRAB_CHANCE_PER_FRAME) {
    this._go(STATES.MOUSE_GRAB);
  }
  break;

case STATES.MOUSE_GRAB:
  if (this._timer >= this._duration) {
    this.direction = Math.random() > 0.5 ? DIR.RIGHT : DIR.LEFT;
    this._go(STATES.WALKING); // eventually lets go
  }
  break;</pre></div>

<p>When the state fires, <code>anteater.js</code> catches the transition, calculates a ballistic launch vector toward the last known cursor position, and calls <code>document.body.requestPointerLock()</code> to lock the mouse. If pointer lock is granted the anteater runs along the floor while holding your cursor. This only lasts about 5 seconds and then the Anteater lets go. If the browser denies it (which happens on most sites), the script gracefully falls back to a normal FALLING arc. A 250ms timeout handles cases where the pointer lock promise never resolves:</p>

<div class="project-detail-code-wrap"><div class="project-detail-code-label">anteater.js — MOUSE_GRAB jump launch</div><pre class="project-detail-pre">if (newState === STATES.MOUSE_GRAB) {
  var tx = this._lastMouseX;
  var ty = this._lastMouseY;
  var cx = this._body.x + this._body.w / 2;
  var cy = this._body.y + this._body.h / 2;
  var dx = tx - cx, dy = ty - cy;
  var len = Math.sqrt(dx * dx + dy * dy) || 1;

  // Ballistic launch — bias upward if cursor is above the anteater
  var vxBase = (dx / len) * 50;
  var vyBase = (dy / len) * 50;
  if (ty < cy) {
    var rise   = cy - ty;
    var vyNeed = -Math.sqrt(2 * GRAVITY * rise) * 2.5;
    if (vyBase > vyNeed) vyBase = vyNeed; // arc high enough to reach cursor
  }
  this._body.vx = vxBase;
  this._body.vy = vyBase;
  this._body.onGround = false;

  document.body.requestPointerLock(); // steal the cursor
}</pre></div>

<h2 class="project-detail-h2">Animation system</h2>
<p>All character sprites are 88×88px tiles stored across individual PNG files during development (a full spritesheet is planned). The sprite system maps each state to a set of frame offsets and a per-state frame duration. When a state changes, the frame counter resets to 0 and the new frame timing kicks in:</p>

<div class="project-detail-code-wrap"><div class="project-detail-code-label">sprite.js — FRAMES table and per-state timing</div><pre class="project-detail-pre">var TILE = 88; // px per sprite tile

var FRAMES = {
  FALLING : [{ x: 0,        y: 0        }, { x: TILE,     y: 0        }],
  LANDING : [{ x: TILE * 2, y: 0        }],
  WALKING : [{ x: 0,        y: TILE     }, { x: TILE,     y: TILE     },
             { x: TILE * 2, y: TILE     }, { x: TILE * 3, y: TILE     }],
  IDLE    : [{ x: 0,        y: TILE * 2 }, { x: TILE,     y: TILE * 2 }],
  DRAGGED : [{ x: 0,        y: TILE * 3 }],
  THROWN  : [{ x: TILE,     y: TILE * 3 }],
};

var FRAME_MS = {
  FALLING : 130,   LANDING : 180,
  WALKING : 110,   IDLE    : 450,
  DRAGGED : 999,   THROWN  : 999,
};</pre></div>

<p>The coolest visual detail is the thrown rotation. Rather than a fixed spin, the sprite reads the current velocity vector and computes the arc angle using <code>Math.atan2</code>. This means the anteater always points in the exact direction it is flying — nose-first on a flat throw, tumbling head-over-tail on a steep one:</p>

<div class="project-detail-code-wrap"><div class="project-detail-code-label">sprite.js — arc-following rotation while thrown</div><pre class="project-detail-pre">} else if (state === 'THROWN' && body) {
  // Angle of the velocity vector — follows the arc as the anteater flies
  var angleRad = Math.atan2(body.vy, body.vx);
  var angleDeg = angleRad * (180 / Math.PI);
  this.el.style.transform = 'rotate(' + angleDeg + 'deg)';
}</pre></div>

<h2 class="project-detail-h2">Shop and accessory system</h2>
<p>Ants are the in-game currency earned from high-scoring prompts. The shop lets you spend them on hats: Plunger, Cracked Egg, Crown, and Christmas Hat. Each hat is a separate <code>div</code> overlaid on top of the base sprite element, not drawn into a canvas — this kept hat rendering decoupled from the sprite animation loop entirely.</p>

<figure class="project-detail-fig" style="max-width:320px;">
  <img src="devProjects/pocket-zot/shop.png" alt="PocketZot shop screen showing hats available for purchase" loading="lazy" decoding="async">
  <figcaption>The shop — buy hats with ants earned from good prompts.</figcaption>
</figure>

<p>The hat equip flow crosses three layers: the React popup calls the FastAPI backend (written by teammates), <code>background.js</code> caches the equipped hat in <code>chrome.storage.local</code>, and when the page content script receives a <code>HAT_EQUIPPED</code> message it calls <code>sprite.setEquippedHat()</code> to swap the overlay image. The hat overlay uses a separate child element (<code>_hatEl</code>) so setting it never wipes the base sprite content:</p>

<div class="project-detail-code-wrap"><div class="project-detail-code-label">messageListener.js — HAT_EQUIPPED message handler</div><pre class="project-detail-pre">case "HAT_EQUIPPED":
  // background.js relays this from the popup after the backend confirms purchase
  var a = anteater;
  if (a && a.isActive() && a._sprite
      && typeof a._sprite.setEquippedHat === "function") {
    a._sprite.setEquippedHat(message.hat); // swaps hat overlay image
  }
  sendResponse({ ok: true });
  break;</pre></div>

<p>I built the frontend shop: the React purchase UI, the equip flow, and the hat overlay rendering in the content script. The PostgreSQL backend that actually stores purchases and ownership was built by Anthony Suh.</p>

<h2 class="project-detail-h2">Background service worker</h2>
<p><code>background.js</code> is the glue that holds the three layers of the extension together — the React popup, the page content script, and the FastAPI backend running on localhost. Because a content script cannot make direct cross-origin requests and a popup cannot inject into a live tab, all communication routes through this service worker.</p>

<p>The <code>EQUIP_HAT</code> handler is a good example of how it bridges layers. When the popup confirms a hat purchase, it sends a message to the background worker. The worker persists the hat in <code>chrome.storage.local</code>, then broadcasts a <code>HAT_EQUIPPED</code> message to every open tab so the content script updates the mascot overlay immediately, no matter which tab the user is on:</p>

<div class="project-detail-code-wrap"><div class="project-detail-code-label">background.js — EQUIP_HAT broadcast to all tabs</div><pre class="project-detail-pre">if (message.action === 'EQUIP_HAT') {
  var hat = message.hat || null;
  chrome.storage.local.set({ pocketzot_equipped_hat: hat }, function () {
    chrome.tabs.query({}, function (tabs) {
      tabs.forEach(function (tab) {
        try {
          chrome.tabs.sendMessage(tab.id, { action: 'HAT_EQUIPPED', hat: hat })
            .catch(function () {}); // ignore tabs with no content script
        } catch (e) {}
      });
    });
  });
  sendResponse({ ok: true });
  return true;
}</pre></div>

<p>The <code>UPDATE_HEALTH</code> handler is the most complex path. After a prompt is classified, the content script sends the score to the background worker, which looks up the user's anteater from <code>chrome.storage.local</code> (cached on login) and calls the FastAPI health endpoint. If no cached anteater is found it falls back to fetching the full anteater list from the backend and matching by user ID:</p>

<div class="project-detail-code-wrap"><div class="project-detail-code-label">background.js — UPDATE_HEALTH → FastAPI bridge</div><pre class="project-detail-pre">if (message.action === 'UPDATE_HEALTH') {
  chrome.storage.local.get(['userId', 'anteaterDetails'], function (data) {
    var anteaterDetails = data.anteaterDetails;

    // Fast path: use cached anteater details from login
    if (anteaterDetails && anteaterDetails.id) {
      fetch(BACKEND_URL + '/api/anteaters/' + anteaterDetails.id + '/health', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ delta: message.delta }),
      })
        .then(r => r.json())
        .then(result => {
          chrome.storage.local.set({ anteaterDetails: { ...anteaterDetails, ...result } });
          sendResponse({ ok: true, data: result });
        });
      return;
    }

    // Slow path: fetch anteater list, match by uid
    fetch(BACKEND_URL + '/api/anteaters')
      .then(r => r.json())
      .then(list => {
        var found = list.find(a => a.uid === data.userId);
        if (!found) { sendResponse({ ok: false, error: 'No anteater found' }); return; }
        updateHealthWithAnteater(found, message.delta, sendResponse);
      });
  });
  return true;
}</pre></div>

<h2 class="project-detail-h2">Prompt classification</h2>
<p>The classification system was designed and built by Candice Lu. The model is fine-tuned on <code>gpt-4o-mini</code> using a custom five-level taxonomy inspired by Bloom's Taxonomy and research on cognitive offloading. Each level scores how much of the higher-order thinking the student is doing versus delegating to the AI:</p>

<div class="project-detail-code-wrap"><div class="project-detail-code-label">Taxonomy — five scoring levels</div><pre class="project-detail-pre">-3  Asks the AI to perform core higher-order thinking and produce
    conclusions on the user's behalf. No evidence of user reasoning.
    Example: "Compare capitalism and socialism and decide which is better."

-2  Structures the task but still requires the AI to generate insights.
    The user defines what kind of thinking should occur.
    Example: "Evaluate the effectiveness of the New Deal policies."

-1  Requests explanation, summary, translation, or factual recall.
    AI supports understanding, not reasoning.
    Example: "What is a black hole?"   /   "Summarize the water cycle."

+1  User actively forming or testing an explanation; asks AI to
    validate or refine without providing a final answer.
    Example: "I think recursion works by a function calling itself
              until a base case stops it. Am I missing something?"

+2  Explicitly positions the AI as a tutor and restricts direct answers.
    User seeks to build reasoning ability and retains all conclusions.
    Example: "I'm learning calculus. Don't define derivatives — ask
              me guiding questions so I can reason it out myself."</pre></div>

<p>The dataset of fine-tuning examples was hand-labeled to cover the full range, with particular attention to edge cases near the boundary between adjacent levels. A Python pipeline handles the full workflow — converting examples into the OpenAI messages format, uploading the dataset, creating the fine-tuning job, and testing the resulting model:</p>

<div class="project-detail-code-wrap"><div class="project-detail-code-label">scripts/convert_dataset_to_messages.py — format conversion</div><pre class="project-detail-pre"># Each training example is stored as { prompt, completion }.
# OpenAI fine-tuning expects { messages: [system, user, assistant] }.
def convert_line(record: dict) -> dict:
    parts = record["prompt"].split("\n", 1)
    system_content = parts[0].strip()  # taxonomy instructions
    user_content   = parts[1].strip()  # the student prompt
    return {
        "messages": [
            {"role": "system",    "content": system_content},
            {"role": "user",      "content": user_content},
            {"role": "assistant", "content": record["completion"]},
        ]
    }</pre></div>

<p>Once trained, the fine-tuned model ID is stored in an environment variable and the FastAPI <code>/api/classify/</code> endpoint calls it on every submitted prompt. The endpoint parses the JSON response from the model and returns a <code>value</code> (−3 to +2) and a <code>suggestion</code> string that appears in the on-page toast notification:</p>

<div class="project-detail-code-wrap"><div class="project-detail-code-label">backend/src/api/classifier.py — classification endpoint</div><pre class="project-detail-pre">FINE_TUNED_MODEL = os.environ.get("FINE_TUNED_MODEL_ID", "gpt-4o-mini-2024-07-18")

@router.post("/", response_model=ClassifyResponse)
async def classify_prompt(request: ClassifyRequest):
    response = client.chat.completions.create(
        model=FINE_TUNED_MODEL,
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user",   "content": request.prompt},
        ],
        temperature=0,
    )
    content = response.choices[0].message.content
    parsed  = json.loads(content)           # {"value": 1, "suggestion": "..."}
    return ClassifyResponse(
        value=parsed.get("value", 0),
        suggestion=parsed.get("suggestion"),
        raw_response=content,
    )</pre></div>

<p>The score feeds directly into the anteater health system via the <code>UPDATE_HEALTH</code> message path described above. Positive scores heal the anteater and overflow into ant currency; negative scores drain ants first, then hit health — creating a resource buffer that softens occasional bad prompts without immediately killing the mascot.</p>

<h2 class="project-detail-h2">Data model</h2>
<p>The PostgreSQL schema was designed by Anthony Suh and Candice Lu. Four tables cover the whole game loop: a <code>users</code> table holding the ant currency balance, an <code>anteater</code> table with health and death state, an <code>accessories</code> catalog, and a <code>has_accessory</code> join table that tracks ownership and which hat is currently equipped on which anteater:</p>

<div class="project-detail-code-wrap"><div class="project-detail-code-label">schema/migrations — PostgreSQL tables</div><pre class="project-detail-pre">CREATE TABLE users (
  id    SERIAL PRIMARY KEY,
  name  VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  ants  INT NOT NULL DEFAULT 0         -- ant currency balance
);

CREATE TABLE anteater (
  id       SERIAL PRIMARY KEY,
  name     VARCHAR(100) NOT NULL,
  health   INTEGER NOT NULL DEFAULT 100,
  is_dead  BOOLEAN NOT NULL DEFAULT FALSE,
  uid      INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE accessories (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  price       INT NOT NULL,
  type        VARCHAR(50)  NOT NULL DEFAULT 'hat',
  image_url   TEXT,
  description TEXT
);

CREATE TABLE has_accessory (
  id           SERIAL PRIMARY KEY,
  uid          INT NOT NULL REFERENCES users(id)        ON DELETE CASCADE,
  accessory_id INT NOT NULL REFERENCES accessories(id),
  anteater_id  INT          REFERENCES anteater(id)     ON DELETE SET NULL,
  purchased_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  -- anteater_id = NULL means owned but not equipped
);</pre></div>

<p>The health economy uses a multiplier of 12: every classification point translates to ±12 health or ±12 ants. On damage, ants absorb first so a buffer of accumulated currency protects health. On healing, health fills to 100 and any excess is deposited back as ants — so staying sharp consistently rewards you with shop currency.</p>

<h2 class="project-detail-h2">Team</h2>
<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:0.75rem 1.5rem;margin:1rem 0 1.5rem;">
  <div>
    <strong>Jacobi Glenn</strong><br>
    <span style="font-size:0.875rem;opacity:0.8;">Physics engine, anteater content script, animation system, drag &amp; throw, state machine, shop frontend, hat overlay</span>
  </div>
  <div>
    <strong>Candice Lu</strong><br>
    <span style="font-size:0.875rem;opacity:0.8;">AI fine-tuning pipeline, prompt taxonomy dataset, classifier.py FastAPI endpoint, backend</span>
  </div>
  <div>
    <strong>Anthony Suh</strong><br>
    <span style="font-size:0.875rem;opacity:0.8;">Backend architecture, PostgreSQL schema, accessories &amp; health API, some frontend</span>
  </div>
  <div>
    <strong>Evie Nhat Vy Ngo</strong><br>
    <span style="font-size:0.875rem;opacity:0.8;">All sprite art, UI design, visual identity</span>
  </div>
</div>

<h2 class="project-detail-h2">Reflection</h2>
<p>This was the first browser extension any of us had shipped, and the first time I built a real physics system for a product that people were actually going to interact with. The hardest part technically was getting gravity and throw to feel good across every screen size — the viewport geometry changes constantly and there is no DOM to anchor to, so everything had to be computed from <code>window.innerWidth</code> and <code>window.innerHeight</code> on every frame. I learned that even a two-variable model needs a lot of iteration before it stops feeling like a simulation and starts feeling like a character.</p>
<p>The hackathon format forced real scope discipline. We had plans for roaming animations, different food options, and more interactability, but none of that was going to ship in 48 hours. Cutting scope and making what we had feel complete was the right call. This was my second Hackathon ever and first time working with such high level teammates, I learned a lot about how to be successful in a team setting that I wouldn't get anywhere else. I'm really thankful for the experience and I love how our project turned out!</p>

<p><strong>Devpost:</strong> <a href="https://devpost.com/software/pocketzot" target="_blank" rel="noopener noreferrer" class="clean-link">devpost.com/software/pocketzot</a> &nbsp;·&nbsp; <strong>Repository:</strong> <a href="https://github.com/antsuh1028/PocketZot" target="_blank" rel="noopener noreferrer" class="clean-link">github.com/antsuh1028/PocketZot</a></p>
