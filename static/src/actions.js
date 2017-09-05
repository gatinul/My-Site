import api from "../api/index.js";

export const LOG_IN = "LOG_IN";

function loginDone(userData) {
  return {
    type: LOG_IN,
    userData
  };
}
export function login(formData) {
  return dispatch => {
    api.login(formData).then(re => {
      console.log(re);
      dispatch(loginDone(re));
    });
  };
}
