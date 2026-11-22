# Kaviya S — Portfolio

Personal portfolio of Kaviya S, Full Stack Developer (Chennai, India), built with React, Vite and TypeScript.

```bash
npm install
npm run dev      # local development
npm test         # unit and contract tests
npm run build    # production build in dist/ (also writes dist/404.html for static hosting)
```

- Content lives in `src/data/` (hero stats, services, projects, stack, about, skills, links, legal).
- The site is English only.
- Resume: the Resume buttons in the navbar, hero and About section open the Google Drive link in `src/data/links/links.ts` (`resume.href`) in a new tab. Keep the file shared as "Anyone with the link can view".
- Contact form (optional): copy `.env.example` to `.env` and set `VITE_WEB3FORMS_ACCESS_KEY` with your own key from web3forms.com. Without a key the form is hidden and visitors use the email, phone and WhatsApp details instead.
- Project covers live in `public/projects/` (keep the same file names when replacing them with real screenshots).
- Hero stats script: `npm run stats:update` (needs `GH_PROFILE_TOKEN`) refreshes `src/data/hero/githubStats.ts` for the `kaviya-ux` GitHub account.
