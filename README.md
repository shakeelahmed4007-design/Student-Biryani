# Student Biryani

A complete mobile-first React JSX + Vite + Tailwind CSS v3 ordering demo. No UI libraries or TypeScript. Realistic AI-generated food photography is bundled locally in public/food-menu.png; no third-party image URL is required. Mobile layouts use full viewport width, safe-area spacing and larger form controls. Google Fonts are optional remote fonts with local fallbacks.

## Run locally

1. Install Node.js 20.19+ (or Node.js 22.12+).
2. Extract the ZIP and open a terminal in the `student-biryani` folder.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open the address Vite prints. Use a 390 × 844 viewport for assignment screenshots.
6. Build with `npm run build`. Preview the build with `npm run preview`.

## Deploy on Vercel

1. Push this project to a Git repository.
2. Import that repository as a new Vercel project.
3. Select the Vite preset; install command `npm install`, build command `npm run build`, output directory `dist`.
4. Click Deploy. No environment variables or backend setup are required.

## Deploy on Netlify

1. Push the project to a Git repository and import it into Netlify.
2. Set build command `npm run build` and publish directory `dist`.
3. Deploy. Alternatively run `npm run build` locally and drag the `dist` folder into Netlify's manual deploy interface.

## Try the complete flow

- Splash advances in about 2.6 seconds.
- Use any valid email and password of at least 6 characters for demo login; sign-up also needs a name. Google access is a clearly labelled simulation.
- Filter categories, search, swipe Most loved and add items. Counts stay in sync everywhere.
- Open the floating bag, enter an address and Pakistani mobile number, then review quantities.
- Apply `STUDENT10` for 10% off food. Delivery is Rs. 50. Discount is rounded to the nearest rupee.
- Select COD, Card, JazzCash or Easypaisa and place a demo order. No card, wallet or payment credentials are collected.
- Track the order: it simulates On the way after 1 minute and Delivered after 2 minutes. ETA copy is illustrative.
- Reload to confirm user, city and orders are saved. Orders are separated by email within this browser. Log out to try another demo user.

## Five UX decisions

1. Navy editorial header and serif display type give the small screen a distinctive identity while keeping search immediately available.
2. Inline ADD-to-stepper controls reduce taps and keep quantities synchronized between the carousel, grid and review.
3. Location → Review → Payment breaks checkout into small tasks, with inline validation and editable quantities before committing.
4. The floating navigation pill exposes the active label; a separate cart action stays reachable above it without hiding menu content.
5. Clear empty states, progress feedback, visible demo notices, reduced-motion support, focus trapping and 44px controls make the flow understandable and accessible.

## Project files

Configuration is at the root. All application code lives under `src/`, with menu data, reducer-based CartContext and small components matching the requested structure. No placeholder code is omitted.

## Production boundaries

This is a production-buildable frontend prototype, not a live commerce backend. Authentication, payments, delivery timing and order fulfilment are simulated. Local storage is not secure server-side identity or multi-device storage. Never use real passwords or sensitive information in the demo. Real launch requires a backend, authenticated sessions, server-validated prices, restaurant order handling and a payment-provider integration.
