<div align="center">
  <br />
  <img src="public/ACM_White_Logo_transparent_text.webp" alt="ACM GGSIPU EDC Logo" width="360" />
  <br />
  
  # GGSIPU EDC ACM Student Chapter Website

  The official web platform for the **GGSIPU East Delhi Campus ACM Student Chapter**.

  [![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.0-F107A3?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)
  [![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

  **Live Site:** [usar.acm.org](https://usar.acm.org)
</div>

---

## Overview

This platform serves as a central hub for the **GGSIPU East Delhi Campus ACM Student Chapter**, showcasing events, technical blogs, collaborative projects, and team directories. Built with next-generation aesthetics (dark-themed glassmorphism), fluid animations, and mobile responsiveness.

### 🌐 IIC-AIR 2027 Conference Website

The repository also hosts the official conference website for the **1st Indraprastha International Conference on Artificial Intelligence, IoT & Robotics (IIC-AIR 2027)**, organized by the GGSIPU EDC ACM Student Chapter at USAR.

- **Conference Site Live URL:** [usar.acm.org/iic-air/](https://usar.acm.org/iic-air/)
- **Sub-Project Location:** `/acm-icps`
- **Sub-Project Tech Stack:** Next.js 16 (App Router, Static Exporting, custom IBM Design Language system)

---

## Key Features

- **Immersive Parallax & 3D Elements**: Built with Framer Motion and Three.js (React Three Fiber) for responsive, interactive layouts.
- **Events Dashboard**: Chronological timeline of upcoming, ongoing, and past events with rich modal descriptions.
- **Tech Blogs**: Fast and beautiful blog reading experience with curated articles on emerging tech.
- **Team Showcase**: Displays members behind the chapter, including faculty sponsors, office bearers, and captains.
- **Projects Gallery**: Exhibits projects built by chapter members with full technical specs and links.
- **High Performance**: Built with static HTML exporting for sub-second load times and peak search engine indexing (SEO).
- **Glassmorphic Dark UI**: High-end futuristic aesthetic with clean layouts, typography, and hover micro-animations.

---

## Tech Stack

| Component | Technology Used |
| :--- | :--- |
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router & Static Exporting) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) (Strict Type Safety) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) (Smooth transitions & scroll-linked effects) |
| **3D Graphics** | [Three.js](https://threejs.org/) / [React Three Fiber](https://r3f.docs.pmnd.rs/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Deployment** | cPanel / Static File Hosting |

---

## Directory Structure

```
acm-website/
├── acm-icps/               # IIC-AIR 2027 Conference website sub-project (Next.js)
│   ├── app/                # Conference pages (Hero, Venue, Speakers, Committee, tracks, etc.)
│   ├── components/         # Modular layout, section and shared components
│   ├── content/            # JSON data files (speakers.json, committee.json, etc.)
│   └── [README.md](acm-icps/README.md)     # Conference sub-project documentation
├── public/                 # Static assets (images, logos, fonts, PDFs)
│   ├── home/               # Landing page images (optimized WebP format)
│   ├── team/               # Team member avatars (optimized WebP format)
│   └── fonts/              # Custom brand typography (Montserrat, Bebas Neue)
├── src/
│   ├── app/                # Next.js App Router pages, layout, and global styling
│   ├── components/         # Reusable modular UI components
│   │   ├── about/          # About section sub-components
│   │   ├── blogs/          # Blogs list and reading view components
│   │   ├── events/         # Events display and timeline components
│   │   ├── home/           # Landing page hero, gallery, and awards components
│   │   ├── projects/       # Projects gallery components
│   │   ├── teams/          # Office bearers & domain captains directory
│   │   ├── tesseract/      # Interactive 3D graphics canvas
│   │   └── Marquee.tsx     # Generic parallax-scrolling text marquee (abstracted)
│   ├── data/               # Static dataset source files (blogs, teams, events data)
│   └── lib/                # Shared utilities and helper functions
├── scripts/                # Utility scripts (e.g. image & asset optimizer)
│   └── optimize-images.mjs # Automated utility to convert and shrink assets to WebP
├── next.config.ts          # Next.js export & compilation configs
├── tsconfig.json           # TypeScript configuration
└── package.json            # NPM dependencies & task runners
```

---

## Quick Start

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18.0.0 or higher recommended) along with `npm` or `yarn`.

### 1. Clone & Navigate
```bash
git clone https://github.com/Arsh199965/ACM-Website.git
cd ACM-Website
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Servers

To run the main website development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

To run the IIC-AIR conference website development server:
```bash
npm run dev --prefix acm-icps
```
Open [http://localhost:3001/iic-air/](http://localhost:3001/iic-air/) in your browser.

---

## Media & Performance Optimization

To maintain sub-second loading speeds, all newly added images must be optimized and converted to WebP before being deployed.

An automated optimization utility is included under `scripts/optimize-images.mjs`. It scans the public folder, downscales oversized images, converts PNG/JPG to WebP, and outputs lightened assets.

To run the optimization utility:
```bash
node scripts/optimize-images.mjs
```

---

## Build & Deployment

To compile both the main website and the IIC-AIR conference website into a unified production-ready folder (saved under the root `/out` folder):

```bash
npm run build
```

This build script executes the following sequence:
1. Builds the main website pages into `/out`.
2. Builds the conference sub-project (`/acm-icps`) with its configured basePath (`/iic-air`) into `/acm-icps/out`.
3. Copies the conference static site files into the main output folder at `/out/iic-air`.

This consolidated directory (`out/`) is standalone and can be directly uploaded to cPanel, Netlify, Vercel, or any other static file server.

---

## Contributing

We welcome contributions! To contribute:

1. **Fork** the repository.
2. Create a new branch: `git checkout -b feature/amazing-feature`.
3. Make and **commit** your changes: `git commit -m 'Add amazing new feature'`.
4. **Push** your branch: `git push origin feature/amazing-feature`.
5. Open a **Pull Request** detailing your changes.

---

## License

Distributed under the MIT License. See `LICENSE` for more details.
