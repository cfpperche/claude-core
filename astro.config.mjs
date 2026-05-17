import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://cfpperche.github.io",
  base: "/claude-core/",
  trailingSlash: "always",
  vite: {
    plugins: [tailwindcss()],
  },
});
