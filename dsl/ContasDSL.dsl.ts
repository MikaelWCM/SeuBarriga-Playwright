import { ContasPage } from '../pages/ContasPage.page';


export class ContasDSL {
  constructor(private contasPage: ContasPage) {}

    async acessarCadastroDeConta() {
        await this.contasPage.acessarAdicionarContas();
    }

    async adicionarConta(nome: string){

        await this.contasPage.acessarAdicionarContas();
        await this.contasPage.preencherCampoNome(nome);
        await this.contasPage.clicarBotaoSalvar();

    }

    async acessarListaDeContas(){
        await this.contasPage.acessarListaContas();
    }

    async editarConta(nomeConta: string, novoNome: string){
        await this.contasPage.clicarBotaoEditarConta(nomeConta);
        await this.contasPage.limparCampoNome();
        await this.contasPage.preencherCampoNome(novoNome);
        await this.contasPage.clicarBotaoSalvar();
    }

    async excluirConta(nomeConta: string){
        await this.contasPage.acessarListaContas();
        await this.contasPage.clicarBotaoExcluirConta(nomeConta);
    }
}
