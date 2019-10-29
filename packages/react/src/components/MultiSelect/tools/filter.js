import { buildHierarchy } from './sorting';

export const getAllChildren = (item, items) => {
  const results = [];
  const children = items.filter(
    theItem => theItem.parentId && theItem.parentId === item.id
  );

  if (children.length > 0) {
    results.push(...children);

    children.forEach(child => {
      results.push(...getAllChildren(child, items));
    });
  }

  return results;
};

export const defaultFilterItems = (
  items,
  { itemToString, inputValue, expandedItems }
) =>
  items.filter(item => {
    const parents = buildHierarchy(item, items);
    parents.pop();

    if (parents.length > 0 && expandedItems) {
      // If any parent item is not expanded, the child item should not be shown
      const isExpanded = !parents.some(
        parent =>
          !expandedItems.some(expandedItem => expandedItem.id === parent.id)
      );
      if (!isExpanded) {
        return false;
      }
    }

    if (!inputValue) {
      return true;
    }

    const children = getAllChildren(item, items).filter(theItem =>
      itemToString(theItem)
        .toLowerCase()
        .includes(inputValue.toLowerCase())
    );
    if (children.length > 0) {
      // if any of the child item matches, the parent item should be shown
      return true;
    }

    if (parents.length > 0) {
      const isVisible = parents.some(parent =>
        itemToString(parent)
          .toLowerCase()
          .includes(inputValue.toLowerCase())
      );
      if (isVisible) {
        // if it matches any of the parents, all sub items should be shown
        return true;
      }
    }

    return itemToString(item)
      .toLowerCase()
      .includes(inputValue.toLowerCase());
  });
