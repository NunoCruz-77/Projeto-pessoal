import { expect, test } from '../fixtures/test';
import { mkdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

test.describe('[CHECKOUT] cenarios de checkout @checkout', () => {
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

  test('[CHECKOUT][E2E] standard_user consolida fluxos positivos e gera PDF da encomenda @checkout @e2e @positive @smoke @regression', async ({
    credentials,
    checkoutCustomer,
    loginPage,
    inventoryPage,
    cartPage,
    checkoutPage,
    checkoutCompletePage,
    page,
    browserName,
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

    if (browserName === 'chromium') {
      const pdfDir = path.join(process.cwd(), 'test-results', 'pdf-orders');
      const pdfPath = path.join(pdfDir, `order-${Date.now()}.pdf`);
      await mkdir(pdfDir, { recursive: true });

      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
      });
      await writeFile(pdfPath, pdfBuffer);

      const pdfStats = await stat(pdfPath);
      await expect(pdfStats.size).toBeGreaterThan(0);
    }
  });

  test('[CHECKOUT][BUG] problem_user adiciona 2 produtos e valida itens no carrinho @checkout @negative @regression', async ({
    credentials,
    loginPage,
    inventoryPage,
    cartPage,
  }) => {
    test.fail(true, 'Bug conhecido: problem_user nao mantém todos os itens adicionados no carrinho.');

    await loginPage.goto();
    await loginPage.loginAs(credentials.problemUser, credentials.password);

    await inventoryPage.expectLoaded();
    await inventoryPage.addToCart('sauce-labs-bike-light');
    await inventoryPage.addToCart('sauce-labs-fleece-jacket');
    await inventoryPage.goToCart();

    await cartPage.expectLoaded();
    await cartPage.expectProductNamesInCart(['Sauce Labs Bike Light']);
    await cartPage.continueShopping();

    await inventoryPage.expectLoaded();
    await inventoryPage.expectRemoveButtonVisible('sauce-labs-fleece-jacket');
  });

  test('[CHECKOUT][BUG] error_user valida bug de Last Name sem persistencia no checkout @checkout @negative @regression', async ({
    credentials,
    checkoutCustomer,
    loginPage,
    inventoryPage,
    cartPage,
    checkoutPage,
    checkoutCompletePage,
  }) => {
    test.fail(true, 'Bug conhecido: no checkout overview com error_user, o botao Finish nao redireciona para checkout-complete.');

    await loginPage.goto();
    await loginPage.loginAs(credentials.errorUser, credentials.password);

    await inventoryPage.expectLoaded();
    await inventoryPage.addToCart('test.allthethings()-t-shirt-(red)');
    await inventoryPage.expectCartBadgeHidden();

    await inventoryPage.addToCart('sauce-labs-onesie');
    await inventoryPage.expectCartBadgeCount('1');
    await inventoryPage.goToCart();

    await cartPage.expectLoaded();
    await cartPage.expectProductNamesInCart(['Sauce Labs Onesie']);
    await cartPage.startCheckout();

    await checkoutPage.header.expectVisible();
    await checkoutPage.header.expectCartBadgeCount('1');
    await checkoutPage.continueToOverview();
    await checkoutPage.expectCheckoutError('Error: First Name is required');
    await checkoutPage.fillFirstName(checkoutCustomer.firstName);
    await checkoutPage.continueToOverview();
    await checkoutPage.expectCheckoutError('Error: Postal Code is required');
    await checkoutPage.fillPostalCode(checkoutCustomer.postalCode);
    await checkoutPage.tryFillLastNameAndExpectValueNotPersisted(checkoutCustomer.lastName);
    await checkoutPage.continueToOverview();
    await checkoutPage.expectOverviewLoaded();
    await checkoutPage.reloadOverview();
    await checkoutPage.finishOrder();

    await checkoutCompletePage.expectOrderCompleted();
  });
});
