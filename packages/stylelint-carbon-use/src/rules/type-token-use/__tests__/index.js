import rule, { messages, ruleName } from '..';

testRule(rule, {
  ruleName,
  config: [true],
  syntax: 'scss',
  accept: [], // there are not type tokens used directly
  reject: [
    {
      code: '.foo { font-style: italic; }',
      description: 'Reject directly setting font-style',
      message: messages.expected,
    },
    {
      code: '.foo { font-variant: small-caps; }',
      description: 'Reject directly setting font-weight',
      message: messages.expected,
    },
    {
      code: ".foo { font-weight: carbon--font-weight('light'); }",
      description:
        'Reject directly setting font-weight with carbon--font-weight function without option',
      message: messages.expected,
    },
    {
      code: '.foo { font-weight: 5px; }',
      description: 'Reject directly setting font-weight',
      message: messages.expected,
    },
    {
      code: '.foo { font-size: 32px; }',
      description: 'Reject directly setting font-size',
      message: messages.expected,
    },
    {
      code: '.foo { line-height: 32px; }',
      description: 'Reject directly setting line-height',
      message: messages.expected,
    },
    {
      code: `.foo { font-family: "Times New Roman", Times, serif; }`,
      description: 'Reject directly setting font-family',
      message: messages.expected,
    },
  ],
});

testRule(rule, {
  ruleName,
  config: [
    true,
    {
      acceptCarbonFontWeightFunction: true,
    },
  ],
  syntax: 'scss',
  accept: [
    {
      code: ".foo { font-weight: carbon--font-weight('light'); }",
      description: 'Used non-token duration.',
      message: messages.expected,
    },
  ],
  reject: [
    {
      code: '.foo { font-weight: carbon--type-scale(1); }',
      description: 'Used non-token duration.',
      message: messages.expected,
    },
  ],
});

testRule(rule, {
  ruleName,
  config: [
    true,
    {
      acceptCarbonTypeScaleFunction: true,
    },
  ],
  syntax: 'scss',
  accept: [
    {
      code: '.foo { font-weight: carbon--type-scale(1); }',
      description: 'Used non-token duration.',
      message: messages.expected,
    },
  ],
  reject: [
    {
      code: ".foo { font-weight: carbon--font-weight('light'); }",
      description: 'Used non-token duration.',
      message: messages.expected,
    },
  ],
});
