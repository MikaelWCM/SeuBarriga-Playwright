import { test, expect } from './fixtures';
import { ContasPage } from '../pages/ContasPage.page';
import { ContasDSL } from '../dsl/ContasDSL.dsl';

// login handled by loggedInPage fixture


test('Verificar se é possível acessar a tela Adicionar conta', async({loggedInPage: page})=>{

  const contasPage = new ContasPage(page);
  const dslConta = new ContasDSL(contasPage);

  await dslConta.acessarCadastroDeConta();

  await expect(page).toHaveTitle('Seu Barriga - Adicionar Conta');

})

test('Verificar mensagem ao adicionar uma nova conta', async({loggedInPage: page})=>{

  const contasPage = new ContasPage(page);
  const dslConta = new ContasDSL(contasPage);

  await dslConta.adicionarConta("Zequinha");

  await expect(page.locator("div[role='alert']")).toContainText('Conta adicionada com sucesso!');
  await dslConta.excluirConta("Zequinha");
})

test('Verificar mensagem de erro ao tentar salvar conta sem nome', async({loggedInPage: page})=>{

  const contasPage = new ContasPage(page);
  const dslConta = new ContasDSL(contasPage);

  await dslConta.adicionarConta("");

  await expect(page.locator("div[role='alert']")).toContainText('Informe o nome da conta');

})

test('Verificar se o sistema não permite cadastrar duas contas com o mesmo nome', async({loggedInPage: page})=>{

  const contasPage = new ContasPage(page);
  const dslConta = new ContasDSL(contasPage);

  await dslConta.adicionarConta("Luisinho");
  await dslConta.adicionarConta("Luisinho");

  await expect(page.locator("div[role='alert']")).toContainText('Já existe uma conta com esse nome!');

  await dslConta.excluirConta("Luisinho");
})

test('Acessar Lista de Contas', async({loggedInPage: page})=>{

  const contasPage = new ContasPage(page);
  const dslConta = new ContasDSL(contasPage);

  await dslConta.acessarListaDeContas();

  await expect(page).toHaveTitle('Seu Barriga - Contas');

})

test('Validar se é possível editar o nome de uma conta', async({loggedInPage: page})=>{

  const contasPage = new ContasPage(page);
  const dslConta = new ContasDSL(contasPage);

  await dslConta.adicionarConta("Mikael");

  await dslConta.acessarListaDeContas();
  await dslConta.editarConta("Mikael", "Mikael02");

  await expect(page.locator("div[role='alert']")).toContainText('Conta alterada com sucesso!');
  await dslConta.excluirConta("Mikael02");
})

test('Validar se é possível excluir uma conta', async({loggedInPage: page})=>{

  const contasPage = new ContasPage(page);
  const dslConta = new ContasDSL(contasPage);

  await dslConta.adicionarConta("ContaExclusão");
  await dslConta.excluirConta("ContaExclusão");

  await expect(page.locator("div[role='alert']")).toContainText('Conta removida com sucesso!');

})
