import { test } from '../../fixtures/auth.fixture';
import { LoginPage } from '../../pages/login.page';

test('[AUTH][LOGIN] bloqueado exibe mensagem de erro @auth @login @negative', async ({ page, credentials }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.loginAs(credentials.lockedOutUser, credentials.password);

  await loginPage.expectLoginError(
    'Epic sadface: Sorry, this user has been locked out.'
  );
  await loginPage.expectOnLoginPage();
});
