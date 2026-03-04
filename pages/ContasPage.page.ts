import {Page} from "@playwright/test";

export class ContasPage{
    constructor(private page: Page){}

    async acessarListaContas(){
        await this.page.locator("a:has-text('Contas')").click();
        await this.page.locator("a[href*='/contas']").click();
    }

    async acessarAdicionarContas(){
        await this.page.locator("a:has-text('Contas')").click();
        await this.page.locator("a[href*='/addConta']").click();
    }

    async preencherCampoNome(nome: string){
        await this.page.locator('input[id="nome"]').fill(nome);
    }

    async limparCampoNome(){
        await this.page.locator('input[id="nome"]').clear;
    }

    async clicarBotaoSalvar(){
        await this.page.locator('button[type="submit"]').click();
    }

    async clicarBotaoEditarConta(nomeConta: string){
        const linha = await this.page.getByRole("row").filter({hasText:nomeConta});
        await linha.locator('//a[contains(@href, "/editarConta")]').click();
    }

    async clicarBotaoExcluirConta(nomeConta: string){
        const linha = await this.page.getByRole("row").filter({hasText:nomeConta});
        await linha.locator('//a[contains(@href, "/removerConta")]').click();
    }
}