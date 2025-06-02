/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { renderHook, act } from '@testing-library/react';
import useOverflowItems from '../useOverflowItems';
import { useRef } from 'react';
import React from 'react';

// Mock ResizeObserver
const mockResizeObserver = jest.fn(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock use-resize-observer
jest.mock('use-resize-observer', () => ({
  __esModule: true,
  default: jest.fn(({ onResize }) => {
    // Simulate resize behavior
    if (onResize) {
      setTimeout(() => onResize(), 0);
    }
  }),
}));

// Mock usePreviousValue - simpler approach
jest.mock('../../internal/usePreviousValue', () => ({
  usePreviousValue: jest.fn(() => undefined), // Just return undefined for most tests
}));

// Save original implementations
const originalResizeObserver = window.ResizeObserver;
const originalGetComputedStyle = window.getComputedStyle;

beforeAll(() => {
  // Mock ResizeObserver
  window.ResizeObserver = mockResizeObserver;

  // Mock getComputedStyle
  window.getComputedStyle = jest.fn(() => ({
    marginLeft: '0px',
    marginRight: '0px',
    getPropertyValue: jest.fn(() => ''),
  }));
});

afterAll(() => {
  // Restore originals
  window.ResizeObserver = originalResizeObserver;
  window.getComputedStyle = originalGetComputedStyle;
});

// Mock items for testing
const mockItems = [
  { id: '1', text: 'Item 1' },
  { id: '2', text: 'Item 2' },
  { id: '3', text: 'Item 3' },
  { id: '4', text: 'Item 4' },
];

describe('useOverflowItems', () => {
  let containerRef;
  let offsetRef;

  beforeEach(() => {
    // Create mock DOM elements
    const mockContainer = document.createElement('div');
    const mockOffset = document.createElement('div');

    // Mock dimensions
    Object.defineProperty(mockContainer, 'offsetWidth', { value: 300 });
    Object.defineProperty(mockOffset, 'offsetWidth', { value: 50 });

    containerRef = { current: mockContainer };
    offsetRef = { current: mockOffset };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return empty arrays when no items provided', () => {
    const { result } = renderHook(() =>
      useOverflowItems([], containerRef, offsetRef)
    );

    expect(result.current.visibleItems).toEqual([]);
    expect(result.current.hiddenItems).toEqual([]);
    expect(typeof result.current.itemRefHandler).toBe('function');
  });

  it('should return empty arrays when items is not an array', () => {
    const { result } = renderHook(() =>
      useOverflowItems('not an array', containerRef, offsetRef)
    );

    expect(result.current).toBeDefined();
    expect(result.current.visibleItems).toEqual([]);
    expect(result.current.hiddenItems).toEqual([]);
    expect(typeof result.current.itemRefHandler).toBe('function');
  });

  it('should return all items as visible when they fit in container', () => {
    const { result } = renderHook(() =>
      useOverflowItems(mockItems, containerRef, offsetRef)
    );

    // Mock that all items fit
    act(() => {
      mockItems.forEach((item, index) => {
        const mockNode = document.createElement('div');
        Object.defineProperty(mockNode, 'offsetWidth', { value: 50 });
        Object.defineProperty(mockNode, 'style', {
          value: { marginLeft: '0px', marginRight: '0px' },
        });

        result.current.itemRefHandler(item.id, mockNode);
      });
    });

    expect(result.current.visibleItems).toHaveLength(4);
    expect(result.current.hiddenItems).toHaveLength(0);
  });

  it('should respect maxItems parameter', () => {
    const { result } = renderHook(
      () => useOverflowItems(mockItems, containerRef, offsetRef, 2) // Max 2 items
    );

    act(() => {
      mockItems.forEach((item) => {
        const mockNode = document.createElement('div');
        Object.defineProperty(mockNode, 'offsetWidth', { value: 30 });
        Object.defineProperty(mockNode, 'style', {
          value: { marginLeft: '0px', marginRight: '0px' },
        });

        result.current.itemRefHandler(item.id, mockNode);
      });
    });

    expect(result.current.visibleItems).toHaveLength(2);
    expect(result.current.hiddenItems).toHaveLength(2);
    expect(result.current.visibleItems[0].id).toBe('1');
    expect(result.current.visibleItems[1].id).toBe('2');
  });

  it('should handle itemRefHandler correctly', () => {
    const { result } = renderHook(() =>
      useOverflowItems(mockItems, containerRef, offsetRef)
    );

    const mockNode = document.createElement('div');
    Object.defineProperty(mockNode, 'offsetWidth', { value: 80 });

    act(() => {
      result.current.itemRefHandler('test-id', mockNode);
    });

    expect(window.getComputedStyle).toHaveBeenCalledWith(mockNode);
  });

  it('should handle container without offsetRef', () => {
    const { result } = renderHook(
      () => useOverflowItems(mockItems, containerRef) // No offsetRef
    );

    expect(result.current.visibleItems).toBeDefined();
    expect(result.current.hiddenItems).toBeDefined();
    expect(typeof result.current.itemRefHandler).toBe('function');
  });

  it('should handle container with no items', () => {
    const { result } = renderHook(() =>
      useOverflowItems([], containerRef, offsetRef)
    );

    expect(result.current.visibleItems).toEqual([]);
    expect(result.current.hiddenItems).toEqual([]);
    expect(typeof result.current.itemRefHandler).toBe('function');
  });

  it('should handle container with null items', () => {
    const { result } = renderHook(() =>
      useOverflowItems(null, containerRef, offsetRef)
    );

    expect(result.current.visibleItems).toEqual([]);
    expect(result.current.hiddenItems).toEqual([]);
    expect(typeof result.current.itemRefHandler).toBe('function');
  });

  it('should handle missing container ref', () => {
    const nullRef = { current: null };

    const { result } = renderHook(() =>
      useOverflowItems(mockItems, nullRef, offsetRef)
    );

    // Should return all items as visible when no container
    expect(result.current.visibleItems).toEqual(mockItems);
    expect(result.current.hiddenItems).toEqual([]);
  });
});
