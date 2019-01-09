/**
 * 让 typescript 处理非代码资源
 * 
 * - 样式文件：css
 * - 图像：pgn|svg|jpg|gif
 * - 字体：woff|woff2|eot|ttf|otf
 */

declare module "*.css" {
  const content: any;
  export default content;
}

declare module "*.svg" {
  const content: any;
  export default content;
}

declare module "*.png" {
  const content: any;
  export default content;
}

declare module "*.jpg" {
  const content: any;
  export default content;
}

declare module "*.gif" {
  const content: any;
  export default content;
}

declare module "*.woff" {
  const content: any;
  export default content;
}

declare module "*.woff2" {
  const content: any;
  export default content;
}

declare module "*.eot" {
  const content: any;
  export default content;
}

declare module "*.ttf" {
  const content: any;
  export default content;
}

declare module "*.otf" {
  const content: any;
  export default content;
}