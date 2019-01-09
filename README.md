# 前端模板 - Typescript + Vue

- [x] 纯 typescript 环境
- [ ] Vue.js
- [x] 基于 webpack 的模块化管理和自动编译
  - [ ] vue
  - [x] ts
  - [x] css
  - [x] 图片：png, svg, jpg, gif
  - [x] 数据：json（可根据需要加入 csv, tsv, xml 格式支持）
  - [x] 字体：woff, woff2, eot, ttf, otf
- [x] 基于 webpack 的开发服务器和热更新
- [ ] 基于 jest + vue-test-utils + typescript 的测试自动化
- [x] 基于 jest 的单元测试，支持 typescirpt 编写测试文件
- [ ] 基于 jest 的 e2e 测试
- [x] 基于 tslint 插件的语法风格检查（整合 ide 而非 webpack）
- [ ] e2e 测试自动化
- [ ] 基于 vetur 插件的开发便利化设置
- [ ] 基于 cdn + webpack 的发布自动化
  - [ ] 字体：本地和cdn自动转换
- [ ] *可选：vue-class-component*
- [ ] *可选：vue-property-decorator*
- [ ] *可选：prettier 代码美化*
- [ ] 基于 tslint-vue 插件的 vue 文件 ts 代码片段格式检查支持（今后留意 vetur 是否内置）

**注意事项**

> import vue 组件时必须加上 `.vue` 后缀

> 在 vue 文件中注明 script 的类型，如 `<script lang="ts">` ，明确让 typescript 来处理该代码片段

> 要让 TypeScript 正确推断 Vue 组件选项中的类型，您需要使用 Vue.component 或 Vue.extend 定义组件：

```js
import Vue from 'vue'
const Component = Vue.extend({
  // 类型推断已启用
})

const Component = {
  // 这里不会有类型推断，
  // 因为TypeScript不能确认这是Vue组件的选项
}
```
> vue, vuex, vue-router 在官方发行包中已经包含声明文件，无需另外引入。
> 引入第三方库需要声明文件，如果找不到，可参考以下格式自行创建一个：

```js
declare module 'vue-awesome-swiper' {
  export const swiper: any
  export const swiperSlide: any
}

declare module 'vue-lazyload'
```

## 配置 vue 支持

**安装 vue**

```bash
npm install vue --save
```

**安装 vue 编译支持**

```bash
npm i -D vue-loader vue-style-loader vue-template-compiler
```

> vue-loader 负责预处理 vue 文件，分离出来的 ts 代码交给 ts-loader 处理，template 代码交给 vue-template-compiler 处理，css 代码交给 vue-style-loader 处理

> vue-style-loader 是 style-loader 的增强版，可以处理单独的 css 文件，也可以处理 vue 组件中的 css 代码

**编辑 ts-custom.d.ts，告诉 typescript vue 文件由 Vue 模块处理**

```ts
declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}
```

**配置 webpack，支持 vue 文件的编译**

```js
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  resolve: {
    extensions: ['.vue', '.ts', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/.vue$/]
        }
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}
```

> 解释 appendTsSuffixTo, historyApiFallback, noInfo 选项，解释 `new VueLoaderPlugin()`

## 配置 [typescript]

**安装 typescript**

```bash
npm i -D typescript
```

**项目根目录下创建 tsconfig.json 并配置**

```json
{
  "include": [
      "src/**/*"
  ],
  "exclude": [
      "node_modules"
  ],
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

**修改所有 js 文件为 ts 文件，不再支持 js 扩展名**

**安装 webpack 的 loader**

```bash
npm i -D ts-loader
```

**配置 webpack 支持 ts**

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

**让 ts-loader 支持 css, svg 等非代码资源**

在根目录中创建 `ts-custom.d.ts` 并编辑：

```ts
declare module "*.css" {
  const content: any;
  export default content;
}
```

将 `ts-custom.d.ts` 添加到 tsconfig.json 的 files 列表：
```json
{
  "files": [
    "ts-custom.d.ts"
  ]
}
```

**让 jest 支持 ts**

安装 `@types/jest` 和 `ts-jest`

```bash
npm i -D @types/jest ts-jest
```

配置 jest.config.js 让其支持 ts 编译

```js
{
  "moduleFileExtensions": [
    "ts",
    "js",
    "json"
  ],
  "transform": {
    "^.+\\.ts$": "ts-jest"
  },
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.(ts)$"
}
```

**让 vscode 支持 ts 语法检查**

安装 tslint

```bash
npm i -D tslint
```

在根目录创建 `tslint.json` 并编辑：

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

安装 `typescript-tslint-plugin` 并重启

> vscode 内置 ts 语法检查，但只提供语法错误的提示，不提供格式建议。格式建议由 tslint 完成

## Jest + TypeScript + vue-test-utils 的几个坑

**找不到 vue 文件**

```bash
TypeScript diagnostics (customize using `[jest-config].globals.ts-jest.diagnostics` option):
test/HelloWorld.spec.ts:2:21 - error TS2307: Cannot find module '../src/components/Counter.vue'.
    
2 import Counter from '../src/components/Counter.vue'
```

> 解决方法：要让 `ts-jest` 认识 `.vue` 文件，需要在 `tsconfig.json` 中包含文件类型的声明文件

```json
  //...
  
  "files": [
    "ts-shim.d.ts"
  ],
  
  //...
```

`ts-shim.d.ts` 声明文件至少包含以下内容：

```js
declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}
```

**Jest 不认识 import**

```bash
Jest encountered an unexpected token

...

/workspace/template-vue/src/components/Counter.vue:10
export default {
^^^^^^
```

> 解决方法：jest 不能处理非纯 js 的内容，这里的 import 是 es6 特性，需要通过 babel 或 typescript 进行解析。所以应该（1）在 vue 文件中注明 script 的类型，如 `<script lang="ts">` ，让 typescript 来编译；或者（2）配置 bable 处理 es6。

**ts-jest 编译时警告 import**

```bash
ts-jest[config] (WARN) TypeScript diagnostics (customize using `[jest-config].globals.ts-jest.diagnostics` option):
message TS151001: If you have issues related to imports, you should consider setting `esModuleInterop` to `true` in your TypeScript configuration file (usually `tsconfig.json`). See https://blogs.msdn.microsoft.com/typescript/2018/01/31/announcing-typescript-2-7/#easier-ecmascript-module-interoperability for more information.
```

> 解决问题：这只是警告，编译和测试其实是可以通过的，但为了和谐，应当按照指引配置 `tsconfig.json`

```js
...

"esModuleInterop": true,

...
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
[typescript]: https://www.tslang.cn/docs/home.html
[tslint rules]: https://palantir.github.io/tslint/rules/
[vue 2.5 的 typescript 支持]: https://cn.vuejs.org/v2/guide/typescript.html
[vue-loader 文档]: https://vue-loader.vuejs.org/zh/
[vue test utils]: https://vue-test-utils.vuejs.org/zh/
[WebPack 4 + TypeScript 3 + Vue 2.5 + SCSS 简单环境搭建]: https://blog.csdn.net/hmxever/article/details/81635426
[Vue2.5 + Typescript 引入全面指南]: https://segmentfault.com/a/1190000011853167
[Vue2.5 + Typescript 引入全面指南 - Vuex篇]: https://segmentfault.com/a/1190000011864013
[vue + typescript 项目起手式]: https://segmentfault.com/a/1190000011744210
[vue + typescript 进阶篇]: https://segmentfault.com/a/1190000011878086
[cypress]: https://www.cypress.io/
[mocha]: https://mochajs.org/
[jest]: https://jestjs.io/docs/zh-Hans/getting-started
[理解 es7 中的 decorator]: http://taobaofed.org/blog/2015/11/16/es7-decorator/
[详解在Vue中使用TypeScript的一些思考(实践)]: https://www.jb51.net/article/143260.htm
[vue-class-component]: https://github.com/vuejs/vue-class-component
[vue-property-decorator]: https://github.com/kaorun343/vue-property-decorator
[vuex-class]: https://github.com/ktsn/vuex-class/
[vue-test-utils + typescript + jest 测试]: https://vue-test-utils.vuejs.org/zh/guides/using-with-typescript.html
[vue-test-utils + typescript + jest 范例]: https://github.com/vuejs/vue-test-utils-typescript-example
[jest + vue-test-utils 实践]: https://blog.csdn.net/duola8789/article/details/80434962
[单元测试 - 技术选型及配置]: https://blog.csdn.net/sinat_33312523/article/details/82952662
[单元测试 - jest + vue-test-utils]: https://blog.csdn.net/sinat_33312523/article/details/82966085
[单元测试 - jest mock + axios promise]: https://blog.csdn.net/sinat_33312523/article/details/82970655
[e2e 测试 - 选型和配置]: https://blog.csdn.net/sinat_33312523/article/details/82955514
[e2e 测试 - 基本使用]: https://blog.csdn.net/sinat_33312523/article/details/82968308