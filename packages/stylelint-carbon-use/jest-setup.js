'use strict'; // eslint-disable-line strict

import _ from 'lodash';
import stylelint from 'stylelint';

global.testRule = (rule, schema) => {
  expect.extend({
    toHaveMessage(testCase) {
      if (testCase.message === undefined) {
        return {
          message: () =>
            'Expected "reject" test case to have a "message" property',
          pass: false,
        };
      }

      return {
        pass: true,
      };
    },
  });

  // eslint-disable-next-line jest/valid-describe
  describe(`${schema.ruleName}`, () => {
    const stylelintConfig = {
      plugins: ['./src'],
      rules: {
        [schema.ruleName]: schema.config,
      },
    };

    if (schema.accept && schema.accept.length) {
      describe('accept', () => {
        schema.accept.forEach((testCase) => {
          const spec = testCase.only ? it.only : it;

          spec(testCase.description || 'no description', () => {
            const options = {
              code: testCase.code,
              config: stylelintConfig,
              syntax: schema.syntax,
            };

            return stylelint.lint(options).then((output) => {
              expect(output.results[0].warnings).toEqual([]);

              if (!schema.fix) {
                return;
              }

              // Check the fix
              return stylelint
                .lint(Object.assign({ fix: true }, options))
                .then((output2) => {
                  const fixedCode = getOutputCss(output2);

                  expect(fixedCode).toBe(testCase.code);
                });
            });
          });
        });
      });
    }

    if (schema.reject && schema.reject.length) {
      describe('reject', () => {
        schema.reject.forEach((testCase) => {
          const spec = testCase.only ? it.only : it;

          spec(testCase.description || 'no description', () => {
            const options = {
              code: testCase.code,
              config: stylelintConfig,
              syntax: schema.syntax,
            };

            return stylelint.lint(options).then((output) => {
              const warnings = output.results[0].warnings;
              const warning = warnings[0];

              expect(warnings.length).toBeGreaterThanOrEqual(1);
              // expect(testCase).toHaveMessage();

              if (testCase.message !== undefined) {
                expect(_.get(warning, 'text')).toBe(testCase.message);
              }

              if (testCase.line !== undefined) {
                expect(_.get(warning, 'line')).toBe(testCase.line);
              }

              if (testCase.column !== undefined) {
                expect(_.get(warning, 'column')).toBe(testCase.column);
              }

              if (!schema.fix) {
                return;
              }

              if (!testCase.fixed) {
                throw new Error(
                  'If using { fix: true } in test schema, all reject cases must have { fixed: .. }'
                );
              }

              // Check the fix
              return stylelint
                .lint(Object.assign({ fix: true }, options))
                .then((output2) => {
                  const fixedCode = getOutputCss(output2);

                  expect(fixedCode).toBe(testCase.fixed);
                });
            });
          });
        });
      });
    }
  });
};

function getOutputCss(output) {
  const result = output.results[0]._postcssResult;
  const css = result.root.toString(result.opts.syntax);

  return css;
}

global.testConfig = (schema) => {
  let testFn;

  if (schema.only) {
    testFn = test.only;
  } else if (schema.skip) {
    testFn = test.skip;
  } else {
    testFn = test;
  }

  // describe(`${schema.ruleName}`, () => { // not working for some reason
  describe('schema.ruleName', () => {
    describe('schema', () => {
      testFn(schema.description, () => {
        const config = {
          rules: {
            [schema.ruleName]: schema.config,
          },
        };

        stylelint
          .lint({
            code: '',
            config,
          })
          .then((data) => {
            const invalidOptionWarnings = data.results[0].warnings;

            if (schema.valid) {
              expect(invalidOptionWarnings).toHaveLength(0);
            } else {
              expect(invalidOptionWarnings[0].text).toBe(schema.message);
            }
          });
      });
    });
  });
  // });
};
