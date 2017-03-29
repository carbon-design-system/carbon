/**
 * @param {Array} a An array.
 * @returns {Array} The flattened version of the given array.
 */
function flatten(a) {
  return a.reduce((result, item) => {
    if (Array.isArray(item)) {
      result.push(...flatten(item));
    } else {
      result.push(item);
    }
    return result;
  }, []);
}

/**
 * An interface for defining mix-in classes. Used with {@link mixin}.
 * @function mixinfn
 * @param {Class} ToMix The class to mix.
 * @returns {Class} The class mixed-in with the given ToMix class.
 */

/**
 * @function mixin
 * @param {...mixinfn} mixinfns The functions generating mix-ins.
 * @returns {Class} The class generated with the given mix-ins.
 */
export default function mixin(...mixinfns) {
  return flatten(mixinfns).reduce((Class, mixinfn) => mixinfn(Class), class {});
}
