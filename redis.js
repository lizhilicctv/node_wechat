const mysql = require("redis")
var redis = require('redis'),
    RDS_PORT = 6379,        //端口号
    RDS_HOST = '127.0.0.1',    //服务器IP
    RDS_PWD = '',     //密码 
    RDS_OPTS = {},            //设置项
    rclient = redis.createClient(RDS_PORT,RDS_HOST,RDS_OPTS);
	rclient.auth(RDS_PWD,function(){  
		//console.log('redis通过认证');  
	}); 
	
let get =async function(key){
	return await new Promise((resolve, reject) => {
		  rclient.get(key,async function(err,reply) {
			  resolve(reply)
		  })
	})
}	
let set =function(key,data,time=3600){
	rclient.set(key,JSON.stringify(data));//赋值
	rclient.expire(key,time);//30秒自动过期
}		
	
let cha =async function(key){
	return await new Promise((resolve, reject) => {
		  rclient.exists(key,async function(err,reply) {
			  if(reply===1){
				  resolve (true);
			  }else{
				  resolve (false);
			  }
		  })
	})
}	
	
module.exports={
	get,
	set,
	cha
}