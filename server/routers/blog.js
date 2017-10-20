const router = require("koa-router")();
const blog = require("../controllers/blogController");


// 与主路由拼接 ‘/user'+'/’
module.exports = router.post("/uploadFile", blog.uploadFile)
  .post("/addFileTag",blog.addFileTag)