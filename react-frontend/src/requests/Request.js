export const graphRequest = (body, token) => {
  const headers = {
    "Content-Type": "application/json"
  };
  if (token) {
    headers.Authorization = "Bearer " + token;
  }
  return fetch("http://192.168.178.27:8000/graphql", {
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
