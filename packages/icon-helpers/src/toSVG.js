import getAttributes from './getAttributes';

/**
 * Convert an icon descriptor to a DOM node.
 */
export default function toSVG(descriptor) {
  const { elem = 'svg', attrs = {}, content = [] } = descriptor;
  const node = document.createElementNS('http://www.w3.org/2000/svg', elem);

  Object.keys(elem !== 'svg' ? attrs : getAttributes(attrs)).forEach(key => {
    node.setAttribute(key, attrs[key]);
  });

  for (let i = 0; i < content.length; i++) {
    node.appendChild(toSVG(content[i]));
  }

  return node;
}
