const { test, expect } = require('@playwright/test');

// @ts-check

/*test('Primeiro teste', async ({ page }) => {
  await page.goto('https://seubarriga.wcaquino.me');
  await expect(page).toHaveTitle('Seu Barriga - Log in');
});*/

test('Login Seu Barriga', async ({page}) =>{

  await page.goto('https://seubarriga.wcaquino.me');
  await page.getByPlaceholder("Email").fill("mikael@email.com");
  await page.getByPlaceholder("Password").fill("Mikael123");
  await page.getByRole('button').click();
  
  await expect(page).toHaveTitle('Seu Barriga - Home');
  
})