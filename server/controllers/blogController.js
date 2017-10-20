const blogService = require('../services/blogService')
const time = require('silly-datetime')


module.exports = {
    /**
     * 上传md文件，发布博客
     * @param  {object} ctx
     */
    async uploadFile(ctx) {
      if ('POST' != ctx.method) return await next();
      const file = ctx.request.body.files.file;
      let result = {
        success:false,
        message:""
      }
      if(file){
        try{
          const newPath = '../../../Blog/app/md/',
          result = await blogService.uploadFiles(file,newPath)
          ctx.body = result
        }catch(error){
          console.log(error)
        }
      }else{
        result.message = '文件不能为空'    
        ctx.body = result
      }
    },
    /**
     * 添加文件和标签 关系
     * @param  {object} ctx
     */
    async addFileTag(ctx) {
      let result = {
        success:false,
        message:"",
        remark:""
      }
      if ('POST' != ctx.method) return await next();
      let data = ctx.request.body
      // 检测用户是否存在
      let isExist = await blogService.isExist(data)
      console.log('isExist',isExist)
      if (isExist) {
        // 更新blog_tag_md
        let updateResult = await blogService.updateFileTag({
          tag_name: data.value.select,
          md: data.fileName,
          remark:'更新时间'+ time.format(new Date())
        })
        if(updateResult){
          result.success = true
          result.remark = `${time.format(new Date())}: 文件< ${data.fileName} >更新`
        }else{
          result.message = '更新失败'
        }
        ctx.body = result
      }else{
        // 插入blog_tag_md
        let insertResult = await blogService.insertFileTag({
          tag_name: data.value.select,
          md: data.fileName,
          create_time: time.format(new Date())
        })
        if (insertResult) {
          result.success = true
        } else {
          result.message = '插入失败'
        }
        ctx.body = result
      }
    }
}