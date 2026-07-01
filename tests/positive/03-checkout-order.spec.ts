import { test } from '../fixtures/checkout.fixture';
import { CartPage } from '../pages/cart.page';
import { CheckoutCompletePage } from '../pages/checkout-complete.page';
import { CheckoutPage } from '../pages/checkout.page';
import { InventoryPage } from '../pages/inventory.page';
import { LoginPage } from '../pages/login.page';

test('[CHECKOUT][CONFIRM] completa checkout e exibe Thank you for your order! @checkout @positive', async ({ page, credentials, checkoutCustomer }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  const checkoutCompletePage = new CheckoutCompletePage(page);

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
