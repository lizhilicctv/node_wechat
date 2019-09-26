var md5=require('md5-node');

function lizhili(info){
    let app_key=info['app_key'];
    delete info['app_key'];
    let wo = sortObj(info);
    let str='';
    for (const key in wo) {
        str+='&'+key+'='+wo[key]
    }
    str = str.substr(1);
    let node_key='197686741c09329446b110070f88f54d';
    if(md5(str+node_key)!=app_key){
      return false;
    }else{
      return true;
    }
}

function sortObj(obj) {
  var arr = [];
  for (var i in obj) {
      arr.push([obj[i],i]);
  };
  arr.sort(function (a,b) {
      return a[0] - b[0];
  });
  var len = arr.length,
      obj = {};
  for (var i = 0; i < len; i++) {
      obj[arr[i][1]] = arr[i][0];
  }
  return obj;
}

module.exports = {
   lizhili
};