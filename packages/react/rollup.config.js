import replace from '@rollup/plugin-replace';

const baseConfig = {
  external: [],
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
      __buildDate__: () => JSON.stringify(new Date()),
      __buildVersion: 15,
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
