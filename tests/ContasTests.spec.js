import { test, expect } from './fixtures';
import { randomUUID } from 'crypto';

// login handled by loggedInPage fixture

test('Verificar se é possível acessar a tela Adicionar Conta', async({loggedInPage: page, contasDSL})=>{

  await contasDSL.acessarCadastroDeConta();

  await expect(page).toHaveTitle('Seu Barriga - Adicionar Conta');

})


test('Verificar se é possível acessar a tela Lista de Contas', async({loggedInPage: page, contasDSL})=>{

  await contasDSL.acessarListaDeContas();

  await expect(page).toHaveTitle('Seu Barriga - Contas');

})

test('Verificar se a mensagem "Conta adicionada com sucesso!" é exibida ao adicionar uma nova conta', async({loggedInPage: page, contasDSL, contasPage})=>{

  const nomeConta = 'Conta-' + randomUUID();

  await contasDSL.acessarCadastroDeConta();
  await contasDSL.adicionarConta(nomeConta);
  await contasPage.validarMensagemRetorno("Conta adicionada com sucesso!");
  await contasDSL.acessarListaDeContas();
  await contasDSL.excluirConta(nomeConta); // limpeza de dados
})

test('Verificar se a mensagem "Informe o nome da conta" é exibida ao tentar salvar conta sem nome', async({loggedInPage: page, contasDSL, contasPage})=>{

  await contasDSL.acessarCadastroDeConta();
  await contasDSL.adicionarConta("");
  await contasPage.validarMensagemRetorno("Informe o nome da conta");

})

test('Verificar se a mensagem "Já existe uma conta com esse nome!" é exibida caso o usuário tente cadastrar duas contas com o mesmo nome', async({loggedInPage: page, contasDSL, contasPage})=>{

  const nomeConta = 'Conta-' + randomUUID();

  await contasDSL.acessarCadastroDeConta();
  await contasDSL.adicionarConta(nomeConta);
  await contasDSL.acessarCadastroDeConta();
  await contasDSL.adicionarConta(nomeConta);
  await contasPage.validarMensagemRetorno("Já existe uma conta com esse nome!");
   await contasDSL.acessarListaDeContas();
  await contasDSL.excluirConta(nomeConta); // limpeza de dados
})

test('Validar se a mensagem "Conta alterada com sucesso!" é exibida ao editar o nome de uma conta', async({loggedInPage: page, contasDSL, contasPage})=>{

  const nomeConta = 'Conta-' + randomUUID();

  await contasDSL.acessarCadastroDeConta();
  await contasDSL.adicionarConta(nomeConta);
  await contasDSL.acessarListaDeContas();
  await contasDSL.editarConta(nomeConta, nomeConta + '1');
  await contasPage.validarMensagemRetorno("Conta alterada com sucesso!");
   await contasDSL.acessarListaDeContas();
  await contasDSL.excluirConta(nomeConta + '1'); // limpeza de dados

})

test('Validar se a mensagem "Conta removida com sucesso!" é exibida ao excluir uma conta', async({loggedInPage: page, contasDSL, contasPage})=>{

  const nomeConta = 'Conta-' + randomUUID();

  await contasDSL.acessarCadastroDeConta();
  await contasDSL.adicionarConta(nomeConta);
  await contasDSL.acessarListaDeContas();
  await contasDSL.excluirConta(nomeConta);

  await contasPage.validarMensagemRetorno("Conta removida com sucesso!");

})
