import replace from '@rollup/plugin-replace';

const baseConfig = {
  external: [],
  plugins: [
    replace({
      preventAssignment: true,
      values: {
        __DEV__: JSON.stringify(process.env.NODE_ENV === 'development'),
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
