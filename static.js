const Koa = require("koa");
const path = require("path");
const koaStatic = require("koa-static");
const bodyParser = require("koa-bodyparser");
const koaLogger = require("koa-logger");
const views = require("koa-views");
// const Router = require('koa-router');

const routers = require("./server/routers/index.js");

const app = new Koa();

const staticPath = "static";

app.use(koaStatic(path.join(__dirname, staticPath)));

// 配置控制台日志中间件
app.use(koaLogger());

// 配置ctx.body解析中间件
app.use(bodyParser());

app.use(views(path.join(__dirname, "./static/view")));



app.use(routers.routes()).use(routers.allowedMethods());

app.listen(7001);
console.log("[demo] static is starting at port 7001");



