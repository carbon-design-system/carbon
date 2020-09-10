/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import rule, { ruleName } from '..';

const generatedTests = () => {
  const accept = [];
  const reject = [];
  const props = ['margin'];
  const good = [
    '$spacing-01',
    '$layout-01',
    '-$spacing-01',
    '-$layout-01',
    '$carbon--spacing-01',
    '$carbon--layout-01',
    '100%',
    '50%',
    '100vw',
    '50vw',
    '100vh',
    '50vh',
    '0xxx',
    '$my-value-accept',
    'var(--my-value-accept)',
  ];
  const bad = [
    '$container-01', // only bad for default options
    '$fluid-spacing-01',
    '$icon-size-01',
    '$carbon--container-01',
    '$carbon--fluid-spacing-01',
    '$carbon--icon-size-01',
    '199px',
    '299px',
    '399px',
    '499px',
    '$my-value-reject',
    'var(--my-value-reject)',
  ];

  for (const prop of props) {
    for (let g = 0; g < good.length - 4; g++) {
      // good tokens
      for (let n = 1; n < 5; n++) {
        // number of values
        accept.push({
          code: `.foo { ${prop}: ${good.slice(g, g + n)}; }`,
          description: `A ${prop} using ${n} token(s) is accepted`,
        });
      }
    }

    for (let b = 0; b < bad.length - 4; b++) {
      // bad tokens
      for (let n = 1; n < 5; n++) {
        // number of values
        reject.push({
          code: `.foo { ${prop}: ${bad.slice(b, b + n)}; }`,
          description: `A ${prop} using ${n} non-token(s) is rejected`,
        });
      }
    }
  }

  const moreProps = ['left', 'top', 'bottom', 'right'];

  for (const prop of moreProps) {
    accept.push({
      code: `.foo { ${prop}: ${good[0]}; }`,
      description: `A ${prop} using a token is accepted.`,
    });
    reject.push({
      code: `.foo { ${prop}: ${bad[0]}; }`,
      description: `A ${prop} using a non-token is rejected.`,
    });
  }

  return { accept, reject };
};

const theGeneratedTests = generatedTests();

testRule(rule, {
  ruleName,
  config: [
    true,
    {
      acceptValues: ['/((--)|[$])my-value-accept/', '*'],
    },
  ],
  syntax: 'scss',
  accept: theGeneratedTests.accept,
  reject: theGeneratedTests.reject,
});

// testConfig(rule, {
//   ruleName,
//   description: "Check for invalid accept values",
//   message: messages.expected,
//   config: ["always", { acceptValues: ["/wibble/"] }],
// });

// "$container-01", // only bad for default options
// "$fluid-spacing-01",
// "$icon-size-01",
// "$carbon--container-01",
// "$carbon--fluid-spacing-01",
// "$carbon--icon-size-01",

testRule(rule, {
  ruleName,
  config: [
    true,
    {
      acceptContainerTokens: true,
    },
  ],
  syntax: 'scss',
  accept: [
    {
      code: `.foo { left: $carbon--container-01; }`,
      description: `Accept $carbon--container tokens with acceptContainerTokens: true.`,
    },
    {
      code: `.foo { left: $container-01; }`,
      description: `Accept $container tokens with acceptContainerTokens: true.`,
    },
  ],
  reject: [],
});

testRule(rule, {
  ruleName,
  config: [
    true,
    {
      acceptIconSizeTokens: true,
    },
  ],
  syntax: 'scss',
  accept: [
    {
      code: `.foo { left: $carbon--icon-size-01; }`,
      description: `Accept $carbon--icon-size tokens with acceptIconSizeTokens: true.`,
    },
    {
      code: `.foo { left: $icon-size-01; }`,
      description: `Accept $icon-size tokens with acceptIconSizeTokens: true.`,
    },
  ],
  reject: [],
});

testRule(rule, {
  ruleName,
  config: [
    true,
    {
      acceptFluidSpacingTokens: true,
    },
  ],
  syntax: 'scss',
  accept: [
    {
      code: `.foo { left: $carbon--fluid-spacing-01; }`,
      description: `Accept $carbon--fluid-spacing tokens with acceptFluidSpacingTokens: true.`,
    },
    {
      code: `.foo { left: $fluid-spacing-01; }`,
      description: `Accept $fluid-spacing tokens with acceptFluidSpacingTokens: true.`,
    },
  ],
  reject: [],
});

testRule(rule, {
  ruleName,
  config: [true, { acceptCarbonMiniUnitsFunction: true }],
  syntax: 'scss',
  accept: [
    {
      code: `.foo { left: carbon--mini-units(4); }`,
      description: `A left using a carbon--mini-units is accepted with option.`,
    },
    {
      code: `.foo { left: mini-units(4); }`,
      description: `A left using a mini-units is accepted with option.`,
    },
  ],
});

testRule(rule, {
  ruleName,
  config: true,
  syntax: 'scss',
  reject: [
    {
      code: `.foo { left: carbon--mini-units(4); }`,
      description: `A left using a carbon--mini-units is rejected without option "acceptCaronMiniUnitsFunction".`,
    },
    {
      code: `.foo { left: mini-units(4); }`,
      description: `A left using a mini-units is rejected without option "acceptCaronMiniUnitsFunction".`,
    },
  ],
});

testRule(rule, {
  ruleName,
  config: true,
  syntax: 'scss',
  accept: [
    {
      code: `.foo { transform: translate($layout-01); }`,
      description: `Accept translate using layout tokens".`,
    },
    {
      code: `.foo { transform: translateX($layout-01); }`,
      description: `Accept translateX using layout tokens".`,
    },
    {
      code: `.foo { transform: translateY($layout-01); }`,
      description: `Accept translateY using layout tokens".`,
    },
    {
      code: `.foo { transform: translateY($layout-01 $layout-01); }`,
      description: `Accept translateY using layout tokens".`,
    },
    {
      code: `.foo { transform: skew(20deg) translate($layout-01); }`,
      description: `Accept translate using layout tokens when not first transform".`,
    },
    {
      code: `.foo { transform: translate($layout-01) skew(20deg); }`,
      description: `Accept translate using layout tokens when not only transform".`,
    },
    {
      code: `.foo { transform: skew(20deg) translate($layout-01, $layout-01); }`,
      description: `Accept translate using layout tokens when not first transform".`,
    },
    {
      code: `.foo { transform: translate($layout-01, $layout-01) skew(20deg); }`,
      description: `Accept translate using layout tokens when not only transform".`,
    },
  ],
});

testRule(rule, {
  ruleName,
  config: true,
  syntax: 'scss',
  reject: [
    {
      code: `.foo { transform: translate(-20%, -10%); }`,
      description: `Reject translate not using layout tokens".`,
    },
    {
      code: `.foo { transform: translate(-20%, $layout-06); }`,
      description: `Reject translate not using layout tokens for first param".`,
    },
    {
      code: `.foo { transform: translate($layout-06, -20%); }`,
      description: `Reject translate not using layout tokens for second param".`,
    },
    {
      code: `.foo { transform: translateX(-20%); }`,
      description: `Reject translateX not using layout tokens".`,
    },
    {
      code: `.foo { transform: translateY(-20%); }`,
      description: `Reject translateY not using layout tokens".`,
    },
  ],
});

testRule(rule, {
  ruleName,
  config: true,
  syntax: 'scss',
  accept: [
    {
      code: `.foo { right: calc(100vw - $carbon--spacing-01) }`,
      description: `Accept calc(vw - $)".`,
    },
    {
      code: `.foo { right: calc(100% + $carbon--spacing-01) }`,
      description: `Accept calc(% + $)".`,
    },
    {
      code: `.foo { right: calc(100vh - $carbon--spacing-01) }`,
      description: `Accept calc(vh - $)".`,
    },
  ],
  reject: [
    {
      code: `.foo { right: calc(100px - $carbon--spacing-01); }`,
      description: `Reject calc(px - $)".`,
    },
    {
      code: `.foo { right: calc(100px + $carbon--spacing-01); }`,
      description: `Reject calc(px + $)".`,
    },
    {
      code: `.foo { right: calc(100px + 100px); }`,
      description: `Reject calc(px - px)".`,
    },
    {
      code: `.foo { right: calc($carbon--spacing-01 + $carbon--spacing-01); }`,
      description: `Reject calc($ - $)".`,
    },
    {
      code: `.foo { right: calc($carbon--spacing-01 * 1.5); }`,
      description: `Reject calc($ * number)".`,
    },
    {
      code: `.foo { right: calc($50% - 8px); }`,
      description: `Reject calc(% - px)".`,
    },
  ],
});
