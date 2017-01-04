## 快速开始

```
npm install lt-web -g
mkdir app
cd app
lt
npm install 
npm run test
```
访问 localhost:3000/demo/vue

## 添加路由
```
sudo npm link
lt-tool page --add test/index 
npm run test
```
访问 localhost:3000/test/index


## 目录结构

* root
*   |-model            数据模型
*   |-views            视图目录
*   |-routes           controller
*   |-client           静态资源
*   |-module           公共模块
*   |-route.json       路由表

> 注释:nodejs 版本必须大于6.8.0,否则npm run test会报错