import { test, expect } from './fixtures';
import { randomUUID } from 'crypto';

// login handled by loggedInPage fixture


test('Validar se é possível acessar a tela de Resumo Mensal', async({loggedInPage: page, resumoMensalDSL})=>{

    await resumoMensalDSL.acessarResumoMensal();

    await expect(page).toHaveTitle("Seu Barriga - Extrato");
})

test('Validar se a mensagem "Movimentação removida com sucesso!" é exibida ao excluir uma movimentação', async({loggedInPage: page, contasDSL, movimentacaoDSL, resumoMensalDSL, resumoMensalPage})=>{
    
    const dataAtual = await movimentacaoDSL.retornarDataAtual();
    const dataFuturo = await movimentacaoDSL.retornarDataFutura();
    const mes = await resumoMensalDSL.retornarMesAtual();   
    const ano = await resumoMensalDSL.retornarAnoAtual();
    const nomeMovimentacao = 'Movimentacao-' + randomUUID();
    const nomeConta = 'ContaComMovimentcao-' + randomUUID();

    await contasDSL.acessarCadastroDeConta();
    await contasDSL.adicionarConta(nomeConta);

    await movimentacaoDSL.acessarTelaCriarMovimentacao();
    await movimentacaoDSL.criarNovaMovimentacaoPago("Despesa", dataAtual, dataFuturo, nomeMovimentacao+'-Exclusão', 
    "Contratante Automação", "200", nomeConta);

    await resumoMensalDSL.acessarResumoMensal();
    await resumoMensalDSL.filtrarMovimentacoes(mes, ano);        

    await resumoMensalDSL.excluirMovimentacao(nomeMovimentacao);
    await resumoMensalPage.validarMensagemRetorno("Movimentação removida com sucesso!");
    await contasDSL.acessarListaDeContas();
    await contasDSL.excluirConta(nomeConta); // limpeza de dados

})

test('Validar se a mensagem "Conta em uso na movimentações" é exibida caso o usuário tente excluir uma conta com movimentação associada', async({loggedInPage: page, contasDSL, contasPage, movimentacaoDSL, resumoMensalDSL})=>{

    const dataAtual = await movimentacaoDSL.retornarDataAtual();
    const dataFuturo = await movimentacaoDSL.retornarDataFutura();
    const nomeMovimentacao = 'Movimentacao-' + randomUUID();
    const nomeConta = 'ContaComMovimentcao-' + randomUUID();

    await contasDSL.acessarCadastroDeConta();
    await contasDSL.adicionarConta(nomeConta);

    await movimentacaoDSL.acessarTelaCriarMovimentacao();
    await movimentacaoDSL.criarNovaMovimentacaoPago("Despesa", dataAtual, dataFuturo, nomeMovimentacao, 
    "Contratante Automação", "200", nomeConta);

    await contasDSL.acessarListaDeContas();
    await contasDSL.excluirConta(nomeConta);

    await contasPage.validarMensagemRetorno("Conta em uso na movimentações");
    await resumoMensalDSL.acessarResumoMensal();
    await resumoMensalDSL.excluirMovimentacao(nomeMovimentacao); // limpeza de dados
    await contasDSL.acessarListaDeContas();
    await contasDSL.excluirConta(nomeConta); // limpeza de dados

})

