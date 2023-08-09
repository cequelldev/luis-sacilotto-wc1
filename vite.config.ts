import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
    build: {
        lib: {
            entry: "src/luis-sacilotto-1.ts",
            formats: ["es"],
        },
        rollupOptions: {
            external: [/^lit/],
        }
    },
    plugins: [dts()]
});