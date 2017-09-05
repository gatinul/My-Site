import axios from "axios";

export function fetch(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export default {
  /**
   * 登录验证
   * @param {object} param 
   */
  userLogin(param) {
    return fetch("user/login", param);
  },
  /**
   * 注册验证
   * @param {object} param 
   */
  userSignUp(param){
    return fetch("user/signUp",param);
  }
};
