export const defaultFilterItems = (items, { itemToString, inputValue }) =>
  items.filter(item => {
    if (!inputValue) {
      return true;
    }
    return itemToString(item)
      .toLowerCase()
      .includes(inputValue.toLowerCase());
  });
