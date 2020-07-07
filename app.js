const Koa = require('koa');
const router = require('koa-router')(); //使用路由 注意这里最后是函数调用
const cors = require('koa2-cors');//处理跨域
const bodyParser = require('koa-bodyparser');//处理post请求
const mysql = require('mysql');//操作数据库
// const connection = mysql.createConnection
// ({
//     host     : 'localhost',
//     user     : 'root',
//     password : '*******', // 你的MySQL数据库root密码
//     database : '*******'	// 要连接的数据库名
// });
//
// connection.connect();	// 打开连接

const app = new Koa();

// 添加路由
// 根路由
router.get('/', async (ctx, next) =>{
    ctx.body = '我是服务器，我可以处理很多请求，对应不同的路由';
});
// get路由
router.get('/getData', async (ctx, next) => {
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
});
// post路由
router.post('/postData', async (ctx, next) => {
    // 获取数据
    let ID = ctx.request.body.ID;
    let Name = ctx.request.body.Name;
    // 显示
    console.log(ID);
    console.log(Name);
    // 发送数据
    ctx.response.body = JSON.stringify("我已收到消息");
});
//search路由
router.post('/selectData', async (ctx, next) => {
    // sql语句
    let sqlStr = `select * from user;`
    // 查询
    connection.query(sqlStr, function (error, results, fields) {
        if (error) {
            console.log(error);
        }
        // 发送结果
        console.log(results);
        ctx.response.body = JSON.stringify(results);
    });
});

app
  .use(cors())//允许跨域
  .use(bodyParser())  // 注意最后是函数调用
  .use(router.routes()) // 声明使用路由
app.listen(8080, () => {
    console.log('服务器启动成功');
    console.log('Server running at http://127.0.0.1:8080');
});