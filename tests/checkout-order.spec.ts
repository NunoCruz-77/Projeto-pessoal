import { expect, test } from '../fixtures/test';
import { mkdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

test('[CHECKOUT][CONFIRM] completa checkout e exibe Thank you for your order! @checkout @positive @smoke @regression', async ({
  credentials,
  checkoutCustomer,
  loginPage,
  inventoryPage,
  cartPage,
  checkoutPage,
  checkoutCompletePage,
}) => {
  await loginPage.goto();
  await loginPage.loginAs(credentials.standardUser, credentials.password);

  await inventoryPage.expectLoaded();

  await inventoryPage.addToCart('sauce-labs-backpack');
  await inventoryPage.goToCart();

  await cartPage.expectLoaded();
  await cartPage.header.expectCartBadgeCount('1');
  await cartPage.startCheckout();

  await checkoutPage.header.expectVisible();
  await checkoutPage.header.expectCartBadgeCount('1');
  await checkoutPage.fillCustomerInformation(
    checkoutCustomer.firstName,
    checkoutCustomer.lastName,
    checkoutCustomer.postalCode
  );
  await checkoutPage.continueToOverview();
  await checkoutPage.expectOverviewLoaded();
  await checkoutPage.finishOrder();

  await checkoutCompletePage.expectOrderCompleted();
});

test('[E2E][HAPPY-PATH] standard_user consolida fluxos positivos e gera PDF da encomenda @e2e @positive @smoke @regression', async ({
  credentials,
  checkoutCustomer,
  loginPage,
  inventoryPage,
  cartPage,
  checkoutPage,
  checkoutCompletePage,
  page,
}) => {
  const allProductIds = [
    'sauce-labs-backpack',
    'sauce-labs-bike-light',
    'sauce-labs-bolt-t-shirt',
    'sauce-labs-fleece-jacket',
    'sauce-labs-onesie',
    'test.allthethings()-t-shirt-(red)',
  ];

  await loginPage.goto();
  await loginPage.loginAs(credentials.standardUser, credentials.password);
  await inventoryPage.expectLoaded();

  await inventoryPage.sortProductsByNameDesc();
  await inventoryPage.expectProductsSortedByNameDesc();

  for (const productId of allProductIds) {
    await inventoryPage.addToCart(productId);
  }
  await inventoryPage.expectCartBadgeCount('6');

  await inventoryPage.goToCart();
  await cartPage.expectLoaded();

  // Keep one product to complete purchase while still validating decrement behavior.
  for (let index = 0; index < allProductIds.length - 1; index++) {
    await cartPage.removeFromCart(allProductIds[index]);
    await cartPage.expectCartBadgeCount(String(allProductIds.length - index - 1));
  }

  await cartPage.startCheckout();
  await checkoutPage.header.expectVisible();
  await checkoutPage.header.expectCartBadgeCount('1');
  await checkoutPage.fillCustomerInformation(
    checkoutCustomer.firstName,
    checkoutCustomer.lastName,
    checkoutCustomer.postalCode
  );
  await checkoutPage.continueToOverview();
  await checkoutPage.expectOverviewLoaded();
  await checkoutPage.finishOrder();

  await checkoutCompletePage.expectOrderCompleted();

  const pdfDir = path.join(process.cwd(), 'test-results', 'pdf-orders');
  const pdfPath = path.join(pdfDir, `order-${Date.now()}.pdf`);
  await mkdir(pdfDir, { recursive: true });

  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
  });
  await writeFile(pdfPath, pdfBuffer);

  const pdfStats = await stat(pdfPath);
  expect(pdfStats.size).toBeGreaterThan(0);
});