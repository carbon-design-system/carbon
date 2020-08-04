/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
function createPropAdapter(spec) {
  // if props aren't passed in we should default the prop to empty object
  return (input = {}) => {
    const output = {};
    Object.keys(input).forEach((key) => {
      const match = spec.find(([regex]) => {
        return key.match(regex);
      });
      if (match) {
        const [regex, replacer] = match;
        output[key.replace(regex, replacer)] = input[key];
        return;
      }
      output[key] = input[key];
    });
    return output;
  };
}

/**
 * TODO: REMOVE IN v11
 * props staring with "default..." were changed to "initial..." in Downshift v3
 *
 * @see https://github.com/downshift-js/downshift/releases/tag/v3.0.0
 */
const mapDownshiftProps = createPropAdapter([[/^default/g, 'initial']]);

export { mapDownshiftProps };
