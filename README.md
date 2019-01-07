# 前端模板 - Vanilla

- [x] 原生 Javascript，不含任何防腐剂
- [x] 基于 webpack 的模块化管理和自动编译
  - [x] javascript
  - [x] css
  - [x] 图片：png, svg, jpg, gif
  - [x] 数据：json（可根据需要加入 csv, tsv, xml 格式支持）
  - [x] 字体：woff, woff2, eot, ttf, otf
- [ ] 基于 webpack 的开发服务器和热更新
- [ ] 基于 jest 的单元测试
- [ ] 基于 eslint 插件的语法风格检查（整合 ide 而非 webpack）

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