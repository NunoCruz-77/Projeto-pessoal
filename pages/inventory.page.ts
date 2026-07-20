import { expect, test, type Locator, type Page } from '@playwright/test';
import { HeaderComponent } from './components/header.component';

export class InventoryPage {
  private readonly _header: HeaderComponent;
  private readonly title: Locator;
  private readonly sortSelect: Locator;
  private readonly productNames: Locator;

  constructor(private readonly page: Page) {
    this._header = new HeaderComponent(this.page);
    this.title = this.page.getByTestId('title');
    this.sortSelect = this.page.getByTestId('product-sort-container');
    this.productNames = this.page.getByTestId('inventory-item-name');
  }

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

  async addToCart(productId: string): Promise<void> {
    await test.step(`Adicionar produto ${productId} ao carrinho`, async () => {
      await this.page.getByTestId(`add-to-cart-${productId}`).click();
    });
  }

  async removeFromCart(productId: string): Promise<void> {
    await test.step(`Remover produto ${productId} do carrinho`, async () => {
      await this.page.getByTestId(`remove-${productId}`).click();
    });
  }

  async expectRemoveButtonVisible(productId: string): Promise<void> {
    await test.step(`Validar que o botao Remove do produto ${productId} esta visivel`, async () => {
      await expect(this.page.getByTestId(`remove-${productId}`)).toBeVisible();
    });
  }

  async addBackpackToCart(): Promise<void> {
    await this.addToCart('sauce-labs-backpack');
  }

  async expectCartBadgeCount(count: string): Promise<void> {
    await test.step(`Validar contador do carrinho com o valor ${count}`, async () => {
      await this._header.expectCartBadgeCount(count);
    });
  }

  async expectCartBadgeHidden(): Promise<void> {
    await test.step('Validar que o contador do carrinho nao e exibido', async () => {
      await this._header.expectCartBadgeHidden();
    });
  }

  async goToCart(): Promise<void> {
    await test.step('Abrir carrinho', async () => {
      await this._header.openCart();
    });
  }

  async sortProductsByNameDesc(): Promise<void> {
    await test.step('Ordenar produtos de Z a A', async () => {
      await this.sortSelect.click();
      await this.sortSelect.selectOption({ index: 1 });
    });
  }

  async expectProductsSortedByNameAsc(): Promise<void> {
    await test.step('Validar produtos ordenados alfabeticamente de A a Z', async () => {
      const productNames = (await this.productNames.allTextContents()).map((name) =>
        name.trim()
      );
      expect(productNames.length).toBeGreaterThan(1);

      const expectedOrder = [...productNames].sort((a, b) => a.localeCompare(b));
      expect(productNames).toEqual(expectedOrder);
    });
  }

  async expectProductsSortedByNameDesc(): Promise<void> {
    await test.step('Validar produtos ordenados alfabeticamente de Z a A', async () => {
      const productNames = (await this.productNames.allTextContents()).map((name) =>
        name.trim()
      );
      expect(productNames.length).toBeGreaterThan(1);

      const expectedOrder = [...productNames].sort((a, b) => b.localeCompare(a));
      expect(productNames).toEqual(expectedOrder);
    });
  }

  async logout(): Promise<void> {
    await test.step('Executar logout', async () => {
      await this._header.logout();
    });
  }
}
