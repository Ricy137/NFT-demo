import { loadEnv } from "vite";
// import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
// vite对jsx语法只认tsx和jsx后缀的文件，可是项目中有很多js类型的文件也是jsx；
import vitePluginReactJsSupport from "vite-plugin-react-js-support";
// vite 支持 react 的热更新插件代码
import reactRefresh from "@vitejs/plugin-react-refresh";
// 为打包后的文件提供传统浏览器兼容性支持
import legacyPlugin from "@vitejs/plugin-legacy";
import path from "path";

function pathResolve(dir) {
  return path.resolve(process.cwd(), ".", dir);
}

// https://cn.vitejs.dev/config/#config-intellisense
export default ({ command, mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  let rollupOptions = {};
  if (command === "serve") {
    rollupOptions.input = [];
  }
  return {
    // 开发或生产环境服务的公共基础路径
    base: "/",
    // 项目根目录
    root: "./",
    // 别名
    resolve: {
      alias: [
        // /@/xxxx => src/xxxx
        {
          find: /\/@\//,
          replacement: pathResolve("src") + "/",
        },
      ],
    },
    define: {
      'process.env': process.env,
    },
    server: {
      host: "127.0.0.1",
      proxy: {
        "/api": {
          // target: process.env.VITE_APP_APIURL,
          // target: "http://ec2-18-208-106-240.compute-1.amazonaws.com",   //dev
          // target: "http://ec2-23-23-56-6.compute-1.amazonaws.com",      //stg
          target: "http://127.0.0.1:8000",                                 //local
          secure: false,
          ws: true,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, "/api"),
        },
        "/publicPath": {
          // target: process.env.VITE_APP_APIURL,
          // target: "http://ec2-18-208-106-240.compute-1.amazonaws.com",   //dev
          // target: "http://ec2-23-23-56-6.compute-1.amazonaws.com",      //stg
          target: "http://127.0.0.1:5500",                                 //local
          secure: false,
          ws: true,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/publicPath/, "/"),
        },
      },
      hmr: {
        host: "localhost",
      },
      cors: true,
    },
    // 构建
    build: {
      target: "es2015",
      minify: "terser",
      mainfest: false, // 是否产出maifest.json, 用于打包分析
      sourcemap: true, // 是否产出sourcemap.json
      outDir: "build", // 产出目录
      rollupOptions, // 自定义底层的 Rollup 打包配置。将与 Vite 的内部 Rollup 选项合并。
    },
    esbuild: {},
    // 依赖优化选项
    optimizeDeps: {},
    css: {
      // 指定传递给 CSS 预处理器的选项
      preprocessorOptions: {
        sass: {
          // 支持内联javascript
          javascriptEnabled: true,
        },
      },
    },
    plugins: [
      // styleImport({
      //   libs: [
      // {
      //   libraryName: 'antd',
      //   esModule: true,
      //   resolveStyle: (name) => {
      //     return `antd/es/${name}/style/index`;
      //   },
      // },
      // {
      //   libraryName: 'vant',
      //   esModule: true,
      //   resolveStyle: (name) => {
      //     return `vant/es/${name}/style`;
      //   },
      // },
      //   ]
      // }),
      // createSvgSpritePlugin({
      //   symbolId: '[name]',
      // }),
      //  是否为js文件注入 import React from 'react'
      vitePluginReactJsSupport([], { jsxInject: true }),
      reactRefresh(),
      legacyPlugin({
        targets: [
          "Android > 39",
          "Chrome >= 60",
          "Safari >= 10.1",
          "IOS >= 10.3",
          "Firefox >= 54",
          "Edge >= 15",
        ],
      }),
    ],
  };
};