/**
 * @function mixinfn
 * @param {Class} ToMix The class to mix.
 * @returns {Class} The class mixed-in with the given ToMix class.
 */

/**
 * @param {...mixinfn} mixinfns The functions generating mix-ins.
 * @returns {Class} The class generated with the given mix-ins.
 */
export default function mixin(...mixinfns) {
  return mixinfns.reduce((Class, mixinfn) => mixinfn(Class), class {});
}
