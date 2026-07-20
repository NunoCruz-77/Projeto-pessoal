import { test } from '../fixtures/test';

test.describe('[AUTH] cenarios de autenticacao @auth', () => {
  test('[AUTH][LOGIN] sucesso com credenciais validas @login @positive', async ({
    credentials,
    loginPage,
    inventoryPage,
  }) => {
    await loginPage.goto();
    await loginPage.loginAs(credentials.standardUser, credentials.password);

    await inventoryPage.expectLoaded();
  });

  test('[AUTH][LOGIN] bloqueado exibe mensagem de erro @login @negative', async ({
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

  test('[AUTH][LOGIN] credenciais invalidas exibem erro @login @negative', async ({
    credentials,
    loginPage,
  }) => {
    await loginPage.goto();
    await loginPage.loginAs(credentials.standardUser, 'invalid_password');

    await loginPage.expectLoginError(
      'Epic sadface: Username and password do not match any user in this service'
    );
    await loginPage.expectOnLoginPage();
  });

  test('[AUTH][LOGOUT] logout redireciona para a pagina de login @logout @positive', async ({
    credentials,
    loginPage,
    inventoryPage,
  }) => {
    await loginPage.goto();
    await loginPage.loginAs(credentials.standardUser, credentials.password);
    await inventoryPage.expectLoaded();

    await inventoryPage.logout();

    await loginPage.expectOnLoginPage();
  });
});