const prefixes = [
  '@avt-default-state',
  '@avt-advanced-states',
  '@avt-keyboard-nav',
];
const prefixesList = prefixes.join('  | \n');

module.exports = {
  plugins: ['eslint-plugin-playwright'],
  overrides: [
    {
      extends: ['plugin:playwright/recommended'],
      files: ['*-test.avt.e2e.js'],
      rules: {
        'playwright/valid-title': [
          'error',
          {
            mustMatch: {
              describe: [
                new RegExp(`^@avt`).source,
                // new RegExp(`^@avt`, `/[^A-Z]/`).source,
                `Describe titles should start with: @avt`,
              ],
              test: [
                new RegExp(`^(${prefixes.join('|')})`).source,
                `Test titles should start with one of the following prefixes: ${prefixesList}`,
              ],
            },
          },
        ],
      },
    },
  ],
};
