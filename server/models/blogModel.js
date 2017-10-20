const db = require('../utils/db.config.js')

const blog = {
    /**
     * 插入表blog_tag_md中
     * @param {object} model 
     */
    async insertFileTag(model) {
        console.log(`创建时间：${model.create_time}`)
        let result = await db.insertData('blog_tag_md', model)
        return result
    },
    /**
     * 检查是否已存在
     * @param {object} options 
     */
    async isExist(options) {
      let _sql = `
          SELECT * FROM blog_tag_md 
          WHERE md="${options.md}"`
      let result = await db.query(_sql)
      if (Array.isArray(result) && result.length > 0) {
          result = result[0]
      } else {
          result = null
      }
      return result
    },
    /**
     * 更新 文件-标签 关系
     * @param  {object} model
     */
    async updateFileTag(model) {
      let _sql = `
          UPDATE blog_tag_md SET tag_name= "${model.tag_name}", md= "${model.md}", remark= "${model.remark}"
          WHERE md="${model.md}"`
      let result = await db.query(_sql)
      return result
    }
}

module.exports = blog;