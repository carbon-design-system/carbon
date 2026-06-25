/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { act, forwardRef } from 'react';
import { usePresence } from '../usePresence';
import { render, screen } from '@testing-library/react';
import cx from 'classnames';

const content = 'Component content';
// eslint-disable-next-line react/prop-types
const TestComponent = forwardRef(({ open }, ref) => {
  const { shouldRender } = usePresence(open, ref, 'fade-out');
  return shouldRender ? (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
    @keyframes fade-out {
      0% {
        opacity: 1;
        transform: translateX(0);
      }

      100% {
        opacity: 0;
        transform: translateX(10rem);
      }
    }
    .closing {
      animation: fade-out 240ms ease-in forwards;
    }
  `,
        }}
      />
      <div
        ref={ref}
        className={cx({
          ['closing']: !open,
        })}
      >
        {content}
      </div>
    </>
  ) : null;
});

describe('usePresence', () => {
  it('should immediately render component', () => {
    render(<TestComponent open />);
    expect(screen.getByText(content)).toBeInTheDocument();
  });

  it('should wait to unmount component to account for exit animation', async () => {
    const ref = React.createRef();
    const { rerender } = render(<TestComponent open ref={ref} />);

    rerender(<TestComponent open={false} ref={ref} />);

    const event = new Event('animationend');
    Object.assign(event, { animationName: 'fade-out' });
    act(() => ref?.current.dispatchEvent(event));
    expect(ref.current).toBeNull();
  });
});
