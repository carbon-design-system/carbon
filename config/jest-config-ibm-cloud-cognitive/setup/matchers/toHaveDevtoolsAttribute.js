/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Avoid side effects from `Canary` in `ibm-products/src/settings`.
import settings from '../../../../packages/ibm-products/src/global/js/package-settings';

const { devtoolsAttribute, getDevtoolsId } = settings;

export default function toHaveDevtoolsAttribute(element, componentName) {
  return {
    message: () =>
      `Expected the element to have a devtools attribute ('${devtoolsAttribute}') with the value '${getDevtoolsId(
        componentName
      )}'`,
    pass:
      element.getAttribute(devtoolsAttribute) === getDevtoolsId(componentName),
  };
}
