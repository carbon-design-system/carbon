import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import Downshift from 'downshift';
import debounce from 'lodash.debounce';
import isEqual from 'lodash.isequal';
import ListBox from '../ListBox';
import Checkbox from '../Checkbox';
import GroupLabel from '../GroupLabel';
import Selection from '../../internal/Selection';
import { sortingPropTypes } from './MultiSelectPropTypes';
import { defaultItemToString } from './tools/itemToString';
import { groupedByCategory } from './tools/groupedByCategory';
import {
  buildHierarchy,
  defaultSortItems,
  defaultCompareItems,
  findParent,
} from './tools/sorting';
import { defaultFilterItems, getAllChildren } from './tools/filter';

export default class NestedFilterableMultiselect extends React.Component {
  static propTypes = {
    ...sortingPropTypes,

    /**
     * Disable the control
     */
    disabled: PropTypes.bool,

    /**
     * We try to stay as generic as possible here to allow individuals to pass
     * in a collection of whatever kind of data structure they prefer
     */
    items: PropTypes.array.isRequired,

    /**
     * Allow users to pass in arbitrary items from their collection that are
     * pre-selected
     */
    initialSelectedItems: PropTypes.array,

    /**
     * Helper function passed to downshift that allows the library to render a
     * given item to a string label. By default, it extracts the `label` field
     * from a given item to serve as the item label in the list.
     */
    itemToString: PropTypes.func,

    /**
     * Specify the locale of the control. Used for the default `compareItems`
     * used for sorting the list of items in the control.
     */
    locale: PropTypes.string,

    /**
     * `onChange` is a utility for this controlled component to communicate to a
     * consuming component what kind of internal state changes are occuring.
     */
    onChange: PropTypes.func,

    /**
     * Generic `placeholder` that will be used as the textual representation of
     * what this field is for
     */
    placeholder: PropTypes.string.isRequired,

    /**
     * `true` to use the light version.
     */
    light: PropTypes.bool,

    /**
     * `customCategorySorting` is use to sort the items by category, aphabetic order if not specify
     */
    customCategorySorting: PropTypes.func,

    /**
     * `true` to show tooltip.
     */
    showTooltip: PropTypes.bool,
  };

  static defaultProps = {
    compareItems: defaultCompareItems,
    disabled: false,
    filterItems: defaultFilterItems,
    initialSelectedItems: [],
    itemToString: defaultItemToString,
    locale: 'en',
    sortItems: defaultSortItems,
    light: false,
    showTooltip: true,
  };

  static find(items = [], target) {
    let found;
    items.some(item => {
      if (item.id === target.id) {
        found = item;
        return true;
      }
      return false;
    });
    return found;
  }

  static computeId({ item, itemToString = defaultItemToString, parentId }) {
    return `${parentId ? `${parentId}-` : ''}${item.id || itemToString(item)}`;
  }

  static flatten({
    category,
    items = [],
    level,
    parentId,
    itemToString = defaultItemToString,
  }) {
    return items.reduce((list, item) => {
      const mappedItem = {
        ...item,
        id: NestedFilterableMultiselect.computeId({
          item,
          itemToString,
          parentId,
        }),
        category: category || item.category,
        level: level || 0,
        hasChildren: !!item.options,
        parentId,
      };
      list.push(mappedItem);
      if (Array.isArray(item.options) && item.options.length > 0) {
        list.push(
          ...NestedFilterableMultiselect.flatten({
            category: mappedItem.category,
            items: item.options,
            level: mappedItem.level + 1,
            parentId: mappedItem.id,
            itemToString,
          })
        );
      }
      return list;
    }, []);
  }

  static cleanItem(item) {
    const result = { ...item };
    delete result.options;
    delete result.checked;
    return result;
  }

  static getDerivedStateFromProps(nextProps, currentState) {
    const { items, initialSelectedItems, itemToString } = nextProps;
    const { flattenedItems, flattenedSelectedItems } = currentState;

    const itemsToProcess = initialSelectedItems
      ? items.map(obj => initialSelectedItems.find(o => o.id === obj.id) || obj)
      : items;
    const isHierarchical = items.some(item => !!item.options);
    const updatedItems = isHierarchical
      ? NestedFilterableMultiselect.flatten({
          items: itemsToProcess,
          itemToString,
        }).map(NestedFilterableMultiselect.cleanItem)
      : itemsToProcess;

    if (!isEqual(updatedItems, flattenedItems)) {
      const updatedSelectedItems = isHierarchical
        ? NestedFilterableMultiselect.flatten({
            items: initialSelectedItems,
            itemToString,
          })
            .filter((item, index, itemArray) => {
              if (!item.parentId || item.checked) {
                return true;
              }

              // Any parent checked will make all its children checked
              const hierarchy = buildHierarchy(item, itemArray);
              const parentChecked = hierarchy.some(parent => parent.checked);
              if (parentChecked) {
                return true;
              }

              // Any child checked will make its parent checked
              const allChildren = getAllChildren(item, itemArray);
              const childChecked = allChildren.some(child => child.checked);
              if (childChecked) {
                return true;
              }

              // If none of the children has the `checked` flag,
              // all children are considered checked.
              const rootAllChildren = getAllChildren(hierarchy[0], itemArray);
              return (
                rootAllChildren.length > 0 &&
                !rootAllChildren.some(child => child.checked)
              );
            })
            .map(NestedFilterableMultiselect.cleanItem)
        : initialSelectedItems.reduce(
            (list, item) => {
              // Any parent checked will make all its children checked
              const hierarchy = buildHierarchy(item, updatedItems);
              hierarchy.forEach(parent => {
                if (!NestedFilterableMultiselect.find(list, parent)) {
                  list.push({ ...parent });
                }
              });

              // If none of the children has the `checked` flag,
              // all children are considered checked.
              const allChildren = getAllChildren(item, updatedItems);
              if (
                !allChildren.some(child =>
                  NestedFilterableMultiselect.find(list, child)
                )
              ) {
                list.push(...allChildren.map(child => ({ ...child })));
              }

              return list;
            },
            [...initialSelectedItems]
          );

      flattenedItems.splice(0, flattenedItems.length, ...updatedItems);
      flattenedSelectedItems.splice(
        0,
        flattenedSelectedItems.length,
        ...updatedSelectedItems
      );

      return {
        ...currentState,
        flattenedItems,
        flattenedSelectedItems,
      };
    }

    return null;
  }

  static updateCheckedState({
    options = [],
    itemToString = defaultItemToString,
    parentId,
    selectedItems,
  }) {
    return options.map(option => {
      const optionId = NestedFilterableMultiselect.computeId({
        item: option,
        itemToString,
        parentId,
      });
      const result = { ...option };
      if (result.options) {
        result.options = NestedFilterableMultiselect.updateCheckedState({
          options: result.options,
          itemToString,
          parentId: optionId,
          selectedItems,
        });
        // The parent is checked only if all its children is checked
        result.checked = !result.options.some(option => !option.checked);
      } else {
        result.checked = selectedItems.some(
          selectedItem => selectedItem.id === optionId
        );
      }
      return result;
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      highlightedIndex: null,
      isOpen: false,
      inputValue: '',
      flattenedItems: [],
      flattenedSelectedItems: [],
      expandedItems: [],
    };
  }

  handleOnChange = changes => {
    const { items, itemToString, onChange } = this.props;

    if (onChange) {
      const { selectedItems = [] } = changes;

      const isHierarchical = items.some(item => !!item.options);
      const mappedSelectedItems = isHierarchical
        ? items.reduce((list, item) => {
            if (NestedFilterableMultiselect.find(selectedItems, item)) {
              const selectedItem = { ...item };
              if (item.options) {
                selectedItem.options = NestedFilterableMultiselect.updateCheckedState(
                  {
                    options: item.options,
                    itemToString,
                    parentId: NestedFilterableMultiselect.computeId({
                      item,
                      itemToString,
                    }),
                    selectedItems,
                  }
                );
              }
              list.push(selectedItem);
            }
            return list;
          }, [])
        : selectedItems;

      onChange({ selectedItems: mappedSelectedItems });
    }
  };

  onToggle = item => {
    const isExpanded = NestedFilterableMultiselect.find(
      this.state.expandedItems,
      item
    );
    !isExpanded
      ? this.setState({ expandedItems: [...this.state.expandedItems, item] })
      : this.setState(prevState => ({
          expandedItems: prevState.expandedItems.filter(
            expandedItem => expandedItem.id !== item.id
          ),
        }));
  };

  handleOnOuterClick = () => {
    this.setState({
      isOpen: false,
      inputValue: '',
    });
  };

  handleOnStateChange = changes => {
    const { type } = changes;
    switch (type) {
      case Downshift.stateChangeTypes.changeInput:
        this.setState({ inputValue: changes.inputValue });
        break;
      case Downshift.stateChangeTypes.keyDownArrowUp:
      case Downshift.stateChangeTypes.itemMouseEnter:
        this.setState({ highlightedIndex: changes.highlightedIndex });
        break;
      case Downshift.stateChangeTypes.keyDownArrowDown:
        this.setState({
          highlightedIndex: changes.highlightedIndex,
          isOpen: true,
        });
        break;
      case Downshift.stateChangeTypes.keyDownEscape:
      case Downshift.stateChangeTypes.mouseUp:
        this.setState({ isOpen: false });
        break;
      // Opt-in to some cases where we should be toggling the menu based on
      // a given key press or mouse handler
      // Reference: https://github.com/paypal/downshift/issues/206
      case Downshift.stateChangeTypes.clickButton:
      case Downshift.stateChangeTypes.keyDownSpaceButton:
        this.setState(() => {
          let nextIsOpen = changes.isOpen || false;
          if (changes.isOpen === false) {
            // If Downshift is trying to close the menu, but we know the input
            // is the active element in thedocument, then keep the menu open
            if (this.inputNode === document.activeElement) {
              nextIsOpen = true;
            }
          }
          return {
            isOpen: nextIsOpen,
          };
        });
        break;
    }
  };

  handleOnInputValueChange = debounce((value, { type }) => {
    if (type === Downshift.stateChangeTypes.changeInput) {
      const { filterItems, itemToString } = this.props;
      const {
        expandedItems,
        flattenedItems: items,
        inputValue: prevInputValue,
      } = this.state;

      const inputValue = Array.isArray(value) ? prevInputValue : value;

      const itemsToExpand = items.reduce((toExpand, item) => {
        const allChildren = getAllChildren(item, items);
        if (allChildren.length > 0) {
          const filteredChildren = filterItems(allChildren, {
            itemToString,
            inputValue,
          });
          if (filteredChildren.length > 0) {
            if (
              !inputValue ||
              NestedFilterableMultiselect.find(expandedItems, item)
            ) {
              return toExpand;
            }
            if (!NestedFilterableMultiselect.find(toExpand, item)) {
              toExpand.push(item);
            }
          }
        }
        return toExpand;
      }, []);

      this.setState(() => {
        return {
          expandedItems: [...expandedItems, ...itemsToExpand],
          inputValue: inputValue || '',
        };
      });
    }
  }, 200).bind(this);

  clearInputValue = event => {
    event.stopPropagation();
    this.setState({ inputValue: '' });
    this.inputNode && this.inputNode.focus && this.inputNode.focus();
  };

  getParentItem = item => {
    const { flattenedItems: items } = this.state;
    return findParent(item, items);
  };

  onItemChange = (item, selectedItems, onItemChange) => {
    const { flattenedItems: items } = this.state;

    const toRemove = !!NestedFilterableMultiselect.find(selectedItems, item);

    const itemsChanged = [item];

    if (item.parentId) {
      // Walk parents
      const parents = buildHierarchy(item, items).reverse();
      parents.shift();
      parents.some(parent => {
        const isSelected = !!NestedFilterableMultiselect.find(
          selectedItems,
          parent
        );
        const children = selectedItems.filter(
          selectedItem => selectedItem.parentId === parent.id
        );
        if (children.length === 1 && toRemove && isSelected) {
          // Uncheck parent too and keep walking up
          itemsChanged.push(parent);
          return false;
        } else if (!toRemove && !isSelected) {
          // Check parent too
          itemsChanged.push(parent);
          return false;
        }
        // If selecting a new item, we need to keep going up to
        // make sure all parents are checked.
        // If unselecting an item, we will break out when the
        // current parent does not need to be removed
        return toRemove;
      });
    }

    // Walk children
    const children = getAllChildren(item, items);
    if (children.length > 0) {
      children.forEach(child => {
        const isSelected = !!NestedFilterableMultiselect.find(
          selectedItems,
          child
        );
        if (toRemove && isSelected) {
          // Uncheck the child too
          itemsChanged.push(child);
        } else if (!toRemove && !isSelected) {
          // Check the child too
          itemsChanged.push(child);
        }
      });
    }

    onItemChange(itemsChanged);
  };

  render() {
    const {
      highlightedIndex,
      isOpen,
      inputValue,
      expandedItems,
      flattenedItems: items,
      flattenedSelectedItems: initialSelectedItems,
    } = this.state;
    const {
      className: containerClassName,
      disabled,
      filterItems,
      itemToString,
      id,
      locale,
      placeholder,
      sortItems,
      compareItems,
      light,
      customCategorySorting,
      showTooltip,
    } = this.props;

    const className = cx(
      'bx--multi-select',
      'bx--combo-box',
      containerClassName,
      {
        'bx--list-box--light': light,
      }
    );

    let currentIndex = -1;
    let highlighted;

    return (
      <Selection
        onChange={this.handleOnChange}
        initialSelectedItems={initialSelectedItems}
        render={({ selectedItems, onItemChange, clearSelection }) => (
          <Downshift
            highlightedIndex={highlightedIndex}
            isOpen={isOpen}
            inputValue={inputValue}
            onInputValueChange={this.handleOnInputValueChange}
            onChange={item => {
              this.onItemChange(item, selectedItems, onItemChange);
            }}
            itemToString={itemToString}
            onStateChange={this.handleOnStateChange}
            onOuterClick={this.handleOnOuterClick}
            selectedItem={selectedItems}
            render={({
              getButtonProps,
              getInputProps,
              getItemProps,
              getRootProps,
              isOpen,
              inputValue,
              selectedItem,
            }) => (
              <ListBox
                className={className}
                disabled={disabled}
                {...getRootProps({ refKey: 'innerRef' })}>
                <ListBox.Field tabIndex="-1" {...getButtonProps({ disabled })}>
                  {selectedItem.length > 0 && (
                    <ListBox.Selection
                      clearSelection={clearSelection}
                      selectionCount={
                        selectedItem.filter(item => !item.hasChildren).length
                      }
                    />
                  )}
                  <input
                    className="bx--text-input"
                    aria-label={placeholder}
                    ref={el => (this.inputNode = el)}
                    {...getInputProps({
                      disabled,
                      id,
                      placeholder,
                      onKeyDown: e => {
                        e.stopPropagation();
                        const highlightedItem = highlighted && highlighted.item;
                        if (highlightedItem) {
                          if (e.which === 40) {
                            // Down arrow
                            if (
                              highlightedItem.hasChildren &&
                              !expandedItems.includes(highlightedItem)
                            ) {
                              this.onToggle(highlightedItem);
                            }
                          } else if (e.which === 38) {
                            // Up arrow
                            const parentItem = this.getParentItem(
                              highlightedItem
                            );
                            if (
                              parentItem &&
                              highlighted.parentIndex > -1 &&
                              highlighted.index ===
                                highlighted.parentIndex + 1 &&
                              expandedItems.includes(parentItem)
                            ) {
                              this.onToggle(parentItem);
                            }
                          }
                        }
                      },
                      onKeyUp: e => {
                        const which = e.which;
                        if (which === 27) {
                          this.setState({ isOpen: false });
                        }
                      },
                    })}
                  />
                  {inputValue && isOpen && (
                    <ListBox.Selection clearSelection={this.clearInputValue} />
                  )}
                  <ListBox.MenuIcon isOpen={isOpen} />
                </ListBox.Field>
                {isOpen && (
                  <ListBox.Menu
                    style={{
                      maxHeight: '424px',
                      overflowX: 'hidden',
                      paddingTop: '8px',
                    }}>
                    {groupedByCategory(items, customCategorySorting).map(
                      (group, index) => {
                        const hasGroups =
                          group[0] !== 'undefined' ? true : false;
                        const filteredItems = filterItems(group[1], {
                          itemToString,
                          inputValue,
                          expandedItems,
                        });
                        let categoryName = '';
                        hasGroups
                          ? (categoryName = group[0].toUpperCase())
                          : null;

                        return (
                          <Fragment key={group[0] || index}>
                            {hasGroups && filteredItems.length > 0 && (
                              <div>
                                <GroupLabel key={index}>
                                  {categoryName}
                                </GroupLabel>
                              </div>
                            )}
                            {sortItems(filteredItems, {
                              selectedItems,
                              itemToString,
                              compareItems,
                              locale,
                            }).map((item, itemIndex, itemArr) => {
                              currentIndex++;

                              if (highlightedIndex === currentIndex) {
                                const parentItem = this.getParentItem(item);
                                highlighted = {
                                  item,
                                  index: itemIndex,
                                  parentIndex: parentItem
                                    ? itemArr.indexOf(parentItem)
                                    : -1,
                                };
                              }

                              const itemProps = getItemProps({
                                item,
                                index: currentIndex,
                              });
                              const itemText = itemToString(item);

                              const isChecked =
                                selectedItem.filter(
                                  selected => selected.id == item.id
                                ).length > 0;
                              const subOptions = getAllChildren(item, items);
                              const groupIsOpen = !!NestedFilterableMultiselect.find(
                                expandedItems,
                                item
                              );

                              const myCheckedOptions = subOptions.filter(
                                subOption =>
                                  selectedItem.filter(
                                    selected => selected.id === subOption.id
                                  ).length > 0
                              );
                              const myUncheckedOptions = subOptions.filter(
                                subOption =>
                                  selectedItem.filter(
                                    selected => selected.id === subOption.id
                                  ).length === 0
                              );

                              const itemStyle = item.level
                                ? {
                                    paddingLeft: `${item.level * 19 + 16}px`,
                                  }
                                : undefined;

                              return (
                                <ListBox.MenuItem
                                  style={itemStyle}
                                  isActive={isChecked}
                                  isHighlighted={
                                    highlightedIndex === currentIndex
                                  }
                                  {...itemProps}
                                  onClick={e => {
                                    {
                                      const clickOutOfCheckBox =
                                        subOptions.length > 0 &&
                                        (e.target.localName !== 'label' &&
                                          e.target.localName !== 'input');
                                      if (clickOutOfCheckBox) {
                                        this.onToggle(item);
                                      } else {
                                        this.onItemChange(
                                          item,
                                          selectedItems,
                                          onItemChange
                                        );
                                      }
                                    }
                                  }}>
                                  <Checkbox
                                    id={itemProps.id}
                                    name={itemText}
                                    checked={isChecked}
                                    indeterminate={
                                      myCheckedOptions &&
                                      myUncheckedOptions &&
                                      myCheckedOptions.length > 0 &&
                                      myUncheckedOptions.length > 0
                                    }
                                    readOnly={true}
                                    tabIndex="-1"
                                    labelText={itemText}
                                    tooltipText={showTooltip && itemText}
                                    hasGroups={subOptions.length > 0}
                                    isExpanded={groupIsOpen}
                                  />
                                </ListBox.MenuItem>
                              );
                            })}
                          </Fragment>
                        );
                      }
                    )}
                  </ListBox.Menu>
                )}
              </ListBox>
            )}
          />
        )}
      />
    );
  }
}
