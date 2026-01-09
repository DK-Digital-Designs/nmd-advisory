# NMD Advisory — Website Demo (Vite + Handlebars)

This repository contains a **demo/preview website** for **NMD Advisory**, showcasing a professional services landing experience with clear calls-to-action, service sections, and placeholder integrations.

## Who NMD Advisory are (based only on provided content)

NMD Advisory provides professional advisory services across:

* **Accounting**
* **Tax**
* **IT**
* **Business Solutions**

The site messaging emphasises a **professional, efficient, reliable** approach, with a **POPIA-conscious** posture and clear deliverables. The demo includes scheduling and enquiry flows intended to be wired up during implementation.

## What this repo contains

* Multi-page site: `index.html`, `services.html`, `booking.html`, `testimonials.html`, `contact.html`
* A **staff/admin** area (dashboard UI) under `admin/` (demo UI)
* Shared layout via **Handlebars partials** (e.g., header/footer)
* Static assets (images, icons) under `public/assets/`
* Styling organised under `src/styles/`

> Note: Forms, WhatsApp, and calendar integrations are placeholders in this demo.

## Tech stack

* **Vite**
* **vite-plugin-handlebars** (partials/templates)
* Plain HTML/CSS/JS (no framework assumed)

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## GitHub Pages deployment notes

This repo is intended to be deployable to GitHub Pages. Ensure `vite.config.js` has a `base` value that matches the repo name for production builds, and rebuild/redeploy after changes.

## Structure (high level)

* `src/` — site source pages and partials
* `src/partials/` — shared header/footer templates
* `src/styles/` — CSS modules (components/layout/etc.)
* `public/` — static assets served at runtime
* `dist/` — build output (generated)

## License

No license specified yet.
