import { test } from '../fixtures/test';

test('[CART][ADD] adiciona Sauce Labs Backpack e incrementa contador @cart @positive', async ({
  credentials,
  loginPage,
  inventoryPage,
}) => {
  await loginPage.goto();
  await loginPage.loginAs(credentials.standardUser, credentials.password);

  await inventoryPage.expectLoaded();

  await inventoryPage.addToCart('sauce-labs-backpack');
  await inventoryPage.expectCartBadgeCount('1');
});