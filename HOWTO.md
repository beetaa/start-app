# 配置过程

## webpack 自动化

### 样式编译支持 - css

webpack 对于 css 的支持由两个 loader 完成：[css-loader] 和 [style-loader]。其中，css-loader 负责处理 css 文件，解释其中的 `@import` 和 `url()`；style-loader 负责将处理后的样式以 `<style>` 标签的形式嵌入到网页中。

- 安装 css-loader 和 style-loader

```bash
npm i -D css-loader style-loader
```

- 配置 webpack

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
}
```

### 样式编译支持 - postcss

- 安装 postcss 和 postcss-loader

```bash
npm i -D postcss postcss-loader
```

- 按需安装 postcss 插件

```bash
npm i -D autoprefixer
```

- 配置 webpack

```js
// 定义 postcss 选项
var postcssLoader = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    plugins: [require('autoprefixer')()]
  }
}

// 处理 css 文件
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', postcssLoader]
      }
    ]
  }
}
```

注意：（1）`options.ident` 是必须的，详见文档；（2）`options.plugins` 中的插件，需要额外安装；（3）postcss-loader 应当放在其他与编译器之前，如 less，因为 先由 less 编译成 css 格式，postcss 才能接着处理；（4）postcss 的选项可以在单独的文件，如 `postcss.config.js` 中进行配置。关于 postcss-loader 的具体用法，详见[文档][postcss-loader]。

### css 预编译支持 - less

webpack 通过 [less-loader] 支持 [less] 样式文件，将 css-loader、style-loader 和 less-loader 链式调用，可以把所有样式立即应用于 DOM。

- 安装 less 和 less-loader

```bash
npm i -D less less-loader   # less-loader 以来 less
```

- 配置 webpack

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', postcssLoader, 'less-loader']
      }
    ]
  }
}
```

### 静态文件支持 - 图片、视频、音频、字体

可以在 loader 的选项中提供关于 less 支持的选项，详见 [less 文档][less]。

## 代码质量

### 通过 prettier 实现代码格式化

- 安装 prettier

```bash
npm i -D prettier
```

- 创建、配置 `.prettierrc`

```json
{
  "tabWidth": 2,
  "printWidth": 120,
  "singleQuote": true,
  "semi": false,
  "bracketSpacing": true,
  "arrowParens": "always",
  "trailingComma": "none"
}
```

设置 vscode 识别 `.prettierrc` 为 json 文件，激活代码高亮

```json
"files.associations": {
  ".prettierrc": "json"
}
```

选项说明详见 [prettier 选项]

- 创建、配置 `.prettierignore`

对于不想被 prettier 格式化的文件，可以在这个文件中配置。这类文件主要有以下几种：（1）含有 prettier 不支持的代码；（2）引用的第三方库。

```bash
*.yml
src/index.template.html
```

如果一个文件只有部分代码需要被忽略处理，可以使用 `prettier-ignore` 指令，详见 [prettier 忽略处理]。

- 安装 vscode 插件

[Prettier formatter for Visual Studio Code] 安装后，自动取代 vscode 自带的代码格式化功能，接管相关快捷键。使用 <kbd>shift</kbd> + <kbd>alt</kbd> + <kbd>f</kbd> 格式化整个文档，使用 <kbd>ctrl</kbd> + <kbd>k</kbd>, <kbd>ctrl</kbd> + <kbd>f</kbd> 格式化选定代码。

设置保存时进行格式化：

```json
{
  "editor.formatOnSave": true
}
```

该插件已带 `prettier-eslint` 和 `prettier-tslint` 模块，无需再单独安装。但所需的 `eslint` 和 `tslint` 仍需本地安装。有关该插件的具体配置和使用，详见[插件文档][prettier formatter for visual studio code]。

### tslint + prettier 兼容配置

prettier 除了全局的选项，没有提供太多的语法选项，不想 tslint 灵活，这样的好处是较好地维持了代码格式的一致性，不足的地方则是可能与 tslint 的语法检查规则相冲突。[tslint-config-prettier] 就是专门为了协同两者更好的工作而产生，由 prettier 官方维护。该模块的核心功能是提供一套兼容 prettier 格式的 tslint 规则，通过覆盖 tslint 原有的规则，达到满足 tslint 语法检查的目的。

- 安装 `tslint-config-prettier`

```bash
npm i -D tslint-config-prettier
```

- 修改 tslint 配置

```json
{
  "extends": [
    "tslint:recommended",
    "tslint-config-prettier"        // 添加这一行
  ],
  "rules": {
    ...
  }
}
```

值得注意的是，该模块只针对官方缺省的规则集进行兼容，如果用户通过 `rules` 字段自定义了代码检查规则，则可能导致格式化后的代码不能通过 tslint 检查。这种情况下唯一的方法就是调整自定义 rules，让其兼容 prettier 。关于该模块的具体使用，详见[代码库][tslint-config-prettier]。

## 参考资料

- [webpack]
- [jest]
- [typescript]
- [tslint rules]
- [prettier]

<!-- 资源和链接 -->

[webpack]: https://www.webpackjs.com/concepts/
[jest]: https://jestjs.io/docs/zh-Hans/getting-started
[typescript]: https://www.tslang.cn/docs/home.html
[tslint rules]: https://palantir.github.io/tslint/rules/
[less]: http://lesscss.org
[postcss]: https://github.com/postcss/postcss
[prettier]: https://prettier.io/
[prettier 选项]: https://prettier.io/docs/en/options.html
[prettier 忽略处理]: https://prettier.io/docs/en/ignore.html
[prettier formatter for visual studio code]: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
[tslint-config-prettier]: https://github.com/prettier/tslint-config-prettier
[css-loader]: https://www.webpackjs.com/loaders/css-loader/
[style-loader]: https://www.webpackjs.com/loaders/style-loader/
[less-loader]: https://www.webpackjs.com/loaders/less-loader/
[postcss-loader]: https://www.webpackjs.com/loaders/postcss-loader/
