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

  it("get permission to bookings page", function() {
    cy.request({
      method: "POST",
      url: "http://localhost:8000/graphql",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(resData => {
      window.localStorage.setItem("token", resData.body.data.login.token);
      window.localStorage.setItem("userId", resData.body.data.login.userId);
    });
    cy.visit("/bookings");
  });
});
