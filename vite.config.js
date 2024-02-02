import { fileURLToPath, URL } from 'node:url'

import path, { join } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: join(__dirname, './package/dist'),
    lib: {
      entry: join(__dirname, './package/index.js'), //指定组件编译入口文件
      name: 'vue-drag-drop-transformer',
      fileName: (format) => `index.${format}.js` // 打包后的文件名
    }, //库编译模式配置
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        }
      }
    } // rollup打包配置
  }
})
