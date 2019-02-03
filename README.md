# 前端模板 - typescript

- webpack
  - [x] typescript 编译支持
  - [x] 基于 `html-webpack-plugin` 插件动态生成 html 文件
  - [x] 使用 `clean-webpack-plugin` 清理目标目录
  - [x] 纯 css 编译支持
  - [x] postcss 支持
  - [x] less 预编译支持
  - [x] json 数据导入支持
  - [x] 图片格式：png, svg, jpg, gif
  - [x] 字体格式：woff, woff2, eot, ttf, otf
  - [x] 音频格式：mp3, ogg, wav
  - [x] 视频格式：mp4, mpg, avi
  - [x] 开发、生产环境区分配置 - 基于 `webpack-merge`
  - **正确解析本地和 cdn 资源路径**
  - **开发环境配置**
    - [x] dev-server，支持 hot reload
    - [ ] 本地 api 服务器，经 proxy 设置统一访问 url
    - [ ] 开发环境全局常量 - webpack.DefinePlugin
    - [ ] 定义开发环境的环境变量 - webpack.EnvironmentPlugin
    - [x] source map 支持
  - **生产环境配置**
    - [ ] 第三方库单独使用 cdn
    - [ ] tree shaking
    - [ ] 多个入口，chunk
    - [x] js 压缩、混淆 - uglifyjs-webpack-plugin
    - [ ] css 抽取、压缩 - mini-css-extract-plugin
    - [ ] 生产环境全局常量 - webpack.DefinePlugin
    - [ ] 定义生产环境的环境变量 - webpack.EnvironmentPlugin
    - [x] 取消 source map
- typescript
  - [x] 基本配置，通过 `tsconfig.json`
  - [x] 识别非 ts 代码资源类型文件，通过 `ts-shim.d.ts`
- 代码质量
  - [x] 使用 tslint 进行编码检查
  - [x] 使用 prettier 进行代码格式化
  - [x] 通过 `tslint-config-prettier` 让两者保持兼容
  - [x] 与 vscode 整合
- 测试
  - [x] 基于 jest 的单元测试
  - [x] 基于 puppeteer 的 e2e 测试
  - [x] 支持 typescirpt 编写测试文件
  - [ ] json-server 模拟提供数据
  - [ ] graphql 模拟提供数据
- 文档
  - [ ] tsdoc
  - [ ] typedoc
  - [ ] vuepress
- 发布
  - [ ] docker, docker-compose
  - [ ] cdn
  - [ ] nginx 反向代理配置
  - [ ] https 证书和访问
  - [ ] 基于 webpack 的自动发布插件
- 代码管理
  - [x] github
  - [ ] gogs (self hosted)
- 项目管理
  - [ ] script
- vscode
  - [x] 识别配置文件
  - [ ] 一致的编辑器格式

## 目录结构

## 使用说明

- 修改网页标题

## 附加说明

### prettier 支持的文件类型

## 备注

- [webpack] 内置对 `import` 和 `export` 的支持，但不会修改除此之外的任何语句，所以其他部分若用到 **es6** 语法，应当使用 [babel] 插件进行编译。

- 由于测试框架 [jest] 不支持 `import` 和 `export`，所以在没有 [babel] 支持的情况下，应当使用原生的 `module.exports` 和 `require` 语句实现模块化。

- vscode 的 eslint 插件需要在工作目录中自行安装和配置 [eslint] 程序，插件本身只起到 vscode 和 eslint 的胶合和及时提示作用。

- eslint 配置中应当设置 `env.node = true`，这样才能兼容运行与 node 环境下的脚本，如 `__dirname` 等。

- 图片和字体在 `css` 中的导入是通过 `url()` 函数的，图片在 `js` 中的导入时通过 `img.src` 属性的。
