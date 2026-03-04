import { MovimentacaoPage } from "../pages/MovimentacaoPage.page";

export class MovimentacaoDSL {
  constructor(private movimentacaoPage: MovimentacaoPage) {}

    async criarNovaMovimentacaoPago(tipoMovimentacao: string, dataMovimentacao: string, dataPagamento: string, descricao: string, 
        interessado: string, valor: string, conta: string){
        
        await this.movimentacaoPage.acessarTelaCriarMovimentacao();
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

}

