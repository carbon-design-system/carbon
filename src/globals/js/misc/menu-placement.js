import optimizedResize from '../misc/resize';

/**
 * When called it moves a menu's contents to the given scope
 * and adds a debounced resize event listener to the window.
 * If the listener has already been added it will not add another.
 * The listener's callback emits a custom event, resizeEvent.
 * @param {HTMLElement} menu The menu element.
 * @param {HTMLElement} menuContents The menu contents element.
 * @param {HTMLElement} menuPlacementScope The element to which you wish to append menuContents.
 */
export function initMenu(menu, menuContents, menuPlacementScope) {
  menuPlacementScope.appendChild(menuContents);

  const resizeFunc = () => {
    menu.dispatchEvent(new CustomEvent('resizeEvent', { bubbles: true }));
  };

  optimizedResize.add(resizeFunc);
}

/**
 * When called, finds the position of the icon supplied and positions
 * the menu relative to that
 * @param {HTMLElement} menu The menu element.
 * @param {HTMLElement} menuContents The menu contents element.
 * @param {Object} offset The object containing the left and top offset values.
 * @param {string} direction The direction you wish to place the menuContents relative to menu.
 * left, top, right, and bottom are valid.
 */
export function placeMenu(menu, menuContents, offset, direction) {
  const menuPosition = menu.getBoundingClientRect();
  const menuHeight = menuPosition.height;
  const menuWidth = menuPosition.width;
  const scroll = menu.ownerDocument.defaultView.pageYOffset;

  const menuContentsPosition = menuContents.getBoundingClientRect();
  const menuContentsHeight = menuContentsPosition.height;
  const menuContentsWidth = menuContentsPosition.width;

  const centerHorizontal = menuPosition.left + ((menuPosition.right - menuPosition.left) / 2);
  const centerVertical = menuPosition.top + ((menuPosition.bottom - menuPosition.top) / 2);

  let topCalc;
  let leftCalc;

  if (direction === 'left') {
    topCalc = (((centerVertical - (menuContentsHeight / 2)) + scroll)) + offset.top;
    leftCalc = (centerHorizontal - (menuWidth / 2) - menuContentsWidth) + offset.left;
  }
  if (direction === 'top') {
    topCalc = ((centerVertical - (menuHeight / 2) - menuContentsHeight) + scroll) - offset.top;
    leftCalc = (centerHorizontal - (menuContentsWidth / 2)) + offset.left;
  }
  if (direction === 'right') {
    topCalc = (((centerVertical - (menuContentsHeight / 2)) + scroll)) + offset.top;
    leftCalc = (centerHorizontal + (menuWidth / 2)) + offset.left;
  }
  if (direction === 'bottom') {
    topCalc = ((centerVertical + (menuHeight / 2) + scroll)) + offset.top;
    leftCalc = (centerHorizontal - (menuContentsWidth / 2)) + offset.left;
  }

  if (topCalc) {
    menuContents.style.top = `${topCalc}px`; // eslint-disable-line no-param-reassign
  }
  if (leftCalc) {
    menuContents.style.left = `${leftCalc}px`; // eslint-disable-line no-param-reassign
  }
  menuContents.style.position = 'absolute'; // eslint-disable-line no-param-reassign
  menuContents.style.right = 'auto'; // eslint-disable-line no-param-reassign
  menuContents.style.margin = 0; // eslint-disable-line no-param-reassign
}
