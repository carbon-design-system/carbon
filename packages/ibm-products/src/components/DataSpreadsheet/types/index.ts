/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export type Size = 'xs' | 'sm' | 'md' | 'lg';
export type Theme = 'light' | 'dark';

export interface SpreadsheetColumn {
  rowHeight?: number;
  rowHeaderWidth?: number;
  width?: number;
}

export interface ActiveCellCoordinates {
  row?: number | string;
  column?: number | string;
}

export interface PrevState {
  cellEditorValue?: string;
  activeCellCoordinates?: ActiveCellCoordinates;
  isEditing?: boolean;
  selectionAreaData?: any[];
  clickAndHoldActive?: boolean;
  selectedHeaderReorderActive?: boolean;
  rowHeight?: number;
  cellSize?: Size;
}

export interface Point {
  column?: number;
}

export interface ItemType {
  matcher?: string;
  point1?: Point;
  point2?: Point;
}
