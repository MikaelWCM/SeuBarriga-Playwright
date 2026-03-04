import { test as base, expect } from '@playwright/test';

// custom fixture that automatically logs in and provides a page already authenticated
export const test = base.extend({
  loggedInPage: async ({ page }, use) => {
    // login sequence used throughout the repo
    await page.goto('https://seubarriga.wcaquino.me');
    await page.getByPlaceholder('Email').fill('mikael@email.com');
    await page.getByPlaceholder('Password').fill('Mikael123');
    await page.getByRole('button').click();
    await expect(page).toHaveTitle('Seu Barriga - Home');

    // hand the page to the test body
    await use(page);

    // teardown could go here if needed (e.g. logout)
  },
});

export { expect };
