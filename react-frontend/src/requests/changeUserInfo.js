import { graphRequest } from "./Request";

export const changeUserInfoRequest = (profilePic, token, expfunc) => {
  let requestBody = {
    query: `
            mutation changeUserInfo($profilePic: String!) {
                changeUserInfo(profilePic: $profilePic) {
                    profilePic      
                }
            }`,
    variables: { profilePic: profilePic }
  };
  return graphRequest(requestBody, token, expfunc);
};
