# Template Extraction Guide: NMD-Advisory

This document outlines how to generalize this repository into a reusable template for similar professional service lead-gen sites.

## Template Module Matrix

| Module | Status | Location | Key Interface | Parameterization |
| :--- | :--- | :--- | :--- | :--- |
| **Auth** | Partial | Supabase Auth | `supabase.auth` | Roles, Redirect URLs |
| **Database** | Complete | Supabase DB | `supabase.from('table')` | Table schemas, triggers |
| **Admin** | Complete | `/src/admin` | Dashboard UI | Access controls, metrics |
| **Email** | Ready | Edge Functions | Resend API | API Key, Sender Email |
| **Forms** | Complete | `/src/assets/js` | `FormData` handlers | Form fields, validation rules |
| **Layouts** | Complete | `/src/partials` | Handlebars Partials | Brand colors, Nav links |

## Project-Specific vs. Template-Worthy

### Project-Specific (Replace with Placeholders)
- **Branding**: Logo (`logo.svg`), Colors (`--navy`, `--gold`), Fonts.
- **Content**: Hero copy, service descriptions, testimonials.
- **Domain Nouns**: "Bookings", "Enquiries", "Advisory".
- **Integrations**: Specific WhatsApp numbers, API keys.

### Template-Worthy (Generalize)
- **Folder Structure**: The Vite + Handlebars + Supabase layout.
- **Edge Function Pattern**: The webhook-triggered email notification logic.
- **Admin Dashboard**: The layout and auth-guarding logic for managing records.
- **Build Scripts**: The gh-pages deployment automation.

## Stable Folder Structure
```text
/
├── docs/               # Documentation
├── public/             # Static assets (images, favicon)
├── src/                # Frontend source
│   ├── admin/          # Guarded admin pages
│   ├── assets/         # CSS and JS
│   ├── lib/            # Shared libraries (Supabase init)
│   ├── partials/       # Handlebars partials (Header/Footer)
│   └── *.html          # Page templates
├── supabase/           # Backend config
│   ├── functions/      # Edge functions
│   └── *.sql           # Database migrations
└── vite.config.js     # Build configuration
```

## Extension Points
1. **New Services**: Add an HTML page and update `vite.config.js` and `header.html`.
2. **Custom Workflows**: Add a new table in Supabase and create a corresponding Edge Function.
3. **Third-party Apps**: Plug in Calendly or other booking widgets by replacing the custom `booking.html` logic.
