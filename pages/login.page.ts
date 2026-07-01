import { expect, type Page } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) {}

  private readonly usernameInput = this.page.locator('[data-test="username"]');
  private readonly passwordInput = this.page.locator('[data-test="password"]');
  private readonly loginButton = this.page.locator('[data-test="login-button"]');
  private readonly errorMessage = this.page.locator('[data-test="error"]');

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async loginAs(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectLoginError(message: string): Promise<void> {
    await expect(this.errorMessage).toHaveText(message);
  }

  async expectOnLoginPage(): Promise<void> {
    await expect(this.page).toHaveURL('/');
  }
}
