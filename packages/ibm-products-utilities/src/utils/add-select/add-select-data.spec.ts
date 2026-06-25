/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AddSelectData, AddSelectItem } from './add-select-data';

describe('AddSelectData', () => {
  let dataManager: AddSelectData;
  let sampleData: AddSelectItem[];

  beforeEach(() => {
    dataManager = new AddSelectData();
    sampleData = [
      {
        id: '1',
        title: 'Item 1',
        value: 'item1',
      },
      {
        id: '2',
        title: 'Item 2',
        value: 'item2',
        children: {
          entries: [
            {
              id: '2-1',
              title: 'Item 2-1',
              value: 'item2-1',
            },
            {
              id: '2-2',
              title: 'Item 2-2',
              value: 'item2-2',
            },
          ],
        },
      },
      {
        id: '3',
        title: 'Item 3',
        value: 'item3',
      },
    ];
  });

  describe('setItems and getItems', () => {
    it('should set and get items', () => {
      dataManager.setItems(sampleData);
      const items = dataManager.getItems();
      expect(items).toEqual(sampleData);
      expect(items.length).toBe(3);
    });
  });

  describe('getItem', () => {
    it('should retrieve a single item by id', () => {
      dataManager.setItems(sampleData);
      const item = dataManager.getItem('2');
      expect(item).toBeDefined();
      expect(item?.title).toBe('Item 2');
    });

    it('should retrieve nested items by id', () => {
      dataManager.setItems(sampleData);
      const item = dataManager.getItem('2-1');
      expect(item).toBeDefined();
      expect(item?.title).toBe('Item 2-1');
    });

    it('should return undefined for non-existent id', () => {
      dataManager.setItems(sampleData);
      const item = dataManager.getItem('non-existent');
      expect(item).toBeUndefined();
    });
  });

  describe('setItem', () => {
    it('should update an item with new properties', () => {
      dataManager.setItems(sampleData);
      const success = dataManager.setItem('1', { title: 'Updated Item 1' });
      expect(success).toBe(true);
      const item = dataManager.getItem('1');
      expect(item?.title).toBe('Updated Item 1');
    });

    it('should return false for non-existent item', () => {
      dataManager.setItems(sampleData);
      const success = dataManager.setItem('non-existent', { title: 'Test' });
      expect(success).toBe(false);
    });
  });

  describe('Selection methods', () => {
    beforeEach(() => {
      dataManager.setItems(sampleData);
    });

    it('should set and get selected items', () => {
      dataManager.setSelectedItems('1');
      const selectedItems = dataManager.getSelectedItems();
      expect(selectedItems.length).toBe(1);
      expect(selectedItems[0].id).toBe('1');
    });

    it('should set multiple selected items', () => {
      dataManager.setSelectedItems(['1', '3']);
      const selectedItems = dataManager.getSelectedItems();
      expect(selectedItems.length).toBe(2);
    });

    it('should support exclusive selection', () => {
      dataManager.setSelectedItems(['1', '2']);
      dataManager.setSelectedItems('3', true);
      const selectedItems = dataManager.getSelectedItems();
      expect(selectedItems.length).toBe(1);
      expect(selectedItems[0].id).toBe('3');
    });

    it('should check if item is selected', () => {
      dataManager.setSelectedItems('2');
      expect(dataManager.isSelected('2')).toBe(true);
      expect(dataManager.isSelected('1')).toBe(false);
    });

    it('should clear all selections', () => {
      dataManager.setSelectedItems(['1', '2', '3']);
      dataManager.clearSelections();
      const selectedItems = dataManager.getSelectedItems();
      expect(selectedItems.length).toBe(0);
    });
  });

  describe('Status methods', () => {
    beforeEach(() => {
      dataManager.setItems(sampleData);
    });

    it('should set and get item status', () => {
      dataManager.setItemStatus('1', 'checked');
      const status = dataManager.getItemStatus('1');
      expect(status).toBe('checked');
    });

    it('should update selected property when setting status', () => {
      dataManager.setItemStatus('1', 'checked');
      expect(dataManager.isSelected('1')).toBe(true);

      dataManager.setItemStatus('1', 'unchecked');
      expect(dataManager.isSelected('1')).toBe(false);
    });

    it('should return undefined for non-existent item', () => {
      const status = dataManager.getItemStatus('non-existent');
      expect(status).toBeUndefined();
    });
  });

  describe('Hierarchy methods', () => {
    beforeEach(() => {
      dataManager.setItems(sampleData);
    });

    it('should get item children', () => {
      const children = dataManager.getItemChildren('2');
      expect(children.length).toBe(2);
      expect(children[0].id).toBe('2-1');
      expect(children[1].id).toBe('2-2');
    });

    it('should return empty array for items without children', () => {
      const children = dataManager.getItemChildren('1');
      expect(children.length).toBe(0);
    });

    it('should get item parent', () => {
      const parent = dataManager.getItemParent('2-1');
      expect(parent).toBeDefined();
      expect(parent?.id).toBe('2');
    });

    it('should return undefined for root level items', () => {
      const parent = dataManager.getItemParent('1');
      expect(parent).toBeUndefined();
    });

    it('should get all item parents', () => {
      const parents = dataManager.getItemParents('2-1');
      expect(parents.length).toBe(1);
      expect(parents[0].id).toBe('2');
    });

    it('should check if item has children', () => {
      expect(dataManager.hasChildren('2')).toBe(true);
      expect(dataManager.hasChildren('1')).toBe(false);
    });

    it('should get item depth', () => {
      expect(dataManager.getItemDepth('1')).toBe(0);
      expect(dataManager.getItemDepth('2-1')).toBe(1);
    });

    it('should get all descendants', () => {
      const descendants = dataManager.getItemDescendants('2');
      expect(descendants.length).toBe(2);
      expect(descendants[0].id).toBe('2-1');
      expect(descendants[1].id).toBe('2-2');
    });

    it('should check if item has selected descendants', () => {
      dataManager.setSelectedItems('2-1');
      expect(dataManager.hasSelectedDescendants('2')).toBe(true);
      expect(dataManager.hasSelectedDescendants('1')).toBe(false);
    });

    it('should check if all descendants are selected', () => {
      dataManager.setSelectedItems(['2-1', '2-2']);
      expect(dataManager.allDescendantsSelected('2')).toBe(true);

      dataManager.clearSelections();
      dataManager.setSelectedItems('2-1');
      expect(dataManager.allDescendantsSelected('2')).toBe(false);
    });

    it('should get all descendant IDs including the item itself', () => {
      const ids = dataManager.getAllDescendantIds('2');
      expect(ids).toContain('2');
      expect(ids).toContain('2-1');
      expect(ids).toContain('2-2');
      expect(ids.length).toBe(3);
    });

    it('should return empty array for non-existent item', () => {
      const ids = dataManager.getAllDescendantIds('non-existent');
      expect(ids.length).toBe(0);
    });

    it('should get top-level selected items', () => {
      // Select parent and one child
      dataManager.setSelectedItems(['2', '2-1']);
      const topLevel = dataManager.getTopLevelSelectedItems();

      // Should only return parent since child is descendant of selected parent
      expect(topLevel.length).toBe(1);
      expect(topLevel[0].id).toBe('2');
    });

    it('should get multiple top-level selected items', () => {
      // Select items at different levels without parent-child relationship
      dataManager.setSelectedItems(['1', '3']);
      const topLevel = dataManager.getTopLevelSelectedItems();

      expect(topLevel.length).toBe(2);
      expect(topLevel.map((item) => item.id)).toContain('1');
      expect(topLevel.map((item) => item.id)).toContain('3');
    });

    it('should return -1 for depth of non-existent item', () => {
      expect(dataManager.getItemDepth('non-existent')).toBe(-1);
    });
  });

  describe('Search functionality', () => {
    beforeEach(() => {
      dataManager.setItems(sampleData);
    });

    it('should search items by title', () => {
      const results = dataManager.search('Item 2');
      expect(results.length).toBeGreaterThan(0);
      expect(results[0].title).toContain('Item 2');
    });

    it('should search case-insensitively by default', () => {
      const results = dataManager.search('item 2');
      expect(results.length).toBeGreaterThan(0);
    });

    it('should search case-sensitively when specified', () => {
      const results = dataManager.search('item 2', { caseSensitive: true });
      expect(results.length).toBe(0);
    });

    it('should search in nested items', () => {
      const results = dataManager.search('2-1');
      expect(results.length).toBe(1);
      expect(results[0].id).toBe('2-1');
    });

    it('should return empty array for empty query', () => {
      const results = dataManager.search('');
      expect(results.length).toBe(0);
    });

    it('should search in custom fields', () => {
      const results = dataManager.search('item1', { searchFields: ['value'] });
      expect(results.length).toBe(1);
      expect(results[0].value).toBe('item1');
    });

    it('should limit search results with maxResults option', () => {
      const results = dataManager.search('Item', { maxResults: 2 });
      expect(results.length).toBeLessThanOrEqual(2);
    });

    it('should search with multiple options', () => {
      const results = dataManager.search('Item', {
        caseSensitive: false,
        searchFields: ['title', 'value'],
        maxResults: 3,
      });
      expect(results.length).toBeGreaterThan(0);
      expect(results.length).toBeLessThanOrEqual(3);
    });
  });

  describe('Sort functionality', () => {
    beforeEach(() => {
      dataManager.setItems(sampleData);
    });

    it('should sort items by title', () => {
      dataManager.sort((a, b) => a.title!.localeCompare(b.title!));
      const items = dataManager.getItems();
      expect(items[0].title).toBe('Item 1');
      expect(items[1].title).toBe('Item 2');
      expect(items[2].title).toBe('Item 3');
    });

    it('should sort items recursively', () => {
      const dataWithUnsortedChildren: AddSelectItem[] = [
        {
          id: '1',
          title: 'Parent',
          value: 'parent',
          children: {
            entries: [
              { id: '1-1', title: 'A', value: 'a' },
              { id: '1-2', title: 'B', value: 'b' },
              { id: '1-3', title: 'C', value: 'c' },
            ],
          },
        },
      ];

      dataManager.setItems(dataWithUnsortedChildren);
      dataManager.sort((a, b) => a.title!.localeCompare(b.title!), true);

      const children = dataManager.getItemChildren('1');
      expect(children[0].title).toBe('A');
      expect(children[1].title).toBe('B');
      expect(children[2].title).toBe('C');
    });
  });
});
