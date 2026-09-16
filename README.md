# Matcha storefront concept

Live site: https://nina705-alt.github.io/static-app/

A responsive static storefront built with HTML, CSS, and JavaScript. GitHub Pages publishes the repository root on `main`.

## Run

Open `index.html` or serve this directory with a static HTTP server. No build or installation is required.

## Features

- Homepage, sample collection, brand story, brewing guide, and FAQ.
- Shareable product detail routes: `#product/daily-matcha`, `#product/latte-matcha`, and `#product/ritual-set`.
- Concept image gallery, selectable sizes, persistent demo bag, quantity controls, and a mobile sticky add-to-cart button.
- Accessible dialogs, keyboard focus styles, reduced-motion support, and responsive layouts.
- Newsletter and checkout are explicitly labeled previews. No email or payment is collected.

## Before selling

Replace `[Brand Name]` and all bracketed business details. Confirm products, sizes, currency, prices, tasting notes, ingredients, allergens, sourcing, shipping, returns, contacts, social URLs, and policies. Replace concept photography with actual product photographs. Connect a commerce provider and mailing-list service before accepting orders or collecting emails. The demo cart is stored only in localStorage. Fonts are served by Google Fonts.

## Files

- `index.html`: content and page sections
- `styles.css`: design and responsive layouts
- `app.js`: sample product data, routes, and demo interactions
- `matcha.png`: AI-generated illustrative concept photography
- `image-prompt.md`: asset provenance and generation prompt
- `data/sample.json`: legacy fictional project data, unused by the storefront

## Checks

JavaScript syntax checked with `node --check app.js`. Browser checks cover desktop and 390 px mobile layouts, product routes, size prices, cart quantity totals/removal, placeholder checkout, newsletter feedback, and mobile sticky purchasing controls.
