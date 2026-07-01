import { test } from '../../fixtures/test';

test('[AUTH][LOGIN] sucesso com credenciais validas @auth @login @positive', async ({
  credentials,
  loginPage,
  inventoryPage,
}) => {

  await loginPage.goto();
  await loginPage.loginAs(credentials.standardUser, credentials.password);

  await inventoryPage.expectLoaded();
});
