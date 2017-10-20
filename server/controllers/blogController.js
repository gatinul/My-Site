const blogService = require('../services/blogService')
const time = require('silly-datetime')
const path = require('path');
const fs = require('fs');
const os = require('os');

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
        const reader = fs.createReadStream(file.path);
        const stream = fs.createWriteStream(path.join(__dirname, '../../', '/static/', file.name));
        stream.on('error', (error) => {
          console.log('writeStream error', error.message);
        })
        reader.pipe(stream);
        console.log('uploading %s -> %s', file.name, stream.path); 
        result.success = true
        ctx.body = result
      }else{
        result.message = '文件不能为空'    
      }
      ctx.body = result
    }
}