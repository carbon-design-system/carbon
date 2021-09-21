/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './story.scss';
import React from 'react';
import { Popover, PopoverContent } from '../Popover';

export default {
  title: 'Components/Popover',
  parameters: {
    component: Popover,
    subcomponents: {
      PopoverContent,
    },
  },
};

export const Default = () => {
  function PopoverDemo() {
    const [align, setAlign] = React.useState('top');
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
                    name="align"
                    value={choice}
                    checked={choice === align}
                    onChange={() => {
                      setAlign(choice);
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
        <div style={{ marginTop: '2rem' }}>
          <Popover open={open} align={align} relative>
            <PopoverContent className="p-3">Hello</PopoverContent>
          </Popover>
        </div>
      </>
    );
  }

  return <PopoverDemo />;
};
