<div align="center">
    <img width="200" alt="micro front-end portal" src="resources/images/logo.png">
</div>

<h1 align="center">Micro front-end portal</h1>
----

<div align="center">
  <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg">
</div>


# Micro front-end portal

致力于打造一个跨框架、子应用可独立运行部署的微前端架构。


## ⌨️ Development


通过<font color=red>NodeJS、Webpack</font>生成及支持二次构建多个SPA应用，基于<font color=red>single-spa、systemJS</font>实现此方案。

## 📦 Install

```bash
$ git clone git@github.com:squallvince/micro-frontend-portal.git
$ cd micro-frontends-portal
$ npm run installs
$ npm run start
```

## ✨ Features
1. [single-spa](https://single-spa.js.org/)
2. [systemJS](https://github.com/systemjs/systemjs)

## 🌍 功能
- **通过Webpack同时启动多个子项目并注入**
- **通过single-spa与systemJs实现dom的注入与卸载**
- **Eslint约束规范**
- **NodeJS动态选择需要启动或打包的子项目**
- **路由分发及消息总线**
- **集成antd组件库**

## 架构
<img alt="micro front-end portal" src="resources/images/frames.png">

## 工程结构
```
.
├── build                    			# 打包后生成目录
├── config                   			# 配置信息目录
├── core                     			# 核心库（request/utils/register……）
├── libs                     			# 第三方资源库目录
├── projects                 			# 子项目目录
│   ├── [name]				        # demo项目示例
│   │   ├── config				# 子项目-项目配置目录        
│   │   │   ├── project.json		        # 子项目-配置文件
│   │   ├── src				        # 子项目-源代码目录
│   │   │   ├── [name].js			# 子项目-入口文件
│   │   │   ├── store.js			# 子项目-用于暴露给框架的存储文件（非必要）
│   │   ├── webpacks				# 子项目-开发及生产webpack配置目录
│   │   │   ├── webpack.common.js	        # 子项目-公用webpack配置
│   │   │   ├── webpack.dev.js		        # 子项目-开发环境配置
│   │   │   ├── webpack.prod.js		        # 子项目-生产环境配置
├── resources                                   # 用于美化readme的资源目录
├── scripts                  			# NodeJS脚本（开发/生产/二次构建）
├── src                      			# 主程序目录
│   ├── template           		        # 模块目录
│   ├── base.js             		        # 基数代码（注册已选择的子项目）
├── webpacks        				# 开发及生产webpack配置目录
│   ├── insertHtmlCode.js 		        # 开发环境插入页面js的webpack插件
│   ├── webpack.common.js 			# 公用webpack配置
│   ├── webpack.dev.js 				# 开发环境配置
│   ├── webpack.prod.js 			# 生产环境配置
├── .babelrc                 			
├── .eslintignore                 
├── .eslintrc.js   				# eslint规则文件              
├── .gitignore                 			
├── package.json  
├── README.md    
├── tsconfig.json
           			
```

## 简要说明

* 需要适配的子项目请到projects文件夹中git clone下来，并按照上面文件要求添加 ***适配*** 的文件。
* 目前子项目目录中有login和frames，可以参考其配置来处理自己添加的子项目。
  {
    "name": "name", //模块名称
      "prefix": "/module-prefix/", //模块文件路径前缀
      "main": "/module-prefix/main.js", //模块入口文件
      "store": "module-prefix/store.js", //模块消息总线的文件
      "externalCss": true, //是否要输出单独的css文件，文件名和模块名称一致
      "vendors": true, //是否要分离第三方库，参考该项目的webpack.prod.js配置
      "runtime": true, //如果分离第三方库请加上runtime
      "port": 8111, //开发环境所占用的端口号
      "base": true //是否作为基础模块运行及打包
      // 当模块被定性为base的时候, 子项目会一直加载
    }
* 项目clone到本地请先执行 <font color=red>npm run installs</font> 为所有项目安装各自依赖。
* 安装依赖后执行 <font color=red>npm run start</font> 启动主项目及子项目，请保证配置文件中的端口号是不同的。
* 如果需要启动或打包单独的子项目，可以根据提示框选择自己所需要的子项目（base设置为ture的项目不出现）。
* 兼容老的项目被引入不受影响，建议针对老项目按照<font color=red>工程目录</font>的配置添加文件。
* 如果子项目中不需要对外暴露自己的数据，store.js不必要。

## 代码提交规范

| **类型**        	| **描述**
| --------   		| :--------------------------------
| feat        	| 新增feature 
| fix        		| 修复bug
| docs        	| 仅仅修改了文档，比如README, CHANGELOG, CONTRIBUTE等
| style        	| 修改了空格、格式缩进、逗号等，不改变代码逻辑
| refactor		| 代码重构，没有加新功能或者修复bug
| perf				| 优化相关，比如提升性能、体验
| test				| 测试用例，包括单元测试、集成测试等
| chore			| 改变构建流程、或者增加依赖库、工具等
| revert			| 回滚到上一个版本

## 结尾

欢迎大家提问题，感谢大家的PR:) 如果觉得不错，还请帮忙加个:star:哦
