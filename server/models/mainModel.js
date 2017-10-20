const db = require('../utils/db.config.js')

const user = {
    /**
     * 注册创建用户
     * @param {object} model 
     */
    async create(model) {
        console.log(`创建时间：${model.create_time}`)
        let result = await db.insertData('user',model)
        return result
    },
    /**
     * 检查是否已存在
     * @param {object} options 
     */
    async isExist(options) {
        let _sql = `
            SELECT * FROM user 
            WHERE email="${options.email}" or name="${options.name}"`
        let result = await db.query(_sql)
        if (Array.isArray(result) && result.length > 0) {
            result = result[0]
        } else {
            result = null
        }
        return result
    },
    /**
     * 校验登录名，密码是否正确
     * @param {object} options 
     */
    async canLogin(options){
        let _sql = `
            SELECT * FROM user
            WHERE NAME = "${options.name}" and PASSWORD = "${options.password}"
        `
        let result = await db.query(_sql)
        if (Array.isArray(result) && result.length > 0) {
            
        } else {
            result = null
        }
        return result
    }
}

module.exports = user;