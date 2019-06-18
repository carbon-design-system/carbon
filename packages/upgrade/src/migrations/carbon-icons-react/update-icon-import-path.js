/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

module.exports = (file, api, options) => {
  const j = api.jscodeshift;
  const root = j(file.source);

  // 1) import SomeIconName from '@carbon/icons-react/es/add/size';
  // 2) import SomeIconName from '@carbon/icons-react/lib/add/size';
  // 3) Handle multiple icon imports and consolidate into one

  console.log(file.path);
  return root.toSource();
};
