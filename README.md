# Dog-food storefront concept

Live site: https://nina705-alt.github.io/static-app/

Responsive HTML, CSS, and JavaScript storefront hosted by GitHub Pages from the root of `main`. No build step or package installation is needed. Open `index.html`, or serve this directory with a static HTTP server.

## Included

- Warm cream, green, and orange design with generated dog and packaging concept photography.
- Four illustrative products: dry food, wet food, treats, and fresh meals.
- Combined life-stage, food-type, protein, and starting-price filters; reset and empty-result states.
- Product detail routes, two-image galleries, size selection, transparent stock placeholders, and mobile sticky add-to-cart.
- Persistent demo cart with quantity controls and removal. A separate storage key avoids retaining the previous matcha cart.
- Product-specific feeding-guide templates with units but no invented nutritional values or portions.
- Story, FAQs, inactive subscription information, policy/contact placeholders, and a preview newsletter form.

## Required before launch as a real store

Supply the brand name, audience, verified product specifications, ingredients, nutrition panels, life-stage suitability, feeding directions, stock, prices/currency, delivery rules, sourcing/production facts, policies, contacts, and social URLs. Replace concept imagery with actual product photography.

Checkout is not connected to a payment provider. A configured commerce/checkout service is needed; do not embed secret credentials in this static site. Subscriptions are inactive until supported plans and a management/cancellation portal exist. No orders, emails, or payments are collected by this preview. Cart data stays in this browser's localStorage; fonts load from Google Fonts.

## Files

- `index.html`: page sections and dialogs
- `styles.css`: responsive styling, focus indicators, reduced-motion support
- `app.js`: illustrative catalog, combined filters, routes, feeding templates, cart
- `dog-hero.png` and `dog-products.png`: AI-generated illustrative assets
- `dog-image-prompts.md`: built-in image generation prompts and provenance

Previous matcha assets and legacy sample data are unused by the current site.

## Validation

`node --check app.js`; browser checks for combined filters, empty states/reset, size selection, cart quantities/removal and persistence, checkout messaging, product-specific feeding templates, newsletter feedback, and responsive layouts.
