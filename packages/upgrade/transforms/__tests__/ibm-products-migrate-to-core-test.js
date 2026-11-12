/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { defineTest } = require('jscodeshift/dist/testUtils');

const name = 'ibm-products-migrate-to-core';

defineTest(__dirname, name);
defineTest(__dirname, name, null, `${name}-labs`);
defineTest(__dirname, name, null, `${name}-namespaces`);
defineTest(__dirname, name, null, `${name}-merge`);
defineTest(__dirname, name, null, `${name}-untouched`);

const fs = require('fs');
const path = require('path');
const { applyTransform } = require('jscodeshift/dist/testUtils');

const fixtures = path.join(__dirname, '..', '__testfixtures__');
const read = (file) => fs.readFileSync(path.join(fixtures, file), 'utf8');

describe(name, () => {
  it.each([
    [name, 'tsx'],
    [`${name}-labs`, 'tsx'],
    [`${name}-namespaces`, 'tsx'],
    [`${name}-merge`, 'tsx'],
    [`${name}-untouched`, 'tsx'],
    [`${name}-e2e`, 'js'],
  ])('is idempotent for %s', (fixture, extension) => {
    const output = read(`${fixture}.output.${extension}`);
    const second = applyTransform(
      require(`../${name}`),
      {},
      { path: `${fixture}.${extension}`, source: output }
    );
    expect(second).toEqual(output.trim());
  });

  it('migrates old API usage to core after running the existing codemods', () => {
    const steps = [
      ['ibm-products-update-tearsheet', {}],
      ['ibm-products-update-coachmark', {}],
      ['ibm-products-update-page-header-composable', { parser: 'tsx' }],
      [name, {}],
    ];

    let source = read(`${name}-e2e.input.js`);
    for (const [transform, options] of steps) {
      source = applyTransform(
        require(`../${transform}`),
        {},
        { path: `${name}-e2e.input.js`, source },
        options
      );
    }

    expect(source).toEqual(read(`${name}-e2e.output.js`).trim());
  });
});
