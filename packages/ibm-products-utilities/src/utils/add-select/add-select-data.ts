/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ReactNode } from 'react';

/**
 * Status types for items in the hierarchical data structure
 */
export type ItemStatus = 'checked' | 'unchecked' | 'indeterminate';

/**
 * Interface for item details metadata
 */
export interface ItemDetails {
  [key: string]: unknown;
}

/**
 * Interface for hierarchical data items
 */
export interface AddSelectItem {
  /** Unique identifier for the item */
  id: string;
  /** Display title for the item */
  title?: string;
  /** Value associated with the item */
  value?: string;
  /** Subtitle or secondary text */
  subtitle?: string;
  /** Whether the item is currently selected */
  selected?: boolean;
  /** Selection status (checked, unchecked, or indeterminate for parent nodes) */
  status?: ItemStatus;
  /** Whether the item is disabled and cannot be selected */
  disabled?: boolean;
  /** Icon or visual element to display with the item */
  icon?: ReactNode;
  /** Nested children items */
  children?: {
    entries: AddSelectItem[];
  };
  /** Additional metadata and details about the item */
  itemDetails?: ItemDetails;
  [key: string]: unknown; // Allow additional properties
}

/**
 * Options for search functionality
 */
export interface SearchOptions {
  caseSensitive?: boolean;
  searchFields?: string[]; // Fields to search in (default: ['title', 'value'])
  maxResults?: number; // Maximum number of results to return
}

/**
 * AddSelectData - A lightweight, framework-agnostic utility for managing hierarchical data
 *
 * This utility provides standard APIs for common operations such as setting, selecting,
 * traversing, searching, and sorting hierarchical data structures. It encapsulates data
 * logic separate from UI, allowing both React and Web Components to reuse the same
 * data management functions.
 */
export class AddSelectData {
  private items: AddSelectItem[] = [];
  private itemMap: Map<string, AddSelectItem> = new Map();
  private parentMap: Map<string, string> = new Map(); // child id -> parent id
  private selectedIds: Set<string> = new Set(); // Track selected IDs for O(1) lookup
  private depthCache: Map<string, number> = new Map(); // Cache item depths
  private selectedItemsCache: AddSelectItem[] | null = null; // Memoized selected items

  /**
   * Initialize or replace the hierarchical data
   * @param items - Array of hierarchical items
   */
  setItems(items: AddSelectItem[]): void {
    this.items = items;
    this._invalidateCaches();
    this._buildMaps(items);
  }

  /**
   * Get the full list of items
   * @returns Array of all items
   */
  getItems(): AddSelectItem[] {
    return this.items;
  }

  /**
   * Retrieve a single item by its id
   * @param id - The item id
   * @returns The item or undefined if not found
   */
  getItem(id: string): AddSelectItem | undefined {
    return this.itemMap.get(id);
  }

  /**
   * Update a given item with new properties
   * @param id - The item id
   * @param newProperties - Properties to update
   * @returns true if item was found and updated, false otherwise
   */
  setItem(id: string, newProperties: Partial<AddSelectItem>): boolean {
    const item = this.itemMap.get(id);
    if (!item) {
      return false;
    }

    Object.assign(item, newProperties);

    // Invalidate cache if selection-related properties changed
    if ('selected' in newProperties || 'status' in newProperties) {
      this._invalidateSelectionCache();
    }

    return true;
  }

  /**
   * Returns an array of items marked as selected (memoized)
   * @returns Array of selected items
   */
  getSelectedItems(): AddSelectItem[] {
    // Return cached result if available
    if (this.selectedItemsCache !== null) {
      return this.selectedItemsCache;
    }

    // Build and cache the result
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
   * Mark one or more items (by id) as selected
   * @param ids - Single id or array of ids to select
   * @param exclusive - If true, deselect all other items (default: false)
   */
  setSelectedItems(ids: string | string[], exclusive: boolean = false): void {
    const idArray = Array.isArray(ids) ? ids : [ids];

    if (exclusive) {
      // Efficiently clear all selections using the Set
      this.selectedIds.forEach((id) => {
        const item = this.itemMap.get(id);
        if (item) {
          item.selected = false;
          item.status = 'unchecked';
        }
      });
      this.selectedIds.clear();
    }

    // Select specified items
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
   * Get direct children of a node
   * @param id - The parent item id
   * @returns Array of child items or empty array if no children
   */
  getItemChildren(id: string): AddSelectItem[] {
    const item = this.itemMap.get(id);
    if (!item) {
      return [];
    }
    return item.children?.entries ?? [];
  }

  /**
   * Get the parent of a node
   * @param id - The child item id
   * @returns The parent item or undefined if no parent (root level)
   */
  getItemParent(id: string): AddSelectItem | undefined {
    const parentId = this.parentMap.get(id);
    return parentId ? this.itemMap.get(parentId) : undefined;
  }

  /**
   * Get all ancestors (parents up to the root) of a node
   * @param id - The item id
   * @returns Array of ancestor items from immediate parent to root
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
   * Retrieve the selected state status of an item
   * @param id - The item id
   * @returns The status or undefined if item not found
   */
  getItemStatus(id: string): ItemStatus | undefined {
    return this.itemMap.get(id)?.status;
  }

  /**
   * Set or update the status of an item
   * @param id - The item id
   * @param status - The new status
   * @returns true if item was found and updated, false otherwise
   */
  setItemStatus(id: string, status: ItemStatus): boolean {
    const item = this.itemMap.get(id);
    if (!item) {
      return false;
    }

    const wasSelected = item.selected;
    item.status = status;
    item.selected = status === 'checked';

    // Update selectedIds Set
    if (item.selected) {
      this.selectedIds.add(id);
    } else {
      this.selectedIds.delete(id);
    }

    // Invalidate cache if selection changed
    if (wasSelected !== item.selected) {
      this._invalidateSelectionCache();
    }

    return true;
  }

  /**
   * Check whether an item is selected (O(1) lookup)
   * @param id - The item id
   * @returns true if selected, false otherwise
   */
  isSelected(id: string): boolean {
    return this.selectedIds.has(id);
  }

  /**
   * Search items based on a query and return matching items
   * @param query - The search query string
   * @param options - Search options
   * @returns Array of matching items
   */
  search(query: string, options: SearchOptions = {}): AddSelectItem[] {
    // Early return for empty query
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

    // Use early termination if maxResults is specified
    const shouldContinue = (): boolean => {
      return !maxResults || results.length < maxResults;
    };

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
            break; // Don't add the same item multiple times
          }
        }
      }
    });

    return results;
  }

  /**
   * Sort items based on a comparator function
   * @param compareFn - Comparison function for sorting
   * @param recursive - If true, sort children recursively (default: false)
   */
  sort(
    compareFn: (a: AddSelectItem, b: AddSelectItem) => number,
    recursive: boolean = false
  ): void {
    // Sort recursively first if needed
    if (recursive) {
      this._sortRecursive(this.items, compareFn);
    }

    // Then sort the top level
    this.items.sort(compareFn);

    // Rebuild maps and caches after sorting
    this._invalidateCaches();
    this._buildMaps(this.items);
  }

  /**
   * Clear all selections (optimized with Set)
   */
  clearSelections(): void {
    // Efficiently clear using the selectedIds Set
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
   * Get the depth/level of an item in the hierarchy (cached)
   * @param id - The item id
   * @returns The depth (0 for root level items) or -1 if not found
   */
  getItemDepth(id: string): number {
    // Check cache first
    const cachedDepth = this.depthCache.get(id);
    if (cachedDepth !== undefined) {
      return cachedDepth;
    }

    // Item doesn't exist
    if (!this.itemMap.has(id)) {
      return -1;
    }

    // Calculate and cache depth
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
   * Check if an item has children
   * @param id - The item id
   * @returns true if item has children, false otherwise
   */
  hasChildren(id: string): boolean {
    const item = this.itemMap.get(id);
    return !!item?.children?.entries?.length;
  }

  /**
   * Get all descendant items of a node
   * @param id - The parent item id
   * @returns Array of all descendant items
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
   * Check if an item has any selected descendants (optimized)
   * @param id - The item id
   * @param selectedIds - Set of selected item IDs (defaults to internal selectedIds)
   * @returns true if any descendant is selected, false otherwise
   */
  hasSelectedDescendants(
    id: string,
    selectedIds: Set<string> = this.selectedIds
  ): boolean {
    const children = this.getItemChildren(id);
    if (!children.length) {
      return false;
    }

    // Check if any child or their descendants are selected
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
   * Check if all descendants of an item are selected (optimized)
   * @param id - The item id
   * @param selectedIds - Set of selected item IDs (defaults to internal selectedIds)
   * @returns true if all descendants are selected, false otherwise
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

    // All children must be selected and all their descendants must be selected
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
   * Get all descendant IDs from an item (including the item itself)
   * @param id - The item id
   * @returns Array of all descendant IDs including the item itself
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
   * Get only top-level selected items (items without selected ancestors)
   * @param selectedIds - Set of selected item IDs (defaults to internal selectedIds)
   * @returns Array of top-level selected items
   */
  getTopLevelSelectedItems(
    selectedIds: Set<string> = this.selectedIds
  ): AddSelectItem[] {
    const topLevelItems: AddSelectItem[] = [];
    const processedIds = new Set<string>();

    // Helper to check if any ancestor is selected
    const hasSelectedAncestor = (itemId: string): boolean => {
      const parents = this.getItemParents(itemId);
      return parents.some((parent) => selectedIds.has(parent.id));
    };

    // Collect all selected items that don't have a selected ancestor
    selectedIds.forEach((id) => {
      if (!processedIds.has(id) && !hasSelectedAncestor(id)) {
        const item = this.itemMap.get(id);
        if (item) {
          topLevelItems.push(item);
          // Mark all descendants as processed
          const descendantIds = this.getAllDescendantIds(id);
          descendantIds.forEach((descId) => processedIds.add(descId));
        }
      }
    });

    return topLevelItems;
  }

  /**
   * Invalidate all caches
   * @private
   */
  private _invalidateCaches(): void {
    this.selectedItemsCache = null;
    this.depthCache.clear();
  }

  /**
   * Invalidate selection cache only
   * @private
   */
  private _invalidateSelectionCache(): void {
    this.selectedItemsCache = null;
  }

  /**
   * Build internal maps for efficient lookups (optimized with depth caching)
   * @private
   */
  private _buildMaps(
    items: AddSelectItem[],
    parentId?: string,
    depth: number = 0
  ): void {
    if (!parentId) {
      // Clear maps when building from root
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

      // Track selected items
      if (item.selected) {
        this.selectedIds.add(item.id);
      }

      if (item.children?.entries) {
        this._buildMaps(item.children.entries, item.id, depth + 1);
      }
    });
  }

  /**
   * Traverse all items and apply a callback function
   * @private
   */
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

  /**
   * Sort items recursively
   * @private
   */
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
