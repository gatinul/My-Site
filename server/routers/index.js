const router = require("koa-router")();

const main = require("./main");
const common = require("./common");
const blog = require("./blog")

router.use("*", common.routes(), common.allowedMethods());
router.use("/user", main.routes(), main.allowedMethods());
router.use("/blog", blog.routes(), blog.allowedMethods());


module.exports = router;


