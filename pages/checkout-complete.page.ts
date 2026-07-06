import { expect, test, type Page } from '@playwright/test';

export class CheckoutCompletePage {
  constructor(private readonly page: Page) {}

  private readonly completeHeader = this.page.locator('[data-test="complete-header"]');

  async expectOrderCompleted(): Promise<void> {
    await test.step('Validar confirmacao de encomenda', async () => {
      await expect(this.completeHeader).toHaveText('Thank you for your order!');
    });
  }
}
