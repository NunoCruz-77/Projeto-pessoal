import { expect, type Page } from '@playwright/test';

export class CartPage {
  constructor(private readonly page: Page) {}

  private readonly checkoutButton = this.page.locator('[data-test="checkout"]');

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/.*cart.html/);
  }

  async startCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
