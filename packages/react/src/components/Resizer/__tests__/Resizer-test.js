// cspell:ignore resizer
/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, fireEvent, screen } from '@testing-library/react';
import React from 'react';
import { DEBOUNCE_DELAY, Resizer } from '../Resizer';

const componentName = Resizer.displayName;

describe(componentName, () => {
  let prev, next, resizer;

  const ResizableContainer = ({
    orientation = 'vertical',
    onResize,
    onResizeEnd,
    onDoubleClick,
    'data-testid': testId = 'resizer',
  }) => {
    const [prevSize, setPrevSize] = React.useState(100);
    const [nextSize, setNextSize] = React.useState(100);

    const handleResize = (_, delta) => {
      setPrevSize((p) => p + delta);
      setNextSize((n) => n - delta);
      onResize?.(_, delta);
    };

    const handleResizeEnd = (e, meta) => {
      onResizeEnd?.(e, meta);
    };

    const handleDoubleClick = () => {
      setPrevSize(100);
      setNextSize(100);
      onDoubleClick?.();
    };

    const styleKey = orientation === 'vertical' ? 'width' : 'height';

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: orientation === 'vertical' ? 'row' : 'column',
        }}>
        <div data-testid="prev" style={{ [styleKey]: `${prevSize}px` }} />
        <Resizer
          orientation={orientation}
          data-testid={testId}
          onResize={handleResize}
          onResizeEnd={handleResizeEnd}
          onDoubleClick={handleDoubleClick}
        />
        <div data-testid="next" style={{ [styleKey]: `${nextSize}px` }} />
      </div>
    );
  };

  const setupDOM = (orientation = 'vertical', props = {}) => {
    const utils = render(
      <ResizableContainer orientation={orientation} {...props} />
    );
    prev = utils.getByTestId('prev');
    next = utils.getByTestId('next');
    resizer = utils.getByTestId(props['data-testid'] || 'resizer');
    return utils;
  };

  describe('renders as expected - Component API', () => {
    it('should match snapshot', () => {
      const { container } = render(
        <Resizer orientation="vertical" data-testid="resizer" />
      );
      expect(container).toMatchSnapshot();
    });

    it('should set correct aria attributes', () => {
      const { getByRole } = render(
        <Resizer orientation="horizontal" data-testid="resizer" />
      );
      const el = getByRole('separator');
      expect(el).toHaveAttribute('aria-orientation', 'horizontal');
      expect(el).toHaveAttribute('aria-live', 'assertive');
      expect(el).toHaveAttribute('tabindex', '0');
    });

    it('should apply custom className', () => {
      const { getByRole } = render(
        <Resizer orientation="vertical" className="custom-class" />
      );
      expect(getByRole('separator')).toHaveClass('custom-class');
    });

    it('forwards a ref to the containing node', () => {
      const ref = React.createRef();
      render(<Resizer orientation="vertical" ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLElement);
    });

    it('passes additional props to the root element', () => {
      render(<Resizer orientation="vertical" data-testid="extra" />);
      expect(screen.getByTestId('extra')).toBeInTheDocument();
    });
  });

  describe('mouse events', () => {
    it('calls onResize and onResizeEnd on mouse drag', () => {
      const onResize = jest.fn();
      const onResizeEnd = jest.fn();
      setupDOM('vertical', { onResize, onResizeEnd });

      fireEvent.mouseDown(resizer, { clientX: 50 });
      fireEvent.mouseMove(window, { clientX: 70 });
      fireEvent.mouseUp(window, { clientX: 70 });

      expect(onResize).toHaveBeenCalledWith(expect.any(Object), 20);
      expect(onResizeEnd).toHaveBeenCalledWith(
        expect.any(Object),
        expect.any(Object)
      );
    });

    it('removes event listeners on unmount', () => {
      const { unmount, getByRole } = render(
        <Resizer orientation="vertical" data-testid="resizer" />
      );
      const el = getByRole('separator');
      fireEvent.mouseDown(el, { clientX: 0 });
      unmount();
      fireEvent.mouseMove(window, { clientX: 10 });
      fireEvent.mouseUp(window, { clientX: 10 });
    });
  });

  describe('keyboard events', () => {
    it('handles ArrowLeft/ArrowRight for vertical', () => {
      setupDOM('vertical');
      fireEvent.keyDown(resizer, { key: 'ArrowRight' });
      expect(prev).toHaveStyle('width: 105px');
      expect(next).toHaveStyle('width: 95px');

      fireEvent.keyDown(resizer, { key: 'ArrowLeft' });
      expect(prev).toHaveStyle('width: 100px');
      expect(next).toHaveStyle('width: 100px');
    });

    it('handles shift+ArrowRight for larger step', () => {
      setupDOM('vertical');
      fireEvent.keyDown(resizer, { key: 'ArrowRight', shiftKey: true });
      expect(prev).toHaveStyle('width: 125px');
      expect(next).toHaveStyle('width: 75px');
    });

    it('ignores unrelated keys', () => {
      setupDOM('vertical');
      fireEvent.keyDown(resizer, { key: 'a' });
      expect(prev).toHaveStyle('width: 100px');
      expect(next).toHaveStyle('width: 100px');
    });

    it('calls onResize and onResizeEnd with keyboard', async () => {
      const onResize = jest.fn();
      const onResizeEnd = jest.fn();

      setupDOM('vertical', {
        onResize,
        onResizeEnd,
        'data-testid': 'resizer2',
      });

      const resizer2 = screen.getByTestId('resizer2');
      fireEvent.keyDown(resizer2, { key: 'ArrowRight' });

      expect(onResize).toHaveBeenCalledWith(expect.any(Object), 5);
      await new Promise((resolve) => setTimeout(resolve, DEBOUNCE_DELAY + 50));
      expect(onResizeEnd).toHaveBeenCalled();
    });
  });

  describe('double click', () => {
    it('resets sizes on double click', () => {
      setupDOM('vertical');
      fireEvent.keyDown(resizer, { key: 'ArrowRight', shiftKey: true });
      fireEvent.doubleClick(resizer);
      expect(prev).toHaveStyle('width: 100px');
      expect(next).toHaveStyle('width: 100px');
    });

    it('calls onDoubleClick if provided', () => {
      const onDoubleClick = jest.fn();
      const { getByTestId } = render(
        <ResizableContainer
          orientation="vertical"
          onDoubleClick={onDoubleClick}
          data-testid="resizer2"
        />
      );
      fireEvent.doubleClick(getByTestId('resizer2'));
      expect(onDoubleClick).toHaveBeenCalled();
    });
  });
});
