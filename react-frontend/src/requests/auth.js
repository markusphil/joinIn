import { graphRequest } from "./Request";

export const authRequest = (formData, isLogin) => {
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
      name: formData.name,
      password: formData.password
    }
  };

  if (!isLogin) {
    requestBody = {
      query: `
              mutation Signup ($name: String!, $password: String!, $profpic: String!){
                  createUser(userInput: {name: $name, password: $password, profilePic: $profpic}) {
                      _id
                      name
                    }
              }`,
      variables: {
        name: formData.name,
        password: formData.password,
        profpic: formData.profilePic
      }
    };
  }

  return graphRequest(requestBody);
};
