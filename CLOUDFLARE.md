# Cloudflare Pages Deploy

Este projeto e um site estatico para Cloudflare Pages. O build gera a pasta `dist`
com apenas os arquivos publicos que devem ser publicados.

## Configuracao no Cloudflare Pages

Use estas configuracoes no dashboard do Cloudflare:

```txt
Framework preset: None
Build command: npm run build
Build output directory: dist
Deploy command: deixe em branco
Root directory: /
```

Nao use `npx wrangler deploy` neste projeto. Esse comando e para Workers e gera o
erro `Missing entry-point to Worker script or to assets directory`.

Se o dashboard exigir um comando de deploy customizado, use:

```bash
npm run deploy:pages
```

## Deploy local/manual

```bash
npm install
npx wrangler login
npm run deploy
```

## Desenvolvimento local

```bash
npm install
npm run dev
```
