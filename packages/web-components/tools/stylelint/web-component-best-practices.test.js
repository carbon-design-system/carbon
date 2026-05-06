/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import stylelint from 'stylelint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pkgRoot = path.resolve(__dirname, '../..');
const configFile = path.join(pkgRoot, 'package.json');
const componentScssPath = path.join(
  pkgRoot,
  'src/components/button/button.scss'
);

function warningsForCarbonRule(result) {
  const list = result.results[0]?.warnings ?? [];

  return list.filter((w) => w.rule === 'carbon/web-component-best-practices');
}

async function lint(code) {
  return stylelint.lint({
    code,
    codeFilename: componentScssPath,
    configFile,
  });
}

test('fails when using [dir=rtl] selector', async () => {
  const result = await lint(':host([dir=rtl]) { display: block; }');
  const [warning] = warningsForCarbonRule(result);

  assert.equal(warning.rule, 'carbon/web-component-best-practices');
  assert.match(warning.text, /:dir/);
});

test('allows :dir(rtl) selector', async () => {
  const result = await lint(':host(:dir(rtl)) { display: block; }');

  assert.equal(warningsForCarbonRule(result).length, 0);
});

test('fails shared custom property declared on class selector', async () => {
  const result = await lint('.wrapper { --cds-focus-ring: #0f62fe; }');
  const [warning] = warningsForCarbonRule(result);

  assert.equal(warning.rule, 'carbon/web-component-best-practices');
  assert.match(warning.text, /Declare shared custom property/);
});

test('allows shared custom property on :host selector', async () => {
  const result = await lint(':host(cds-button) { --cds-focus-ring: #0f62fe; }');

  assert.equal(warningsForCarbonRule(result).length, 0);
});

test('allows shared custom property on child custom-element selector', async () => {
  const result = await lint(
    ':host(cds-page-header) ::slotted(cds-tabs) { --tabs-overflow-button-background: #262626; }'
  );

  assert.equal(warningsForCarbonRule(result).length, 0);
});
