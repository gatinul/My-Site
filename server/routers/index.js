const router = require("koa-router")();

const main = require("./main");
const common = require("./common");

router.use("*", common.routes(), common.allowedMethods());
router.use("/user", main.routes(), main.allowedMethods());


module.exports = router;


