interface OverflowHandlerOptions {
  container: HTMLElement;
  items: HTMLElement[];
  offsetSize: number;
  maxVisible?: number;
  onChange: (visibleItems: HTMLElement[], hiddenItems: HTMLElement[]) => void;
  dimension?: 'width' | 'height';
  // Optional callbacks to override default styling behavior
  onVisible?: (visibleItems: HTMLElement[]) => void;
  onHidden?: (hiddenItems: HTMLElement[]) => void;
}

interface OverflowHandler {
  disconnect: () => void;
}

function createOverflowHandler({
  container,
  items,
  offsetSize,
  maxVisible,
  onChange,
  dimension = 'width',
  onVisible,
  onHidden,
}: OverflowHandlerOptions): OverflowHandler {
  // Error handling
  if (!(container instanceof HTMLElement)) {
    throw new Error('container must be an HTMLElement');
  }
  if (!Array.isArray(items)) {
    throw new Error('items must be an array of HTMLElements');
  }
  if (typeof onChange !== 'function') {
    throw new Error('onChange must be a function');
  }
  if (
    maxVisible !== undefined &&
    (!Number.isInteger(maxVisible) || maxVisible <= 0)
  ) {
    throw new Error('maxVisible must be a positive integer');
  }

  // Helper function to get an element's dimension (width or height)
  function getDimension(el: HTMLElement): number {
    const originalDisplay = el.style.display;
    // If the element is hidden, temporarily set its display to inline-block to measure it
    if (!el.offsetParent && getComputedStyle(el).display === 'none') {
      el.style.display = 'inline-block';
    }
    const size = el.getBoundingClientRect()[dimension];
    el.style.display = originalDisplay;
    return size;
  }

  // Update which items are visible vs hidden based on container size
  function update() {
    const containerSize =
      dimension === 'width' ? container.clientWidth : container.clientHeight;
    const sizes = items.map(getDimension);
    const totalSize = sizes.reduce((sum, size) => sum + size, 0);
    let visibleItems: HTMLElement[] = [];
    let hiddenItems: HTMLElement[] = [];

    // If all items fit, apply maxVisible if set. otherwise, all items are visible.
    if (totalSize <= containerSize) {
      visibleItems = maxVisible ? items.slice(0, maxVisible) : [...items];
      hiddenItems = maxVisible ? items.slice(maxVisible) : [];
    } else {
      const available = containerSize - offsetSize;
      let accumulated = 0;
      for (let i = 0; i < items.length; i++) {
        const size = sizes[i];
        if (
          accumulated + size <= available &&
          (!maxVisible || visibleItems.length < maxVisible)
        ) {
          visibleItems.push(items[i]);
          accumulated += size;
        } else {
          hiddenItems.push(items[i]);
        }
      }
    }

    // Apply custom styling if callbacks are provided. otherwise, apply default styling.
    onVisible
      ? onVisible(visibleItems)
      : visibleItems.forEach((item) => item.style.removeProperty('display'));
    onHidden
      ? onHidden(hiddenItems)
      : hiddenItems.forEach((item) => (item.style.display = 'none'));
    onChange(visibleItems, hiddenItems);
  }

  requestAnimationFrame(update);
  const resizeObserver = new ResizeObserver(() =>
    requestAnimationFrame(update)
  );
  resizeObserver.observe(container);

  return {
    disconnect() {
      resizeObserver.disconnect();
    },
  };
}

export { createOverflowHandler };
