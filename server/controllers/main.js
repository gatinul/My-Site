const userService = require('../services/main.js')
const time = require('silly-datetime')

module.exports = {
    /**
     * 登录页面
     * @param {object} ctx 
     */
    async login(ctx) {
        let formData = ctx.request.body
        let result = {
            success:false,
            message:""
        }
        let validateResult = await userService.validatorLogin(formData)
        if(!validateResult){
            result.message = '登录名或密码错误'
        }else{
            result.success = true
        }
        ctx.body = result 
        return
    },
    /**
     * 注册操作
     * @param {object} ctx 
     */
    async signUp(ctx) {
        let formData = ctx.request.body
        let result = {
                success: false,
                message: '',
                data: null
            }
            // 校验注册数据
        let validateResult = await userService.validatorSignUp(formData)
        if (validateResult.success === false) {
            result = validateResult
            ctx.body = result
            return
        }
        // 检测用户是否存在
        let isExist = await userService.isExist(formData)
        if (isExist) {
            result.message = '用户已存在'
            ctx.body = result
            return
        }
        // 创建用户
        let createResult = await userService.create({
            email: formData.email,
            password: formData.password,
            name: formData.userName,
            create_time: time.format(new Date())
        })
        if (createResult) {
            result.success = true
        } else {
            result.message = '创建失败'
        }
        ctx.body = result
    }

}