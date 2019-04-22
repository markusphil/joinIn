import { graphRequest } from "./Request";

export const authRequest = (formData, isLogin) => {
  let loginBody = {
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
  let signupBody = {
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

  if (!isLogin) {
    return graphRequest(signupBody).then(resData => {
      if (resData.data.createUser) {
        return graphRequest(loginBody);
      }
    });
  } else {
    return graphRequest(loginBody);
  }
};
