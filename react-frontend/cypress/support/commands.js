Cypress.Commands.add("login", (username, password, canfail) => {
  let requestBody = {
    query: `
                query Login ($name: String!, $password: String!){
                    login(name: $name, password: $password) {
                        userId
                        token
                        tokenExpiration
                        userName
                        profilePic
                    }
                }`,
    variables: {
      name: username,
      password: password
    }
  };

  cy.request({
    method: "POST",
    url: "http://localhost:8000/graphql",
    body: JSON.stringify(requestBody),
    headers: {
      "Content-Type": "application/json"
    },
    failOnStatusCode: canfail
  }).then(resData => {
    if (resData.status !== 200 && resData.status !== 201) {
      window.localStorage.setItem("token", "");
      window.localStorage.setItem("userId", "");
      window.localStorage.setItem("userName", "");
      window.localStorage.setItem("profilePic", "");
      return;
    }
    window.localStorage.setItem("token", resData.body.data.login.token);
    window.localStorage.setItem("userId", resData.body.data.login.userId);
    window.localStorage.setItem("userName", resData.body.data.login.userName);
    window.localStorage.setItem(
      "profilePic",
      resData.body.data.login.profilePic
    );
  });
});
