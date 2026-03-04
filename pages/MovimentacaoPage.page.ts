import {Page} from "@playwright/test";

export class MovimentacaoPage{
    constructor(private page: Page){}

    async acessarTelaCriarMovimentacao(){
        await this.page.locator('a:has-text("Criar Movimentação")').click();
    }

    async selecionarTipoMovimentacao(tipoMovimentacao: string){
        await this.page.locator('select[id="tipo"]').selectOption({label: tipoMovimentacao});
    }

    async preencherDataMovimentacao(dataMovimentacao: string){
        await this.page.locator('input[id="data_transacao"]').fill(dataMovimentacao);
    }

    async preencherDataPagamento(dataPagamento: string){
        await this.page.locator('input[id="data_pagamento"]').fill(dataPagamento);
    }

    async preencherDescricao(descricao: string){
        await this.page.locator('input[id="descricao"]').fill(descricao);
    }

    async preencherInterassado(interessado: string){
        await this.page.locator('input[id="interessado"]').fill(interessado);
    }

    async preencherValor(valor: string){
        await this.page.locator('input[id="valor"]').fill(valor);
    }

    async selecionarConta(conta: string){
        await this.page.locator('select[id="conta"]').selectOption({label: conta});
    }

    async selecionarSituacaoPago(){
        await this.page.getByLabel('Pago').check();
    }

    async selecionarSituacaoPendente(){
        await this.page.getByLabel('Pendente').check();
    }

    async clicarBotaoSalvar(){
        await this.page.locator('button[type="submit"]').click();
    }

}

