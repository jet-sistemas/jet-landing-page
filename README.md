This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Variáveis de ambiente

| Variável | Descrição | Exemplo |
| --- | --- | --- |
| `NEXT_PUBLIC_BACKOFFICE_API_URL` | URL base da API do backoffice (sem barra final). Usada na seção de patrocinadores (`GET /v1/public/sponsors`). | `http://localhost:8080` |
| `NEXT_PUBLIC_R2_PUBLIC_URL` | URL pública do bucket R2/CDN (sem barra final). Usada para montar a URL das logos quando a API devolve apenas o path ou object key. | `https://pub-134d43c3b2494394b518c46b052650ee.r2.dev` |

Copie para `.env.local` e ajuste conforme o ambiente.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
