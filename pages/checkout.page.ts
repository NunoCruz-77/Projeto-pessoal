import { expect, test, type Locator, type Page } from '@playwright/test';
import { HeaderComponent } from './components/header.component';

export class CheckoutPage {
  private readonly _header: HeaderComponent;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly postalCodeInput: Locator;
  private readonly continueButton: Locator;
  private readonly errorMessage: Locator;
  private readonly finishButton: Locator;
  private readonly summaryContainer: Locator;

  constructor(private readonly page: Page) {
    this._header = new HeaderComponent(this.page);
    this.firstNameInput = this.page.getByTestId('firstName');
    this.lastNameInput = this.page.getByTestId('lastName');
    this.postalCodeInput = this.page.getByTestId('postalCode');
    this.continueButton = this.page.getByTestId('continue');
    this.errorMessage = this.page.getByTestId('error');
    this.finishButton = this.page.getByTestId('finish');
    this.summaryContainer = this.page.getByTestId('checkout-summary-container');
  }

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

  async fillFirstName(firstName: string): Promise<void> {
    await test.step('Preencher apenas o campo First Name', async () => {
      await this.firstNameInput.fill(firstName);
    });
  }

  async fillLastName(lastName: string): Promise<void> {
    await test.step('Preencher apenas o campo Last Name', async () => {
      await this.lastNameInput.fill(lastName);
    });
  }

  async fillPostalCode(postalCode: string): Promise<void> {
    await test.step('Preencher apenas o campo Postal Code', async () => {
      await this.postalCodeInput.fill(postalCode);
    });
  }

  async tryFillLastNameAndExpectValueNotPersisted(lastName: string): Promise<void> {
    await test.step('Tentar preencher Last Name e validar que o valor nao persiste', async () => {
      await expect(this.lastNameInput).toBeVisible();
      await expect(this.lastNameInput).toBeEditable();

      const valueBeforeFill = await this.lastNameInput.inputValue();
      await this.lastNameInput.fill(lastName);

      await expect(this.lastNameInput).not.toHaveValue(lastName);
      const valueAfterFill = await this.lastNameInput.inputValue();
      expect(valueAfterFill).toBe(valueBeforeFill);
    });
  }

  async continueToOverview(): Promise<void> {
    await test.step('Continuar para resumo da encomenda', async () => {
      await this.continueButton.click();
    });
  }

  async expectCheckoutError(message: string): Promise<void> {
    await test.step('Validar mensagem de erro no checkout', async () => {
      await expect(this.errorMessage).toBeVisible();
      await expect(this.errorMessage).toHaveText(message);
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

  async reloadOverview(): Promise<void> {
    await test.step('Recarregar overview de checkout para estabilizar estado da pagina', async () => {
      await this.page.reload();
      await this.expectOverviewLoaded();
    });
  }

  async finishOrder(): Promise<void> {
    await test.step('Finalizar encomenda no resumo', async () => {
      await this.finishButton.click();

      // Some flaky user profiles can require a second click before redirecting.
      if (!/checkout-complete\.html/.test(this.page.url())) {
        await this.finishButton.click();
      }

      await expect(this.page).toHaveURL(/.*checkout-complete.html/);
    });
  }
}
