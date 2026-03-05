import { MovimentacaoPage } from "../pages/MovimentacaoPage.page";

export class MovimentacaoDSL {
  constructor(private movimentacaoPage: MovimentacaoPage) {}

    async acessarTelaCriarMovimentacao(){
      await this.movimentacaoPage.acessarTelaCriarMovimentacao();
    }

    async validarMensagemRetorno(mensagem: string){

        if(mensagem === "Conta adicionada com sucesso!"){
           await this.movimentacaoPage.validarMensagemRetorno(mensagem);
        }
    }

    async criarNovaMovimentacaoPago(tipoMovimentacao: string, dataMovimentacao: string, dataPagamento: string, descricao: string, 
        interessado: string, valor: string, conta: string){
        
        await this.movimentacaoPage.selecionarTipoMovimentacao(tipoMovimentacao);
        await this.movimentacaoPage.preencherDataMovimentacao(dataMovimentacao);
        await this.movimentacaoPage.preencherDataPagamento(dataPagamento);
        await this.movimentacaoPage.preencherDescricao(descricao);
        await this.movimentacaoPage.preencherInterassado(interessado);
        await this.movimentacaoPage.preencherValor(valor);
        await this.movimentacaoPage.selecionarConta(conta);
        await this.movimentacaoPage.selecionarSituacaoPago();
        await this.movimentacaoPage.clicarBotaoSalvar();

    }

    async retornarDataAtual(){
        const dataAtual = new Date();
        const dia = String(dataAtual.getDate()).padStart(2, '0');
        const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
        const ano = dataAtual.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }
    
    async retornarDataFutura(){
        const dataAtual = new Date();
        dataAtual.setDate(dataAtual.getDate() + 5);
        const dia = String(dataAtual.getDate()).padStart(2, '0');
        const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
        const ano = dataAtual.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }

}

