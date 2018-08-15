/**
 * @param {Object<string, Function>} propTypes The list of type checkers, keyed by prop names.
 * @returns {Object<string, Function>}
 *   The new prop type checkers that checks if one of the given props exist,
 *   in addition to the original type checkings.
 */
export default function isRequiredOneOf(propTypes) {
  const names = Object.keys(propTypes);
  const checker = propType => (props, propName, componentName, ...rest) => {
    if (__DEV__ && names.every(name => !props.hasOwnProperty(name))) {
      return new Error(
        `${componentName} requires one of the following props: ${names.join(
          ', '
        )}`
      );
    }
    return propType(props, propName, componentName, ...rest);
  };
  return names.reduce(
    (o, name) => ({
      ...o,
      [name]: checker(propTypes[name]),
    }),
    {}
  );
}
