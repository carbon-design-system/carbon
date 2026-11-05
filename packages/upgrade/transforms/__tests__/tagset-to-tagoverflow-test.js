/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { defineTest } = require('jscodeshift/dist/testUtils');

// Core migration: import rename, JSX rename, tags→items, type→tagType,
// id injection, overflowAutoAlign→autoAlign, onOverflowClick removal,
// deprecated-prop annotation, dynamic-ref TODO comment
defineTest(__dirname, 'tagset-to-tagoverflow');

// Aliased import: `TagSet as MyTagSet` → `TagOverflow as MyTagSet`
defineTest(
  __dirname,
  'tagset-to-tagoverflow',
  null,
  'tagset-to-tagoverflow-aliased'
);
