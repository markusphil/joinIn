describe("test the auth page", function() {
  it("create user", function() {
    const username = "Smogmog";
    const password = "1234";
    const profilePic =
      "https://www.pokewiki.de/images/8/86/James%E2%80%99_Smogmog.jpg";

    cy.visit("/auth");
    cy.get("button[type=Signup]").click();
    cy.get("input[type=name]").type(username);
    cy.get("input[type=password]").type(password);
    cy.get("input[type=profile_pic]").type(profilePic);
    cy.get("button[type=submit]").click();

    cy.url().should("include", "/explore");
  });
});
