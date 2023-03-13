/// <reference types="vitest" />
import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueMacros from 'unplugin-vue-macros/vite'
import presetAttributify from '@unocss/preset-attributify'
const rollupOptions = {
  external: ['vue', 'vue-router'],
  output: {
    globals: {
      vue: 'Vue',
    },
  },
}

export default defineConfig(({ command }) => {
  return {
    resolve: {
      alias: {
        '~/': `${path.resolve(__dirname, 'src')}/`,
        vue: 'vue/dist/vue.esm-bundler.js',
      },
    },
    plugins: [
      VueMacros({
        plugins: {
          vue: Vue({
            reactivityTransform: true,
          }),
        },
      }),

      vueJsx(),
      // https://github.com/hannoeru/vite-plugin-pages
      Pages(),

      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        imports: [
          'vue',
          'vue/macros',
          'vue-router',
          '@vueuse/core',
        ],
        dts: true,
        dirs: ['./src/composables'],
        vueTemplate: true,
      }),

      // https://github.com/antfu/vite-plugin-components
      Components({
        dts: true,
      }),

      // https://github.com/antfu/unocss
      // see unocss.config.ts for config
      Unocss({
        presets: [presetAttributify({})],
        shortcuts: [
          [
            /^btn-(.*)$/,
            ([, c]) =>
              `bg-${c}-400 text-${c}-100 py-2 px-4 rounded-lg`,
          ],
        ],
        rules: [
          [
            /^m-(\d)$/,
            ([, d]) => ({ margin: `${d / 4}rem` }),
          ],
        ],
      }),
    ],
    build: {
      rollupOptions,
      minify: 'terser',
      sourcemap: true,
      terserOptions: {
        compress: {
          drop_console: true,
          pure_funcs: ['console.log'],
        },
      },
      lib: {
        entry: './src/index.ts',
        name: 'EditableUi',
        fileName: 'EditableUi',
        // 导出模块格式
        formats: ['esm', 'umd', 'iife'],
      },
    },
    test: {
      environment: 'jsdom',
      globals: true,
    },
    define: {
      'process.env': process.env,
    },
  }
})
