import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import eslintPlugin from 'vite-plugin-eslint'
//以下三项为自动导入插件引入文件
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
//引入Navieuiresolver
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin({
      // cache: false
    }),
    VueSetupExtend(),
    AutoImport({
      // 导入文件的路径
      resolvers: [NaiveUiResolver()],
      imports: [
        // 自动导入Api
        'vue',
        'vue-router',
      ],
      eslintrc: {
        enabled: true, // Default `false`
        filepath: 'types/eslintrc-auto-import.json', // 此处根目录 types 文件夹需手动创建
        globalsPropValue: 'readonly', // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
      // 为true时在项目根目录自动创建
      dts: 'types/auto-imports.d.ts', // 此处根目录 types 文件夹需手动创建
    }),
    Components({
      resolvers: [NaiveUiResolver()],
      // 组件名称包含目录，防止同名组件冲突
      directoryAsNamespace: true,
      // 指定类型声明文件，为true时在项目根目录创建
      dts: 'types/components.d.ts', // 此处根目录 types 文件夹需手动创建
      // 导入路径变换
      importPathTransform: (path) => path.replace(/^.+\/src/g, '@'),
    }),
  ],
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
      '#': path.join(__dirname, 'types'),
    },
  },
})
