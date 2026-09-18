# VOLT Equipment

Responsive static fitness-equipment concept storefront, hosted on GitHub Pages at https://nina705-alt.github.io/static-app/.

## Features

- Six sample products with search, sorting, equipment type, price, brand, and space filters.
- Hash-based product pages, concept image galleries, sample variants, and explicit missing specification fields.
- Up to three products compared side by side.
- Local-storage demo cart, quantity controls, removal, and sample USD item subtotals.
- Bundle concepts, buying guides, FAQ, policy placeholders, and a non-submitting newsletter preview.
- Mobile layouts, semantic controls, native dialogs, keyboard focus indicators, reduced-motion support, and optimized WebP assets.

## Run

Serve this folder with any static server, for example `python -m http.server 4175`, and open the localhost URL. No build or dependencies are required.

## Required before real sales

Replace all sample business, catalog, price, stock, variant, and space data. Supply actual product photography, specifications, dimensions, equipment weights, load limits, warranty and assembly instructions, verified bundle prices, support contacts, and policies. Connect a payment provider through a secure commerce backend with server-validated prices and inventory. Calculate and display shipping, tax, and a final payable total before payment. This preview intentionally takes no payments and creates no orders. Newsletter signup does not store or transmit email addresses.

Demo cart items are stored only in this browser under `volt-demo-cart-v1`. No payment credentials or customer details are collected.

## Verification

Checked JavaScript syntax, desktop and phone rendering, image loading, combined filters, empty results, search, price sorting, comparison, product variants, cart quantity/removal, persistence after reload, and checkout's explicit unconfigured state.

Generated image prompts and provenance are documented in FITNESS-IMAGE-PROMPTS.md. Images depict concepts rather than actual stocked products.
