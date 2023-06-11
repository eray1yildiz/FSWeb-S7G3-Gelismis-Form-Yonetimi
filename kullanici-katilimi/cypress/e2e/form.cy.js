describe("Testler", function () {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });
  it("name boşsa hata mesajı", function () {
    cy.get("input[name=surname]").type("benim-soyadim");
    cy.get("input[name=email]").type("name@email.com");
    cy.get("input[name=password]").type("abcdef");
    cy.get("input[name=terms]").check();
    cy.get("[data-cy=button]").click({ force: true });
  });

  it("Girilen ad-soyad doğru mu", function () {
    cy.get("input[name=firstName]").type("benim-adim");
    cy.get("input[name=surname]").type("benim-soyadim");
    cy.get("input[name=firstName]").first().should("have.value", "benim-adim");
    cy.get("input[name=surname]").first().should("have.value", "benim-soyadim");
  });

  it("Girilen şifre doğru mu", function () {
    cy.get("input[name=password]").type("abcdef");
    cy.get("input[name=password]").should("have.value", "abcdef");
  });

  it("Girilen email doğru mu", function () {
    cy.get("input[name=email]").type("name@email.com");
    cy.get("input[name=email]").should("have.value", "name@email.com");
  });

  it("Checkbox kontrolü", function () {
    cy.get("input[name=terms]").check().should("be.checked");
  });
  it("kayıtlı kullanıcı geliyor mu", function () {
    cy.get("input[name=firstName]").type("benim-adim");
    cy.get("input[name=surname]").type("benim-soyadim");
    cy.get("input[name=email]").type("name@email.com");
    cy.get("input[name=password]").type("abcdef");
    cy.get("input[name=terms]").check();
    cy.get("[data-cy=button]").click();
    cy.get("[data-cy=yeniUye]").click().should("be.visible");
  });
});
