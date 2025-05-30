describe("Funcionalidade: Produtos", () => {
  beforeEach(() => {
    cy.visit("produtos");
  });

  afterEach(() => {
    cy.screenshot();
  });

  it("Deve listar os produtos", () => {
    cy.get(".products").should("exist");
    cy.get(".product").should("have.length.greaterThan", 0);
  });

  it("Deve pegar o primeiro produto da lista", () => {
    cy.get(".product-block > .block-inner").first().click();
    cy.get(".product_title").should("exist");
  });

  it("Deve adicionar o primeiro produto ao carrinho, caso haja estoque", () => {
    cy.get(".product-block > .block-inner").first().click();
    cy.get(".button-variable-item-L").click();
    cy.get(".button-variable-item-Green").click();
    cy.get(".single_add_to_cart_button").click();
    cy.get(".dropdown-toggle > .mini-cart-items").should("contain", "1");
  });

  it("Deve tentar adicionar o primeiro produto ao carrinho, exibindo mensagem de erro caso não haja estoque", () => {
    cy.get(".product-block > .block-inner").first().click();
    cy.get(".button-variable-item-M").click();
    cy.get(".button-variable-item-Green").click();
    cy.get(".single_add_to_cart_button").click();
    cy.get(".stock").should("contain", "Fora de estoque");
  });
});
