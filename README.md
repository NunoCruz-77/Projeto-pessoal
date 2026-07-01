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
