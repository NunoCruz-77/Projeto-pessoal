import { expect, test as base } from '@playwright/test';
import { USERS, type Credentials } from '../data/users';

export type { Credentials };

export const test = base.extend<{
  credentials: Credentials;
}>({
  credentials: async ({}, use) => {
    await use(USERS);
  },
});

export { expect };
