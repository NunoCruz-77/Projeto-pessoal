import { test } from '../fixtures/test';

test.describe('[INVENTORY] cenarios da pagina de produtos @inventory', () => {
  test('[INVENTORY][LOAD] usuario autenticado visualiza lista de produtos @inventory @positive @smoke @regression', async ({
    credentials,
    loginPage,
    inventoryPage,
  }) => {
    await loginPage.goto();
    await loginPage.loginAs(credentials.standardUser, credentials.password);

    await inventoryPage.expectLoaded();
  });

  test('[INVENTORY][CART] acessar carrinho a partir da pagina de produtos @inventory @positive @regression', async ({
    credentials,
    loginPage,
    inventoryPage,
    cartPage,
  }) => {
    await loginPage.goto();
    await loginPage.loginAs(credentials.standardUser, credentials.password);

    await inventoryPage.expectLoaded();
    await inventoryPage.sortProductsByNameDesc();
    await inventoryPage.goToCart();

    await cartPage.expectLoaded();
  });

  test('[INVENTORY][CART][ADD] adiciona Backpack e Onesie e incrementa contador para 2 @inventory @positive @smoke @regression', async ({
    credentials,
    loginPage,
    inventoryPage,
  }) => {
    await loginPage.goto();
    await loginPage.loginAs(credentials.standardUser, credentials.password);

    await inventoryPage.expectLoaded();

    await inventoryPage.addToCart('sauce-labs-backpack');
    await inventoryPage.expectCartBadgeCount('1');
    await inventoryPage.addToCart('sauce-labs-onesie');
    await inventoryPage.expectCartBadgeCount('2');
  });

  test('[INVENTORY][SORT] ordenar produtos de Z a A @inventory @positive @regression', async ({
    credentials,
    loginPage,
    inventoryPage,
  }) => {
    await loginPage.goto();
    await loginPage.loginAs(credentials.standardUser, credentials.password);

    await inventoryPage.expectLoaded();
    await inventoryPage.sortProductsByNameDesc();
    await inventoryPage.expectProductsSortedByNameDesc();
  });

  test('[INVENTORY][CART][REMOVE] remover todos os itens e ocultar contador @inventory @positive @regression', async ({
    credentials,
    loginPage,
    inventoryPage,
  }) => {
    await loginPage.goto();
    await loginPage.loginAs(credentials.standardUser, credentials.password);

    await inventoryPage.expectLoaded();
    await inventoryPage.addToCart('sauce-labs-backpack');
    await inventoryPage.addToCart('sauce-labs-onesie');
    await inventoryPage.expectCartBadgeCount('2');

    await inventoryPage.removeFromCart('sauce-labs-backpack');
    await inventoryPage.expectCartBadgeCount('1');
    await inventoryPage.removeFromCart('sauce-labs-onesie');
    await inventoryPage.expectCartBadgeHidden();
  });

  test('[INVENTORY][CART][REMOVE] error_user falha ao remover produtos do carrinho @inventory @negative @regression', async ({
    credentials,
    loginPage,
    inventoryPage,
  }) => {
    test.fail(true, 'Bug conhecido: error_user nao consegue remover produtos na inventory.');

    await loginPage.goto();
    await loginPage.loginAs(credentials.errorUser, credentials.password);

    await inventoryPage.expectLoaded();
    await inventoryPage.addToCart('sauce-labs-bike-light');
    await inventoryPage.expectCartBadgeCount('1');
    await inventoryPage.addToCart('sauce-labs-onesie');
    await inventoryPage.expectCartBadgeCount('2');

    await inventoryPage.removeFromCart('sauce-labs-bike-light');
    await inventoryPage.expectCartBadgeCount('1');
  });
});
