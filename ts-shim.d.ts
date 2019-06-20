/**
 * 让 typescript 处理非代码资源
 *
 * - vue 单文件支持
 * - 样式文件：css
 * - 图像：pgn|svg|jpg|gif
 * - 字体：woff|woff2|eot|ttf|otf
 * - 音频：mp3|ogg|wav
 * - 视频：mp4|mpg|avi
 */

declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module '*.css' {
  const content: any
  export default content
}

declare module '*.svg' {
  const content: any
  export default content
}

declare module '*.png' {
  const content: any
  export default content
}

declare module '*.jpg' {
  const content: any
  export default content
}

declare module '*.gif' {
  const content: any
  export default content
}

declare module '*.woff' {
  const content: any
  export default content
}

declare module '*.woff2' {
  const content: any
  export default content
}

declare module '*.eot' {
  const content: any
  export default content
}

declare module '*.ttf' {
  const content: any
  export default content
}

declare module '*.otf' {
  const content: any
  export default content
}

declare module '*.mp3' {
  const content: any
  export default content
}

declare module '*.ogg' {
  const content: any
  export default content
}

declare module '*.wav' {
  const content: any
  export default content
}

declare module '*.mp4' {
  const content: any
  export default content
}

declare module '*.mpg' {
  const content: any
  export default content
}

declare module '*.avi' {
  const content: any
  export default content
}
