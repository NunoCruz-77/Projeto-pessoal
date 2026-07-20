import { expect, test } from '../fixtures/test';

test.describe('[PURCHASE] cenarios de compra @purchase', () => {
  test('[PURCHASE][VISUAL][ALIGNMENT] visual_user valida desalinhamento do Add to cart @purchase @regression', async ({
    credentials,
    loginPage,
    inventoryPage,
    page,
  }) => {
    await loginPage.goto();
    await loginPage.loginAs(credentials.visualUser, credentials.password);
    await inventoryPage.expectLoaded();

    const baselineButton = page.getByTestId('add-to-cart-sauce-labs-backpack');
    const misalignedButton = page.getByTestId('add-to-cart-test.allthethings()-t-shirt-(red)');

    const baselineBox = await baselineButton.boundingBox();
    const misalignedBox = await misalignedButton.boundingBox();

    expect(baselineBox).not.toBeNull();
    expect(misalignedBox).not.toBeNull();

    const horizontalOffset = Math.abs((baselineBox?.x ?? 0) - (misalignedBox?.x ?? 0));
    expect(horizontalOffset).toBeGreaterThan(20);
  });

  test('[PURCHASE][CHECKOUT][VALIDATION] visual_user valida erros de checkout e conclui compra @purchase @smoke @regression', async ({
    credentials,
    checkoutCustomer,
    loginPage,
    inventoryPage,
    cartPage,
    checkoutPage,
    checkoutCompletePage,
  }) => {
    await loginPage.goto();
    await loginPage.loginAs(credentials.visualUser, credentials.password);
    await inventoryPage.expectLoaded();

    await inventoryPage.addToCart('test.allthethings()-t-shirt-(red)');
    await inventoryPage.expectCartBadgeCount('1');
    await inventoryPage.goToCart();

    await cartPage.expectLoaded();
    await cartPage.expectProductNamesInCart(['Test.allTheThings() T-Shirt (Red)']);
    await cartPage.startCheckout();

    await checkoutPage.header.expectVisible();
    await checkoutPage.continueToOverview();
    await checkoutPage.expectCheckoutError('Error: First Name is required');

    await checkoutPage.fillFirstName(checkoutCustomer.firstName);
    await checkoutPage.continueToOverview();
    await checkoutPage.expectCheckoutError('Error: Last Name is required');

    await checkoutPage.fillLastName(checkoutCustomer.lastName);
    await checkoutPage.continueToOverview();
    await checkoutPage.expectCheckoutError('Error: Postal Code is required');

    await checkoutPage.fillPostalCode(checkoutCustomer.postalCode);
    await checkoutPage.continueToOverview();
    await checkoutPage.expectOverviewLoaded();
    await checkoutPage.finishOrder();

    await checkoutCompletePage.expectOrderCompleted();
  });
});
