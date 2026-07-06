import { expect, test, type Page } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) {}

  private readonly usernameInput = this.page.getByTestId('username');
  private readonly passwordInput = this.page.getByTestId('password');
  private readonly loginButton = this.page.getByTestId('login-button');
  private readonly errorMessage = this.page.getByTestId('error');

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
