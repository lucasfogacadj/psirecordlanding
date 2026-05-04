# Cloudflare Deploy

Este projeto e um site estatico. O build gera a pasta `dist` com apenas os
arquivos publicos que devem ser publicados.

## Configuracao atual: Workers Static Assets

Os logs do Cloudflare mostram o fluxo de Workers Builds, que executa
`npx wrangler deploy`. Para esse fluxo, use:

```txt
Build command: npm run build
Deploy command: npx wrangler deploy
Root directory: /
```

O arquivo `wrangler.jsonc` aponta `assets.directory` para `./dist`, entao o
deploy sabe exatamente qual pasta publicar.

## Alternativa: Cloudflare Pages

Se o projeto for criado especificamente como Cloudflare Pages, use estas
configuracoes no dashboard:


```txt
Framework preset: None
Build command: npm run build
Build output directory: dist
Deploy command: deixe em branco
Root directory: /
```

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

## robots.txt e Content-Signal

O arquivo `robots.txt` do repositorio usa apenas diretivas padrao e validas:
`User-agent`, `Allow`, `Disallow` e `Sitemap`.

Se o `robots.txt` publicado exibir um bloco `# BEGIN Cloudflare Managed content`
com a linha `Content-Signal: search=yes,ai-train=no`, essa linha esta sendo
injetada pela configuracao gerenciada da Cloudflare, nao pelo repositorio.
Validadores como o Google Search Console podem marcar `Content-Signal` como
`Unknown directive`.

Para remover esse erro no Cloudflare:

```txt
Cloudflare Dashboard
Security > Bots
Instruct AI bot traffic with robots.txt: Off
```

No dashboard novo, tambem pode aparecer em:

```txt
Security Settings
Bot traffic
Instruct AI bot traffic with robots.txt: Off
```

Depois disso, publique novamente o projeto. O `robots.txt` local ja contem
bloqueios validos para crawlers de IA usando apenas `User-agent` e `Disallow`.
