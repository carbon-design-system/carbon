/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { storiesOf } from '@storybook/react';
import React, { useEffect, useState } from 'react';
import { useDebounce } from './useDebounce';

function useTimedUpdate(interval, { maxValue = 10 } = {}) {
  const [value, updateValue] = useState(0);

  useEffect(() => {
    function handler() {
      updateValue(value => {
        if (value + 1 > maxValue) {
          window.clearInterval(timerId);
          return value;
        }
        return value + 1;
      });
    }

    const timerId = window.setInterval(handler, interval);
    return () => {
      window.clearInterval(timerId);
    };
  }, [interval, maxValue]);

  return value;
}

storiesOf('useDebounce', module)
  .add('default', () => {
    function DemoComponent() {
      const value = useTimedUpdate(100);
      const debouncedValue = useDebounce(value, 500);
      return (
        <dl>
          <dt>Value</dt>
          <dd>{value}</dd>
          <dt>Debounced value</dt>
          <dd>{debouncedValue}</dd>
        </dl>
      );
    }
    return <DemoComponent />;
  })
  .add('leading', () => {
    function DemoComponent() {
      const value = useTimedUpdate(1000, { maxValue: 10 });
      const debouncedValue = useDebounce(value, 1500, {
        leading: true,
        trailing: false,
      });
      return (
        <dl>
          <dt>Value</dt>
          <dd>{value}</dd>
          <dt>Debounced value</dt>
          <dd>{debouncedValue}</dd>
        </dl>
      );
    }
    return <DemoComponent />;
  })
  .add('maxWait', () => {
    function DemoComponent() {
      const value = useTimedUpdate(100);
      const debouncedValue = useDebounce(value, 500, {
        maxWait: 1000,
      });
      return (
        <dl>
          <dt>Value</dt>
          <dd>{value}</dd>
          <dt>Debounced value with max wait (1000ms)</dt>
          <dd>{debouncedValue}</dd>
        </dl>
      );
    }

    return <DemoComponent />;
  });
