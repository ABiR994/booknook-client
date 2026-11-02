# Project notes

- Next.js App Router with TypeScript. Source lives in `src/`; the `@/*` alias points to `src/*`.
- UI components come from shadcn/ui (`npx shadcn add <component>`) and are saved in `src/components/ui`.
- Route titles use the template `BookNook | <page>` set in `src/app/layout.tsx`; every page exports its own `metadata.title`.
- Never add placeholder Latin text and never use `alert()`; show feedback with toasts.
