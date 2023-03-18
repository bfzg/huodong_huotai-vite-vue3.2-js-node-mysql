
### 项目环境
node.js(16.14.0) npm(8.3.1) mysql(5.7.26) vue(3.2) vite
### 项目介绍
该项目基于vite+vue3+pinia+express+mysql为全栈项目
该项目是有前台页面的  和前台页面公用一个数据库
前台地址》》》》  https://github.com/bfzg/huodong--vuecli-vue3-express-mysql
### 运行
## 运行服务
进入server目录
```
npm i
```
```
nodemon.cmd app.js
```
## 运行前端页面
在文件目录下运行
```
npm run dev
```
### 目录介绍
```
---src
   ---common   //公共样式
   ---components   //组件
      ---comments   //评论管理页面及组件
      ---individual  //个人活动管理页面及组件
      .....
   ---config     //存放动态生成菜单文件
   ---request   //存放请求文件和组件一一对应
   ---router    //路由文件
   ---store     //存放pinia文件
   ---view      //视图文件
   ---main.js
   ---app.vue
   
   server服务目录
   ---server
     ---db    //mysql配置文件
     ---router_handler     //请求处理模块
     ---router     //请求地址中间件
     ---schema     //正则中间件
     ---app.js      //主入口文件
   
   ```
