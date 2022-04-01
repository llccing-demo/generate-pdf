const Koa = require("koa");
const Router = require("@koa/router");
const render = require("koa-ejs");
const path = require("path");
const fs = require("fs");
const { printPDF } = require("./generate");
console.log("export a", printPDF);

const app = new Koa();
const router = new Router();

render(app, {
    root: path.join(__dirname, "views"),
    layout: "index",
    viewExt: "html",
    cache: false,
    debug: false,
});

// 命名路由 第一个参数是名字，第二个参数是路径
router.get("koa-example", "/", (ctx) => {
    return ctx.render("index");
});

router.get("koa-example", "/generate", async (ctx) => {
    const pdf = await printPDF();
    ctx.set("Content-disposition", "attachment; filename=" + "TEST.pdf");
    ctx.set("Content-type", "application/pdf");
    ctx.body = pdf;
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(1234);
console.log("listening on port 1234");
