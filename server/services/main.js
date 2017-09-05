const validator = require('validator')
const userModel = require('../models/main.js')
const user = {
    /**
     * 校验注册信息
     * @param {object} formData 
     */
    validatorSignUp(formData) {
        let result = {
            success: false,
            message: '',
        }

        if (/[a-z0-9\_\-]{2,16}/.test(formData.userName) === false) {
            result.message = '用户名格式为6-16位的小写字母，包括-、_'
            return result
        }
        if (!validator.isEmail(formData.email)) {
            result.message = '请输入正确的邮箱地址'
            return result
        }
        if (!/[\w+]{6,16}/.test(formData.password)) {
            result.message = '密码长度应该为6-16'
            return result
        }

        result.success = true

        return result
    },
    /**
     * 检测用户是否存在，通过邮箱用户名
     * @param {object} formData 
     */
    isExist(formData) {
        let result = userModel.isExist({
            email: formData.email,
            name: formData.userName
        })
        return result
    },
    /**
     * 创建新用户
     * @param {object} formData 
     */
    create(formData) {
        let result = userModel.create(formData)
        return result
    },
    /**
     * 登录校验
     * @param {object} formData 
     */
    validatorLogin(formData){
        let result = userModel.canLogin({
            name:formData.userName,
            password:formData.password
        })
        return result
    }

}


module.exports = user