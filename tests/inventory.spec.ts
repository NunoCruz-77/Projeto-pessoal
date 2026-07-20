import { test } from '../fixtures/test';

test.describe('[INVENTORY] cenarios da pagina de produtos @inventory', () => {
  test('[INVENTORY][LOAD] usuario autenticado visualiza lista de produtos @inventory @positive', async ({
    credentials,
    loginPage,
    inventoryPage,
  }) => {
    await loginPage.goto();
    await loginPage.loginAs(credentials.standardUser, credentials.password);

    await inventoryPage.expectLoaded();
  });

  test('[INVENTORY][CART] acessar carrinho a partir da pagina de produtos @inventory @positive', async ({
    credentials,
    loginPage,
    inventoryPage,
    cartPage,
  }) => {
    await loginPage.goto();
    await loginPage.loginAs(credentials.standardUser, credentials.password);

    await inventoryPage.expectLoaded();
    await inventoryPage.goToCart();

    await cartPage.expectLoaded();
  });

  test('[INVENTORY][CART][ADD] adiciona Backpack e Onesie e incrementa contador para 2 @inventory @positive', async ({
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

  test('[INVENTORY][SORT] ordenar produtos de A a Z @inventory @positive', async ({
    credentials,
    loginPage,
    inventoryPage,
  }) => {
    await loginPage.goto();
    await loginPage.loginAs(credentials.standardUser, credentials.password);

    await inventoryPage.expectLoaded();
    await inventoryPage.sortProductsByNameAsc();
    await inventoryPage.expectProductsSortedByNameAsc();
  });

  test('[INVENTORY][CART][REMOVE] remover todos os itens e ocultar contador @inventory @positive', async ({
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
});
