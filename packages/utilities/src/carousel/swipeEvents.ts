/**
 * Registers swipe event handlers for a carousel element.
 * Handles touch, mouse, and wheel events for navigation.
 * @param {HTMLElement} carousel - The carousel element to attach event listeners to.
 * @param {() => void} next - Callback function to execute when swiping right.
 * @param {() => void} prev - Callback function to execute when swiping left.
 * @param {boolean} destroy - If true, removes existing event listeners before adding new ones.
 */
export const registerSwipeEvents = (
  carousel: HTMLElement,
  next: () => void,
  prev: () => void,
  destroy: boolean
) => {
  const minSwipeDistance = 50;

  // Touch support
  let touchStartX: number | null = null;
  let touchEndX: number | null = null;

  let lastScrollTime = 0;
  const scrollCooldown = 400;

  let isMouseDown = false;
  let mouseStartX: number | null = null;
  let mouseEndX: number | null = null;

  //handlers
  const touchStartHandler = (e: TouchEvent) => {
    touchStartX = e.touches[0].clientX;
  };
  const touchMoveHandler = (e: TouchEvent) => {
    touchEndX = e.touches[0].clientX;
  };
  const touchEndHandler = (e: TouchEvent) => {
    if (touchStartX !== null && touchEndX !== null) {
      const distance = touchStartX - touchEndX;
      if (Math.abs(distance) > minSwipeDistance) {
        if (distance > 0) {
          next();
        } else {
          prev();
        }
      }
    }
    touchStartX = null;
    touchEndX = null;
  };
  const mouseDownHandler = (e: MouseEvent) => {
    isMouseDown = true;
    mouseStartX = e.clientX;
  };
  const mouseMoveHandler = (e: MouseEvent) => {
    if (!isMouseDown) {
      return;
    }
    mouseEndX = e.clientX;
  };
  const mouseUpHandler = () => {
    if (isMouseDown && mouseStartX !== null && mouseEndX !== null) {
      const distance = mouseStartX - mouseEndX;
      if (Math.abs(distance) > minSwipeDistance) {
        if (distance > 0) {
          next();
        } else {
          prev();
        }
      }
    }
    isMouseDown = false;
    mouseStartX = null;
    mouseEndX = null;
  };
  const wheelHandler = (e: WheelEvent) => {
    const now = Date.now();
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 20) {
      e.preventDefault(); // Prevent page from scrolling
      if (now - lastScrollTime < scrollCooldown) {
        return;
      }

      if (e.deltaX > 0) {
        next();
      } else {
        prev();
      }
      lastScrollTime = now;
    }
  };

  if (destroy) {
    carousel.removeEventListener('touchstart', touchStartHandler);
    carousel.removeEventListener('touchmove', touchMoveHandler);
    carousel.removeEventListener('touchend', touchEndHandler);
    carousel.removeEventListener('mousedown', mouseDownHandler);
    carousel.removeEventListener('mousemove', mouseMoveHandler);
    carousel.removeEventListener('mouseup', mouseUpHandler);
    carousel.removeEventListener('wheel', wheelHandler);
  }

  carousel.addEventListener('touchstart', touchStartHandler);

  carousel.addEventListener('touchmove', touchMoveHandler);

  carousel.addEventListener('touchend', touchEndHandler);

  // Mouse drag support

  carousel.addEventListener('mousedown', mouseDownHandler);

  carousel.addEventListener('mousemove', mouseMoveHandler);

  carousel.addEventListener('mouseup', mouseUpHandler);

  // Wheel gesture support

  carousel.addEventListener('wheel', wheelHandler);
};
