/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

const postcss = require('postcss');
const scss = require('postcss-scss');
const plugin = require('./transform-custom-properties');

const tests = [
  {
    name: 'property with no token',
    input: `
@mixin my-component {
  .#{$prefix}--component {
    display: block;
  }
}
`,
    output: `
@mixin my-component {
  .#{$prefix}--component {
    display: block;
  }
}
`,
  },

  {
    name: 'sass maps',
    input: `$config: ( foo: 'bar' );`,
    output: `$config: ( foo: 'bar' );`,
  },

  {
    name: 'mixin with selector',
    input: `
@mixin my-component {
  .#{$prefix}--component {
    display: block;
    color: var(--token-01, $token-01); }
}
`,
    output: `
@mixin my-component {
  .#{$prefix}--component {
    display: block;
    color: $token-01;
    color: var(--token-01, $token-01); }
}
`,
  },

  {
    name: 'mixin with nested selector',
    input: `
@mixin my-component {
  .#{$prefix}--component {
    display: block;

    .nested {
      color: var(--token-01, $token-01);
    }
  }
}
`,
    output: `
@mixin my-component {
  .#{$prefix}--component {
    display: block;

    .nested {
      color: $token-01;
      color: var(--token-01, $token-01);
    }
  }
}
`,
  },

  {
    name: 'value with more than just custom property',
    input: `
@mixin my-component {
  .#{$prefix}--component {
    display: block;
    transition: 0.3s all var(--motion-01, $motion-01) reverse;
  }
}
`,
    output: `
@mixin my-component {
  .#{$prefix}--component {
    display: block;
    transition: 0.3s all $motion-01 reverse;
    transition: 0.3s all var(--motion-01, $motion-01) reverse;
  }
}
`,
  },

  {
    name: 'middle position',
    input: `
@mixin my-component {
  .#{$prefix}--component {
    transition: all var(--duration-fast-02, $duration--fast-02)
      motion(standard, productive);
  }
}
`,
    output: `
@mixin my-component {
  .#{$prefix}--component {
    transition: all $duration--fast-02 motion(standard, productive);
    transition: all var(--duration-fast-02, $duration--fast-02)
      motion(standard, productive);
  }
}
`,
  },

  {
    name: 'multiline properties',
    input: `
.#{$prefix}--component {
  transition: height motion(standard, productive)
      var(--duration--fast-01, $duration--fast-01),
    padding motion(standard, productive)
      var(--duration--fast-02, $duration--fast-02);
}
`,
    output: `
.#{$prefix}--component {
  transition: height motion(standard, productive) $duration--fast-01,
padding motion(standard, productive) $duration--fast-02;
  transition: height motion(standard, productive)
      var(--duration--fast-01, $duration--fast-01),
    padding motion(standard, productive)
      var(--duration--fast-02, $duration--fast-02);
}
`,
  },
];

for (const { name, input, output } of tests) {
  test(`${name} should compile`, async () => {
    const result = await postcss([plugin()]).process(input, {
      from: undefined,
      parser: scss,
    });
    expect(result.css).toBe(output);
  });
}
