/**
 * Copyright IBM Corp. 2020, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs-extra');
const path = require('path');

async function build() {
  const stylesPackageRoot = path.resolve(__dirname, '..', '..', 'ibm-products-styles');
  const targetRoot = path.resolve(__dirname, '..');

  // Copy SCSS files from ibm-products-styles
  const scssSource = path.join(stylesPackageRoot, 'scss');
  const scssTarget = path.join(targetRoot, 'scss');
  
  if (await fs.pathExists(scssSource)) {
    await fs.copy(scssSource, scssTarget);
    console.log('✅ Copied SCSS files from @carbon/ibm-products-styles');
  }

  // Copy CSS files from ibm-products-styles
  const cssSource = path.join(stylesPackageRoot, 'css');
  const cssTarget = path.join(targetRoot, 'css');
  
  if (await fs.pathExists(cssSource)) {
    await fs.copy(cssSource, cssTarget);
    console.log('✅ Copied CSS files from @carbon/ibm-products-styles');
  }
}

build().catch((error) => {
  console.log(error);
  process.exit(1);
});

// Made with Bob
