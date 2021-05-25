/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { useDisclosure } from '../Disclosure';
import { Popover, PopoverContent } from '../Popover';

export default {
  title: 'Experimental/unstable_Disclosure',
  // includeStories: [],
};

export const Default = () => {
  function Example() {
    const { buttonProps, contentProps, open } = useDisclosure('test-id');

    return (
      <div style={{ display: 'inline-block', position: 'relative' }}>
        <button type="button" {...buttonProps}>
          {open ? (
            <span aria-label="Point up" role="img">
              👆
            </span>
          ) : (
            <span aria-label="Point down" role="img">
              👇
            </span>
          )}
        </button>
        <Popover {...contentProps} align="top-left" caret={false} open={open}>
          <PopoverContent>
            <div>Test stuff</div>
          </PopoverContent>
        </Popover>
      </div>
    );
  }

  return <Example />;
};

export const HeadingAndBody = () => {};
