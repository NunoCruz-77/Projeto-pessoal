import { expect, test, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;

  constructor(private readonly page: Page) {
    this.usernameInput = this.page.getByTestId('username');
    this.passwordInput = this.page.getByTestId('password');
    this.loginButton = this.page.getByTestId('login-button');
    this.errorMessage = this.page.getByTestId('error');
  }

  async goto(): Promise<void> {
    await test.step('Abrir pagina de login', async () => {
      await this.page.goto('/');
    });
  }

  async loginAs(username: string, password: string): Promise<void> {
    await test.step(`Autenticar com o utilizador ${username}`, async () => {
      await this.usernameInput.fill(username);
      await this.passwordInput.fill(password);
      await this.loginButton.click();
    });
  }

  async expectLoginError(message: string): Promise<void> {
    await test.step('Validar mensagem de erro de login', async () => {
      await expect(this.errorMessage).toHaveText(message);
    });
  }

  async expectOnLoginPage(): Promise<void> {
    await test.step('Validar permanencia na pagina de login', async () => {
      await expect(this.page).toHaveURL('/');
    });
  }
}
