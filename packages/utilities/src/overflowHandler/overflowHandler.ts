interface OverflowHandlerOptions {
  container: HTMLElement;
  items: HTMLElement[];
  offsetSize: number;
  maxVisible?: number;
  onChange: (visibleItems: HTMLElement[], hiddenItems: HTMLElement[]) => void;
  dimension?: 'width' | 'height';
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

  function getDimension(el: HTMLElement): number {
    // If the element is hidden, temporarily set display to inline-block
    const originalDisplay = el.style.display;
    if (!el.offsetParent && getComputedStyle(el).display === 'none') {
      el.style.display = 'inline-block';
    }
    const size = el.getBoundingClientRect()[dimension];
    el.style.display = originalDisplay;
    return size;
  }

  // Update which items are visible vs hidden based on container size
  function update() {
    // Get available size from the container
    const containerSize =
      dimension === 'width' ? container.clientWidth : container.clientHeight;

    // Precompute sizes for each item to minimize layout thrashing
    const sizes = items.map((item) => getDimension(item));
    const totalSize = sizes.reduce((sum, size) => sum + size, 0);

    let visibleItems: HTMLElement[] = [];
    let hiddenItems: HTMLElement[] = [];

    // If all items fit, no overflow handling is required
    if (totalSize <= containerSize) {
      visibleItems = maxVisible ? items.slice(0, maxVisible) : items.slice();
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

    visibleItems.forEach((item) => {
      item.style.removeProperty('display');
    });
    hiddenItems.forEach((item) => {
      item.style.display = 'none';
    });

    onChange(visibleItems, hiddenItems);
  }

  requestAnimationFrame(update);

  const resizeObserver = new ResizeObserver(() => {
    requestAnimationFrame(update);
  });
  resizeObserver.observe(container);

  return {
    disconnect() {
      resizeObserver.disconnect();
    },
  };
}

export { createOverflowHandler };
