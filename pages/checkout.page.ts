import { test, type Page } from '@playwright/test';
import { HeaderComponent } from './components/header.component';

export class CheckoutPage {
  constructor(private readonly page: Page) {}

  private readonly _header = new HeaderComponent(this.page);
  private readonly firstNameInput = this.page.getByTestId('firstName');
  private readonly lastNameInput = this.page.getByTestId('lastName');
  private readonly postalCodeInput = this.page.getByTestId('postalCode');
  private readonly continueButton = this.page.getByTestId('continue');
  private readonly finishButton = this.page.getByTestId('finish');

  get header(): HeaderComponent {
    return this._header;
  }

  async fillCustomerInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await test.step('Preencher informacao do cliente', async () => {
      await this._header.expectVisible();
      await this.firstNameInput.fill(firstName);
      await this.lastNameInput.fill(lastName);
      await this.postalCodeInput.fill(postalCode);
    });
  }

  async finishOrder(): Promise<void> {
    await test.step('Concluir encomenda', async () => {
      await this._header.expectVisible();
      await this.continueButton.click();
      await this.finishButton.click();
    });
  }
}
