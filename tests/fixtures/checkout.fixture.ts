import { expect, test as authTest } from './auth.fixture';

export type CheckoutCustomer = {
  firstName: string;
  lastName: string;
  postalCode: string;
};

export const test = authTest.extend<{ checkoutCustomer: CheckoutCustomer }>({
  checkoutCustomer: async ({}, use) => {
    await use({
      firstName: 'John',
      lastName: 'Doe',
      postalCode: '12345',
    });
  },
});

export { expect };
