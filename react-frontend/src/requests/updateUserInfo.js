import { graphRequest } from "./Request";

export const updateUserInfoRequest = (profilePic, token, expfunc) => {
  let requestBody = {
    query: `
            mutation updateUserInfo($profilePic: String!) {
                updateUserInfo(profilePic: $profilePic) {
                    profilePic      
                }
            }`,
    variables: { profilePic: profilePic }
  };
  return graphRequest(requestBody, token, expfunc);
};
