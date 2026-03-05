import { test, expect } from './fixtures';
import { MovimentacaoDSL } from '../dsl/MovimentacaoDSL.dsl';
import { MovimentacaoPage } from '../pages/MovimentacaoPage.page';

// loggedInPage fixture handles navigation and authentication before each test

const date = new Date();
const hoje = date.toString();
const dataFuturo = date.setDate(date.getDate() + 1).toString();

test('Validar se é possível acessar a tela de Criar Movimentação', async({loggedInPage: page})=>{

    const movimentacaoPage = new MovimentacaoPage(page)
    const movimentacaoDSL = new MovimentacaoDSL(movimentacaoPage);

    await movimentacaoDSL.acessarTelaCriarMovimentacao();
    await expect(page).toHaveTitle("Seu Barriga - Movimentações");

})

test('Validar se a mensagem "Movimentação adicionada com sucesso!" é exibida ao inserir uma movimentação', async({loggedInPage: page})=>{

    const movimentacaoPage = new MovimentacaoPage(page)
    const movimentacaoDSL = new MovimentacaoDSL(movimentacaoPage);

    await movimentacaoDSL.acessarTelaCriarMovimentacao();
    await movimentacaoDSL.criarNovaMovimentacaoPago("Receita", hoje, dataFuturo, "Movimentação criada pela automação", 
    "Contratante Automação", "500", "a");
    await movimentacaoDSL.validarMengagemRetorno("Movimentação adicionada com sucesso!");

})

test('Validar se a mensagem "Data da Movimentação é obrigatório" é exibida quando o campo Data da Movimentação é deixado em branco', async({loggedInPage: page})=>{

    const movimentacaoPage = new MovimentacaoPage(page)
    const movimentacaoDSL = new MovimentacaoDSL(movimentacaoPage);

    await movimentacaoDSL.acessarTelaCriarMovimentacao();
    await movimentacaoDSL.criarNovaMovimentacaoPago("Receita", "", dataFuturo, "Movimentação criada pela automação", 
    "Contratante Automação", "500", "a");

    await movimentacaoDSL.validarMengagemRetorno("Data da Movimentação é obrigatório");

})

test('Validar se a mensagem "Data do Pagamento é obrigatório" é exibida quando o campo Data do Pagamento é deixado em branco', async({loggedInPage: page})=>{

    const movimentacaoPage = new MovimentacaoPage(page)
    const movimentacaoDSL = new MovimentacaoDSL(movimentacaoPage);

    await movimentacaoDSL.acessarTelaCriarMovimentacao();
    await movimentacaoDSL.criarNovaMovimentacaoPago("Receita", hoje, "", "Movimentação criada pela automação", 
    "Contratante Automação", "500", "a");

    await movimentacaoDSL.validarMengagemRetorno("Data do Pagamento é obrigatório");

})

test('Validar se a mensagem "Descrição é obrigatório" é exibida quando o campo Descrição é deixado em branco', async({loggedInPage: page})=>{

    const movimentacaoPage = new MovimentacaoPage(page)
    const movimentacaoDSL = new MovimentacaoDSL(movimentacaoPage);

    await movimentacaoDSL.acessarTelaCriarMovimentacao();
    await movimentacaoDSL.criarNovaMovimentacaoPago("Receita", hoje, dataFuturo, "", 
    "Contratante Automação", "500", "a");

    await movimentacaoDSL.validarMengagemRetorno("Descrição é obrigatório");

})


test('Validar se a mensagem "Interessado é obrigatório" é exibida quando o campo Interessado é deixado em branco', async({loggedInPage: page})=>{

    const movimentacaoPage = new MovimentacaoPage(page)
    const movimentacaoDSL = new MovimentacaoDSL(movimentacaoPage);

    await movimentacaoDSL.acessarTelaCriarMovimentacao();
    await movimentacaoDSL.criarNovaMovimentacaoPago("Receita", hoje, dataFuturo, "Movimentação criada pela automação", 
    "", "500", "a");

    await movimentacaoDSL.validarMengagemRetorno("Interessado é obrigatório");

})

test('Validar se a mensagem "Valor é obrigatório" é exibida quando o campo Valor é deixado em branco', async({loggedInPage: page})=>{

    const movimentacaoPage = new MovimentacaoPage(page)
    const movimentacaoDSL = new MovimentacaoDSL(movimentacaoPage);

    await movimentacaoDSL.acessarTelaCriarMovimentacao();
    await movimentacaoDSL.criarNovaMovimentacaoPago("Receita", hoje, dataFuturo, "Movimentação criada pela automação", 
    "Contratante Automação", "", "a");

    await movimentacaoDSL.validarMengagemRetorno("Valor é obrigatório");

})

test('Validar se a mensagem "Valor deve ser um número" é exibida quando o campo Valor contém caracteres não numéricos', async({loggedInPage: page})=>{

    const movimentacaoPage = new MovimentacaoPage(page)
    const movimentacaoDSL = new MovimentacaoDSL(movimentacaoPage);

    await movimentacaoDSL.acessarTelaCriarMovimentacao();
    await movimentacaoDSL.criarNovaMovimentacaoPago("Receita", hoje, dataFuturo, "Movimentação criada pela automação", 
    "Contratante Automação", "Valor", "a");

    await movimentacaoDSL.validarMengagemRetorno("Valor deve ser um número");

})

test('Validar se a mensagem "Data da Movimentação deve ser menor ou igual à data atual" é exibida quando o campo Data da Movimentação contém uma data no futuro', async({loggedInPage: page})=>{

    const movimentacaoPage = new MovimentacaoPage(page)
    const movimentacaoDSL = new MovimentacaoDSL(movimentacaoPage);

    await movimentacaoDSL.acessarTelaCriarMovimentacao();
    await movimentacaoDSL.criarNovaMovimentacaoPago("Receita", dataFuturo, dataFuturo, "Movimentação criada pela automação", 
    "Contratante Automação", "100", "a");

    await movimentacaoDSL.validarMengagemRetorno("Data da Movimentação deve ser menor ou igual à data atual");

})