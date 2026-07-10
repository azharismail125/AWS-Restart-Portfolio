# Website Breakdown

Static site built for Cloud Fitness Gym, deployed to Amazon S3.

## Stack
- HTML5, CSS3, vanilla JavaScript — no framework, no build step
- Font Awesome (icons), Google Fonts (Poppins) — loaded via CDN
- Google Maps embed on the contact page

## Pages

| Page | Screenshot | Purpose |
|---|---|---|
| Home | ![Home](Projects/S3%20Static%20Website/Website%20Screenshots/1_Home_page.png) | Hero, "why choose us" features, featured classes preview |
| Plans | ![Plans](Projects/S3%20Static%20Website/Website%20Screenshots/2_Plans.png) ![Plans continued](Projects/S3%20Static%20Website/Website%20Screenshots/3_Plans_continued.png) | Pricing tiers (Student / Professional / Premium), day pass, corporate & senior rates, FAQ |
| Classes | ![Classes](Projects/S3%20Static%20Website/Website%20Screenshots/4_Classes.png) | Class descriptions + filterable weekly schedule table (by day) |
| Booking | ![Booking](Projects/S3%20Static%20Website/Website%20Screenshots/5_Booking.png) | Class booking form → submits to `confirmation.html` |
| Contact | ![Contact](Projects/S3%20Static%20Website/Website%20Screenshots/6_Contact_Us.png) | Membership sign-up form + gym contact details and map → submits to `confirmation.html` |
| Confirmation | ![Confirmation](Projects/S3%20Static%20Website/Website%20Screenshots/7_Booking_confirmation.png) | Reads submitted form data from the URL and displays a booking/sign-up summary with a generated reference number |
| Error | ![Error](Projects/S3%20Static%20Website/Website%20Screenshots/8_Error.png) | Custom 404, set as the S3 error document |

Source files: `index.html`, `plans.html`, `classes.html`, `booking.html`, `contact.html`, `confirmation.html`, `error.html`

## Shared components
- `styles.css` — single stylesheet covering layout, navbar, cards, forms, pricing grid, schedule table, and responsive breakpoints
- `main.js` — handles:
  - mobile nav toggle (hamburger menu)
  - scroll-based navbar background change
  - fade-in-on-scroll animation (feature/class cards, section titles)
  - class schedule day-filter tabs
  - confirmation page: reads query params from the booking/sign-up form submission and renders the details + reference number client-side

## Design notes
- No backend — booking and sign-up "submissions" are simulated via GET form params read by JS on the confirmation page. Nothing is persisted or emailed.
- Fully static, so it maps directly onto S3 static website hosting with no server required.
- Image assets referenced in `classes.html`/`index.html` (class photos) are not yet part of the deployed build.
