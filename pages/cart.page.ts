import { expect, test, type Locator, type Page } from '@playwright/test';
import { HeaderComponent } from './components/header.component';

export class CartPage {
  private readonly _header: HeaderComponent;
  private readonly checkoutButton: Locator;
  private readonly continueShoppingButton: Locator;
  private readonly cartItemNames: Locator;

  constructor(private readonly page: Page) {
    this._header = new HeaderComponent(this.page);
    this.checkoutButton = this.page.getByTestId('checkout');
    this.continueShoppingButton = this.page.getByTestId('continue-shopping');
    this.cartItemNames = this.page.getByTestId('inventory-item-name');
  }

  get header(): HeaderComponent {
    return this._header;
  }

  async expectLoaded(): Promise<void> {
    await test.step('Validar carregamento da pagina do carrinho', async () => {
      await expect(this.page).toHaveURL(/.*cart.html/);
      await this._header.expectVisible();
    });
  }

  async removeFromCart(productId: string): Promise<void> {
    await test.step(`Remover produto ${productId} do carrinho`, async () => {
      await this.page.getByTestId(`remove-${productId}`).click();
    });
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

  async expectProductNamesInCart(expectedNames: string[]): Promise<void> {
    await test.step('Validar produtos esperados na lista do carrinho', async () => {
      for (const productName of expectedNames) {
        await expect(this.cartItemNames.filter({ hasText: productName })).toHaveCount(1);
      }
    });
  }

  async continueShopping(): Promise<void> {
    await test.step('Voltar para inventory pelo botao Continue Shopping', async () => {
      await this.continueShoppingButton.click();
    });
  }

  async startCheckout(): Promise<void> {
    await test.step('Iniciar checkout', async () => {
      await this.checkoutButton.click();
    });
  }
}
