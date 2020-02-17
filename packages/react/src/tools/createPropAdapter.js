/**
 * Generically maps a give old prop to a new prop. Used for deprecations,
 * breaking changes etc --
 *
 * @param {object} spec - the old prop to map and the new prop to map to
 */
function createPropAdapter(spec) {
  // if downshift props aren't pass input should be object by default
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

// g
const mapDownshiftProps = createPropAdapter([[/^default/g, 'initial']]);

export { mapDownshiftProps };
