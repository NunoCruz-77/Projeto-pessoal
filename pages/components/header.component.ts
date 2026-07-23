import { expect, test, type Locator, type Page } from '@playwright/test';

export class HeaderComponent {
  private readonly container: Locator;
  private readonly cartLink: Locator;
  private readonly cartBadge: Locator;
  private readonly menuButton: Locator;
  private readonly logoutLink: Locator;

  constructor(private readonly page: Page) {
    this.container = this.page.getByTestId('header-container');
    this.cartLink = this.page.getByTestId('shopping-cart-link');
    this.cartBadge = this.page.getByTestId('shopping-cart-badge');
    this.menuButton = this.page.locator('#react-burger-menu-btn');
    this.logoutLink = this.page.getByTestId('logout-sidebar-link');
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

  async expectCartBadgeHidden(): Promise<void> {
    await test.step('Validar que o badge do carrinho nao e exibido', async () => {
      await expect(this.cartBadge).toBeHidden();
    });
  }

  async logout(): Promise<void> {
    await test.step('Terminar sessao pelo menu lateral', async () => {
      await this.menuButton.click();
      await expect(this.logoutLink).toBeVisible();
      try {
        await this.logoutLink.click();
      } catch {
        await this.logoutLink.click({ force: true });
      }
    });
  }
}
