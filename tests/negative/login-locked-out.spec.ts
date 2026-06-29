import { test, expect } from '@playwright/test';

test('[AUTH][LOGIN] bloqueado exibe mensagem de erro @auth @login @negative', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.locator('[data-test="username"]').fill('locked_out_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  await expect(page.locator('[data-test="error"]')).toHaveText(
    'Epic sadface: Sorry, this user has been locked out.'
  );
  await expect(page).toHaveURL('https://www.saucedemo.com/');
});
