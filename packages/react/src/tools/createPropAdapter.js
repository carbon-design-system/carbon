/**
 * Generically maps a give old prop to a new prop. Used for deprecations,
 * breaking changes etc --
 *
 * @param {Array} spec - the matcher we're looking for and what to replace it with
 */
function createPropAdapter(spec) {
  // if props aren't passed in we should default the prop to empty object
  return (input = {}) => {
    const output = {};
    Object.keys(input).forEach(key => {
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
