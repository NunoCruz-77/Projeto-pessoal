# mentoria_playwright_aubay
Projeto pessoal, junho de 2026.

## Mini guia de testes (POM + Fixtures)

Este projeto usa Playwright com duas ideias principais para manter os testes limpos e escalaveis:

- Page Object Model (POM): encapsula seletores e acoes de cada pagina
- Fixtures custom: injetam dados de teste e page objects nos specs

## Estrutura atual

- pages/
	- login.page.ts
	- inventory.page.ts
	- cart.page.ts
	- checkout.page.ts
	- checkout-complete.page.ts
	- components/
		- header.component.ts
- fixtures/
	- auth.fixture.ts
	- checkout.fixture.ts
	- test.ts
- data/
	- users.ts
- tests/
	- negative/
		- login-locked-out.spec.ts
	- positive/
		- login-success.spec.ts
		- add-backpack-to-cart.spec.ts
		- checkout-order.spec.ts
- playwright.config.ts

## Como os testes estao organizados

1. pages/
- Contem os Page Objects com convencao {nome}.page.ts
- Componentes compartilhados ficam em pages/components/

2. fixtures/
- auth.fixture.ts: credenciais de autenticacao
- checkout.fixture.ts: dados de checkout
- test.ts: fixture principal que injeta POMs (LoginPage, InventoryPage, CartPage, CheckoutPage, CheckoutCompletePage)

3. data/
- users.ts: dados de utilizador (standard_user, locked_out_user, password)

4. tests/
- Specs com convencao {feature}.spec.ts
- Flows positivos e negativos separados por pasta

## Como correr os testes

- Rodar suite completa:
	npx playwright test

- Rodar apenas testes positivos:
	npx playwright test tests/positive

- Rodar apenas testes negativos:
	npx playwright test tests/negative

- Rodar um spec especifico:
	npx playwright test tests/positive/checkout-order.spec.ts

- Rodar em UI mode:
	npx playwright test --ui

- Abrir ultimo relatorio HTML:
	npx playwright show-report

## Como correr no Docker

- Build da imagem:
	docker build -t projeto-pessoal-playwright .

- Correr a suite dentro do container:
	docker run --rm projeto-pessoal-playwright

- Correr apenas os testes positivos:
	docker run --rm projeto-pessoal-playwright npx playwright test tests/positive

- Correr apenas um spec:
	docker run --rm projeto-pessoal-playwright npx playwright test tests/positive/checkout-order.spec.ts

## Como correr com Docker Compose

- Correr a suite com um comando:
	docker compose up --build --abort-on-container-exit --exit-code-from playwright

- Ver os relatórios gerados no host:
	- playwright-report/
	- test-results/

- Correr um spec especifico:
	docker compose --profile spec run --rm playwright-spec

- Correr em modo headed:
	docker compose --profile headed run --rm playwright-headed

## CI e relatórios

- A suíte corre em `push` e `pull_request` via GitHub Actions.
- O HTML report fica guardado como artifact da CI.
- Os traces ficam guardados quando a execução falha.
- Se quiser reproduzir localmente com Docker:
	- `docker compose up --build --abort-on-container-exit --exit-code-from playwright`
	- `docker run --rm projeto-pessoal-playwright`

## Qualidade de código

- Validar lint localmente:
	`npm run lint`
- O lint está configurado para focar apenas no código deste projeto e ignorar diretórios gerados externamente (ex.: `.github/sentinel`).

## Padrao recomendado para novos specs

- Importar test de fixtures/test.ts para receber POMs injetados
- Evitar instanciar page objects manualmente no corpo do teste
- Manter o spec focado no fluxo de negocio
- Manter seletores e detalhes de UI dentro dos Page Objects

## Troubleshooting (Windows)

- Erro de browser nao instalado (ex.: executable does not exist)
	- Correr: npx playwright install

- Erro apos atualizar dependencias
	- Correr: npm install
	- Correr: npx playwright install

- Porta do report ocupada ao abrir relatorio
	- Correr: npx playwright show-report --host 127.0.0.1 --port 9324

- Testes muito lentos ou instaveis localmente
	- Correr com 1 worker: npx playwright test --workers=1
	- Repetir apenas falhas: npx playwright test --last-failed

- Queres depurar um cenario especifico
	- Correr 1 ficheiro em headed: npx playwright test tests/positive/checkout-order.spec.ts --headed
	- Correr em UI mode: npx playwright test --ui
