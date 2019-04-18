export const graphRequest = (body, token) => {
  const headers = {
    "Content-Type": "application/json"
  };
  console.log(headers);
  console.log(JSON.stringify(body));
  if (token) {
    headers.Authorization = "Bearer " + token;
  }
  return fetch("http://localhost:8000/graphql", {
    method: "POST",
    body: JSON.stringify(body),
    headers: headers
  }).then(res => {
    if (res.status !== 200 && res.status !== 201) {
      //throw error when status is not ok
      throw new Error("connection failed!");
    }
    return res.json();
  });
};
