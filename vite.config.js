import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";
import { resolve } from "path";

export default defineConfig(({ command }) => ({
    base: command === "serve" ? "/" : "/nmd-advisory/",
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
                booking: resolve(__dirname, "src/booking.html"),
                testimonials: resolve(__dirname, "src/testimonials.html"),
                contact: resolve(__dirname, "src/contact.html"),

                // add this:
                admin: resolve(__dirname, "src/admin/index.html"),
            },
        },
    },
    plugins: [
        handlebars({
            partialDirectory: resolve(__dirname, "src/partials"),
        }),
    ],
}));
