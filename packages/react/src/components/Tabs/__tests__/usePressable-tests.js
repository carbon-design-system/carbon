/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useRef } from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { usePressable } from '../usePressable';

jest.useFakeTimers();

const TestComponent = (props) => {
  const ref = useRef(null);

  usePressable(ref, props);

  return <button ref={ref}>Press me</button>;
};

describe('usePressable', () => {
  it('should call `onPressIn` on pointer down', () => {
    const onPressIn = jest.fn();
    const { getByText } = render(<TestComponent onPressIn={onPressIn} />);

    fireEvent.pointerDown(getByText('Press me'));
    expect(onPressIn).toHaveBeenCalledTimes(1);
  });

  it('should call `onPressOut` on pointer up', () => {
    const onPressOut = jest.fn();
    const { getByText } = render(<TestComponent onPressOut={onPressOut} />);

    fireEvent.pointerDown(getByText('Press me'));
    fireEvent.pointerUp(getByText('Press me'));
    expect(onPressOut).toHaveBeenCalledWith({ longPress: false });
  });

  it('should call `onPress` on click', () => {
    const onPress = jest.fn();
    const { getByText } = render(<TestComponent onPress={onPress} />);

    fireEvent.click(getByText('Press me'));
    expect(onPress).toHaveBeenCalledWith({ longPress: false });
  });

  it('should call `onLongPress` after delay', () => {
    const onLongPress = jest.fn();
    const { getByText } = render(<TestComponent onLongPress={onLongPress} />);
    fireEvent.pointerDown(getByText('Press me'));

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(onLongPress).toHaveBeenCalledTimes(1);
  });

  it('should not call `onLongPress` if released early', () => {
    const onLongPress = jest.fn();
    const { getByText } = render(<TestComponent onLongPress={onLongPress} />);

    fireEvent.pointerDown(getByText('Press me'));

    act(() => {
      jest.advanceTimersByTime(300);
      fireEvent.pointerUp(getByText('Press me'));
    });

    expect(onLongPress).not.toHaveBeenCalled();
  });

  it('should clean up event listeners on unmount', () => {
    const { unmount, getByText } = render(<TestComponent />);
    const button = getByText('Press me');
    const removeEventListenerSpy = jest.spyOn(button, 'removeEventListener');

    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalled();
  });

  it('should prevent default context menu', () => {
    const { getByText } = render(<TestComponent />);
    const button = getByText('Press me');
    const event = new MouseEvent('contextmenu', { bubbles: true });
    const preventDefault = jest.spyOn(event, 'preventDefault');

    button.dispatchEvent(event);
    expect(preventDefault).toHaveBeenCalled();
  });
});
