import { expect, type Page } from '@playwright/test';

export class HeaderComponent {
  constructor(private readonly page: Page) {}

  private readonly container = this.page.locator('[data-test="header-container"]');
  private readonly cartLink = this.page.locator('[data-test="shopping-cart-link"]');
  private readonly cartBadge = this.page.locator('[data-test="shopping-cart-badge"]');

  async expectVisible(): Promise<void> {
    await expect(this.container).toBeVisible();
    await expect(this.cartLink).toBeVisible();
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  async expectCartBadgeCount(count: string): Promise<void> {
    await expect(this.cartBadge).toBeVisible();
    await expect(this.cartBadge).toHaveText(count);
  }
}
