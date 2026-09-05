# Marmoraria Reis Oliveira

Proposta de site com experiência 3D, projetos, catálogo de referências, filtros e contato pelo WhatsApp.

**Apresentação:** https://ayslanvictor-web.github.io/marmoraria-reis-oliveira/

## Desenvolvimento

Requer Node.js 24. Instale as dependências com `npm ci`.

- Site original: `npm run dev`
- Gerar GitHub Pages: `npx vite build --config vite.pages.config.ts`
- Validar filtros e mensagens: `node --test lib/stone-catalog.test.js`

O GitHub Pages publica a pasta `docs` da branch `main`. Após mudanças, gere novamente a versão estática e envie o código junto com `docs`. Preserve `docs/.nojekyll`.

Mármore e granito são categorias confirmadas. Paletas e acabamentos são referências sob consulta. Imagens de inspiração estão identificadas no site; não representam comprovação de estoque ou projetos executados.
