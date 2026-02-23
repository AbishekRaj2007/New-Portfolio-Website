## Packages
framer-motion | Essential for the premium, smooth animations, scroll reveals, and cursor glow
react-countup | For the animated stats counter in the hero/about section
react-hook-form | For robust contact form handling
@hookform/resolvers | For Zod validation integration with react-hook-form
clsx | For conditional class name joining
tailwind-merge | For merging tailwind classes safely

## Notes
- The app uses a single-page scrolling architecture typical of modern landing pages.
- Tailwind config should ideally have `fontFamily: { display: ['Poppins'], sans: ['Inter'] }`. I have mapped these via CSS variables in `index.css`.
- The neon green theme uses HSL `111 100% 54%` as the primary accent color.
- API endpoints are assumed to be available at `/api/projects`, `/api/experiences`, `/api/achievements`, and `/api/messages`.
