import { test, expect } from './fixtures';
import { ResumoMensalPage } from '../pages/ResumoMensalPage.page';
import { ResumoMensalDSL } from '../dsl/ResumoMensalDSL.dsl';

import { MovimentacaoPage } from '../pages/MovimentacaoPage.page';
import { MovimentacaoDSL } from '../dsl/MovimentacaoDSL.dsl';

import { ContasPage } from '../pages/ContasPage.page';
import { ContasDSL } from '../dsl/ContasDSL.dsl';

// login handled by loggedInPage fixture


test('Validar se é possível acessar a tela de Resumo Mensal', async({loggedInPage: page})=>{
    const resumoMensalPage = new ResumoMensalPage(page);
    const resumoMensalDSL = new ResumoMensalDSL(resumoMensalPage);  
    await resumoMensalDSL.acessarResumoMensal();

    await expect(page).toHaveTitle("Seu Barriga - Extrato");
})

test('Validar se é possível excluir uma movimentação', async({loggedInPage: page})=>{

    const movimentacaoPage = new MovimentacaoPage(page);
    const movimentacaoDSL = new MovimentacaoDSL(movimentacaoPage);
    const resumoMensalPage = new ResumoMensalPage(page);
    const resumoMensalDSL = new ResumoMensalDSL(resumoMensalPage);  

    await movimentacaoDSL.criarNovaMovimentacaoPago("Despesa", "05/03/2026", "06/03/2026", "Movimentação para exclusão", 
    "Contratante Automação", "200", "a");

    await resumoMensalDSL.acessarResumoMensal();
    await resumoMensalDSL.filtrarMovimentacoes("Março", "2026");        

    await resumoMensalDSL.excluirMovimentacao("Movimentação para exclusão");

    await expect(page.locator("div[role='alert']")).toContainText('Movimentação removida com sucesso!');

})

test('Validar se o sistema bloqueia e exlusão de uma conta com movimentação associada', async({loggedInPage: page})=>{

    const contasPage = new ContasPage(page);
    const dslConta = new ContasDSL(contasPage);
    const resumoMensalPage = new ResumoMensalPage(page);
    const resumoMensalDSL = new ResumoMensalDSL(resumoMensalPage);  

    await resumoMensalDSL.acessarResumoMensal();
    await resumoMensalDSL.filtrarMovimentacoes("Março", "2026");

    const conta = await resumoMensalDSL.obterContaMovimentacao(1);
    await dslConta.excluirConta(conta);
    await expect(page.locator("div[role='alert']")).toContainText('Conta em uso na movimentações');

})

