/**
 * Certain props were changed in the update from Downshift v1 to v5.
 * This function maps old props being passed in to their new values.
 *
 * TO BE REMOVED IN V11
 *
 * @param {object} spec - the old prop to map and the new prop to map to
 */
function createPropAdapter(spec) {
  return input => {
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
const mapDownshiftProps = createPropAdapter([[/^default/g, 'initial']]);

export { mapDownshiftProps };
