/*
 * @Author: Yang Kun
 * @Descripttion: 
 * @Date: 2020-08-17 17:20:00
 * @LastEditors: Yang Kun
 * @LastEditTime: 2021-01-23 01:13:01
 */
const path = require('path');
const fs = require('fs');
const Koa = require('koa');
const router = require('koa-router')();
const views = require("koa-views");
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const app = new Koa();
app.use(bodyParser());
app.use(serve(path.resolve(__dirname, "./")))


app.use(async (ctx, next) => {
    await next();
    if (parseInt(ctx.status) === 404) {
        console.log(ctx.url);

        await ctx.render('404');
    }
})

// app.use(router.routes());   /*启动路由*/
// app.use(router.allowedMethods());

app.listen(3030);


app.on('error', function (err, ctx) {
    logger.error('server error', err, ctx);
});