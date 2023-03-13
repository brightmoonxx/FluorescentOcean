/*
 * @Author: WangXin
 * @Date: 2023-02-20 14:50:42
 * @LastEditors: WangXin
 * @LastEditTime: 2023-02-23 21:26:23
 * @FilePath: \myself\vite.config.ts
 * @Description: 
 * 
 * Copyright (c) 2023 by YuXing, All Rights Reserved. 
 */
import { fileURLToPath, URL } from 'node:url'
import { resolve } from "path";
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import svgLoader from "vite-svg-loader";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const root: string = process.cwd();

/** 路径查找 */
const pathResolve = (dir: string): string => {
  return resolve(__dirname, ".", dir);
};
/** 设置别名 */
const alias: Record<string, string> = {
  "@": pathResolve("src"),
  "@build": pathResolve("build")
};
export default defineConfig({
  plugins: [vue(), vueJsx(),svgLoader(),
    AutoImport({
      resolvers: [
        ElementPlusResolver(),
    ]
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
    ]
    }),
],
  resolve: {
    alias: alias
  }
})
