/// <reference types="vite/client" />

// ── CSS Modules ───────────────────────────────────────
// Tells TypeScript that .module.scss/.module.css files
// export a record of class names. Fixes all ts(2307) errors.
declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

// ── Image assets ──────────────────────────────────────
// Tells TypeScript that PNG/JPG/SVG imports return a URL string.
declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}
