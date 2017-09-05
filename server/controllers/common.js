module.exports = async function(ctx) {
    console.log("render");
    await ctx.render("index.html");
};