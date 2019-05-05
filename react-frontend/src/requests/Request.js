export const graphRequest = (body, token, expfunc) => {
  const headers = {
    "Content-Type": "application/json"
  };
  if (token) {
    //ceck if token is Expired before every authorized request
    const valid = expfunc();
    if (!valid) {
      return Promise.reject(new Error("Your token expired!"));
    }
    headers.Authorization = "Bearer " + token;
  }
  return fetch("/graphql", {
    method: "POST",
    body: JSON.stringify(body),
    headers: headers
  }).then(res => {
    return res.json().then(res => {
      //check for error
      if (res.errors) {
        res.errors.map(error => {
          throw new Error(error.message);
        });
      } else {
        return res;
      }
    });
  });
};
