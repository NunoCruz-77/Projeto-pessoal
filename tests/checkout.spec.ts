import { test } from '../fixtures/test';

test.describe('[CHECKOUT] cenarios de checkout @checkout', () => {
  test('[CHECKOUT][CART] problem_user adiciona 2 produtos e valida itens no carrinho @checkout @negative', async ({
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

  test('[CHECKOUT][CART] error_user valida bug de Last Name sem persistencia no checkout @checkout @negative', async ({
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
