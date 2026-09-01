/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ReactNode } from 'react';

/**
 * Status types for items in the hierarchical data structure.
 */
export type ItemStatus = 'checked' | 'unchecked' | 'indeterminate';

/**
 * A single labelled detail entry for display in item panels and selection
 * summary items.
 */
export interface ItemDetailEntry {
  /** User-visible label shown as the row heading. */
  label: string;
  /** Value displayed beneath the label. */
  value: string | number;
}

/**
 * Item details metadata.
 *
 * **Preferred form** — labelled array consumed by default content renderers:
 * ```ts
 * itemDetails: [
 *   { label: 'Category', value: 'Analytics' },
 *   { label: 'Owner',    value: 'Marketing Team' },
 * ]
 * ```
 *
 * **Legacy form** — arbitrary record for custom renderers that access
 * named keys directly. Not rendered by default content renderers.
 */
export type ItemDetails = ItemDetailEntry[] | Record<string, unknown>;

/**
 * Interface for hierarchical data items used by AddSelect components.
 */
export interface AddSelectItem {
  /** Unique identifier for the item. */
  id: string;
  /** Display title for the item. */
  title?: string;
  /** Value associated with the item. */
  value?: string;
  /** Subtitle or secondary text. */
  subtitle?: string;
  /** Whether the item is currently selected. */
  selected?: boolean;
  /** Selection status (checked, unchecked, or indeterminate for parent nodes). */
  status?: ItemStatus;
  /** Whether the item is disabled and cannot be selected. */
  disabled?: boolean;
  /** Icon or visual element to display with the item. */
  icon?: ReactNode;
  /** Nested children items. */
  children?: {
    entries: AddSelectItem[];
  };
  /** Additional metadata and details about the item. */
  itemDetails?: ItemDetails;
  [key: string]: unknown;
}

/**
 * Options for search functionality.
 */
export interface SearchOptions {
  caseSensitive?: boolean;
  /** Fields to search in (default: ['title', 'value']). */
  searchFields?: string[];
  /** Maximum number of results to return. */
  maxResults?: number;
}

/**
 * AddSelectData — a lightweight, framework-agnostic utility for managing
 * hierarchical data structures.
 *
 * Provides standard APIs for selection, traversal, search, and sorting of
 * hierarchical item data. Designed to work with AddSelect components but can
 * also be used independently.
 *
 * @example
 * ```ts
 * import { AddSelectData } from '@carbon/utilities';
 *
 * const dataManager = new AddSelectData();
 * dataManager.setItems(items);
 * dataManager.setSelectedItems(['item-1', 'item-2']);
 * const selected = dataManager.getSelectedItems();
 * ```
 */
export class AddSelectData {
  private items: AddSelectItem[] = [];
  private itemMap: Map<string, AddSelectItem> = new Map();
  private parentMap: Map<string, string> = new Map();
  private selectedIds: Set<string> = new Set();
  private depthCache: Map<string, number> = new Map();
  private selectedItemsCache: AddSelectItem[] | null = null;

  /**
   * Initialize or replace the hierarchical data.
   */
  setItems(items: AddSelectItem[]): void {
    this.items = items;
    this._invalidateCaches();
    this._buildMaps(items);
  }

  /**
   * Get the full list of items.
   */
  getItems(): AddSelectItem[] {
    return this.items;
  }

  /**
   * Retrieve a single item by its id.
   */
  getItem(id: string): AddSelectItem | undefined {
    return this.itemMap.get(id);
  }

  /**
   * Update a given item with new properties.
   * Returns true if the item was found and updated, false otherwise.
   */
  setItem(id: string, newProperties: Partial<AddSelectItem>): boolean {
    const item = this.itemMap.get(id);
    if (!item) {
      return false;
    }
    Object.assign(item, newProperties);
    if ('selected' in newProperties || 'status' in newProperties) {
      this._invalidateSelectionCache();
    }
    return true;
  }

  /**
   * Returns an array of items marked as selected (memoized).
   */
  getSelectedItems(): AddSelectItem[] {
    if (this.selectedItemsCache !== null) {
      return this.selectedItemsCache;
    }
    const selected: AddSelectItem[] = [];
    this.selectedIds.forEach((id) => {
      const item = this.itemMap.get(id);
      if (item) {
        selected.push(item);
      }
    });
    this.selectedItemsCache = selected;
    return selected;
  }

  /**
   * Mark one or more items (by id) as selected.
   * @param ids - Single id or array of ids to select.
   * @param exclusive - If true, deselect all other items first.
   */
  setSelectedItems(ids: string | string[], exclusive = false): void {
    const idArray = Array.isArray(ids) ? ids : [ids];
    if (exclusive) {
      this.selectedIds.forEach((id) => {
        const item = this.itemMap.get(id);
        if (item) {
          item.selected = false;
          item.status = 'unchecked';
        }
      });
      this.selectedIds.clear();
    }
    idArray.forEach((id) => {
      const item = this.itemMap.get(id);
      if (item) {
        item.selected = true;
        item.status = 'checked';
        this.selectedIds.add(id);
      }
    });
    this._invalidateSelectionCache();
  }

  /**
   * Get direct children of a node.
   */
  getItemChildren(id: string): AddSelectItem[] {
    const item = this.itemMap.get(id);
    if (!item) {
      return [];
    }
    return item.children?.entries ?? [];
  }

  /**
   * Get the parent of a node.
   * Returns undefined for root-level items.
   */
  getItemParent(id: string): AddSelectItem | undefined {
    const parentId = this.parentMap.get(id);
    return parentId ? this.itemMap.get(parentId) : undefined;
  }

  /**
   * Get all ancestors (from immediate parent to root) of a node.
   */
  getItemParents(id: string): AddSelectItem[] {
    const parents: AddSelectItem[] = [];
    let currentId: string | undefined = id;
    while (currentId) {
      const parentId = this.parentMap.get(currentId);
      if (!parentId) {
        break;
      }
      const parent = this.itemMap.get(parentId);
      if (parent) {
        parents.push(parent);
      }
      currentId = parentId;
    }
    return parents;
  }

  /**
   * Get the selection status of an item.
   */
  getItemStatus(id: string): ItemStatus | undefined {
    return this.itemMap.get(id)?.status;
  }

  /**
   * Set or update the status of an item.
   * Returns true if the item was found and updated.
   */
  setItemStatus(id: string, status: ItemStatus): boolean {
    const item = this.itemMap.get(id);
    if (!item) {
      return false;
    }
    const wasSelected = item.selected;
    item.status = status;
    item.selected = status === 'checked';
    if (item.selected) {
      this.selectedIds.add(id);
    } else {
      this.selectedIds.delete(id);
    }
    if (wasSelected !== item.selected) {
      this._invalidateSelectionCache();
    }
    return true;
  }

  /**
   * Check whether an item is selected (O(1) lookup).
   */
  isSelected(id: string): boolean {
    return this.selectedIds.has(id);
  }

  /**
   * Search items based on a query and return matching items.
   */
  search(query: string, options: SearchOptions = {}): AddSelectItem[] {
    if (!query) {
      return [];
    }
    const {
      caseSensitive = false,
      searchFields = ['title', 'value'],
      maxResults,
    } = options;
    const searchTerm = caseSensitive ? query : query.toLowerCase();
    const results: AddSelectItem[] = [];

    const shouldContinue = (): boolean =>
      !maxResults || results.length < maxResults;

    this._traverseItems(this.items, (item) => {
      if (!shouldContinue()) {
        return;
      }
      for (const field of searchFields) {
        const fieldValue = item[field];
        if (fieldValue) {
          const valueToSearch = caseSensitive
            ? String(fieldValue)
            : String(fieldValue).toLowerCase();
          if (valueToSearch.includes(searchTerm)) {
            results.push(item);
            break;
          }
        }
      }
    });

    return results;
  }

  /**
   * Sort items based on a comparator function.
   * @param recursive - If true, also sort children recursively.
   */
  sort(
    compareFn: (a: AddSelectItem, b: AddSelectItem) => number,
    recursive = false
  ): void {
    if (recursive) {
      this._sortRecursive(this.items, compareFn);
    }
    this.items.sort(compareFn);
    this._invalidateCaches();
    this._buildMaps(this.items);
  }

  /**
   * Clear all selections.
   */
  clearSelections(): void {
    this.selectedIds.forEach((id) => {
      const item = this.itemMap.get(id);
      if (item) {
        item.selected = false;
        item.status = 'unchecked';
      }
    });
    this.selectedIds.clear();
    this._invalidateSelectionCache();
  }

  /**
   * Get the depth of an item in the hierarchy (cached).
   * Returns -1 if the item is not found.
   */
  getItemDepth(id: string): number {
    const cachedDepth = this.depthCache.get(id);
    if (cachedDepth !== undefined) {
      return cachedDepth;
    }
    if (!this.itemMap.has(id)) {
      return -1;
    }
    let depth = 0;
    let currentId: string | undefined = id;
    while (currentId) {
      const parentId = this.parentMap.get(currentId);
      if (!parentId) {
        break;
      }
      depth++;
      currentId = parentId;
    }
    this.depthCache.set(id, depth);
    return depth;
  }

  /**
   * Check if an item has children.
   */
  hasChildren(id: string): boolean {
    const item = this.itemMap.get(id);
    return !!item?.children?.entries?.length;
  }

  /**
   * Get all descendant items of a node.
   */
  getItemDescendants(id: string): AddSelectItem[] {
    const item = this.itemMap.get(id);
    if (!item?.children?.entries) {
      return [];
    }
    const descendants: AddSelectItem[] = [];
    this._traverseItems(item.children.entries, (child) => {
      descendants.push(child);
    });
    return descendants;
  }

  /**
   * Check if an item has any selected descendants.
   */
  hasSelectedDescendants(
    id: string,
    selectedIds: Set<string> = this.selectedIds
  ): boolean {
    const children = this.getItemChildren(id);
    if (!children.length) {
      return false;
    }
    for (const child of children) {
      if (
        selectedIds.has(child.id) ||
        this.hasSelectedDescendants(child.id, selectedIds)
      ) {
        return true;
      }
    }
    return false;
  }

  /**
   * Check if all descendants of an item are selected.
   */
  allDescendantsSelected(
    id: string,
    selectedIds: Set<string> = this.selectedIds
  ): boolean {
    const item = this.itemMap.get(id);
    if (!item) {
      return false;
    }
    const children = this.getItemChildren(id);
    if (!children.length) {
      return selectedIds.has(item.id);
    }
    for (const child of children) {
      if (
        !selectedIds.has(child.id) ||
        !this.allDescendantsSelected(child.id, selectedIds)
      ) {
        return false;
      }
    }
    return true;
  }

  /**
   * Get all descendant IDs including the item itself.
   */
  getAllDescendantIds(id: string): string[] {
    const item = this.itemMap.get(id);
    if (!item) {
      return [];
    }
    const ids: string[] = [id];
    const children = this.getItemChildren(id);
    for (const child of children) {
      ids.push(...this.getAllDescendantIds(child.id));
    }
    return ids;
  }

  /**
   * Get only top-level selected items (items without selected ancestors).
   */
  getTopLevelSelectedItems(
    selectedIds: Set<string> = this.selectedIds
  ): AddSelectItem[] {
    const topLevelItems: AddSelectItem[] = [];
    const processedIds = new Set<string>();

    const hasSelectedAncestor = (itemId: string): boolean => {
      const parents = this.getItemParents(itemId);
      return parents.some((parent) => selectedIds.has(parent.id));
    };

    selectedIds.forEach((id) => {
      if (!processedIds.has(id) && !hasSelectedAncestor(id)) {
        const item = this.itemMap.get(id);
        if (item) {
          topLevelItems.push(item);
          const descendantIds = this.getAllDescendantIds(id);
          descendantIds.forEach((descId) => processedIds.add(descId));
        }
      }
    });

    return topLevelItems;
  }

  private _invalidateCaches(): void {
    this.selectedItemsCache = null;
    this.depthCache.clear();
  }

  private _invalidateSelectionCache(): void {
    this.selectedItemsCache = null;
  }

  private _buildMaps(
    items: AddSelectItem[],
    parentId?: string,
    depth = 0
  ): void {
    if (!parentId) {
      this.itemMap.clear();
      this.parentMap.clear();
      this.selectedIds.clear();
      this.depthCache.clear();
    }
    items.forEach((item) => {
      this.itemMap.set(item.id, item);
      this.depthCache.set(item.id, depth);
      if (parentId) {
        this.parentMap.set(item.id, parentId);
      }
      if (item.selected) {
        this.selectedIds.add(item.id);
      }
      if (item.children?.entries) {
        this._buildMaps(item.children.entries, item.id, depth + 1);
      }
    });
  }

  private _traverseItems(
    items: AddSelectItem[],
    callback: (item: AddSelectItem) => void
  ): void {
    for (const item of items) {
      callback(item);
      if (item.children?.entries) {
        this._traverseItems(item.children.entries, callback);
      }
    }
  }

  private _sortRecursive(
    items: AddSelectItem[],
    compareFn: (a: AddSelectItem, b: AddSelectItem) => number
  ): void {
    for (const item of items) {
      if (item.children?.entries) {
        item.children.entries.sort(compareFn);
        this._sortRecursive(item.children.entries, compareFn);
      }
    }
  }
}
