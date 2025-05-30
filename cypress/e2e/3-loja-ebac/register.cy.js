import { faker } from "@faker-js/faker";

describe("Funcionalidade: Registro", () => {
  beforeEach(() => {
    cy.visit("minha-conta");
  });

  afterEach(() => {
    cy.screenshot();
  });

  it("Deve fazer registro com sucesso", () => {
    const email = faker.internet.email().toLocaleLowerCase();
    const password = faker.internet.password();
    const username = email.split("@")[0];
    cy.get("#reg_email").type(email);
    cy.get("#reg_password").type(password);
    cy.get(".form-group > .button").click();
    cy.get(".woocommerce-MyAccount-content").should(
      "contain",
      `Olá, ${username}`
    );
  });

  it("Deve exibir mensagem de erro ao inserir usuário já cadastrado", () => {
    const email = "usuariosupermisterioso@teste.com";
    const password = "senha1234@4321";
    cy.get("#reg_email").type(email);
    cy.get("#reg_password").type(password);
    cy.get(".form-group > .button").click();
    cy.get(".woocommerce-error > li").should(
      "contain",
      "Uma conta já está registrada com seu endereço de e-mail."
    );
  });

  // essa mensagem é exibida pelo browser, não pelo site
  // it("Deve exibir mensagem de erro ao inserir e-mail inválido", () => {
  //     const email = "emailinvalido";
  //     const password = "senha1234@4321";
  //     cy.get("#reg_email").type(email)
  //     cy.get("#reg_password").type(password)
  //     cy.get(".form-group > .button").click()
  // })

  it("Deve reclamar que a senha é muito fraca", () => {
    const email = faker.internet.email().toLocaleLowerCase();
    const password = "1234";
    cy.get("#reg_email").type(email);
    cy.get("#reg_password").type(password);
    cy.get(".woocommerce-password-strength").should(
      "contain",
      "Muito fraca - Digite uma senha segura."
    );
  });

  it("Deve reclamar que a senha é fraca", () => {
    const email = faker.internet.email().toLocaleLowerCase();
    const password = "Senha1234";
    cy.get("#reg_email").type(email);
    cy.get("#reg_password").type(password);
    cy.get(".woocommerce-password-strength").should(
      "contain",
      "Fraca - Digite uma senha segura."
    );
  });

  it("Deve reclamar que a senha é média", () => {
    const email = faker.internet.email().toLocaleLowerCase();
    const password = "Senha1234@se";
    cy.get("#reg_email").type(email);
    cy.get("#reg_password").type(password);
    cy.get(".woocommerce-password-strength").should("contain", "Médio");
  });

  it("Deve reclamar que a senha é forte", () => {
    const email = faker.internet.email().toLocaleLowerCase();
    const password = "Senha1234@segura";
    cy.get("#reg_email").type(email);
    cy.get("#reg_password").type(password);
    cy.get(".woocommerce-password-strength").should("contain", "Forte");
  });

  it("Não deve permitir registro com senha vazia", () => {
    const email = faker.internet.email().toLocaleLowerCase();
    cy.get("#reg_email").type(email);
    cy.get("#reg_password").clear();
    cy.get(".form-group > .button").click();
    cy.get(".woocommerce-error > li").should(
      "contain",
      "Erro: Digite a senha da conta."
    );
  });

  it("Não deve permitir registro com e-mail vazio", () => {
    cy.get("#reg_email").clear();
    cy.get("#reg_password").type("senha1234@4321");
    cy.get(".form-group > .button").click();
    cy.get(".woocommerce-error > li").should(
      "contain",
      "Informe um endereço de e-mail válido."
    );
  });

  it("Não deve permitir registro com e-mail inválido", () => {
    const email = "emailinvalido@gmail";
    cy.get("#reg_email").type(email);
    cy.get("#reg_password").type("senha1234@4321");
    cy.get(".form-group > .button").click();
    cy.get(".woocommerce-error > li").should(
      "contain",
      "Informe um endereço de e-mail válido."
    );
  });
});
