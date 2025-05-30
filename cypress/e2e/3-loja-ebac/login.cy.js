const perfil = require("../../fixtures/perfil.json");

describe("Funcionalidade: Login", () => {
  beforeEach(() => {
    // Acessando a página de login
    cy.visit("minha-conta");
  });

  afterEach(() => {
    cy.screenshot();
  });

  it("Deve fazer login com sucesso", () => {
    const email = perfil.email;
    const password = perfil.password;
    const username = email.split("@")[0];
    cy.get("#username").type(email);
    cy.get("#password").type(password);
    cy.get(".woocommerce-form > .button").click();
    cy.url().should("include", "/minha-conta/");
    cy.get(".woocommerce-MyAccount-content > p").should(
      "contain",
      `Olá, ${username}`
    );
  });

  it("Deve exibir mensagem de erro ao inserir usuário inválido", () => {
    const email = "usuarioinexistente@teste.com";
    const password = "senhaerrada";
    cy.get("#username").type(email);
    cy.get("#password").type(password);
    cy.get(".woocommerce-form > .button").click();
    cy.url().should("include", "/minha-conta/");
    cy.get(".woocommerce-error > li").should(
      "contain",
      "Endereço de e-mail desconhecido. Verifique novamente ou tente seu nome de usuário."
    );
  });

  it("Deve exibir mensagem de erro ao inserir senha inválida", () => {
    const email = perfil.email;
    const password = "senhaerrada";
    cy.get("#username").type(email);
    cy.get("#password").type(password);
    cy.get(".woocommerce-form > .button").click();
    cy.url().should("include", "/minha-conta/");
    cy.get(".woocommerce-error > li").should(
      "contain",
      `A senha fornecida para o e-mail ${email} está incorreta.`
    );
  });
});
