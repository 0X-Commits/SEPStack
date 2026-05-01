import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'sep1/index': 'src/sep1/index.ts',
    'sep6/index': 'src/sep6/index.ts',
    'sep9/index': 'src/sep9/index.ts',
    'sep10/index': 'src/sep10/index.ts',
    'sep12/index': 'src/sep12/index.ts',
    'sep24/index': 'src/sep24/index.ts',
    'sep31/index': 'src/sep31/index.ts',
    'sep38/index': 'src/sep38/index.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
});
