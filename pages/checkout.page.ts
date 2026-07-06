import { expect, test, type Page } from '@playwright/test';
import { HeaderComponent } from './components/header.component';

export class CheckoutPage {
  constructor(private readonly page: Page) {}

  private readonly _header = new HeaderComponent(this.page);
  private readonly firstNameInput = this.page.getByTestId('firstName');
  private readonly lastNameInput = this.page.getByTestId('lastName');
  private readonly postalCodeInput = this.page.getByTestId('postalCode');
  private readonly continueButton = this.page.getByTestId('continue');
  private readonly finishButton = this.page.getByTestId('finish');
  private readonly summaryContainer = this.page.getByTestId('checkout-summary-container');

  get header(): HeaderComponent {
    return this._header;
  }

  async fillCustomerInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await test.step('Preencher informacao do cliente', async () => {
      await this.firstNameInput.fill(firstName);
      await this.lastNameInput.fill(lastName);
      await this.postalCodeInput.fill(postalCode);
    });
  }

  async continueToOverview(): Promise<void> {
    await test.step('Continuar para resumo da encomenda', async () => {
      await this.continueButton.click();
    });
  }

  async expectOverviewLoaded(): Promise<void> {
    await test.step('Validar carregamento da pagina de resumo da encomenda', async () => {
      await expect(this.page).toHaveURL(/.*checkout-step-two.html/);
      await expect(this.summaryContainer).toBeVisible();
      await this._header.expectVisible();
      await expect(this.finishButton).toBeVisible();
    });
  }

  async finishOrder(): Promise<void> {
    await test.step('Finalizar encomenda no resumo', async () => {
      await this.finishButton.click();
    });
  }
}
