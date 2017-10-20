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
  },
  /**
   * 上传md文件
   * @param  {object} param
   */
  uploadFile(param){
    return fetch("blog/uploadFile",param)
  },
  /**
   * 插入 md_tag,配置文件标签关系
   * @param  {} param
   */
  addFileTag(param){
    return fetch("blog/addFileTag",param)
  }
};
