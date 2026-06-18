# Aurora — case de produto (AI Product Challenge · Blip)

O case inteiro, conectado, como uma experiência cinematográfica e high-tech: o **deck**, o **protótipo navegável**, o **dossiê** (PRD, deep-dive, base normativa, discovery, red-team) e o **CV**.

Reconstruído como app **Next.js 16** (App Router, React 19, TypeScript, Tailwind v4) com uma camada de movimento de nível Apple: GSAP + ScrollTrigger + SplitText, Lenis (scroll suave), React Three Fiber (cena Aurora — curtain shader GLSL + núcleo holográfico) e Motion para transições.

## Stack

- **Next.js 16** · App Router · React 19 · TypeScript
- **Tailwind CSS v4** — design system CSS-first via `@theme` em `globals.css`
- **GSAP** (ScrollTrigger, SplitText) + `@gsap/react`
- **Motion** (Framer Motion) — reveals, AnimatePresence, transições de rota
- **Lenis** — scroll suave sincronizado com o ticker do GSAP
- **React Three Fiber + Three.js** — a cena Aurora (curtain shader, núcleo iridescente, starfield)
- **react-markdown + remark-gfm** — renderização do dossiê

## Design system

Tokens definidos em `src/app/globals.css` (`@theme`): superfícies near-black, acentos aurora (teal/indigo/magenta), o gradiente assinatura `--aurora`, e utilitários `.text-aurora`, `.glass`, `.ring-aurora`, `.glow`. Tipografia: **Space Grotesk** (display), **Inter** (corpo), **JetBrains Mono** (dados/labels).

## Estrutura

```
src/
  app/
    layout.tsx        # shell: fontes, metadata, cursor, scroll suave, nav, footer
    page.tsx          # home — hero 3D + manifesto + cards
    template.tsx      # transição de página (motion)
    deck/             # /deck       — visor de slides (21 slides)
    prototipo/        # /prototipo  — iframe do protótipo
    dossie/           # /dossie     — leitor de markdown com TOC fixo
    cv/               # /cv         — currículo
  components/         # Nav, Cursor, SmoothScroll, Magnetic, Reveal, home/, deck/, ...
  data/               # deck.ts (SLIDES + CV), dossier.ts (DOSSIER), types.ts
  lib/gsap.ts         # registro de plugins GSAP
public/
  prototipo.html      # o protótipo interativo, standalone (embutido via iframe)
```

O conteúdo (Português) foi preservado do site original. Para editar o **CV**, abra `src/data/deck.ts` e ajuste o objeto `CV`.

## Desenvolvimento

```bash
npm install
npm run dev      # http://localhost:3000 (Turbopack)
npm run build    # build de produção
npm start        # serve o build
```

## Deploy (Vercel)

App Next padrão — sem `output` especial. Importe o repositório em **vercel.com → Add New → Project**; o framework **Next.js** é detectado automaticamente. Cada `git push` para `main` publica.
