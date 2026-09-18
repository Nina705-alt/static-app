# The Shared Table

Live site: https://nina705-alt.github.io/static-app/

A responsive midday-meal initiative website concept. The Shared Table is a creative concept name, not a claim that a registered organization or operational program exists. USD is the example currency. All operational, financial, impact, and organizational details await verification.

## Run and deploy

Open `index.html`, or serve this directory using a static HTTP server. No package installation or build step is needed. GitHub Pages deploys the repository root from `main`.

## Included

- Homepage with donation and volunteer calls to action.
- Program overview, expense reporting template, impact metrics with reporting-date placeholders, fundraising goal template, and story/photo placeholders.
- One-time/monthly example donation selection, preset/custom amounts, native amount validation, and a review dialog showing the amount and frequency before any potential payment.
- Volunteer, business sponsorship, and contact enquiry previews. Only email is required; first name, message, and business name are optional. No phone, address, or sensitive beneficiary information is collected.
- Transparency, policy placeholders, FAQs, and clearly unavailable reports/social links.
- Original lightweight SVG meal illustration. No beneficiary photographs, identifying details, testimonials, affiliations, endorsements, or unverifiable statistics.
- Responsive layouts, keyboard-accessible dialogs, visible focus styles, labeled forms, and reduced-motion support. System fonts avoid external font requests.

## What remains inactive

No payment processor or form-delivery service is connected. Donation review does not create a payment or subscription. Confirmation content explains what a future verified payment confirmation must include; it does not fabricate a receipt or successful donation. Enquiry previews are not sent or stored, and entered values are cleared after preview submission. Form submission buttons remain disabled if JavaScript fails to load.

## Required before accepting donations

1. Confirm the organizing entity, concept name, public contacts, service area, community description, and preparation/distribution process.
2. Supply verified costs, expense totals, reporting dates, impact totals and counting methods, fundraising goal, and source reports.
3. Confirm currency and donation policies. Connect a verified payment provider with secure server-side verification, actual one-time and recurring payment flows, post-payment confirmation, receipts, refunds, and cancellation management. Never expose secret credentials in the browser.
4. Connect an appropriate enquiry service and publish the approved privacy and retention policy before collecting entries.
5. Replace story and photograph placeholders only with accurate, consent-approved material. Do not identify children or publish sensitive personal information.

## Files

- `index.html`: sections, forms, and accessible dialogs
- `styles.css`: responsive design
- `app.js`: local-only preview interactions
- `shared-table.svg`: original vector illustration, not program photography

Previous storefront assets remain unused by this site.

## Validation

JavaScript syntax check; desktop and 390 px mobile visual review; preset and custom amounts; zero-amount rejection; monthly and one-time review accuracy; enquiry category switching, optional business field, and field clearing; disabled real payment; no horizontal overflow; loaded SVG asset.
