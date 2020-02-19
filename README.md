<div align="center">
  <img width="200" alt="micro front-end portal" src="https://raw.githubusercontent.com/squallvince/public/master/images/logo.png">
</div>

<h1 align="center">Micro front-end portal</h1>
----

<div align="center">
致力于打造一个跨框架、子应用可独立运行部署的微前端架构。
</div>

## ✨ 特性
- 复杂度可控: 体积小、复杂度低，每个模块或子项目由独立的开发团队完全掌控，易于维护和提高开发效率。
- 独立部署：子项目可单独部署也可和框架一起部署。
- 技术选型灵活: 根据业务的需求，灵活在子项目中选用技术栈。
- 容错: 某个子项目发生错误，不影响网站整体的运行。
- 扩展: 可满足某一子项目业务的特殊性和伸缩性。

## 🌍 功能
- **通过Webpack同时启动多个子项目并生成对应资源文件**
- **通过single-spa与systemJs实现dom的注入与卸载**
- **严格的Eslint约束规范**
- **NodeJS动态选择需要启动或打包的子项目**
- **路由分发及消息总线**
- **集成antd组件库**

## ⌨ 技术选型

通过<font color=red>NodeJS、Webpack</font>生成及支持二次构建多个SPA应用，基于<font color=red>single-spa、systemJS</font>实现此方案。

## 📚 架构
<img alt="micro front-end portal" src="https://raw.githubusercontent.com/squallvince/public/master/images/frames.png">

## 📃 工程结构
```
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
```

## ♻ Install

```bash
$ git clone git@github.com:squallvince/micro-frontend-portal.git
$ cd micro-frontends-portal
$ npm run installs（如果因为网络问题失败，请到每个子项目下运行npm install 或者 yarn）
$ npm run start
```

## 💬 简要说明

* 需要适配的子项目请到projects文件夹中git clone下来，并按照上面文件要求添加 ***适配*** 的文件。
* 目前子项目目录中有login和frames，可以参考其配置来处理自己添加的子项目。
  ```bash
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
  ```
* 项目clone到本地请先执行 <font color=red>npm run installs</font> 为所有项目安装各自依赖。
* 安装依赖后执行 <font color=red>npm run start</font> 启动主项目及子项目，请保证配置文件中的端口号是不同的。
* 如果需要启动或打包单独的子项目，可以根据提示框选择自己所需要的子项目（base设置为ture的项目不出现）。
* 兼容老的项目被引入不受影响，建议针对老项目按照<font color=red>工程目录</font>的配置添加文件。
* 如果子项目中不需要对外暴露自己的数据，store.js不必要。

## ✒ 将CloudSuite0.1集成进入的步骤

1. 进入micro-frontends-portal > projects > xxx。 
2. 创建config文件夹，并创建project.json文件：
    ```bash
    {
      "name": "xxx",
      "prefix": "/xxx",
      "main": "../src/xxx.jsx",
      "externalCss": true,
      "vendors": true,
      "runtime": true,
      "port": 8123,
      "base": false
    }
    ```
3. 创建webpacks文件夹，再依次创建webpack.common.js，webpack.dev.js，webpack.prod.js（可参考frames或者login项目的配置）。
4. 进入src目录下，并创建xxx.jsx（config/[project.json中的main关键字）及root.component.jsx（可参考frames或者login项目）。
5. 前4步完成后，子项目即完成配置。
## 💡 结尾

欢迎大家提问题，感谢大家的PR:) 如果觉得不错，还请帮忙加个:star:哦
