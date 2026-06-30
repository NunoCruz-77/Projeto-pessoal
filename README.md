# mentoria_playwright_aubay
Projeto pessoal, junho de 2026.

## Mini guia de testes (POM + Fixtures)

Este projeto usa Playwright com duas ideias principais para manter os testes limpos e escalaveis:

- Page Object Model (POM): encapsula seletores e acoes de cada pagina
- Fixtures: centralizam dados de teste (credenciais e dados de checkout)

## Estrutura usada

- tests/pages
	- login.page.ts
	- inventory.page.ts
	- cart.page.ts
	- checkout.page.ts
	- checkout-complete.page.ts
- tests/fixtures
	- auth.fixture.ts
	- checkout.fixture.ts
- tests/positive e tests/negative
	- specs consumindo pages + fixtures

## Como escrever um novo teste no padrao atual

1. Escolha a fixture correta
- Se precisar so de autenticacao: importar de tests/fixtures/auth.fixture
- Se precisar de autenticacao + checkout: importar de tests/fixtures/checkout.fixture

2. Instancie os page objects no inicio do teste
- Exemplo: LoginPage, InventoryPage, CartPage, CheckoutPage

3. Use metodos da pagina em vez de locators diretos no spec
- Bom: loginPage.loginAs(...)
- Evitar: page.locator(...).click() repetido em varios arquivos

4. Deixe dados de teste nas fixtures
- Credenciais ficam em auth.fixture.ts
- Dados de cliente de checkout ficam em checkout.fixture.ts

## Convencoes adotadas

- Navegacao inicial sempre com page.goto('/')
- URL base centralizada no playwright.config.ts em use.baseURL
- Assercoes de pagina preferencialmente dentro dos page objects quando fizer sentido
- Specs focam no fluxo de negocio, nao em detalhes de seletor

## Beneficios praticos

- Menos duplicacao de codigo
- Manutencao mais simples quando seletor muda
- Leitura de cenarios mais clara
- Reuso de dados e comportamentos entre testes

## Boas praticas

Checklist rapido para novos testes e revisoes de PR:

1. Nome do teste claro e orientado a comportamento
- Preferir padrao: [DOMINIO][ACAO] resultado esperado @tags

2. Spec sem detalhes de seletor
- Evitar locator direto no spec quando ja existir metodo no page object
- Criar/ajustar metodos em tests/pages para manter encapsulamento

3. Reutilizar fixtures antes de criar dados locais
- Credenciais em tests/fixtures/auth.fixture.ts
- Dados de checkout em tests/fixtures/checkout.fixture.ts

4. Evitar duplicacao de passos comuns
- Login e navegacao inicial devem reaproveitar metodos de pagina
- Se um fluxo repetir em varios cenarios, considerar helper de fluxo

5. Assercoes relevantes para o objetivo do cenario
- Validar o resultado principal do fluxo (nao apenas cliques)
- Evitar excesso de assercoes que nao agregam signal ao teste

6. Independencia e confiabilidade
- Cada teste deve poder rodar isolado
- Nao depender de ordem de execucao
- Usar seletores estaveis (data-test)

7. Estilo e manutencao
- Manter testes curtos e legiveis
- Usar nomes de metodos explicitos nos page objects
- Ao mudar seletor de tela, corrigir no page object (e nao em varios specs)

8. Validacao antes de subir PR
- Rodar: npx playwright test
- Conferir se nao houve regressao em outros navegadores/projetos

## Comandos uteis

- Rodar suite completa:
	npx playwright test

- Abrir UI mode:
	npx playwright test --ui

- Abrir ultimo relatorio:
	npx playwright show-report
