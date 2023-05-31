import {defineConfig} from 'vite';
import nodeExternals from 'rollup-plugin-node-externals';
import dts from 'vite-plugin-dts'
export default defineConfig({
    plugins: [
        dts({insertTypesEntry:true}),
        {
            ...nodeExternals(),
            enforce: 'pre',
        }
    ],
    build: {
        outDir: 'es',
        lib: {
            entry: './src/index.ts',
        },
        minify: false,
        copyPublicDir: false,
        rollupOptions: {
            input:['./src/index.ts'],
            output: [
                {
                    format: 'es',
                    entryFileNames:'[name].js',
                    preserveModules: true,
                    exports: 'named',
                    dir: 'es'
                },
                // {
                //     format: 'cjs',
                //     entryFileNames: '[name].cjs',
                //     preserveModules:true,
                //     exports: 'named',
                //     dir:'es'
                // }
            ],
        },
    }
})