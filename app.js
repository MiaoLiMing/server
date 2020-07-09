const Koa = require('koa');
const cors = require('koa2-cors');//处理跨域
const bodyParser = require('koa-bodyparser');//处理post请求
const controller = require('./controller');//导入controller middleware:

const app = new Koa();

app
  .use(cors())//允许跨域
  .use(bodyParser())  // 注意最后是函数调用
  .use(controller());// 使用middleware (包含路由)

app.listen(8080, () => {
    console.log('服务器启动成功');
    console.log('服务器地址: http://127.0.0.1:8080');
});