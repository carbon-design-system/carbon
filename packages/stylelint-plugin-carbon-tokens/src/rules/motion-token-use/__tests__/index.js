/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import rule, { messages, ruleName } from '..';

testRule(rule, {
  ruleName,
  config: [true],
  syntax: 'scss',
  accept: [
    {
      code: '.foo { transition: width $duration--fast-01 linear ease-in; }',
      description: 'Carbon motion token expected for transition.',
    },
    {
      code: '.foo { transition-duration: $duration--moderate-01; }',
      description: 'Carbon motion token expected for transition duration.',
    },
    {
      code:
        '.foo { transition: width $duration--fast-01 linear ease-in, height $duration--moderate-01 ease-out; }',
      description: 'Carbon motion token expected for split transitions.',
    },
    {
      code:
        '$my-value-accept: $duration--fast-01; .foo { transition-duration: $my-value-accept; }',
      description:
        'Accept $varaible declared before use with Carbon motion tokens.',
    },
    {
      code:
        '--my-value-accept: $duration--moderate-01; .foo { transition-duration: var(--my-value-accept); }',
      description:
        'Accept --variable declared before use with Carbon motion tokens.',
    },
    {
      code: '.foo { transition: all $my-value-accept; }',
      description: 'Accept undeclared $variable by defaullt.',
    },
    {
      code: '.foo { transition: all var(--my-value-accept); }',
      description: 'Accept undeclared --variable by default.',
    },
    {
      code: '.foo { animation: $duration--fast-01 linear ease-in myAnim; }',
      description: 'Carbon motion token expected for animation.',
    },
    {
      code: '.foo { animation-duration: $duration--moderate-01; }',
      description: 'Carbon motion token expected for animation duration.',
    },
    {
      code:
        '--my-value-accept: $duration--moderate-01; .foo { animation-duration: var(--my-value-accept); }',
      description:
        'Accept --variable declared before use with Carbon motion tokens.',
    },
    {
      code: '.foo { animation: $my-value-accept myAnim; }',
      description: 'Accept undeclared $variable by defaullt.',
    },
    {
      code: '.foo { animation: var(--my-value-accept) myAnim; }',
      description: 'Accept undeclared --variable by default.',
    },
  ],

  reject: [
    {
      code: '.foo { transition: $duration--fast-01; }',
      description: 'Carbon motion token used in non-standard order.',
      message: messages.expected,
    },
    {
      code: '.foo { transition: all 2s; }',
      description: 'Used non-token duration.',
      message: messages.expected,
    },
    {
      code:
        '.foo { transition: width 99s linear ease-in, height $duration--fast-01 ease-out; }',
      description:
        'Used non-token in first split property not Carbon motion tokens.',
      message: messages.expected,
    },
    {
      code:
        '.foo { transition: width $duration--fast-01 linear ease-in, height 2s ease-out; }',
      description:
        'Used non-token in non-first split property not Carbon motion tokens.',
      message: messages.expected,
    },
  ],
});

// verify rejection of undeclared variables
testRule(rule, {
  ruleName,
  config: [
    true,
    {
      acceptUndefinedVariables: false,
    },
  ],
  syntax: 'scss',
  accept: [
    {
      code:
        '$my-value-accept: $duration--fast-01; .foo { transition-duration: $my-value-accept; }',
      description:
        'Accept $varaible declared before use with Carbon motion tokens.',
    },
    {
      code:
        '--my-value-accept: $duration--moderate-01; .foo { transition-duration: var(--my-value-accept); }',
      description:
        'Accept --variable declared before use with Carbon motion tokens.',
    },
  ],

  reject: [
    // an ibm motion token
    {
      code: '.foo { transition: all $my-value-reject; }',
      description:
        'Reject undeclared $variable for transittion when acceptUndefinedVariables is false.',
    },
    {
      code: '.foo { animation: $my-value-reject myAnim; }',
      description:
        'Reject undeclared $variable for animation when acceptUndefinedVariables is false.',
    },
    {
      code: '.foo { transition-duration: var(--my-value-reject); }',
      description:
        'Reject undeclared --variable for transition-duration when acceptUndefinedVariables is false.',
    },
    {
      code: '.foo { animation-duration: var(--my-value-reject); }',
      description:
        'Reject undeclared --variable for animation-duration when acceptUndefinedVariables is false.',
    },
  ],
});

// testConfig(rule, {
//   ruleName,
//   description: "Check for invalid accept values",
//   message: messages.expected,
//   config: ["always", { acceptValues: ["/wibble/"] }],
// });
