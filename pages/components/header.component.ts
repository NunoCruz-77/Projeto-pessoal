import { expect, test, type Page } from '@playwright/test';

export class HeaderComponent {
  constructor(private readonly page: Page) {}

  private readonly container = this.page.locator('[data-test="header-container"]');
  private readonly cartLink = this.page.locator('[data-test="shopping-cart-link"]');
  private readonly cartBadge = this.page.locator('[data-test="shopping-cart-badge"]');

  async expectVisible(): Promise<void> {
    await test.step('Validar cabecalho visivel', async () => {
      await expect(this.container).toBeVisible();
      await expect(this.cartLink).toBeVisible();
    });
  }

  async openCart(): Promise<void> {
    await test.step('Abrir carrinho pelo cabecalho', async () => {
      await this.cartLink.click();
    });
  }

  async expectCartBadgeCount(count: string): Promise<void> {
    await test.step(`Validar badge do carrinho com o valor ${count}`, async () => {
      await expect(this.cartBadge).toBeVisible();
      await expect(this.cartBadge).toHaveText(count);
    });
  }
}
