import { defineConfig } from "vite";
import { getMapsOptimizers, getMapsScripts } from "wa-map-optimizer-vite";
import polyfillNode from 'rollup-plugin-polyfill-node';

export default defineConfig({
    base: "./",
    build: {
        rollupOptions: {
            input: {
                index: "./index.html",
                ...getMapsScripts(),
            },
        },
    },
    plugins: [
        ...getMapsOptimizers(), 
        polyfillNode()
    ],
    server: {
        host: "localhost",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
            "Cache-Control": "no-cache, no-store, must-revalidate",
        },
        open: "/",
    },
    define: {
        global: {},
    }
});
