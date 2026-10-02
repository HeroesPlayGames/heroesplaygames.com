import "vite-plus/test/config";
import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite-plus";

const isTest = process.env.VITEST === "true";

const config = defineConfig({
  staged: {
    "*": "vp fmt --write",
  },
  fmt: {
    sortImports: true,
    sortTailwindcss: true,
    useTabs: false,
    ignorePatterns: ["routeTree.gen.ts"],
  },
  lint: {
    plugins: ["import", "jsx-a11y", "oxc", "react", "typescript", "unicorn", "vitest"],
    jsPlugins: ["@tanstack/eslint-plugin-query", "@tanstack/eslint-plugin-router"],
    categories: {
      correctness: "error",
    },
    rules: {
      "react/react-in-jsx-scope": "off",
    },
    env: {
      builtin: true,
    },
    ignorePatterns: ["routeTree.gen.ts"],
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  resolve: { tsconfigPaths: true },
  plugins: [
    devtools(),
    !isTest && cloudflare({ viteEnvironment: { name: "ssr" } }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ].filter(Boolean),
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    pool: "forks",
  },
});

export default config;
