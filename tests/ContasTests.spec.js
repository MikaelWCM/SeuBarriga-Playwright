import { test, expect } from './fixtures';
import { randomUUID } from 'crypto';
import { ContasPage } from '../pages/ContasPage.page';
import { ContasDSL } from '../dsl/ContasDSL.dsl';

// login handled by loggedInPage fixture

const nomeConta = 'Conta-' + randomUUID();


test('Verificar se é possível acessar a tela Adicionar conta', async({loggedInPage: page})=>{

  const contasPage = new ContasPage(page);
  const dslConta = new ContasDSL(contasPage);

  await dslConta.acessarCadastroDeConta();

  await expect(page).toHaveTitle('Seu Barriga - Adicionar Conta');

})

test('Verificar se a mensagem "Conta adicionada com sucesso!" é exibida ao adicionar uma nova conta', async({loggedInPage: page})=>{

  const contasPage = new ContasPage(page);
  const dslConta = new ContasDSL(contasPage);

  await dslConta.acessarCadastroDeConta();
  await dslConta.adicionarConta(nomeConta);
  await dslConta.validarMengagemRetorno("Conta adicionada com sucesso!");
})

test('Verificar se a mensagem "Informe o nome da conta" é exibida ao tentar salvar conta sem nome', async({loggedInPage: page})=>{

  const contasPage = new ContasPage(page);
  const dslConta = new ContasDSL(contasPage);

  await dslConta.acessarCadastroDeConta();
  await dslConta.adicionarConta("");
  await dslConta.validarMengagemRetorno("Informe o nome da conta");

})

test('Verificar se a mensagem "Já existe uma conta com esse nome!" é exibida caso o usuário tente cadastrar duas contas com o mesmo nome', async({loggedInPage: page})=>{

  const contasPage = new ContasPage(page);
  const dslConta = new ContasDSL(contasPage);

  await dslConta.acessarCadastroDeConta();
  await dslConta.adicionarConta(nomeConta);
  await dslConta.acessarCadastroDeConta();
  await dslConta.adicionarConta(nomeConta);
  await dslConta.validarMengagemRetorno("Já existe uma conta com esse nome!");
})

test('Acessar Lista de Contas', async({loggedInPage: page})=>{

  const contasPage = new ContasPage(page);
  const dslConta = new ContasDSL(contasPage);

  await dslConta.acessarListaDeContas();

  await expect(page).toHaveTitle('Seu Barriga - Contas');

})

test('Validar se a mensagem "Conta alterada com sucesso!" é exibida ao editar o nome de uma conta', async({loggedInPage: page})=>{

  const contasPage = new ContasPage(page);
  const dslConta = new ContasDSL(contasPage);

  await dslConta.acessarCadastroDeConta();
  await dslConta.adicionarConta(nomeConta);
  await dslConta.acessarListaDeContas();
  await dslConta.editarConta(nomeConta, nomeConta + '1');
  await dslConta.validarMengagemRetorno("Conta alterada com sucesso!");

})

test('Validar se a mensagem "Conta removida com sucesso!" é exibida ao excluir uma conta', async({loggedInPage: page})=>{

  const contasPage = new ContasPage(page);
  const dslConta = new ContasDSL(contasPage);

  await dslConta.acessarCadastroDeConta();
  await dslConta.adicionarConta(nomeConta);
  await dslConta.acessarListaDeContas();
  await dslConta.excluirConta(nomeConta);

  await dslConta.validarMengagemRetorno("Conta removida com sucesso!");

})
