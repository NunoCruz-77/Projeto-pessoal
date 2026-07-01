import { expect, type Page } from '@playwright/test';
import { HeaderComponent } from './components/header.component';

export class CartPage {
  constructor(private readonly page: Page) {}

  private readonly _header = new HeaderComponent(this.page);
  private readonly checkoutButton = this.page.locator('[data-test="checkout"]');

  get header(): HeaderComponent {
    return this._header;
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/.*cart.html/);
    await this._header.expectVisible();
  }

  async startCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
