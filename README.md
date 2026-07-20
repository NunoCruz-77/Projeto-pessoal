# mentoria_playwright_aubay
Projeto pessoal de automação com Playwright.

## Visão geral

O projeto usa Page Object Model e fixtures customizadas para manter os testes mais legíveis e reutilizáveis.

## Estrutura

- `pages/`: page objects e componentes reutilizáveis
- `fixtures/`: dados de autenticação, checkout e fixture principal de testes
- `data/`: dados de utilizador usados pelos specs
- `tests/`: cenários por fluxo funcional
- `playwright.config.ts`: configuração do Playwright

## Specs disponíveis

- `auth.spec.ts`
- `cart.spec.ts`
- `checkout.spec.ts`
- `inventory.spec.ts`
- `purchase.spec.ts`

## Execução local

- Suite completa: `npx playwright test`
- Smoke: `npm run test:smoke`
- Regression: `npm run test:regression`
- Cross-browser: `npm run test:cross-browser`
- Apenas Chromium: `npm run test:chromium`
- UI mode: `npx playwright test --ui`
- HTML report: `npx playwright show-report`

## Docker e CI

- Docker local: `npm run test:docker`
- Docker Compose: `docker compose up --build --abort-on-container-exit --exit-code-from playwright`
- CI: executa em `push` e `pull_request` com Docker, suporta Chromium / Firefox / WebKit e publica `playwright-report/` e `test-results/`

## Convenções

- Use `fixtures/test.ts` para receber os page objects via fixture
- Mantenha seletores e ações nos page objects
- Deixe os specs focados no fluxo de negócio
- Use `@smoke` para fluxos críticos e `@regression` para cobertura geral
- Prefira títulos no formato `[FEATURE][AREA] descrição @tags` para facilitar leitura no relatório

## Troubleshooting

- Browser não instalado: `npx playwright install`
- Dependências desatualizadas: `npm install`
- Repetir falhas: `npx playwright test --last-failed`
- Executar um ficheiro em headed: `npx playwright test tests/checkout.spec.ts --headed`
