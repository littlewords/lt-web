## inode 
--------

外卖i版node服务


## 快速开始

* git clone ssh://git@git.sankuai.com/wm/waimai_i_web.git 到本地
* npm install --- 安装依赖
* npm link ---- link inode工具
* inode page --add test/testPage ---- 添加页面
* inode ajax --add test/testAjax ---- 添加ajax接口
* npm run dev ---- 启动服务


## 目录结构

* root
*   |-model            数据模型
*   |-views            视图目录
*   |-routes           controller
*   |-client           静态资源
*   |-module           公共模块
*   |-route.json       路由表

> 注释:nodejs 版本必须大于6.0.0,否则npm run dev会报错
