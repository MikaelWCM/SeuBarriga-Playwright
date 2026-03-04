import {Page} from "@playwright/test";  

export class ResumoMensalPage{
    constructor(private page: Page){}

    async acessarResumoMensal(){
        await this.page.locator("a:has-text('Resumo Mensal')").click();
    }

    async selecionarMes(mes: string){
        await this.page.locator('select[id="mes"]').selectOption({label: mes});
    }

    async selecionarAno(ano: string){
        await this.page.locator('select[id="ano"]').selectOption({label: ano});
    }

    async clicarBotaoBuscar(){
        await this.page.locator('input[type="submit"]').click();
    }

    async obterContaMovimentacao(linha: number){
        return await this.page.locator(`table tbody tr:nth-child(${linha}) td:nth-child(3)`).innerText();
    }


    async excluirMovimentacao(descricao: string){
        const linha = await this.page.getByRole("row").filter({hasText:descricao});
        await linha.locator('//a[contains(@href, "/removerMovimentacao")]').click();
    }
}