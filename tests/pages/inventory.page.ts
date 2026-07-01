import { expect, type Page } from '@playwright/test';
import { HeaderComponent } from './components/header.component';

export class InventoryPage {
  constructor(private readonly page: Page) {}

  private readonly _header = new HeaderComponent(this.page);
  private readonly title = this.page.locator('[data-test="title"]');
  private readonly addBackpackButton = this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');

  get header(): HeaderComponent {
    return this._header;
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/.*inventory.html/);
    await expect(this.title).toHaveText('Products');
    await this._header.expectVisible();
  }

  async addBackpackToCart(): Promise<void> {
    await this.addBackpackButton.click();
  }

  async expectCartBadgeCount(count: string): Promise<void> {
    await this._header.expectCartBadgeCount(count);
  }

  async goToCart(): Promise<void> {
    await this._header.openCart();
  }
}
