/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Popover } from '../Popover';
import Button from '../Button';

export default {
  title: 'Popover',
  component: Popover,
  // subcomponents: {
  // // PopoverContent,
  // },
};

export const Default = () => {
  function PopoverDemo() {
    const [direction, setDirection] = React.useState('top');
    const [open, setOpen] = React.useState(true);
    const choices = [
      'top',
      'top-left',
      'top-right',

      'bottom',
      'bottom-left',
      'bottom-right',

      'left',
      'left-bottom',
      'left-top',

      'right',
      'right-bottom',
      'right-top',
    ];

    return (
      <>
        <section>
          <h2>Caret Position</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, auto)',
              gridGap: 8,
            }}>
            {choices.map((choice) => {
              return (
                <label key={choice}>
                  <input
                    type="radio"
                    name="direction"
                    value={choice}
                    checked={choice === direction}
                    onChange={() => {
                      setDirection(choice);
                    }}
                  />
                  {choice}
                </label>
              );
            })}
          </div>
        </section>
        <section>
          <h2>Popover Visibility</h2>
          <div>
            <label>
              <input
                type="checkbox"
                value={open}
                checked={open}
                onChange={() => {
                  setOpen(!open);
                }}
              />
              Open
            </label>
          </div>
        </section>
        <div>
          <Popover open={open} direction={direction}>
            Hello
          </Popover>
        </div>
      </>
    );
  }

  return <PopoverDemo />;
};

export const ToggleButton = () => {
  function Example() {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <details open={open}>
          <Button
            as="summary"
            onClick={(event) => {
              event.preventDefault();
              setOpen(!open);
            }}>
            Click me
          </Button>
          <Popover direction="top-left" open={open}>
            Hello, Ale, how was your day?
          </Popover>
        </details>
      </>
    );
  }

  return <Example />;
};
