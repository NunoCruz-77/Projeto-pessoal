import { expect, type Page } from '@playwright/test';

export class CheckoutCompletePage {
  constructor(private readonly page: Page) {}

  private readonly completeHeader = this.page.locator('[data-test="complete-header"]');

  async expectOrderCompleted(): Promise<void> {
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
  }
}
