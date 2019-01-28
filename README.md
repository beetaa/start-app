# 前端模板 - typescript

- webpack
  - [x] typescript 编译支持
  - [x] 纯 css 编译支持
  - [ ] postcss, less 预编译支持
  - [x] json 数据导入支持
  - [ ] csv, tsv, xml 数据导入支持
  - [x] 图片格式：png, svg, jpg, gif
  - [x] 字体格式：woff, woff2, eot, ttf, otf
  - 开发环境配置
    - [x] dev-server，支持 hot reload
    - [x] source map 支持
  - [ ] *生产环境配置*
- typescript
  - [x] 基本配置，通过 `tsconfig.json`
  - [x] 识别非 ts 代码资源类型文件，通过 `ts-custom.d.ts`
- 代码质量
  - [x] tslint 编码检查
    - [x] 基本配置， 通过`tslint.json`
    - [x] vscode 整合，详见 vscode 配置
  - [ ] prettier 代码格式化
    - [ ] 配置
    - [ ] vscode 整合
- [ ] jest
  - 支持 typescirpt 编写测试文件
- [ ] cypress
- [ ] tsdoc + typedoc + vuepress
- [ ] docker
- [ ] cdn
- [ ] nginx
- [ ] git
  - [ ] github
  - [ ] gogs (self hosted)
- [ ] npm
  - [ ] script

## 目录结构

## 使用说明

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

## 备注

- [webpack] 内置对 `import` 和 `export` 的支持，但不会修改除此之外的任何语句，所以其他部分若用到 **es6** 语法，应当使用 [babel] 插件进行编译。

- 由于测试框架 [jest] 不支持 `import` 和 `export`，所以在没有 [babel] 支持的情况下，应当使用原生的 `module.exports` 和 `require` 语句实现模块化。

- vscode 的 eslint 插件需要在工作目录中自行安装和配置 [eslint] 程序，插件本身只起到 vscode 和 eslint 的胶合和及时提示作用。

- eslint 配置中应当设置 `env.node = true`，这样才能兼容运行与 node 环境下的脚本，如 `__dirname` 等。

- 图片和字体在 `css` 中的导入是通过 `url()` 函数的，图片在 `js` 中的导入时通过 `img.src` 属性的。