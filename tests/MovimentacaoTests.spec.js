import { test, expect } from './fixtures';
import { MovimentacaoDSL } from '../dsl/MovimentacaoDSL.dsl';
import { MovimentacaoPage } from '../pages/MovimentacaoPage.page';

// loggedInPage fixture handles navigation and authentication before each test


test('Validar se é possível acessar a tela de Criar Movimentação', async({loggedInPage: page})=>{

    await page.locator('a:has-text("Criar Movimentação")').click();
    await expect(page).toHaveTitle("Seu Barriga - Movimentações");

})

test('Validar se é possível inserir uma movimentação do tipo Receita/Pago', async({loggedInPage: page})=>{

    const movimentacaoPage = new MovimentacaoPage(page)
    const movimentacaoDSL = new MovimentacaoDSL(movimentacaoPage);

    await movimentacaoDSL.criarNovaMovimentacaoPago("Receita", "02/03/2026", "03/03/2026", "Movimentação criada pela automação", 
    "Contratante Automação", "500", "a");

    await expect(page.locator("div[role='alert']")).toContainText('Movimentação adicionada com sucesso!');

})

test('Validar se o campo Data da Movimentação é obrigatório', async({loggedInPage: page})=>{

    const movimentacaoPage = new MovimentacaoPage(page)
    const movimentacaoDSL = new MovimentacaoDSL(movimentacaoPage);

    await movimentacaoDSL.criarNovaMovimentacaoPago("Receita", "", "03/03/2026", "Movimentação criada pela automação", 
    "Contratante Automação", "500", "a");

    await expect(page.locator("div[role='alert']")).toContainText('Data da Movimentação é obrigatório');

})

test('Validar se o campo Data do Pagamento é obrigatório', async({loggedInPage: page})=>{

    const movimentacaoPage = new MovimentacaoPage(page)
    const movimentacaoDSL = new MovimentacaoDSL(movimentacaoPage);

    await movimentacaoDSL.criarNovaMovimentacaoPago("Receita", "03/03/2026", "", "Movimentação criada pela automação", 
    "Contratante Automação", "500", "a");

    await expect(page.locator("div[role='alert']")).toContainText('Data do pagamento é obrigatório');

})

test('Validar se o campo Descrição é obrigatório', async({loggedInPage: page})=>{

    const movimentacaoPage = new MovimentacaoPage(page)
    const movimentacaoDSL = new MovimentacaoDSL(movimentacaoPage);

    await movimentacaoDSL.criarNovaMovimentacaoPago("Receita", "03/03/2026", "04/03/2026", "", 
    "Contratante Automação", "500", "a");

    await expect(page.locator("div[role='alert']")).toContainText('Descrição é obrigatório');

})


test('Validar se o campo Interessado é obrigatório', async({loggedInPage: page})=>{

    const movimentacaoPage = new MovimentacaoPage(page)
    const movimentacaoDSL = new MovimentacaoDSL(movimentacaoPage);

    await movimentacaoDSL.criarNovaMovimentacaoPago("Receita", "03/03/2026", "04/03/2026", "Movimentação criada pela automação", 
    "", "500", "a");

    await expect(page.locator("div[role='alert']")).toContainText('Interessado é obrigatório');

})

test('Validar se o campo Valor é obrigatório', async({loggedInPage: page})=>{

    const movimentacaoPage = new MovimentacaoPage(page)
    const movimentacaoDSL = new MovimentacaoDSL(movimentacaoPage);

    await movimentacaoDSL.criarNovaMovimentacaoPago("Receita", "03/03/2026", "04/03/2026", "Movimentação criada pela automação", 
    "Contratante Automação", "", "a");

    await expect(page.locator("div[role='alert']")).toContainText('Valor é obrigatório');

})

test('Validar se o campo Valor aceita somente valores do tipo número', async({loggedInPage: page})=>{

    const movimentacaoPage = new MovimentacaoPage(page)
    const movimentacaoDSL = new MovimentacaoDSL(movimentacaoPage);

    await movimentacaoDSL.criarNovaMovimentacaoPago("Receita", "03/03/2026", "04/03/2026", "Movimentação criada pela automação", 
    "Contratante Automação", "Valor", "a");

    await expect(page.locator("div[role='alert']")).toContainText('Valor deve ser um número');

})

test('Validar se o sistema bloqueia movimentações com Data de Movimentação no futuro', async({loggedInPage: page})=>{

    const hoje = new Date();
    const dataFuturo = hoje.setDate(hoje.getDate() + 1).toString();

    const movimentacaoPage = new MovimentacaoPage(page)
    const movimentacaoDSL = new MovimentacaoDSL(movimentacaoPage);

    await movimentacaoDSL.criarNovaMovimentacaoPago("Receita", dataFuturo, "04/03/2026", "Movimentação criada pela automação", 
    "Contratante Automação", "100", "a");

    await expect(page.locator("div[role='alert']")).toContainText('Data da Movimentação deve ser menor ou igual à data atual');

})