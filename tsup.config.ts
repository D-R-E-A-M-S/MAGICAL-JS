import { defineConfig } from "tsup";

export default defineConfig(

    {
        dts: true,
        watch: true,
        clean: true,
        splitting: true,
        target: "es2016",
        name: "MAGICAL-JS",
        sourcemap: 'inline',
        outDir: "MAGICAL-JS",
        format: [ "esm", "cjs" ],
        entry: [ "src/index.ts" ],
    }

);