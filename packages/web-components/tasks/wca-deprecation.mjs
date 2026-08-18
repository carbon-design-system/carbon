/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Tracking: https://github.com/carbon-design-system/carbon/issues/20670
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { reporter } from '@carbon/cli-reporter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const file = path.resolve(__dirname, '..', 'custom-elements.json');

const manifest = JSON.parse(fs.readFileSync(file, 'utf8'));

const deprecated = {
  message:
    'The WCA manifest format is deprecated and will be removed in the next major version (v3.0.0), in favor of the standard Custom Elements Manifest (CEM).',
  removeInVersion: '3.0.0',
  replacement: 'Custom Elements Manifest (CEM)',
  issue: 'https://github.com/carbon-design-system/carbon/issues/20670',
};

// surface at top of file
fs.writeFileSync(
  file,
  JSON.stringify({ _deprecated: deprecated, ...manifest }, null, 2) + '\n'
);

reporter.warn(
  'custom-elements.json (WCA format) is deprecated and will be removed in v3.0.0, in favor of the standard Custom Elements Manifest (CEM). See https://github.com/carbon-design-system/carbon/issues/20670.'
);
