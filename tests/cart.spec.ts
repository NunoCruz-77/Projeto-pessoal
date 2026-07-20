import { test } from '../fixtures/test';

const ALL_INVENTORY_PRODUCT_IDS = [
  'sauce-labs-backpack',
  'sauce-labs-bike-light',
  'sauce-labs-bolt-t-shirt',
  'sauce-labs-fleece-jacket',
  'sauce-labs-onesie',
  'test.allthethings()-t-shirt-(red)',
];

test.describe('[CART] cenarios do carrinho @cart', () => {
  test('[CART][ADD] adicionar os 6 produtos e validar badge com 6 @cart @positive @smoke @regression', async ({
    credentials,
    loginPage,
    inventoryPage,
  }) => {
    await loginPage.goto();
    await loginPage.loginAs(credentials.standardUser, credentials.password);
    await inventoryPage.expectLoaded();

    for (const productId of ALL_INVENTORY_PRODUCT_IDS) {
      await inventoryPage.addToCart(productId);
    }

    await inventoryPage.expectCartBadgeCount('6');
  });

  test('[CART][REMOVE] remover 6 produtos um a um e decrementar badge @cart @positive @regression', async ({
    credentials,
    loginPage,
    inventoryPage,
    cartPage,
  }) => {
    await loginPage.goto();
    await loginPage.loginAs(credentials.standardUser, credentials.password);
    await inventoryPage.expectLoaded();

    for (const productId of ALL_INVENTORY_PRODUCT_IDS) {
      await inventoryPage.addToCart(productId);
    }

    await inventoryPage.expectCartBadgeCount('6');
    await inventoryPage.goToCart();
    await cartPage.expectLoaded();

    for (let index = 0; index < ALL_INVENTORY_PRODUCT_IDS.length; index++) {
      await cartPage.removeFromCart(ALL_INVENTORY_PRODUCT_IDS[index]);

      const remainingItems = ALL_INVENTORY_PRODUCT_IDS.length - index - 1;
      if (remainingItems > 0) {
        await cartPage.expectCartBadgeCount(String(remainingItems));
      } else {
        await cartPage.expectCartBadgeHidden();
      }
    }
  });
});
