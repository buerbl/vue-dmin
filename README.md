# vue-admin

## Project setup
```
npm install
```
安装依赖

### Compiles and hot-reloads for development
```
npm run serve
```
启动项目

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration1
See [Configuration Reference](https://cli.vuejs.org/config/).

##  安装less
```java
npm install less less-loader --save-dev
```

## 表单验证重置

重置需要与验证一起

## 返回 promise时候

使用异步请求

## 修改端口号

在 vue.config.js 文件下（没有就新建）

```js
module.exports = {
    devServer: {
      port: 8989,
    },
    lintOnSave: false,
  };
```


## package.json

文件存在需要引入的插件依赖,相当后端的maven
