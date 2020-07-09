const db = require('../db');
//跟路由
var get_index=async (ctx, next) =>{
    ctx.body = '我是服务器，我可以处理很多请求，对应不同的路由';
}

// get路由
var get_getData = async (ctx, next) => {
    // 获取路由
    let url = ctx.url;
    //  从上下文的request对象中获取
    let request = ctx.request;
    let req_query = request.query;
    let req_queryString = request.querystring;
    //  从上下文中直接获取
    let ctx_query = ctx.query;
    let ctx_queryString = ctx.querystring;
    // 显示
    console.log(url);
    console.log(req_query);
    console.log(req_queryString);
    console.log(ctx_query);
    console.log(ctx_queryString);
    // 发送数据
    ctx.response.body = JSON.stringify("我已收到消息");
}

//post路由
var post_postData=async (ctx, next) => {
    // 获取数据
    let ID = ctx.request.body.ID;
    let Name = ctx.request.body.Name;
    // 显示
    console.log(ID);
    console.log(Name);
    // 发送数据
    ctx.response.body = JSON.stringify("我已收到消息");
}

// search路由
var search_selectData=async (ctx, next) => {
    // sql语句
    let sql = `select * from base;`
    // 查询
    await db.query(sql).then(res => {
        console.log('响应数据',res)
        //响应数据
        ctx.response.body = JSON.stringify(res);
    }).catch(e => {
        console.log(33,e)
    })
}

module.exports ={
    'GET /':get_index,
    'GET /getData':get_getData,
    'POST /postData':post_postData,
    'POST /selectData':search_selectData,
}