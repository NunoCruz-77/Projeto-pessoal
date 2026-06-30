import { expect, test as base } from '@playwright/test';

export type Credentials = {
  standardUser: string;
  lockedOutUser: string;
  password: string;
};

export const test = base.extend<{
  credentials: Credentials;
}>({
  credentials: async ({}, use) => {
    await use({
      standardUser: 'standard_user',
      lockedOutUser: 'locked_out_user',
      password: 'secret_sauce',
    });
  },
});

export { expect };
