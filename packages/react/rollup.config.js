import replace from '@rollup/plugin-replace';

const baseConfig = {
  external: [],
  plugins: [
    replace({
      values: {
        'process.env.NODE_ENV': 'false',
      },
    }),
  ],
};

export default [
  {
    ...baseConfig,
    input: path.join(__dirname, './src/index.js'),
    output: {
      file: 'es/index.js',
      format: 'esm',
    },
  },
  {
    ...baseConfig,
    input: path.join(__dirname, './src/index.js'),
    output: {
      file: 'lib/index.js',
      format: 'commonjs',
    },
  },
];
