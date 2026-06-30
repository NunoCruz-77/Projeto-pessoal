import { test } from '../fixtures/auth.fixture';
import { InventoryPage } from '../pages/inventory.page';
import { LoginPage } from '../pages/login.page';

test('[AUTH][LOGIN] sucesso com credenciais validas @auth @login @positive', async ({ page, credentials }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.loginAs(credentials.standardUser, credentials.password);

  await inventoryPage.expectLoaded();
});
