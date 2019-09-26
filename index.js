const Koa = require('koa');
const router = require('koa-router')();
//const bodyParser = require('koa-bodyparser');//这个是获取post请求的
//const coon = require('./coon.js');//这个是安全算法
const app = new Koa();
app.use(async (ctx, next) => {
	//核心语法检验
	// if(!coon.lizhili(ctx.query)){
	// 	ctx.status = 404;
	// 	ctx.set("Content-Type", "application/json");
	// 	ctx.body = {code: 0,msg: '非法获取'}
	// }
	
	await next()
	if (ctx.status == 404) {
		ctx.status = 404;
		ctx.set("Content-Type", "application/json");
		ctx.body = {code: 0,msg: '非法获取'}
	}
})

/*如果有多个路由文件，按照下面同样的方式引入，并应用在app上*/
const index= require('./app/index');
index(app);





//app.use(bodyParser());
app.listen(3000, () => {
	console.log('我在3000端口运行')
})


