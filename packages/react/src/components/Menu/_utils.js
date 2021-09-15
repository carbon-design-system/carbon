import { settings } from 'carbon-components';

const { prefix } = settings;

export function resetFocus(el) {
  if (el) {
    Array.from(el.querySelectorAll('[tabindex="0"]') ?? []).forEach((node) => {
      node.tabIndex = -1;
    });
  }
}

export function focusNode(node) {
  if (node) {
    node.tabIndex = 0;
    node.focus();
  }
}

export function getValidNodes(list) {
  const { level } = list.dataset;

  let nodes = [];

  if (level) {
    const submenus = Array.from(list.querySelectorAll('[data-level]'));
    nodes = Array.from(
      list.querySelectorAll(`li.${prefix}--menu-option`)
    ).filter((child) => !submenus.some((submenu) => submenu.contains(child)));
  }

  return nodes.filter((node) =>
    node.matches(`:not(.${prefix}--menu-option--disabled)`)
  );
}

export function getNextNode(current, direction) {
  const menu = getParentMenu(current);
  const nodes = getValidNodes(menu);
  const currentIndex = nodes.indexOf(current);

  const nextNode = nodes[currentIndex + direction];

  return nextNode || null;
}

export function getFirstSubNode(node) {
  const submenu = node.querySelector(`ul.${prefix}--menu`);

  if (submenu) {
    const subnodes = getValidNodes(submenu);

    return subnodes[0] || null;
  }

  return null;
}

export function getParentNode(node) {
  if (node) {
    const parentNode = node.parentNode.closest(`li.${prefix}--menu-option`);

    return parentNode || null;
  }

  return null;
}

export function getParentMenu(el) {
  if (el) {
    const parentMenu = el.parentNode.closest(`ul.${prefix}--menu`);

    return parentMenu || null;
  }

  return null;
}

export function clickedElementHasSubnodes(e) {
  if (e) {
    const closestFocusableElement = e.target.closest('[tabindex]');
    if (closestFocusableElement?.tagName === 'LI') {
      return getFirstSubNode(closestFocusableElement) !== null;
    }
  }

  return false;
}

/**
 * @param {number} [value] The value to cap
 * @param {number} [min] The minimum of the range
 * @param {number} [max] The maximum of the range
 * @returns {number} Whether or not the element fits inside the boundaries on the given axis
 */
export function capWithinRange(value, min, max) {
  if (value > max) {
    return max;
  }

  if (value < min) {
    return min;
  }

  return value;
}

/**
 * @param {number[]} [elementDimensions] The dimensions of the element: [width, height]
 * @param {number[]} [position] The desired position of the element: [x, y]
 * @param {number[]} [boundaries] The boundaries of the container the element should be contained in: [minX, minY, maxX, maxY]
 * @param {string} [axis="x"] Which axis to check. Either "x" or "y"
 * @returns {boolean} Whether or not the element fits inside the boundaries on the given axis
 */
function elementFits(elementDimensions, position, boundaries, axis = 'x') {
  const index = axis === 'y' ? 1 : 0;

  const min = boundaries[index];
  const max = boundaries[index + 2];

  const start = position[index];
  const end = position[index] + elementDimensions[index];

  return start >= min && end <= max;
}

/**
 * @param {number[]} [elementDimensions] The dimensions of the element: [width, height]
 * @param {number[]} [targetBoundaries] The boundaries of the target the element should attach to: [minX, minY, maxX, maxY]
 * @param {number[]} [containerBoundaries] The boundaries of the container the element should be contained in: [minX, minY, maxX, maxY]
 * @param {number} [preferredDirection=1] Which direction is preferred. Either 1 (right right) or -1 (to left)
 * @returns {object} The determined position and direction of the element: { position: [x, y], direction: 1 | -1 }
 */
export function getPosition(
  elementDimensions,
  targetBoundaries,
  containerBoundaries,
  preferredDirection = 1
) {
  const position = [0, 0];
  let direction = preferredDirection;

  // x
  position[0] =
    direction === 1
      ? targetBoundaries[0]
      : targetBoundaries[2] - elementDimensions[0];

  const xFits = elementFits(
    elementDimensions,
    position,
    containerBoundaries,
    'x'
  );
  if (!xFits) {
    direction = direction * -1;
    position[0] =
      direction === 1
        ? targetBoundaries[0]
        : targetBoundaries[2] - elementDimensions[0];
  }

  // y
  position[1] = targetBoundaries[3];

  const yFits = elementFits(
    elementDimensions,
    position,
    containerBoundaries,
    'y'
  );
  if (!yFits) {
    position[1] = targetBoundaries[1] - elementDimensions[1];
  }

  return {
    position,
    direction,
  };
}
