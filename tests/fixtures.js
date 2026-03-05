import { test as base, expect } from '@playwright/test';
import { ResumoMensalPage } from '../pages/ResumoMensalPage.page';
import { ResumoMensalDSL } from '../dsl/ResumoMensalDSL.dsl';
import { MovimentacaoPage } from '../pages/MovimentacaoPage.page';
import { MovimentacaoDSL } from '../dsl/MovimentacaoDSL.dsl';
import { ContasPage } from '../pages/ContasPage.page';
import { ContasDSL } from '../dsl/ContasDSL.dsl';



// custom fixture that automatically logs in and provides a page already authenticated
export const test = base.extend({
  loggedInPage: async ({ page }, use) => {
    // login sequence used throughout the repo
    await page.goto('/');
    await page.getByPlaceholder('Email').fill('mikael@email.com');
    await page.getByPlaceholder('Password').fill('Mikael123');
    await page.getByRole('button').click();
    await expect(page).toHaveTitle('Seu Barriga - Home');

    // hand the page to the test body
    await use(page);

    // teardown could go here if needed (e.g. logout)
  },

  contasDSL: async ({ page }, use) => {

    const contasPage = new ContasPage(page);
    const contasDSL = new ContasDSL(contasPage);

    await use(contasDSL);
  },

  contasPage: async ({ page }, use) => {

    const contasPage = new ContasPage(page);  
    await use(contasPage);
  },

  movimentacaoDSL: async ({ page }, use) => {

    const movimentacaoPage = new MovimentacaoPage(page);
    const movimentacaoDSL = new MovimentacaoDSL(movimentacaoPage); 

    await use(movimentacaoDSL);

  },

  movimentacaoPage: async ({ page }, use) => {

    const movimentacaoPage = new MovimentacaoPage(page);  
    await use(movimentacaoPage);
  },

  resumoMensalDSL: async ({ page }, use) => {  
    const resumoMensalPage = new ResumoMensalPage(page);
    const resumoMensalDSL = new ResumoMensalDSL(resumoMensalPage);

    await use(resumoMensalDSL);

  },

  resumoMensalPage: async ({ page }, use) => {

    const resumoMensalPage = new ResumoMensalPage(page);  
    await use(resumoMensalPage);
  },


});


export { expect };
