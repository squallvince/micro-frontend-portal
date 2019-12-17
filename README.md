<div align="center">
    <img alt="dva-boot-admin" src="https://user-images.githubusercontent.com/1697158/49214902-8f888180-f402-11e8-8207-84d5cdf9d9bf.png" width="140">
</div>

<h1 align="center">Micro front-end portal</h1>

----


<div align=center>小伙伴们嗨起来～～</div>

<div align="center">
  <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg">
</div>


# Micro front-end portal

目前在开发阶段，逐步完善中。


## ⌨️ Development


主要应用<font color=red>React、Redux</font>开发

## 📦 Install

```bash
$ git clone git@gitlab.chinac.com:shacong/micro-frontends-portal.git
$ cd micro-frontends-portal
$ npm run installs
$ npm run start
```

## ✨ Features
1. [single-spa](https://single-spa.js.org/)
2. [SystemJS](https://github.com/systemjs/systemjs)

## 🌍 功能
- **通过Webpack同时启动多个项目，将项目做为子模块注入**，项目就是组件，组件还是组件
- **通过Single-spa与SystemJs实现dom的注入与卸载**，切换项目的时候可以从当前的dom结构中去掉
- **Eslint约束规范**，根据antd与react官网的开发规范定义
- **Node一键执行安装依赖以及启动与打包**，可以动态选择性的去打包与构建所需要的模块
- **Redux消息总线**，项目之间通过redux实现数据共享
- **集成了antd组件库以适用所有子项目**，所有项目可以按需引用antd组件库，UI组件样式可以根据项目风格自由搭配
- **开发语言使用TS使开发更加具有约束性**，无论是开发或者维护的时候可以更方便的排查到问题
- **代理**
- 
- 更多……

## 工程结构
```
.
├── build                    			# 打包生成的文件
├── config                   			# 应用注册配置文件以及启动生成的文件所在
├── core                     			# 主文件的放置目录
├── libs                     			# 主文件静态资源（systemjs等）的放置目录
├── projects                 			# 放置子项目的文件夹
│   ├── [name]						  # demo项目示例
│   │   ├── config					# 子项目-主要项目配置 （适配壳子）        
│   │   │   ├── project.json		  # 子项目-配置文件    （适配壳子）
│   │   ├── src						# 子项目-自身项目文件文件夹
│   │   │   ├── *****
│   │   │   ├── [name].js			  # 子项目-使用single-spa包装子项目  （适配壳子）
│   │   │   ├── store.js			  # 子项目-使用redux的项目配置，需暴露storeInstance（store）（适配壳子-非必要）
│   │   │   ├── *****
│   │   ├── webpacks					# 子项目-构建特定的适配壳子的文件目录  （适配壳子）
│   │   │   ├── webpack.config.js	  # 子项目-启动或者打包文件  （适配壳子）
│   │   │   ├── webpack.dev.js		  # 子项目-webpack热启动文件（适配壳子）
├── scripts                  			# 安装依赖，启动项目以及打包构建的文件目录
├── src                      			# 主程序目录
│   ├── base.js             		  # single-spa启动文件（包含注册应用）
│   ├── GlobalEventDistributor.js	  # redux全局注册暴露出来的类
│   ├── index.html           		  # 打包文件js应用展示容器
│   ├── register.js             	  # 暴露注册应用以及处理history的方法
│   ├── styles.css					  # 全局样式文件（可抽离）
├── webpacks        				    # webpack相关文件夹
│   ├── insertHtmlCode.js 			  # 插入页面js的webpack插件
│   ├── webpack.config.js 			  # 主项目通过webpack构建以及打包文件
│   ├── webpack.dev.js 				  # 主项目通过webpack热启动文件
├── .babelrc                 			
├── .eslintignore                 
├── .eslintrc.js   					# eslint规则文件              
├── .gitignore                 			
├── package.json  
├── README.md    
├── tsconfig.json
           			
```

## 简要说明

* 上述工程结构中，需要将子项目在projects文件夹中clone下来，然后按照上面文件要求添加 ***适配壳子*** 的文件
* 项目示例中有demo1的示例，可以按照demo1配置自己的项目
* 在执行 <font color=red>`npm run installs`</font> 的时候项目会自动为主项目以及子项目安装各自的依赖
* 在执行 <font color=red>`npm run start`</font> 的时候项目会为主项目以及子项目各自启动一个端口，这个端口是在每个项目的project.json里面配置的
* 如果需要打包启动单独的子项目，可以执行 <font color=red>`npm run start [name]`</font> 后面可以跟多个参数，参数即是子项目名称
* <font color=red>为了不影响子项目单独使用，建议针对适配壳子的文件单独开发，保证作用单一</font>
* 如果项目中没有用到redux，store.js不是必要的文件
* 每个子项目必须安装 <font color=red>single-spa-react</font> 使single-spa可以正常加载

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

欢迎大家提问题，感谢大家的PR，如果觉得不错，还请帮忙加个:star:哦
