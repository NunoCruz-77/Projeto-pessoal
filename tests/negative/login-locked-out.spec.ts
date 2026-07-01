import { test } from '../../fixtures/test';

test('[AUTH][LOGIN] bloqueado exibe mensagem de erro @auth @login @negative', async ({
  credentials,
  loginPage,
}) => {

  await loginPage.goto();
  await loginPage.loginAs(credentials.lockedOutUser, credentials.password);

  await loginPage.expectLoginError(
    'Epic sadface: Sorry, this user has been locked out.'
  );
  await loginPage.expectOnLoginPage();
});
