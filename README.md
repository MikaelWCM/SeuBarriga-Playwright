## E2E Test Automation SeuBarriga - Playwright


Projeto de automação de testes End-to-End (E2E) dos fluxos críticos do site SeuBarriga (https://seubarriga.wcaquino.me/login) utilizando Playwright.

### Objetivos do projeto

Este projeto foi criado com os seguintes objetivos:
- Praticar boas práticas de automação de testes
- Implementar arquitetura escalável de testes
- Aplicar padrões de design utilizados em automação
- Gerar relatórios detalhados de execução

### Stack utilizada

- Node.js
- Playwright
- JavaScript / TypeScript
- Allure Report
- Git

### Padrões de design aplicados

#### Page Object Model (POM)

O padrão Page Object Model foi utilizado para encapsular os elementos e ações das páginas. Cada página da aplicação possui uma classe responsável por:

- Mapear elementos da interface
- Centralizar interações com a página


##### Benefícios

- Reduz duplicação de código
- Melhora manutenção
- Separa lógica de teste da interface

#### Domain Specific Language (DSL)

Foi implementada uma camada DSL (Domain Specific Language) para tornar os testes mais legíveis e próximos da linguagem de negócio. Com isso, os testes descrevem ações de negócio ao invés de apenas interações técnicas.

##### Benefícios:

- Maior legibilidade
- Menor acoplamento com a UI
- Testes mais próximos da regra de negócio

### Estratégia de testes

Os testes automatizados foram desenvolvidos para validar fluxos críticos da aplicação.

##### Cobertura atual:

- Fluxos de cadastro, edição e exclusão de contas
- Fluxo de cadastro de nova movimentação
- Validação das regras de negócio do fluxo de cadastro de movimentação
- Fluxo de exclusão de uma movimentação
- Cenários positivos e negativos

##### Tipos de testes implementados:

- Testes End-to-End (E2E)
- Validação de fluxo de usuário
- Testes de interface

### Relatórios de execução

O projeto utiliza Allure Report para geração de relatórios detalhados. Os relatórios incluem:

- Status dos testes (pass / fail)
- Tempo de execução
- Evidências de falha (screenshots)

### Executando o projeto

Siga os passos abaixo para configurar e executar os testes automatizados localmente.

##### Clonar o repositório

- git clone https://github.com/MikaelWCM/SeuBarriga-Playwright.git
- cd SeuBarriga-Playwright

#####  Instalar dependências do projeto

- npm install

#####  Instalar os browsers do Playwright

- npx playwright install

#####  Executar os testes

- npx playwright test

##### Gerar relatório Allure

- npm run report

### Melhorias futuras

Algumas melhorias planejadas para evolução do projeto:

- Execução paralela de testes
- Testes de API
- Estratégia de massa de dados
- Execução em múltiplos browsers
- Integração com Docker
- Execução automática em pipeline

### Autor
Mikael Willian Costa Miranda - https://github.com/MikaelWCM
