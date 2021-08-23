import React, { useState } from 'react';
import { keys, match } from '../../../../react/src/internal/keyboard';

const MultiSelectV2 = ({ options, label }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const handleSelect = (event) => {
    return setSelectedItems(selectedItems.concat(event.target.value));
  };
  const handleKeyDown = (event) => {
    if (match(event, keys.Delete)) {
      setSelectedItems([]);
      event.stopPropagation();
    }
    if (match(event, keys.Space)) {
      setSelectedItems(selectedItems.concat(event.target.value));
    }
  };
  const handleClear = () => setSelectedItems([]);

  console.log(selectedItems);

  return (
    <div>
      <label htmlFor="select">{label}</label>
      <ul id="selected-list-id">
        {selectedItems.map((selectedItem) => (
          <li>{selectedItem}</li>
        ))}
      </ul>
      <select
        aria-describedby="selected-list-id"
        id="select"
        multiple
        size={options.length}
        onClick={handleSelect}
        onKeyDown={handleKeyDown}>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <button onClick={handleClear}>clear</button>
    </div>
  );
};

export { MultiSelectV2 };
