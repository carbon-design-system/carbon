import rule, { messages, ruleName } from '..';

testRule(rule, {
  ruleName,
  config: [
    true,
    {
      acceptValues: ['/((--)|[$])my-value-accept/', '*'],
    },
  ],
  syntax: 'scss',
  accept: [
    {
      code: '.foo { color: $ui-01; }',
      description: 'Carbon theme token expected.',
    },
    {
      code: '.foo { box-shadow: 0 0 5px $ui-01, 0 0 10px $ui-02; }',
      description: 'All color tokens in split are Carbon theme tokens.',
    },
    {
      code: '$my-value-accept: $ui-01; .foo { color: $my-value-accept; }',
      description:
        'Accept $varaible declared before use with Carbon theme tokens.',
    },
    {
      code:
        '--my-value-accept: $ui-01; .foo { color: var(--my-value-accept); }',
      description:
        'Accept --variable declared before use with Carbon theme tokens.',
    },
    {
      code: '.foo { box-shadow: $layout-01 $layout-01 $ui-01; }',
      description:
        'Position one and two can can be non color variables three of three matches',
    },
    {
      code: '.foo { box-shadow: 0 0 $layout-01 $ui-01; }',
      description:
        'Position three of four can can be non color variables four of four matches',
    },
    {
      code: ".foo { border: 1px solid get-light-value('ui-01'); }",
      description: 'Permitted function get-light-value passes',
    },
    {
      code: '.foo { color: $my-value-accept; }',
      description: 'Accept undeclared $variable by defaullt.',
    },
    {
      code: '.foo { color: var(--my-value-accept); }',
      description: 'Accept undeclared --variable by default.',
    },
  ],

  reject: [
    {
      code: '.foo { background-color: #f4f4f4; }',
      description: 'Used #color instead of Carbon theme token expected.',
      message: messages.expected,
    },
    {
      code: '.foo { box-shadow: 0 0 5px $ui-01, 0 0 10px #fefefe; }',
      description: 'Used #color in a split property not Carbon theme tokens.',
      message: messages.expected,
    },
    {
      code: '.foo { border: 1px solid my-value-fun($ui-01); }',
      description: 'Other functions should fail my-value-fn fails',
    },
  ],
});

// verify use of carbon color tokens
testRule(rule, {
  ruleName,
  config: [
    true,
    {
      acceptValues: ['/((--)|[$])my-value-accept/', '*'],
      acceptCarbonColorTokens: true,
    },
  ],
  syntax: 'scss',
  accept: [
    {
      code: '.foo { background-color: $carbon--blue-90; }',
      description: 'Accept using a carbon color token',
      message: messages.expected,
    },
  ],

  reject: [
    // an ibm color token
    {
      code: '.foo { background-color: $ibm-color__blue-90; }',
      description: 'Reject using a ibm color token',
      message: messages.expected,
    },
  ],
});

// verify use of carbon color tokens
testRule(rule, {
  ruleName,
  config: [
    true,
    {
      acceptValues: ['/((--)|[$])my-value-accept/', '*'],
      acceptIBMColorTokens: true,
    },
  ],
  syntax: 'scss',
  accept: [
    {
      code: '.foo { background-color: $ibm-color__blue-90; }',
      description: 'Accept using a ibm color token',
      message: messages.expected,
    },
  ],

  reject: [
    // an ibm color token
    {
      code: '.foo { background-color: $carbon--blue-90; }',
      description: 'Reject using a carbon color token',
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
      code: '$my-value-accept: $ui-01; .foo { color: $my-value-accept; }',
      description:
        'Accept $varaible declared before use when acceptUndefinedVariables is false.',
    },
    {
      code:
        '--my-value-accept: $ui-01; .foo { color: var(--my-value-accept); }',
      description:
        'Accept --variable declared before use when acceptUndefinedVariables is false.',
    },
  ],

  reject: [
    // an ibm color token
    {
      code: '.foo { color: $my-value-reject; }',
      description:
        'Reject undeclared $variable  when acceptUndefinedVariables is false.',
    },
    {
      code: '.foo { color: var(--my-value-reject); }',
      description:
        'Reject undeclared --variable  when acceptUndefinedVariables is false.',
    },
  ],
});

// verify use of rgba with carbon theme token
testRule(rule, {
  ruleName,
  config: true,
  syntax: 'scss',
  accept: [
    {
      code: '.foo { background-color: rgba($ui-01, 0.5); }',
      description: 'Accept using a carbon theme token with rgba()',
      message: messages.expected,
    },
  ],

  reject: [
    // an ibm color token
    {
      code: '.foo { background-color: rgba(100, 100, 255, 0.5); }',
      description: 'Reject using a non-carbon theme token with rgba()',
      message: messages.expected,
    },
  ],
});

// verify use of full and stroke with carbon theme token
testRule(rule, {
  ruleName,
  config: true,
  syntax: 'scss',
  accept: [
    {
      code: '.foo { fill: $ui-01; }',
      description: 'Accept carbon theme token for fill property by default',
      message: messages.expected,
    },
    {
      code: '.foo { stroke: $ui-01; }',
      description: 'Accept carbon theme token for stroke property by default',
      message: messages.expected,
    },
  ],
  reject: [
    {
      code: '.foo { fill: #fefefe; }',
      description: 'Reject non-carbon theme token for fill property by default',
      message: messages.expected,
    },
    {
      code: '.foo { stroke: red; }',
      description:
        'Reject non-carbon theme token for stroke property by default',
      message: messages.expected,
    },
  ],
});

// accept currentColor can be used as a value
testRule(rule, {
  ruleName,
  config: true,
  syntax: 'scss',
  accept: [
    {
      code: '.foo { fill: currentColor; }',
      description: 'Accept currentColor on the assumption color is valid',
      message: messages.expected,
    },
  ],
});

testRule(rule, {
  ruleName,
  config: true,
  syntax: 'scss',
  accept: [
    {
      code: '.foo { fill: &NOTE_this_should_generate_a_warning_under_test }',
      description: 'Should generate warning under test but no error',
    },
  ],
});
