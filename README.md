# Renart Gold Collection

Premium storefront for Renart's gold ring collection, built with Vite, React, TypeScript, shadcn-ui, and Tailwind CSS.

## Development

Requirements:
- Node.js 18+
- npm 9+

Setup:
```sh
npm install
npm run dev
```
Dev server runs at `http://localhost:8080`.

## Build
```sh
npm run build
npm run preview
```

## Tech Stack
- Vite + React (TypeScript)
- shadcn-ui + Tailwind CSS
- Radix UI primitives
- TanStack Query

## API
Frontend fetches products from `/api/products`. In development, Vite proxies to `http://localhost:8082` (see `vite.config.ts`).

Response example:
```json
{
  "products": [
    {
      "name": "Engagement Ring 1",
      "popularityScore": 0.85,
      "weight": 2.1,
      "images": { "yellow": "...", "rose": "...", "white": "..." },
      "price": 291.38
    }
  ]
}
```

## License
MIT © Renart
