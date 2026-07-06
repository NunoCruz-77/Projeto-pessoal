import { expect, test, type Locator, type Page } from '@playwright/test';

export class CheckoutCompletePage {
  private readonly completeHeader: Locator;

  constructor(private readonly page: Page) {
    this.completeHeader = this.page.getByTestId('complete-header');
  }

  async expectOrderCompleted(): Promise<void> {
    await test.step('Validar confirmacao de encomenda', async () => {
      await expect(this.completeHeader).toHaveText('Thank you for your order!');
    });
  }
}
