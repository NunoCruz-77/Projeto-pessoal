import { expect, test, type Locator, type Page } from '@playwright/test';

export class HeaderComponent {
  private readonly container: Locator;
  private readonly cartLink: Locator;
  private readonly cartBadge: Locator;

  constructor(private readonly page: Page) {
    this.container = this.page.getByTestId('header-container');
    this.cartLink = this.page.getByTestId('shopping-cart-link');
    this.cartBadge = this.page.getByTestId('shopping-cart-badge');
  }

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
