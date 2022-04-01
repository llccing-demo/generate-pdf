const Koa = require("koa");
const Router = require("@koa/router");
const render = require("koa-ejs");
const path = require("path");

const app = new Koa();
const router = new Router();

render(app, {
    root: path.join(__dirname, "views"),
    layout: "index",
    viewExt: "html",
    cache: false,
    debug: true,
});

// 命名路由 第一个参数是名字，第二个参数是路径
router.get("koa-example", "/", (ctx) => {
    return ctx.render("index");
});

router.get("koa-example", "/generate", (ctx) => {
    ctx.body = "generate a pdf";
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(1234);
console.log("listening on port 1234");
