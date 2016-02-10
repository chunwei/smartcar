WeUI 为微信 Web 服务量身设计  ![](https://travis-ci.org/weui/weui.svg?branch=master)
====

## 概述

WeUI是一套同微信原生视觉体验一致的基础样式库，由微信官方设计团队为微信 Web 开发量身设计，可以令用户的使用感知更加统一。包含`button`、`cell`、`dialog`、 `progress`、 `toast`、`article`、`actionsheet`、`icon`等各式元素。

## 使用

#### 方法一：
使用`bower`进行下载
```
bower install --save weui
```

#### 方法二：
使用`npm`进行下载
```
npm install --save weui
```

以上两种方法下载后，只需要在页面中引入`dist/style/weui.css`或者`dist/style/weui.min.css`其中之一即可. 例如:

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0">
        <title>WeUI</title>
        <link rel="stylesheet" href="path/to/weui/dist/style/weui.min.css"/>
    </head>
    <body>

    </body>
</html>
```

## 开发

```
git clone https://github.com/weui/weui.git
cd weui
npm install -g gulp
npm install
npm start
```
运行`npm start`命令，会监听`src`目录下所有文件的变更，并且默认会在`8080`端口启动服务器，然后在浏览器打开 `http://localhost:8080/example`。