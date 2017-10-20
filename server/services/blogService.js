const validator = require('validator')
const blogModel = require('../models/blogModel')
const path = require('path');
const fs = require('fs');
const os = require('os');

const blog = {
    /**
     * 文件上传
     * @param {object} formData 
     */
    uploadFiles(file,newPath){
      return new Promise(function (resolve, reject) {
        const reader = fs.createReadStream(file.path);
        const stream = fs.createWriteStream(path.join(__dirname, newPath, file.name));
        reader.pipe(stream)
        reader.on('error',(error)=>{
          return resolve({
            success:false,
            message:'上传失败，读取文件失败',
            error:error
          })
        }).pipe(stream).on('error',(error)=>{
          return resolve({
            success:false,
            message:'上传失败，写入文件失败',
            error:error
          })
        }).on('close',()=>{
          return resolve({
            success:true,
            message:'上传成功'
          })
        })
      });
    },
    /**
     * 创建新 文件-标签 关系
     * @param {object} formData 
     */
    insertFileTag(data) {
      console.log('插入blog_tag_md表')
      let result = blogModel.insertFileTag(data)
      return result
    },
    /**
     * 检验文件是否存在
     * @param  {object} data
     */
    isExist(data){
      let result = blogModel.isExist({
        md: data.fileName
      })
      return result
    },
    /**
     * 更新 文件-标签 关系
     * @param  {object} data
     */
    updateFileTag(data){
      let result = blogModel.updateFileTag(data)
      return result
    }
} 


module.exports = blog