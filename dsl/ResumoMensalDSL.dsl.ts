import { ResumoMensalPage } from "../pages/ResumoMensalPage.page";

export class ResumoMensalDSL {
  constructor(private resumoMensalPage: ResumoMensalPage) {}


  
    async acessarResumoMensal(){
        await this.resumoMensalPage.acessarResumoMensal();
    }

    async filtrarMovimentacoes(mes: string, ano: string){
        await this.resumoMensalPage.selecionarMes(mes);
        await this.resumoMensalPage.selecionarAno(ano);
        await this.resumoMensalPage.clicarBotaoBuscar();
    } 
    
    async excluirMovimentacao(descricao: string){
        await this.resumoMensalPage.excluirMovimentacao(descricao);
    }

    async obterContaMovimentacao(linha: number){
        return await this.resumoMensalPage.obterContaMovimentacao(linha);
    }

    async retornarMesAtual(){
        const dataAtual = new Date();
        const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
        return mes;
    }

    async retornarAnoAtual(){
        const dataAtual = new Date();
        const ano = dataAtual.getFullYear();
        return String(ano);
    }

}