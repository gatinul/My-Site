const router = require("koa-router")();
const home = require("../controllers/common");

module.exports = router.get("*", async (ctx, next) => {
    await ctx.render('index.html')
});
