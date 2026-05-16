# M03 · הספויילר הפדגוגי

**מודול 3 בהשתלמות BinAI** — תכנון שיעורים עם AI לאחור (5E Backwards).

המודול עצמאי: Vite + React + TypeScript + SCSS. נפרס לכתובת משלו ב-Cloudflare Pages, ומשובץ ב-BinAI portal דרך iframe (אותה ארכיטקטורה כמו M02).

---

## הפעלה מקומית

```bash
npm install
npm run dev
```

נפתח ב-`http://localhost:5173`.

## בנייה לפרודקשן

```bash
npm run build      # outputs to /dist
npm run preview    # serve /dist locally
```

---

## ארכיטקטורה

```
src/
├── styles/
│   ├── _tokens.scss      ← הפלטה הכחולה (blueprint), טיפוגרפיה, ספייסינג
│   ├── _mixins.scss      ← respond-to, container, blueprint-grid, paper-surface
│   └── global.scss       ← reset + RTL + טיפוגרפיה
├── types/
│   ├── module.types.ts   ← SectionId, StageMeta, ModuleProgress
│   └── lesson.types.ts   ← LessonPlan, StagePrompt, SampleLessonPack
├── data/
│   ├── sections.ts       ← 8 חלקים, 5 שלבי 5E, סדר תכנון הפוך
│   └── samples.ts        ← 3 דוגמאות (יסודי / חט״ב / בגרות) — סקלטון
├── hooks/
│   └── useModuleProgress.ts   ← localStorage progress (אחרי שדה Firebase)
├── components/
│   ├── ModuleShell/      ← כריכה: ProgressBar + NavBar + Outlet + Context
│   ├── SectionShell/     ← כותרת + תוכן + ניווט הבא/קודם לכל חלק
│   ├── NavBar/           ← 8 נקודות עם states (locked / visited / done / active)
│   ├── ProgressBar/      ← פס התקדמות עליון
│   └── Placeholder/      ← stand-in זמני עד שיוחלף בתוכן אמיתי
├── router/
│   └── ModuleRouter.tsx  ← Hash routing (iframe-safe)
├── App.tsx
└── main.tsx
```

---

## כיווני הבנייה (Phases)

| שלב | מה | סטטוס |
|---|---|---|
| 1 | סקפולד · tokens · shell · navigation · progress · sample skeleton | ✅ |
| 2 | סקשנים 1-2: פתיחה + תיאוריה (5E לאחור, station cards, חץ RTL) | ⏳ |
| 3 | סקשנים 3, 5: הנדסה הפוכה + תרגול | ⏳ |
| 4 | סקשנים 6, 7, 8: שיתוף + מבחן + ייצוא PDF + סיכום | ⏳ |
| 5 | תוכן פדגוגי מלא לשלוש הדוגמאות (5 פרומפטים × 3 = 15) | ⏳ |

---

## עיצוב — Blueprint

- **כחול אדריכל** `#1A4A7A` (ראשי), `#0F3D5C` (כותרות חזקות)
- **ענבר אנוטציה** `#E8A33A` — להבלטות, "כתב יד" על המפה
- **טוש אדום** `#C44536` — שמור לחץ הימינה-שמאלה של כיוון תכנון
- **נייר** `#FAF7F0` — רקע
- **גריד שקוף** — טקסטורת רקע כמו נייר תכנון

### Fonts

- **Frank Ruhl Libre** — display (כותרות), serif אדריכלי
- **Assistant** — body
- **IBM Plex Mono** — אנוטציות וקטעי פרומפט

---

## החלפת חלק זמני בתוכן אמיתי

ב-`router/ModuleRouter.tsx`, מחליפים:

```tsx
{ path: 'opening', element: <Placeholder id="opening" /> },
```

ב:

```tsx
import OpeningSection from '@/sections/01-opening';
{ path: 'opening', element: <OpeningSection /> },
```

כל חלק חייב לעטוף את עצמו ב-`<SectionShell id="...">` כדי לקבל את הכותרת, הניווט וה-tracking.

---

## פריסה ל-Cloudflare Pages

1. `npm run build`
2. דחיפת `dist/` ל-Pages (או חיבור ל-GitHub)
3. שם הפרויקט המוצע: `m03-pedagogical-spoiler` → URL: `m03-pedagogical-spoiler.pages.dev`
4. ב-BinAI portal: עדכון iframe src לכתובת זו
