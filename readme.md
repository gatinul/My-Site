### 项目管理平台

[![Build Status](https://www.travis-ci.org/gatinul/My-Site.svg?branch=master)](https://travis-ci.org/gatinul/My-Site)

[live](http://gatinul.org:7001)

### 目录结构

— server 

	— controllers	// 解析输入，返回结果

	— services	// 编写业务逻辑
	
	- models	// 与数据库连接，编写sql语句

	- routers	// 后端路由

	- utils		// 通用类

— sql

	— sql	// 初始化sql

	— util	// 解析上面sql文件夹下的sql文件

— static

	— api		// 统一接口文件

	— dist		// webpack 打包后文件

	— routes 	// 前端react路由

	— src/components		// react展示组件

	- src/containers		// react容器组件

— .travis.yml 	// travis部署配置文件

— config.js	// 数据库配置文件

— static.js		// 入口文件

### 技术应用

- react.js：前端页面展现
- antd：ui框架
- redux：暂时删除，准备使用mobx（更适用于小应用）
- react-router@3：组件路由跳转，与express路由不冲突
- webpack：打包编译
- koa@2：后台框架，异步处理更清爽
- mysql：数据库
- travis：自动部署




​	