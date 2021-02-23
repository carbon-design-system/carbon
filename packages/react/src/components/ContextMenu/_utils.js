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
      list.querySelectorAll(`li.${prefix}--context-menu-option`)
    ).filter((child) => !submenus.some((submenu) => submenu.contains(child)));
  }

  return nodes.filter((node) =>
    node.matches(`:not(.${prefix}--context-menu-option--disabled)`)
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
  const submenu = node.querySelector(`ul.${prefix}--context-menu`);

  if (submenu) {
    const subnodes = getValidNodes(submenu);

    return subnodes[0] || null;
  }

  return null;
}

export function getParentNode(node) {
  if (node) {
    const parentNode = node.parentNode.closest(
      `li.${prefix}--context-menu-option`
    );

    return parentNode || null;
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
    if (closestFocusableElement?.tagName === 'LI') {
      return getFirstSubNode(closestFocusableElement) !== null;
    }
  }

  return false;
}
