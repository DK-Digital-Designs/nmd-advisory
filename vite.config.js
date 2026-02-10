import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";
import { resolve } from "path";

export default defineConfig({
    // Base path - '/' for Vercel deployment
    base: "/",
    root: "src",
    publicDir: "../public",
    envDir: "../",
    build: {
        outDir: "../dist",
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: resolve(__dirname, "src/index.html"),
                services: resolve(__dirname, "src/services.html"),
                about: resolve(__dirname, "src/about.html"),
                contact: resolve(__dirname, "src/contact.html"),
                privacy: resolve(__dirname, "src/privacy.html"),
                terms: resolve(__dirname, "src/terms.html"),
                cookies: resolve(__dirname, "src/cookies.html"),
            },
        },
    },
    plugins: [
        handlebars({
            partialDirectory: resolve(__dirname, "src/partials"),
        }),
    ],
});
