# Manish Kumar — Data Science Portfolio

A React + Three.js portfolio with a live, reactive background: a neural-network
core (nodes + synapse lines + traveling data pulses), orbiting planets that
represent each project, and a particle field that swirls around your cursor.
The camera dives through the scene as you scroll.

## Stack

- **React 19** + **Vite** — app shell, fast dev server
- **@react-three/fiber** + **three.js** — the 3D background scene
- **framer-motion** — scroll-triggered reveal animations on every section

## Getting started

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview   # serve the production build locally to double check it
```

The build output lands in `dist/` — that folder is what you deploy.

## Project structure

```
src/
  data/content.js          ← all your text content (name, projects, skills, etc.)
                              edit this file to update what's shown — no need
                              to touch components for content changes.
  components/
    SceneBackground.jsx     ← the Three.js scene (neural core, planets, particles)
    Nav.jsx
    Hero.jsx
    About.jsx
    Skills.jsx
    Projects.jsx
    Journey.jsx             ← education + certifications
    Contact.jsx
    Reveal.jsx              ← reusable scroll-reveal wrapper (framer-motion)
  App.jsx                   ← wires it all together, tracks scroll % and mouse
                              position in refs and feeds them to the 3D scene
  App.css                   ← all component styling
  index.css                 ← global resets, fonts, canvas positioning
```

## Things you'll likely want to tweak

1. **Project GitHub links** — in `src/data/content.js`, each project's `link`
   currently points at your GitHub profile. Replace with the actual repo URLs.
2. **Colors** — CSS variables at the top of `src/index.css` (`--ion`, `--plasma`,
   `--ember`) control the whole palette, including the 3D scene's colors.
3. **3D scene intensity** — in `SceneBackground.jsx`:
   - `NODE_COUNT` / `RADIUS` in `NeuralCore` — size of the neural sphere
   - `radii` array in `OrbitPlanets` — how far out each project-planet orbits
   - `COUNT` in `ReactiveField` — how many particles react to your mouse
   - In `CameraRig`, the `camZ`/`camY`/`camX` formulas control how dramatically
     the camera moves on scroll — increase the multipliers for a bigger effect.

## Deploying

Easiest free option: **Vercel** or **Netlify** — connect your GitHub repo,
both auto-detect Vite and deploy on every push. Alternatively, `npm run build`
and drop the `dist/` folder anywhere static (GitHub Pages, Cloudflare Pages, etc).
