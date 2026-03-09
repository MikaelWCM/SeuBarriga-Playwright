import { test, expect } from './fixtures';
import { randomUUID } from 'crypto';
import { epic, feature, story, severity } from 'allure-js-commons';



// loggedInPage fixture handles navigation and authentication before each test



test('Validar se é possível acessar a tela de Criar Movimentação', async({loggedInPage: page, movimentacaoDSL})=>{

    await epic('Movimentações');
    await feature('Cadastro de Movimentação');
    await story('Acessar tela de criação de movimentação');
    await severity('critical');

    await movimentacaoDSL.acessarTelaCriarMovimentacao();
    await expect(page).toHaveTitle("Seu Barriga - Movimentações");

})

test('Validar se a mensagem "Movimentação adicionada com sucesso!" é exibida ao inserir uma movimentação', async({loggedInPage: page, contasDSL, movimentacaoDSL, movimentacaoPage, resumoMensalDSL})=>{

    const hoje = await movimentacaoDSL.retornarDataAtual();
    const dataFuturo = await movimentacaoDSL.retornarDataFutura();
    const nomeMovimentacao = 'Movimentacao-' + randomUUID();
    const nomeConta = 'ContaComMovimentcao-' + randomUUID();

    await epic('Movimentações');
    await feature('Cadastro de Movimentação');
    await story('Adicionar nova movimentação');
    await severity('critical');

    await contasDSL.acessarCadastroDeConta();
    await contasDSL.adicionarConta(nomeConta);

    await movimentacaoDSL.acessarTelaCriarMovimentacao();
    await movimentacaoDSL.criarNovaMovimentacaoPago("Receita", hoje, dataFuturo, nomeMovimentacao, 
    "Contratante Automação", "500", nomeConta);
    await movimentacaoPage.validarMensagemRetorno("Movimentação adicionada com sucesso!");
    await resumoMensalDSL.acessarResumoMensal();
    await resumoMensalDSL.excluirMovimentacao(nomeMovimentacao); // limpeza de dados
    await contasDSL.acessarListaDeContas();
    await contasDSL.excluirConta(nomeConta); // limpeza de dados

})

test('Validar se a mensagem "Data da Movimentação é obrigatório" é exibida quando o campo Data da Movimentação é deixado em branco', async({loggedInPage: page, contasDSL, movimentacaoDSL, movimentacaoPage})=>{

    const dataFuturo = await movimentacaoDSL.retornarDataFutura();
    const nomeMovimentacao = 'Movimentacao-' + randomUUID();
    const nomeConta = 'ContaComMovimentcao-' + randomUUID();

    await epic('Movimentações');
    await feature('Cadastro de Movimentação');
    await story('Adicionar nova movimentação sem data da movimentação');
    await severity('critical');

    await contasDSL.acessarCadastroDeConta();
    await contasDSL.adicionarConta(nomeConta);

    await movimentacaoDSL.acessarTelaCriarMovimentacao();
    await movimentacaoDSL.criarNovaMovimentacaoPago("Receita", "", dataFuturo, nomeMovimentacao, 
    "Contratante Automação", "500", nomeConta);

    await movimentacaoPage.validarMensagemRetorno("Data da Movimentação é obrigatório");
    await contasDSL.acessarListaDeContas();
    await contasDSL.excluirConta(nomeConta); // limpeza de dados

})

test('Validar se a mensagem "Data do Pagamento é obrigatório" é exibida quando o campo Data do Pagamento é deixado em branco', async({loggedInPage: page, contasDSL, movimentacaoDSL, movimentacaoPage})=>{

    const hoje = await movimentacaoDSL.retornarDataAtual();
    const nomeMovimentacao = 'Movimentacao-' + randomUUID();
    const nomeConta = 'ContaComMovimentcao-' + randomUUID();

    await epic('Movimentações');
    await feature('Cadastro de Movimentação');
    await story('Adicionar nova movimentação sem data do pagamento');
    await severity('critical');

    await contasDSL.acessarCadastroDeConta();
    await contasDSL.adicionarConta(nomeConta);

    await movimentacaoDSL.acessarTelaCriarMovimentacao();
    await movimentacaoDSL.criarNovaMovimentacaoPago("Receita", hoje, "", nomeMovimentacao, 
    "Contratante Automação", "500", nomeConta);

    await movimentacaoPage.validarMensagemRetorno("Data do pagamento é obrigatório");
    await contasDSL.acessarListaDeContas();
    await contasDSL.excluirConta(nomeConta); // limpeza de dados

})

test('Validar se a mensagem "Descrição é obrigatório" é exibida quando o campo Descrição é deixado em branco', async({loggedInPage: page, contasDSL, movimentacaoDSL, movimentacaoPage})=>{

    const hoje = await movimentacaoDSL.retornarDataAtual();
    const dataFuturo = await movimentacaoDSL.retornarDataFutura();
    const nomeConta = 'ContaComMovimentcao-' + randomUUID();

    
    await epic('Movimentações');
    await feature('Cadastro de Movimentação');
    await story('Adicionar nova movimentação sem descrição');
    await severity('critical');

    await contasDSL.acessarCadastroDeConta();
    await contasDSL.adicionarConta(nomeConta);

    await movimentacaoDSL.acessarTelaCriarMovimentacao();
    await movimentacaoDSL.criarNovaMovimentacaoPago("Receita", hoje, dataFuturo, "", 
    "Contratante Automação", "500", nomeConta);

    await movimentacaoPage.validarMensagemRetorno("Descrição é obrigatório");
    await contasDSL.acessarListaDeContas();
    await contasDSL.excluirConta(nomeConta); // limpeza de dados

})


test('Validar se a mensagem "Interessado é obrigatório" é exibida quando o campo Interessado é deixado em branco', async({loggedInPage: page, contasDSL, movimentacaoDSL, movimentacaoPage})=>{

    const hoje = await movimentacaoDSL.retornarDataAtual();
    const dataFuturo = await movimentacaoDSL.retornarDataFutura();
    const nomeMovimentacao = 'Movimentacao-' + randomUUID();
    const nomeConta = 'ContaComMovimentcao-' + randomUUID();


    await epic('Movimentações');
    await feature('Cadastro de Movimentação');
    await story('Adicionar nova movimentação sem interessado');
    await severity('critical');

    await contasDSL.acessarCadastroDeConta();
    await contasDSL.adicionarConta(nomeConta);

    await movimentacaoDSL.acessarTelaCriarMovimentacao();
    await movimentacaoDSL.criarNovaMovimentacaoPago("Receita", hoje, dataFuturo, nomeMovimentacao, 
    "", "500", nomeConta);

    await movimentacaoPage.validarMensagemRetorno("Interessado é obrigatório");
    await contasDSL.acessarListaDeContas();
    await contasDSL.excluirConta(nomeConta); // limpeza de dados

})

test('Validar se a mensagem "Valor é obrigatório" é exibida quando o campo Valor é deixado em branco', async({loggedInPage: page, contasDSL, movimentacaoDSL, movimentacaoPage})=>{

    const hoje = await movimentacaoDSL.retornarDataAtual();
    const dataFuturo = await movimentacaoDSL.retornarDataFutura();
    const nomeMovimentacao = 'Movimentacao-' + randomUUID();
    const nomeConta = 'ContaComMovimentcao-' + randomUUID();

    await epic('Movimentações');
    await feature('Cadastro de Movimentação');
    await story('Adicionar nova movimentação sem valor');
    await severity('critical');

    await contasDSL.acessarCadastroDeConta();
    await contasDSL.adicionarConta(nomeConta);

    await movimentacaoDSL.acessarTelaCriarMovimentacao();
    await movimentacaoDSL.criarNovaMovimentacaoPago("Receita", hoje, dataFuturo, nomeMovimentacao, 
    "Contratante Automação", "", nomeConta);

    await movimentacaoPage.validarMensagemRetorno("Valor é obrigatório");
    await contasDSL.acessarListaDeContas();
    await contasDSL.excluirConta(nomeConta); // limpeza de dados

})

test('Validar se a mensagem "Valor deve ser um número" é exibida quando o campo Valor contém caracteres não numéricos', async({loggedInPage: page, contasDSL, movimentacaoDSL, movimentacaoPage})=>{

    const hoje = await movimentacaoDSL.retornarDataAtual();
    const dataFuturo = await movimentacaoDSL.retornarDataFutura();
    const nomeMovimentacao = 'Movimentacao-' + randomUUID();
    const nomeConta = 'ContaComMovimentcao-' + randomUUID();

    await epic('Movimentações');
    await feature('Cadastro de Movimentação');
    await story('Adicionar nova movimentação com valor não numérico');
    await severity('critical');

    await contasDSL.acessarCadastroDeConta();
    await contasDSL.adicionarConta(nomeConta);

    await movimentacaoDSL.acessarTelaCriarMovimentacao();
    await movimentacaoDSL.criarNovaMovimentacaoPago("Receita", hoje, dataFuturo, nomeMovimentacao, 
    "Contratante Automação", "Valor", nomeConta);

    await movimentacaoPage.validarMensagemRetorno("Valor deve ser um número");
    await contasDSL.acessarListaDeContas();
    await contasDSL.excluirConta(nomeConta); // limpeza de dados

})

test('Validar se a mensagem "Data da Movimentação deve ser menor ou igual à data atual" é exibida quando o campo Data da Movimentação contém uma data no futuro', async({loggedInPage: page, contasDSL, movimentacaoDSL, movimentacaoPage})=>{

    const hoje = await movimentacaoDSL.retornarDataAtual();
    const dataFuturo = await movimentacaoDSL.retornarDataFutura();
    const nomeMovimentacao = 'Movimentacao-' + randomUUID();
    const nomeConta = 'ContaComMovimentcao-' + randomUUID();
    
    await epic('Movimentações');
    await feature('Cadastro de Movimentação');
    await story('Adicionar nova movimentação com data movimentação no futuro');
    await severity('critical');

    await contasDSL.acessarCadastroDeConta();
    await contasDSL.adicionarConta(nomeConta);

    await movimentacaoDSL.acessarTelaCriarMovimentacao();
    await movimentacaoDSL.criarNovaMovimentacaoPago("Receita", dataFuturo, dataFuturo, nomeMovimentacao, 
    "Contratante Automação", "100", nomeConta);

    await movimentacaoPage.validarMensagemRetorno("Data da Movimentação deve ser menor ou igual à data atual");
    await contasDSL.acessarListaDeContas();
    await contasDSL.excluirConta(nomeConta); // limpeza de dados

})