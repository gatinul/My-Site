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
   * 判断文件是否已存在（然后可选择是否覆盖）
   * @param  {object} param
   */
  isExist(param){
    return fetch("blog/isExist",param)
  },
  /**
   * 插入 blog_tag_md ,配置文件标签关系
   * @param  {object} param
   */
  addFileTag(param){
    return fetch("blog/addFileTag",param)
  },
  /**
   * 更新 文件-标签关系
   * @param  {object} param
   */
  updateFileTag(param){
    return fetch("blog/updateFileTag",param)
  }
};
