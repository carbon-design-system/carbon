/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { defineTest } = require('jscodeshift/dist/testUtils');

const transformName = 'ibm-products-tagset-to-tagoverflow';

// Core migration: import rename, JSX rename, tags→items, type→tagType,
// id injection, overflowAutoAlign→autoAlign, removed props with TODOs,
// missing default label TODOs, dynamic-ref TODO comment, nested children
defineTest(__dirname, transformName);

// Aliased import: `TagSet as MyTagSet` → `TagOverflow as MyTagSet`
defineTest(__dirname, transformName, null, `${transformName}-aliased`);

// TagOverflow already imported: no duplicate binding
defineTest(__dirname, transformName, null, `${transformName}-existing-import`);

// Non-JSX references to TagSet: specifier is kept and a TODO is added
defineTest(__dirname, transformName, null, `${transformName}-other-references`);

// No TagSet import: file is left unchanged
defineTest(__dirname, transformName, null, `${transformName}-no-import`);
