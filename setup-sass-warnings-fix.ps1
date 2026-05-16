# ════════════════════════════════════════════════════════════════
# setup-sass-warnings-fix.ps1
# 1) Adds $marker-pale token.
# 2) Replaces lighten() with the new token (no more deprecation).
# 3) Removes the 1% lighten on rubric criterion (was imperceptible).
# 4) Switches Vite to Sass's modern API.
# Run from project root: PS> .\setup-sass-warnings-fix.ps1
# ════════════════════════════════════════════════════════════════

function W ($p, $c) {
    $full = Join-Path (Get-Location) $p
    $dir  = Split-Path $full -Parent
    if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }
    [System.IO.File]::WriteAllText($full, $c, (New-Object System.Text.UTF8Encoding($false)))
    Write-Host "  + $p" -ForegroundColor Green
}

if (-not (Test-Path 'package.json')) {
    Write-Host "ERROR: Run from project root." -ForegroundColor Red
    exit 1
}

Write-Host "Clearing Sass warnings..." -ForegroundColor Cyan
Write-Host ""

W 'src/styles/_tokens.scss' @'
// ═══════════════════════════════════════════════════════════════════
// M03 — הספויילר הפדגוגי · Design Tokens
// Blueprint aesthetic: architect's blue + amber annotation + paper cream
// Change any token here to re-skin the entire module.
// ═══════════════════════════════════════════════════════════════════

// ── PALETTE ────────────────────────────────────────────────────────
// Primary — the architect's blueprint blue
$blueprint:        #1A4A7A;
$blueprint-dark:   #0F3D5C;   // hero text, strong headers
$blueprint-mid:    #2E5F8E;
$blueprint-light:  #4A7BA3;   // borders, dividers
$blueprint-pale:   #DCE6F0;   // section tints, hover states
$blueprint-grid:   rgba(26, 74, 122, 0.08); // subtle grid texture

// Accent — amber, for annotations + highlights (the "marker pen" warmth)
$amber:            #E8A33A;
$amber-dark:       #B07C20;   // text on amber backgrounds
$amber-light:      #F5C97A;
$amber-pale:       #FDF1D9;   // soft amber wash

// Emphasis — marker red, used sparingly for the RTL planning arrow
// and "reverse" signifiers. This is the module's signature accent.
$marker:           #C44536;
$marker-dark:      #8E2C20;
$marker-pale:      #FAE0DC;   // soft peach wash — for warnings/callouts

// Paper — the background tone, like architect's drafting paper
$paper:            #FAF7F0;
$paper-warm:       #F3EDE0;   // card surfaces
$paper-line:       #E8E2D4;   // soft dividers

// Ink — body text + structural lines
$ink:              #1A2530;   // body text
$ink-soft:         #4A5460;   // secondary text
$ink-mute:         #8A95A3;   // captions, meta

// Functional
$white:            #FFFFFF;
$success:          #2D7A4F;
$warning:          #C97818;
$error:            $marker;

// ── CSS CUSTOM PROPS (for runtime theming) ─────────────────────────
:root {
  --c-blueprint:       #{$blueprint};
  --c-blueprint-dark:  #{$blueprint-dark};
  --c-blueprint-light: #{$blueprint-light};
  --c-blueprint-pale:  #{$blueprint-pale};
  --c-blueprint-grid:  #{$blueprint-grid};
  --c-amber:           #{$amber};
  --c-amber-dark:      #{$amber-dark};
  --c-amber-pale:      #{$amber-pale};
  --c-marker:          #{$marker};
  --c-marker-dark:     #{$marker-dark};
  --c-marker-pale:     #{$marker-pale};
  --c-paper:           #{$paper};
  --c-paper-warm:      #{$paper-warm};
  --c-paper-line:      #{$paper-line};
  --c-ink:             #{$ink};
  --c-ink-soft:        #{$ink-soft};
  --c-ink-mute:        #{$ink-mute};
  --c-white:           #{$white};
}

// ── TYPOGRAPHY ─────────────────────────────────────────────────────
$font-display: 'Frank Ruhl Libre', 'Georgia', serif;   // headings — architectural serif
$font-body:    'Assistant', 'Helvetica Neue', sans-serif; // body
$font-mono:    'IBM Plex Mono', 'Menlo', monospace;       // annotations, prompts

$text-xs:   12px;
$text-sm:   14px;
$text-base: 16px;
$text-md:   18px;
$text-lg:   22px;
$text-xl:   28px;
$text-2xl:  36px;
$text-3xl:  48px;
$text-4xl:  64px;

$weight-normal: 400;
$weight-medium: 500;
$weight-bold:   700;
$weight-black:  900;

$leading-tight: 1.25;
$leading-body:  1.6;
$leading-loose: 1.8;

// ── SPACING (8-pt scale) ───────────────────────────────────────────
$space-1: 4px;
$space-2: 8px;
$space-3: 12px;
$space-4: 16px;
$space-5: 24px;
$space-6: 32px;
$space-7: 48px;
$space-8: 64px;
$space-9: 96px;
$space-10: 128px;

// ── RADIUS ─────────────────────────────────────────────────────────
$radius-sm:   4px;
$radius-md:   8px;
$radius-lg:   16px;
$radius-xl:   24px;
$radius-full: 999px;

// ── BORDERS ────────────────────────────────────────────────────────
$border-thin:  1px solid #{$blueprint-light};
$border-paper: 1px solid #{$paper-line};
$border-dash:  1px dashed #{$blueprint-light};

// ── SHADOWS ────────────────────────────────────────────────────────
// Soft, paper-like — like a sheet resting on a drafting table
$shadow-paper:  0 1px 2px rgba(15, 61, 92, 0.06), 0 4px 12px rgba(15, 61, 92, 0.04);
$shadow-lift:   0 4px 8px rgba(15, 61, 92, 0.08), 0 12px 32px rgba(15, 61, 92, 0.08);
$shadow-marker: 0 2px 0 #{$marker-dark}; // for "stamped" buttons

// ── LAYOUT ─────────────────────────────────────────────────────────
$container-max: 1100px;
$container-pad: $space-5;

// ── BREAKPOINTS ────────────────────────────────────────────────────
$bp-sm: 640px;
$bp-md: 768px;
$bp-lg: 1024px;
$bp-xl: 1280px;

// ── MOTION ─────────────────────────────────────────────────────────
$ease-out: cubic-bezier(0.2, 0.8, 0.2, 1);
$ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
$dur-fast: 150ms;
$dur-med: 300ms;
$dur-slow: 600ms;

// ── Z-INDEX ────────────────────────────────────────────────────────
$z-nav: 100;
$z-overlay: 200;
$z-modal: 300;
'@

W 'src/sections/04-break/index.module.scss' @'
// Gate hint shown when the topic form isn't complete — sits just
// above the SectionShell's prev/next nav.
.gate {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: $space-3;
  padding: $space-3 $space-4;
  background: $marker-pale;
  border: 1.5px solid $marker;
  border-radius: $radius-md;
  color: $marker-dark;
  margin-top: $space-3;
}

.gateIcon {
  @include flex-center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: $marker;
  color: $white;
  font-size: 18px;
  flex-shrink: 0;
}

.gateText {
  font-size: $text-sm;
  line-height: $leading-loose;

  strong {
    color: $marker-dark;
    font-weight: $weight-bold;
  }
}
'@

W 'src/sections/03-reverse/StageCard.module.scss' @'
.card {
  @include paper-surface;
  padding: $space-4 $space-5;
  border-top: 4px solid $blueprint;
  @include flex-col;
  gap: $space-4;
}

.cardFirst {
  border-top: 4px solid $marker;
  box-shadow: $shadow-lift;
}

.cardLast { border-top: 4px solid $amber; }

// ── HEADER ─────────────────────────────────────────────────────
.head {
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  align-items: center;
  gap: $space-3;
  padding-bottom: $space-3;
  border-bottom: $border-dash;
}

.planBadge {
  font-family: $font-mono;
  font-size: 11px;
  font-weight: $weight-medium;
  letter-spacing: 0.06em;
  background: $blueprint-pale;
  color: $blueprint-dark;
  padding: 3px $space-2;
  border-radius: $radius-sm;
}

.cardFirst .planBadge { background: $marker; color: $white; }
.cardLast .planBadge  { background: $amber; color: $amber-dark; }

.symbol { font-size: 24px; line-height: 1; }

.title {
  font-family: $font-display;
  font-weight: $weight-bold;
  font-size: $text-md;
  color: $blueprint-dark;
}

.titleEn {
  font-family: $font-mono;
  font-size: $text-sm;
  font-weight: $weight-normal;
  color: $ink-mute;
  margin-inline-start: $space-1;
}

.deliveryNote {
  font-family: $font-mono;
  font-size: 11px;
  color: $ink-mute;
  font-weight: $weight-medium;
  white-space: nowrap;
}

// ── BLOCK ──────────────────────────────────────────────────────
.block { @include flex-col; gap: $space-2; }

.blockHead {
  @include flex-between;
  gap: $space-2;
  flex-wrap: wrap;
}

.blockLabel {
  font-family: $font-mono;
  font-size: 10px;
  font-weight: $weight-medium;
  letter-spacing: 0.12em;
  color: $blueprint;
  text-transform: uppercase;
}

.blockLabelOut { color: $amber-dark; }

.blockMeta {
  font-family: $font-mono;
  font-size: 11px;
  color: $ink-mute;
  font-style: italic;
}

// ── PROMPT ─────────────────────────────────────────────────────
.prompt {
  background: $paper-warm;
  border-right: 3px solid $blueprint-light;
  border-radius: $radius-sm;
  padding: $space-3 $space-4;
  margin: 0;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: $space-2 $space-3;
}

.promptRow { display: contents; }

.promptKey {
  font-family: $font-mono;
  font-size: 11px;
  font-weight: $weight-medium;
  color: $blueprint-dark;
  letter-spacing: 0.04em;
  align-self: start;
  padding-top: 2px;
}

.promptVal {
  margin: 0;
  font-size: $text-sm;
  line-height: $leading-body;
  color: $ink;
}

// ── OUTPUT — body bullets (non-evaluate stages) ────────────────
.output {
  list-style: none;
  background: $amber-pale;
  border-right: 3px solid $amber;
  border-radius: $radius-sm;
  padding: $space-3 $space-4;
  margin: 0;
  @include flex-col;
  gap: 4px;

  li {
    font-size: $text-sm;
    line-height: $leading-body;
    color: $ink;
    font-family: $font-body;
  }
}

// ═════════════════════════════════════════════════════════════════
// RUBRIC TABLE
// ═════════════════════════════════════════════════════════════════
.rubricWrap {
  margin: 0;
  background: $white;
  border: 1px solid $blueprint-pale;
  border-radius: $radius-sm;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.rubric {
  width: 100%;
  border-collapse: collapse;
  font-family: $font-body;
  font-size: $text-xs;
  table-layout: fixed;

  th, td {
    padding: $space-2 $space-3;
    text-align: start;
    vertical-align: top;
    border: 1px solid $paper-line;
    line-height: 1.45;
  }
}

// Header row
.rubricCorner {
  background: $blueprint-dark;
  color: $white;
  font-family: $font-display;
  font-size: $text-sm;
  font-weight: $weight-bold;
  width: 28%;
  letter-spacing: -0.01em;
}

.rubricLevel {
  background: $blueprint;
  color: $white;
  text-align: center !important;
  width: 24%;

  display: table-cell;
}

.rubricLevelLabel {
  display: block;
  font-family: $font-display;
  font-size: $text-sm;
  font-weight: $weight-bold;
}

.rubricLevelPts {
  display: block;
  font-family: $font-mono;
  font-size: 10px;
  font-weight: $weight-medium;
  opacity: 0.85;
  letter-spacing: 0.04em;
  margin-top: 1px;
}

// Body rows
.rubricCriterion {
  background: $paper-warm;
  font-family: $font-display;
  font-weight: $weight-bold;
  color: $blueprint-dark;
  font-size: $text-sm;
}

.rubricCell {
  color: $ink;
  font-size: $text-xs;
}

// Alternate row tint for readability — applied to the cell column only.
// (The criterion column keeps its $paper-warm bg unchanged.)
.rubric tbody tr:nth-child(even) {
  .rubricCell { background: rgba($blueprint-pale, 0.25); }
}

// Footer
.rubricTotal {
  background: $blueprint-pale;
  color: $blueprint-dark;
  font-family: $font-mono;
  font-size: 11px;
  font-weight: $weight-bold;
  text-align: end !important;
  letter-spacing: 0.06em;
}

// ═════════════════════════════════════════════════════════════════
// SAMPLE QUESTIONS (evaluate stage)
// ═════════════════════════════════════════════════════════════════
.questions {
  @include flex-col;
  gap: $space-2;
  margin-top: $space-2;
  padding: $space-3 $space-4;
  background: $amber-pale;
  border-right: 3px solid $amber;
  border-radius: $radius-sm;
}

.questionsLabel {
  font-family: $font-mono;
  font-size: 10px;
  font-weight: $weight-medium;
  letter-spacing: 0.12em;
  color: $amber-dark;
  text-transform: uppercase;
}

.questionList {
  list-style: none;
  margin: 0;
  padding: 0;
  @include flex-col;
  gap: $space-2;
}

.questionItem {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: $space-2;
  align-items: baseline;
  font-size: $text-sm;
  line-height: $leading-body;
  color: $ink;
}

.qBadge {
  font-family: $font-mono;
  font-size: 10px;
  font-weight: $weight-bold;
  letter-spacing: 0.06em;
  padding: 2px $space-2;
  border-radius: $radius-sm;
  align-self: start;
  white-space: nowrap;
}

.qBadge-LOTS {
  background: $blueprint-pale;
  color: $blueprint-dark;
}

.qBadge-HOTS {
  background: $marker;
  color: $white;
}

.qText {
  unicode-bidi: plaintext;  // let each question render in its natural direction
}
'@

W 'vite.config.ts' @'
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

// Base './' makes this work at any URL path — important since the BinAI portal
// embeds this app via iframe and the deployed Cloudflare Pages URL can vary.
export default defineConfig({
  plugins: [react()],
  base: './',
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Use Sass's modern API (the legacy one is deprecated in Sass 2.0).
        api: 'modern',
        // Auto-inject design tokens + mixins into every .scss file
        additionalData: `@use "@/styles/_tokens.scss" as *; @use "@/styles/_mixins.scss" as *;`,
      },
    },
  },
});
'@

Write-Host ""
Write-Host "Done. Stop the dev server (Ctrl+C) and run 'npm run dev' again" -ForegroundColor Cyan
Write-Host "so the Vite config reload picks up the modern Sass API." -ForegroundColor Cyan
