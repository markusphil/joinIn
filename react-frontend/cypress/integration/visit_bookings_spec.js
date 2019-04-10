describe("visit booking page", function() {
  //graphQL login request
  const username = "Murks";
  const password = "1234";

  let requestBody = {
    query: `
            query Login ($name: String!, $password: String!){
                login(name: $name, password: $password) {
                    userId
                    token
                    tokenExpiration
                }
            }`,
    variables: {
      name: username,
      password: password
    }
  };

  it("get permission", function() {
    cy.visit("/");
    cy.request({
      method: "POST",
      url: "http://localhost:8000/graphql",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json"
      }
    });
  });
});
