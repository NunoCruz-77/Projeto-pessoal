import { test, expect } from '@playwright/test';

test('pesquisar na documentação', async ({ page }) => {
  await page.goto('https://playwright.dev');
  // localizar pelo papel/acessibilidade (locator robusto)
  await page.getByRole('button', { name: 'Search' }).click();
  await page.getByPlaceholder('Search docs').fill('locators');
  await page.getByRole('link', { name: /Locators/ }).first().click();
  // assertions com auto-waiting (espera sozinho)
  await expect(page).toHaveURL(/.*locators/);
  await expect(page.getByRole('heading', { name: 'Locators' })).toBeVisible();
});
