describe("visit booking page", function() {
  //graphQL login request

  it.only("get permission to bookings page", function() {
    cy.login("Murks", "1234", true);
    cy.visit("/bookings");
    cy.url().should("include", "/bookings");
  });

  it("get redirected with invalid password", function() {
    cy.login("Murks", "123", false);
    cy.visit("/bookings");
    cy.url().should("include", "/auth");
  });
});
