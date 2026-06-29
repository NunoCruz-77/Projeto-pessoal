import { test, expect } from '@playwright/test';

test('[CART][ADD] adiciona Sauce Labs Backpack e incrementa contador @cart @positive', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  await expect(page).toHaveURL(/.*inventory.html/);

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

  const cartBadge = page.locator('[data-test="shopping-cart-badge"]');
  await expect(cartBadge).toBeVisible();
  await expect(cartBadge).toHaveText('1');
});
