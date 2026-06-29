import { test, expect } from '@playwright/test';

test('[CHECKOUT][CONFIRM] completa checkout e exibe Thank you for your order! @checkout @positive', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  await expect(page).toHaveURL(/.*inventory.html/);

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

  await page.locator('[data-test="shopping-cart-link"]').click();

  await expect(page).toHaveURL(/.*cart.html/);

  await page.locator('[data-test="checkout"]').click();

  await page.locator('[data-test="firstName"]').fill('John');
  await page.locator('[data-test="lastName"]').fill('Doe');
  await page.locator('[data-test="postalCode"]').fill('12345');

  await page.locator('[data-test="continue"]').click();

  await page.locator('[data-test="finish"]').click();

  await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
});
