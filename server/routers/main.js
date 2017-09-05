const router = require("koa-router")();
const main = require("../controllers/main");

// 与主路由拼接 ‘/user'+'/’
module.exports = router.post("/login", main.login)
    .post("/signUp", main.signUp)