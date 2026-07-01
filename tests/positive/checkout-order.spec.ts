import { test } from '../../fixtures/test';

test('[CHECKOUT][CONFIRM] completa checkout e exibe Thank you for your order! @checkout @positive', async ({
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

  await inventoryPage.addBackpackToCart();
  await inventoryPage.goToCart();

  await cartPage.expectLoaded();
  await cartPage.header.expectCartBadgeCount('1');
  await cartPage.startCheckout();

  await checkoutPage.header.expectCartBadgeCount('1');
  await checkoutPage.fillCustomerInformation(
    checkoutCustomer.firstName,
    checkoutCustomer.lastName,
    checkoutCustomer.postalCode
  );
  await checkoutPage.finishOrder();

  await checkoutCompletePage.expectOrderCompleted();
});
