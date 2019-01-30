# 配置过程

## typescript 基本配置

- 安装 typescript

```bash
npm i -D typescript
```

- 创建和配置 tsconfig.json

```json
{
  "include": ["src/**/*"],
  "exclude": ["node_modules"],
  "compilerOptions": {
    "outDir": "./dist/",
    "target": "es5",
    "module": "es2015",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "strict": true,
    "allowJs": false,
    "sourceMap": true,
    "pretty": true,
    "removeComments": true
  }
}
```

- 问题：使用 async/await 语法时提示错误

> error TS2468: Cannot find global value 'Promise'.

解决方法：安装 [es6-shim] 定义文件

```bash
npm i -D @types/es6-shim
```

## webpack 自动化

### typescript 编译支持

- 安装 ts-loader

```bash
npm i -D ts-loader
```

- 配置 webpack

```js
{
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.json']
  }
}
```

> 让 webpack 解析 `js`, `json` 非常重要，否则可能会导致 `node_modules` 第三方库编译失败

- 让 ts-loader 正确处理非代码资源

ts-loader 底层调用 typescript 编译器 `tsc` 处理 `.ts` 类型文件，该编译器默认只支持 ts, js 两种类型的代码文件。在 webpack 中，我们通常需要在代码文件中引入 css, svg, png 等非代码资源，由 webpack 自动化编译和整合。这些资源需要实现让 typescript 识别，才能正常处理，具体可以通过包含这些资源的定义文件来做到这一点。以 css 文件为例：

1. 创建并编辑定义文件 `ts-shim.d.ts`

```ts
declare module '*.css' {
  const content: any
  export default content
}
```

2. 将定义文件添加到 tsconfig.json 的 files 列表

```json
{
  "files": ["ts-shim.d.ts"]
}
```

### 动态生成 html 文件

HtmlWebpackPlugin 简化了 HTML 文件的创建，以便为你的 webpack 包提供服务。这对于在文件名中包含每次会随着编译而发生变化哈希的 webpack bundle 尤其有用。

- 安装

```bash
npm i -D html-webpack-plugin
```

- 创建并编辑模板 index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body></body>
</html>
```

- 配置 webpack

```js
var HtmlWebpackPlugin = require('html-webpack-plugin')

{
  plugins: [
    new HtmlWebpackPlugin({
      title: '标题',
      template: 'index.html'
    })
  ]
}
```

该插件支持众多选项，详见[文档][html webpack plugin]

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

可以在 loader 的选项中提供关于 less 支持的选项，详见 [less 文档][less]。

### 静态文件支持 - 图片、视频、音频、字体

静态资源多为二进制文件，本质上是文件名称和路径的处理，通常使用 [file-loader] 和 [url-loader] 来处理，两者的详细使用方法和异同，可参见各自的文档。

- 安装 loader

```bash
npm i -D file-loader
```

- 图片支持：svg, png, jpg, gif

```js
module: {
  rules: [
    {
      test: /\.(png|svg|jpg|gif)$/,
      use: ['file-loader']
    }
  ]
}
```

- 字体支持：woff, woff2, eot, ttf, otf

```js
module: {
  rules: [
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: ['file-loader']
    }
  ]
}
```

- 音频支持：mp3, ogg, wav

```js
module: {
  rules: [
    {
      test: /\.(mp3|ogg|wav)$/,
      use: ['file-loader']
    }
  ]
}
```

- 视频支持：mp4, mpg, avi

```js
module: {
  rules: [
    {
      test: /\.(mp4|mpg|avi)$/,
      use: ['file-loader']
    }
  ]
}
```

> 所有需要引入的文件类型，均应在 ts-shim.d.ts 文件中提供定义，否则 typescript 编译将出错。

> 原则上，音频、视频、字体如果体积较大的，应当保存在 cdn 上，通过 cdn 路径引用，而非本地文件。如果需要在本地路径和 cdn 路径之间转换的，file-loader 应当保持唯一的文件名，而非 hash 过的文件名。

## 代码质量

### 通过 tslint 实现代码质量把控

- 安装 tslint

```bash
npm i -D tslint
```

- 创建、配置 tslint.json

```json
{
  "extends": "tslint:recommended",
  "rules": {
    "quotemark": [true, "single"],
    "space-before-function-paren": [true, "always"],
    "semicolon": [true, "never"],
    "no-console": false,
    "eofline": false,
    "no-consecutive-blank-lines": true
  }
}
```

- 在 vscode 中安装 typescript-tslint-plugin

> vscode 内置 ts 语法检查，但只提供基本的语法错误提示，不提供格式建议。格式建议和代码质量由 tslint 完成。插件安装完成后需要重启生效。

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

## 测试

### 单元测试 - jest

- 安装

```bash
npm i -D jest @types/jest   # jest 没有内置 ts 定义文件，需单独安装
npm i -D ts-jest
```

- 创建、配置 `jest.config.js`

```js
module.exports = {
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  testPathIgnorePatterns: ['node_modules', '<rootDir>/src/'],
  testMatch: ['**/?(*.)+(spec|test).ts']
}
```

配置的主要内容是通过调用 [jest] 的 transform 接口，通过 [ts-jest] 对 ts 文件进行编译，后续的测试由 jest 接管。考虑到后续需要测试 vue 组件，这里不直接使用 ts-jest 提供的 presets。

- 撰写测试用例

配置将查找以 `.test.ts` 或 `.spec.ts` 结尾的文件，本模板将所有单元测试用例放置在 `test/unit` 目录下。

### e2e 测试 - puppeteer

puppeteer 是一个 chrome/chromium 运行环境，可通过 javascript 进行编程控制，是 e2e 测试的优选方案。这里的配置目标是：（1）与 jest 测试环境整合；（2）使用 typescript 编写测试。

- 安装

```bash
npm i -D puppeteer    # 服务器端需要完整下载 chromium，因此不能使用 puppeteer-core
npm i -D jest-puppeteer
npm i -D @types/puppeteer @types/jest-environment-puppeteer @types/expect-puppeteer
```

- 配置 jest

```js
module.exports = {
  preset: 'jest-puppeteer',
  moduleFileExtensions: ['ts', 'js', 'json'],
  ...
}
```

其中的 `preset: 'jest-puppeteer'` 是专门用于 puppeteer 测试的环境配置，由 jest-puppeteer 提供。事实上该模块是一个便利化配置，也可以手动从头配置一个环境，详见 [custom example without jest-puppeteer preset] ，其中还提供了一个完整的[范例][jest puppeteer example]。

- 配置 puppeteer 运行环境

在项目根目录下创建 `jest-puppeteer.config.js`

```js
module.exports = {
  launch: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
}
```

puppeteer 支持的启动选项详见 [puppeteer launch options] 。

- 编写 e2e 测试用例

```js
describe('百度', () => {
  beforeAll(async () => {
    await page.goto('https://www.baidu.com')
  })

  it('页面应该包含"百度"两个字符', async () => {
    await expect(page).toMatch('百度')
  })
})
```

有关 e2e 测试用例的具体用法，详见 [puppeteer] 和 [jest-puppeteer]。

### 配置过程中遇到的问题和解决方案

- chrome 在 ubuntu 环境下不能正常启动

运行时提示：

> /home/user/erp/node_modules/puppeteer/.local-chromium/linux-555668/chrome-linux/chrome: error while loading shared libraries: libX11-xcb.so.1: cannot open shared object file: No such file or directory

解决方法是安装缺失的软件包：

```bash
sudo apt-get install gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
```

具体可参考 [troubleshooting - Chrome headless doesn't launch] 和 [How to fix puppetteer error while loading shared libraries: libX11-xcb.so.1]。

### 配置运行测试的 script

- 单独运行单元测试
- 单独运行 e2e 测试
- 同时运行所有测试

## 参考资料

- [webpack]
- [jest]
- [typescript]
- [tslint rules]
- [prettier]

<!-- 资源和链接 -->

[webpack]: https://www.webpackjs.com/concepts/
[jest]: https://jestjs.io/docs/zh-Hans/getting-started
[ts-jest]: https://github.com/kulshekhar/ts-jest
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
[html webpack plugin]: https://github.com/jantimon/html-webpack-plugin
[file-loader]: https://www.webpackjs.com/loaders/file-loader/
[url-loader]: https://www.webpackjs.com/loaders/url-loader/
[using jest with puppeteer]: https://jestjs.io/docs/zh-Hans/puppeteer
[custom example without jest-puppeteer preset]: https://jestjs.io/docs/zh-Hans/puppeteer#custom-example-without-jest-puppeteer-preset
[jest puppeteer example]: https://github.com/xfumihiro/jest-puppeteer-example
[puppeteer launch options]: https://pptr.dev/#?product=Puppeteer&version=v1.11.0&show=api-puppeteerlaunchoptions
[jest-puppeteer]: https://github.com/smooth-code/jest-puppeteer
[puppeteer]: https://pptr.dev/
[troubleshooting - chrome headless doesn't launch]: https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md
[how to fix puppetteer error while loading shared libraries: libx11-xcb.so.1]: https://techoverflow.net/2018/06/05/how-to-fix-puppetteer-error-while-loading-shared-libraries-libx11-xcb-so-1-cannot-open-shared-object-file-no-such-file-or-directory/
[es6-shim]: https://www.npmjs.com/package/@types/es6-shim
