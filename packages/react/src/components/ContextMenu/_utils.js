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
  const nodes = Array.from(list?.childNodes ?? []).reduce((acc, child) => {
    if (child.tagName === 'LI') {
      return [...acc, child];
    }

    if (child.classList.contains(`${prefix}--context-menu-radio-group`)) {
      return [...acc, ...child.childNodes];
    }

    return acc;
  }, []);

  return nodes.filter((node) =>
    node.matches(
      `li.${prefix}--context-menu-option:not(.${prefix}--context-menu-option--disabled)`
    )
  );
}

export function getNextNode(current, direction) {
  const nodes = getValidNodes(current.parentNode);
  const currentIndex = nodes.indexOf(current);

  const nextNode = nodes[currentIndex + direction];

  return nextNode?.firstChild || null;
}

export function getFirstSubNode(node) {
  const submenu = node.querySelector(`ul.${prefix}--context-menu`);

  if (submenu) {
    const subnodes = getValidNodes(submenu);

    return subnodes[0]?.firstChild || null;
  }

  return null;
}

export function getParentNode(node) {
  if (node) {
    const parentNode = node.parentNode.closest(
      `li.${prefix}--context-menu-option`
    );

    return parentNode?.firstChild || null;
  }

  return null;
}

export function getParentMenu(el) {
  if (el) {
    const parentMenu = el.parentNode.closest(`ul.${prefix}--context-menu`);

    return parentMenu || null;
  }

  return null;
}

export function clickedElementHasSubnodes(e) {
  if (e) {
    const closestFocusableElement = e.target.closest('[tabindex]');
    if (closestFocusableElement?.tagName === 'BUTTON') {
      return getFirstSubNode(closestFocusableElement.parentNode) !== null;
    }
  }

  return false;
}
