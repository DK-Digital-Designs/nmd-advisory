# Rebuild Prompt: Professional Service Template (Vite + Supabase)

Act as an expert web developer and DevOps engineer. Your goal is to initialize a professional Multi-Page Application (MPA) template designed for lead generation and consulting services.

## Architecture Prerequisites
- **Framework**: Vite with `vite-plugin-handlebars` for MPA modularity.
- **Backend**: Supabase for Auth, Database, and Edge Functions.
- **Hosting**: GitHub Pages compatible (base path handling).

## Folder Layout
Initialize the following structure:
```text
/src
  /admin        # Guarded admin panel
  /assets       # css/, js/, images/
  /lib          # supabase.js initialization
  /partials     # header.html, footer.html
  index.html, services.html, booking.html, contact.html
/supabase
  /functions    # serverless logic
  schema.sql    # table definitions
package.json, vite.config.js
```

## Step-by-Step Implementation

### 1. Project Initialization
- Create `package.json` with `vite`, `vite-plugin-handlebars`, and `@supabase/supabase-js`.
- Configure `vite.config.js` to handle multiple entry points (main, admin, booking, etc.) and conditional base paths for GitHub Pages.

### 2. Frontend Foundation
- Create a global CSS design system with variables for branding (primary, secondary, gold).
- Implement standard Handlebars partials for navigation and footer.
- Build responsive layouts for a landing page, services page, and booking/contact forms.

### 3. Backend Integration
- Setup `lib/supabase.js` to read environment variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).
- Create a Database schema for `enquiries` and `bookings`.
- Implement client-side JS handlers to submit form data to Supabase.

### 4. Edge Functions & Notifications
- Create a Supabase Edge Function `send-notification` using Deno.
- Use the Resend API to send emails when new records are inserted into the database.
- Configure Database Triggers in SQL to invoke the Edge Function.

### 5. Admin Dashboard
- Create `src/admin/index.html` as a protected view for managing leads.
- Implement basic Auth logic to restrict access to authenticated staff members.

## Definition of Done
- `npm run build` succeeds and produces a clean `dist/` folder.
- Form submissions correctly insert data into Supabase.
- Database triggers successfully fire Edge Functions.
- The UI is fully responsive and adheres to the professional design system.

---
**Placeholders for Customization:**
- `{{PROJECT_NAME}}`: e.g., NMD Advisory
- `{{BRAND_COLOR}}`: e.g., #0b1b3a
- `{{NOTIFICATION_EMAIL}}`: e.g., notifications@domain.com
- `{{WHATSAPP_NUMBER}}`: e.g., 2782...
