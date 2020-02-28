import React from 'react';
import { useSelect } from 'downshift';

const defaultItemToString = item => {
  if (typeof item === 'string') {
    return item;
  }

  return item ? item.label : '';
};

export default function Dropdown(
  props,
  {
    disabled = false,
    type = 'default',
    itemToString = defaultItemToString,
    itemToElement = null,
    light = false,
    titleText = '',
    helperText = '',
  }
) {
  const { items } = props;

  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({ items });

  return (
    <div>
      <label {...getLabelProps()}>Choose an element:</label>
      <button {...getToggleButtonProps()}>{selectedItem || 'Elements'}</button>
      <ul {...getMenuProps()}>
        {isOpen &&
          items.map((item, index) => (
            <li
              style={
                highlightedIndex === index ? { backgroundColor: '#bde4ff' } : {}
              }
              key={`${item}${index}`}
              {...getItemProps({ item, index })}>
              {item.text}
            </li>
          ))}
      </ul>
    </div>
  );
}
