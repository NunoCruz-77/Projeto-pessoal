import { expect, test, type Page } from '@playwright/test';
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
    await test.step('Validar carregamento da pagina de produtos', async () => {
      await expect(this.page).toHaveURL(/.*inventory.html/);
      await expect(this.title).toHaveText('Products');
      await this._header.expectVisible();
    });
  }

  async addBackpackToCart(): Promise<void> {
    await test.step('Adicionar mochila ao carrinho', async () => {
      await this.addBackpackButton.click();
    });
  }

  async expectCartBadgeCount(count: string): Promise<void> {
    await test.step(`Validar contador do carrinho com o valor ${count}`, async () => {
      await this._header.expectCartBadgeCount(count);
    });
  }

  async goToCart(): Promise<void> {
    await test.step('Abrir carrinho', async () => {
      await this._header.openCart();
    });
  }
}
