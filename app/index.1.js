const router = require('koa-router')();
const db = require('../getDb.js');
const coon = require('../coon.js');
var redis = require('redis'),
    RDS_PORT = 6379,        //端口号
    RDS_HOST = '127.0.0.1',    //服务器IP
    RDS_PWD = '',     //密码 
    RDS_OPTS = {},            //设置项
    rclient = redis.createClient(RDS_PORT,RDS_HOST,RDS_OPTS);
	rclient.auth(RDS_PWD,function(){  
		//console.log('redis通过认证');  
	}); 
	
	
	
async function charedis(key) {
  return await new Promise((resolve, reject) => {
	  rclient.exists(key,async function(err,reply) {
		  resolve(reply)
	  })
  })
}
async function getredis(key) {
	  return await new Promise((resolve, reject) => {
		  rclient.get(key,async function(err,reply) {
			  resolve(reply)
		  })
	  })
 }	  
		  
		  
module.exports = (app) => {
	router.get('/', async (ctx, next) => {
		//核心语法检验
		if(!coon.lizhili(ctx.query)){
			ctx.status = 404;
			ctx.set("Content-Type", "application/json");
			ctx.body = {code: 0,msg: '非法获取'}
		}else{
			//这里查看账号密码是否正确
		}
		
		const deng = async () => { //并行执行
		    const reply =await charedis('key');
			if(reply === 1) { //key缓存存在
				const data =await getredis('key');
				ctx.body = {code: 1,msg: '获取成功',data:JSON.parse(data)}
			} else {//下面是缓存不存在
				let now = Date.parse(new Date())/1000; //这个是到秒
				let dataList = await db.query( "insert into xuexi (`name`,`age`,`time`) values (?,?,?);",['777',555,now]);
				rclient.set('key',JSON.stringify(dataList));//赋值
				rclient.expire('key',30);//30秒自动过期
				let data =dataList;
				ctx.body = {code: 1,msg: '获取成功',data:data}
			}
		 }
		await deng()
	})
    app.use(router.routes()).use(router.allowedMethods());
}
