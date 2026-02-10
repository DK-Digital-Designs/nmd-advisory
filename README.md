# NMD Advisory — Lead-Generation Website

A production-ready, lead-generation website for NMD Advisory, providing professional Accounting, Tax, IT, and Business Solutions to small businesses.

## 🚀 Overview

This is a multi-page website built with a **mobile-first** approach, comprehensive **SEO optimization**, and **WCAG AA accessibility** compliance. The site is designed to generate leads through clear calls-to-action focused on email communication and custom quotes.

## 📦 Technology Stack

- **Build Tool:** [Vite](https://vitejs.dev/) v7.3.0
- **Templating:** [Vite Handlebars Plugin](https://www.npmjs.com/package/vite-plugin-handlebars)
- **Styling:** Vanilla CSS (no frameworks) with CSS custom properties
- **JavaScript:** Vanilla ES6+ modules
- **Deployment:** Optimized for [Vercel](https://vercel.com/)

### Why This Stack?

- **Vite**: Lightning-fast development server and optimized production builds
- **Vanilla CSS**: Full control, no bloat, easy to maintain and customize
- **No Framework Dependencies**: Minimal bundle size, maximum performance
- **Handlebars**: Reusable components (header/footer) without React overhead

## 📁 Project Structure

```
nmd-advisory/
├── public/                      # Static assets
│   ├── assets/
│   │   └── images/             # Logo and images
│   ├── robots.txt              # Search engine directives
│   └── sitemap.xml             # XML sitemap for SEO
├── src/                         # Source files
│   ├── assets/
│   │   ├── css/                # Stylesheets
│   │   │   ├── styles.css      # Main stylesheet (imports all modules)
│   │   │   ├── variables.css   # CSS custom properties (design tokens)
│   │   │   ├── reset.css       # Modern CSS reset
│   │   │   ├── typography.css  # Typography system
│   │   │   ├── layout.css      # Layout patterns and grid
│   │   │   └── components.css  # Reusable UI components
│   │   └── js/
│   │       └── main.js         # JavaScript modules (navigation, forms)
│   ├── partials/                # Handlebars partials
│   │   ├── header.hbs          # Site header with navigation
│   │   └── footer.hbs          # Site footer with sitemap
│   ├── index.html              # Homepage
│   ├── services.html           # Services page
│   ├── about.html              # About page
│   ├── contact.html            # Contact form page
│   ├── privacy.html            # Privacy policy
│   ├── terms.html              # Terms and conditions
│   └── cookies.html            # Cookie policy
├── package.json                # Dependencies and scripts
├── vite.config.js              # Vite configuration
└── README.md                   # This file
```

## 🎨 Design System

### Color Palette

**Primary (Navy):** Professional, trustworthy, corporate
- Used for headings, primary buttons, and dark backgrounds
- Variables: `--navy-950` through `--navy-50`

**Accent (Gold):** Premium, value, quality
- Used for CTAs, highlights, and accents
- Variables: `--gold-900` through `--gold-100`

**Neutrals (Gray):** Balanced, readable
- Used for body text, borders, and backgrounds
- Variables: `--gray-900` through `--gray-50`

All colors are defined as CSS custom properties in `src/assets/css/variables.css` for easy theming.

### Typography

- **Headings:** [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) (serif) — Elegant, distinctive
- **Body Text:** [Inter](https://fonts.google.com/specimen/Inter) (sans-serif) — Readable, modern
- **Scale:** Responsive type scale from 12px to 72px with mobile-first adjustments

### Layout Philosophy

- **Mobile-First:** All layouts start at 320px and scale up
- **CSS Grid:** Used for page-level layouts
- **Flexbox:** Used for component-level layouts
- **Responsive Breakpoints:**
  - `sm`: 640px
  - `md`: 768px
  - `lg`: 1024px
  - `xl`: 1280px

## 🔍 SEO Implementation

### Technical SEO

- **Sitemap:** `/public/sitemap.xml` with all 7 pages prioritized
- **Robots.txt:** `/public/robots.txt` allowing all crawlers
- **Canonical URLs:** Each page has a canonical link tag
- **Semantic HTML:** Proper heading hierarchy (H1-H6), `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`

### Metadata

Every page includes:
- Unique `<title>` tag (50-60 characters)
- Unique `<meta name="description">` (150-160 characters)
- OpenGraph tags (`og:title`, `og:description`, `og:image`, `og:url`)
- Twitter Card tags (`twitter:card`, `twitter:title`, `twitter:description`)
- Keywords meta tag for legacy support

### Internal Linking

- Footer sitemap links to all major pages
- Service cards link to relevant service sections
- Clear CTA buttons throughout directing to contact page
- Breadcrumb-style navigation in hero sections

## ♿ Accessibility (WCAG AA Compliance)

### Keyboard Navigation

- All interactive elements are keyboard accessible
- Visible focus states with high-contrast outlines
- Skip-to-content link for screen reader users
- Logical tab order throughout

### Semantic HTML

- Proper heading hierarchy (single H1 per page)
- ARIA labels where appropriate (`aria-label`, `aria-expanded`, `aria-current`)
- Form labels explicitly associated with inputs
- `role` attributes for landmarks

### Form Accessibility

- All form fields have visible `<label>` elements
- Required fields marked with asterisk and `aria-required="true"`
- Error messages with `role="alert"` and `aria-live="polite"`
- Clear focus states and validation feedback

### Visual Accessibility

- Minimum 4.5:1 contrast ratio for body text
- Minimum 3:1 contrast ratio for large text and UI components
- Respects `prefers-reduced-motion` for animations

## 📄 Pages

### Core Pages

1. **Homepage (`index.html`)**: Hero section, service overview, testimonials, clear CTAs
2. **Services (`services.html`)**: Detailed service breakdowns for Accounting, Tax, IT, and Business Solutions
3. **About (`about.html`)**: Company mission, values, team information
4. **Contact (`contact.html`)**: Enquiry form with validation, response time expectations

### Legal Pages

5. **Privacy Policy (`privacy.html`)**: POPIA-compliant data handling practices
6. **Terms & Conditions (`terms.html`)**: Service terms, liability, professional standards
7. **Cookie Policy (`cookies.html`)**: Cookie usage, third-party tracking, user controls

## 🎯 Lead Generation Strategy

### Primary Conversion Goal

**Email Communication** → Custom quotes tailored to business needs

### CTAs Throughout Site

- "Contact Us for a Quote" (primary CTA)
- "Send an Enquiry" (secondary CTA)
- "Request a Custom Quote" (service-specific)
- Consistent 24–48 hour response time messaging

### Form Design

- Clear labels and helpful placeholder text
- Privacy consent checkbox linked to policy
- Accessible error validation
- Professional tone and transparency

## 🛠️ Development

### Prerequisites

- [Node.js](https://nodejs.org/) v18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/DK-Digital-Designs/nmd-advisory.git

# Navigate to project directory
cd nmd-advisory

# Install dependencies
npm install
```

### Development Server

```bash
npm run dev
```

Starts the Vite development server at `http://localhost:5173` with hot module replacement.

### Production Build

```bash
npm run build
```

Builds optimized production files to `/dist` directory.

### Preview Production Build

```bash
npm run preview
```

Serves the production build locally for testing.

## 🚀 Deployment to Vercel

### Option 1: Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Deploy
vercel
```

### Option 2: GitHub Integration

1. Push code to GitHub repository
2. Import repository in [Vercel Dashboard](https://vercel.com/dashboard)
3. Vercel will auto-detect Vite configuration
4. Click "Deploy"

### Deployment Configuration

Vercel automatically detects the Vite build settings:

- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

No additional configuration required.

## 📝 Content Philosophy

### No Lorem Ipsum

All content is **production-ready placeholder text** that:
- Sounds professional and realistic
- Reflects the actual service offerings
- Uses confident, helpful tone
- Can be refined but not replaced entirely

### Professional Tone

- **Confident:** Expertise without arrogance
- **Helpful:** Guidance-focused, not sales-heavy
- **Transparent:** Clear pricing expectations, no hidden fees
- **Corporate:** Trustworthy business language

## 🧪 Testing Checklist

### Before Deployment

- [ ] Run `npm run build` successfully
- [ ] Test all pages in mobile (375px), tablet (768px), desktop (1200px)
- [ ] Keyboard navigate through entire site
- [ ] Validate HTML with [W3C Validator](https://validator.w3.org/)
- [ ] Check contrast ratios with [WebAIM](https://webaim.org/resources/contrastchecker/)
- [ ] Test forms (required fields, email validation, error states)
- [ ] Verify all links work (internal and external)
- [ ] Check OpenGraph preview with [OpenGraph.xyz](https://www.opengraph.xyz/)
- [ ] Test in multiple browsers (Chrome, Firefox, Safari, Edge)

## 🤝 Contributing

This is a production website. For changes:

1. Create a feature branch
2. Make changes with clear commit messages
3. Test thoroughly (mobile, desktop, accessibility)
4. Submit pull request with description

## 📄 License

ISC License — See `package.json` for details.

## 📧 Contact

For questions or support:

- **Website:** [nmd-advisory.com](https://nmd-advisory.com)
- **Email:** info@nmd-advisory.com
- **Repository:** [GitHub](https://github.com/DK-Digital-Designs/nmd-advisory)

---

**Built with care by a junior developer. Reviewed by senior developers. Production-ready and accessible.**
