import { expect, type Page } from '@playwright/test';

export class InventoryPage {
  constructor(private readonly page: Page) {}

  private readonly title = this.page.locator('[data-test="title"]');
  private readonly addBackpackButton = this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
  private readonly cartBadge = this.page.locator('[data-test="shopping-cart-badge"]');
  private readonly cartLink = this.page.locator('[data-test="shopping-cart-link"]');

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/.*inventory.html/);
    await expect(this.title).toHaveText('Products');
  }

  async addBackpackToCart(): Promise<void> {
    await this.addBackpackButton.click();
  }

  async expectCartBadgeCount(count: string): Promise<void> {
    await expect(this.cartBadge).toBeVisible();
    await expect(this.cartBadge).toHaveText(count);
  }

  async goToCart(): Promise<void> {
    await this.cartLink.click();
  }
}
