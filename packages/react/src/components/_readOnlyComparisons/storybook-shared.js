export const dropdownItems = [
  {
    id: 'option-0',
    text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
  },
  {
    id: 'option-1',
    text: 'Option 1',
  },
  {
    id: 'option-2',
    text: 'Option 2',
  },
  {
    id: 'option-3',
    text: 'Option 3 - a disabled item',
    Disabled: true,
  },
  {
    id: 'option-4',
    text: 'Option 4',
  },
  {
    id: 'option-5',
    text: 'Option 5',
  },
];

export const dropItemToString = (item) => (item ? item.text : '');

export const dropdownItemsStorybookSelect = dropdownItems.reduce(
  (acc, item, index) => {
    acc.options.push(index + 1);
    acc.labels[index + 1] = item.text;
    acc.mapping[index + 1] = item;
    return acc;
  },
  { options: [0], labels: { 0: 'Nothing selected' }, mapping: { 0: undefined } }
);

export const multiSelectItems = {
  options: [0, 1, 2, 3],
  labels: {
    0: 'Nothing selected',
    1: 'Option 1',
    2: 'Option 1 amd 2',
    3: 'All options',
  },
  mapping: {
    0: [],
    1: [dropdownItems[1]],
    2: [dropdownItems[1], dropdownItems[2]],
    3: dropdownItems,
  },
};

export const headerData = [
  {
    key: 'component',
  },
  {
    key: 'enabled',
    header: 'Enabled',
  },
  {
    key: 'disabled',
    header: 'Disabled',
  },
  {
    key: 'readonly',
    header: 'Readonly',
  },
];
