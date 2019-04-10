describe("test the auth page", function() {
  it("logging in", function() {
    const username = "Murks";
    const password = "1234";

    cy.visit("/auth");

    cy.get("input[type=name]").type(username);
    cy.get("input[type=password]").type(`${password}{enter}`);

    cy.url().should("include", "/events");
  });
});
