const router = require('koa-router')();
const db = require('../getDb.js');
const redis = require('../redis.js');
const coon = require('../coon.js');
  






module.exports = (app) => {
	router.get('/', async (ctx, next) => {
		//核心语法检验
		if(ctx.query.type==undefined){
			ctx.status = 404;
			ctx.set("Content-Type", "application/json");
			ctx.body = {code: 0,msg: '非法获取'};
			return
		}
		//console.log(coon.lizhili(ctx.query))
		if(!coon.lizhili(ctx.query)){
			ctx.status = 404;
			ctx.set("Content-Type", "application/json");
			ctx.body = {code: 0,msg: '非法获取'};
			return
		}else{
			//这里查看账号密码是否正确
		}
	
		if(await redis.cha('key')) { //key缓存存在
			const data =await redis.get('key');
			ctx.body = {code: 1,msg: '获取成功',data:JSON.parse(data)}
		} else {//下面是缓存不存在
			let now = Date.parse(new Date())/1000; //这个是到秒
			let dataList = await db.query( "insert into xuexi (`name`,`age`,`time`) values (?,?,?);",['777',555,now]);
			if(dataList){
				redis.set('key',dataList,30);//自动序列化了
				ctx.body = {code: 1,msg: '获取成功',data:dataList}
			}else{
				ctx.body = {code: 0,msg: '获取错误'}
			}
		}
	})
    app.use(router.routes()).use(router.allowedMethods());
}
