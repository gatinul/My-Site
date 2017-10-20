const router = require("koa-router")();
const home = require("../controllers/commonController.js");

module.exports = router.get("*", async (ctx, next) => {
    await ctx.render('index.html')
});
