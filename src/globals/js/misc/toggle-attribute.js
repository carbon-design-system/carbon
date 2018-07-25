/**
 * Toggles the given attribute of the given element.
 * @param {Element} elem The element.
 * @param {string} name The attribute name.
 * @param {boolean} add `true` to set the attribute.
 */
export default function toggleAttribute(elem, name, add) {
  if (add) {
    elem.setAttribute(name, '');
  } else {
    elem.removeAttribute(name);
  }
}
