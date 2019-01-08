# 前端模板 - ES

- [x] 支持 vanilla js 和 es2015, 2016, 2017, 2018（基于 babel）
- [x] 基于 webpack 的模块化管理和自动编译
  - [ ] es2015
  - [x] js
  - [x] css
  - [x] 图片：png, svg, jpg, gif
  - [x] 数据：json（可根据需要加入 csv, tsv, xml 格式支持）
  - [x] 字体：woff, woff2, eot, ttf, otf
- [ ] 基于 webpack 的开发服务器和热更新
- [ ] 基于 jest 的单元测试，支持使用 es 语法书写测试
- [ ] 基于 eslint 插件的语法风格检查（整合 ide 而非 webpack）

## ES 基本支持

**安装 [babel] 和预设环境**

```bash
npm i -D @babel/core @babel/preset-env
```

**安装 babel-loader**

```bash
npm i -D babel-loader
```

**在根目录创建 `.babelrc` 配置文件**

```js
{
  "presets": ["@babel/preset-env"]
}
```

**修改 webpack 配置，让 `babel-loader` 处理 js 文件**

```js
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }
  ]
}
```

**让 jest 测试支持 es 语法**

```bash
# 当你安装 Jest 时，babel-jest 是会被自动安装的，如果没有，则手动安装
npm i -D bable-jest
```

修改 `jest` 配置文件

```js

```
## 备注

- [webpack] 内置对 `import` 和 `export` 的支持，但不会修改除此之外的任何语句，所以其他部分若用到 **es6** 语法，应当使用 [babel] 插件进行编译。

- 由于测试框架 [jest] 不支持 `import` 和 `export`，所以在没有 [babel] 支持的情况下，应当使用原生的 `module.exports` 和 `require` 语句实现模块化。

- vscode 的 eslint 插件需要在工作目录中自行安装和配置 [eslint] 程序，插件本身只起到 vscode 和 eslint 的胶合和及时提示作用。

- eslint 配置中应当设置 `env.node = true`，这样才能兼容运行与 node 环境下的脚本，如 `__dirname` 等。

- 图片和字体在 `css` 中的导入是通过 `url()` 函数的，图片在 `js` 中的导入时通过 `img.src` 属性的。


[//]: 资源和链接

[webpack]: https://www.webpackjs.com/concepts/
[babel]: https://babel.docschina.org/
[jest]: https://jestjs.io/docs/zh-Hans/getting-started
[eslint]: http://eslint.cn/