/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  CaretDown32,
  CaretLeft32,
  CaretRight32,
  CaretUp32,
} from '@carbon/icons-react';
import React from 'react';
import { Popover, PopoverContent } from '../Popover';
import Button from '../Button';

export default {
  title: 'Popover',
  component: Popover,
  subcomponents: {
    PopoverContent,
  },
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
        <div style={{ marginTop: '2rem' }}>
          <Popover open={open} direction={direction}>
            <PopoverContent>Hello</PopoverContent>
          </Popover>
        </div>
      </>
    );
  }

  return <PopoverDemo />;
};

const subscribers = [];
let attached = false;

function subscribe(thunk) {
  subscribers.push(thunk);
  return () => {
    subscribers.splice(subscribers.indexOf(thunk), 1);
  };
}

function globalHandler(event) {
  subscribers.forEach((subscriber) => {
    subscriber(event);
  });
}

export const StickerSheet = () => {
  function useOutsideClick(ref, callback) {
    const savedCallback = React.useRef(callback);

    React.useEffect(() => {
      savedCallback.current = callback;
    });

    React.useEffect(() => {
      if (attached) {
        return;
      }

      attached = true;
      window.addEventListener('click', globalHandler);
      return () => {
        if (subscribers.length === 0) {
          window.removeEventListener('click', globalHandler);
        }
      };
    }, []);

    React.useEffect(() => {
      return subscribe((event) => {
        if (!ref.current.contains(event.target)) {
          savedCallback.current(event);
        }
      });
    }, [ref]);
  }

  function Example({
    children,
    direction,
    relative = false,
    icon,
    size,
    flip = false,
    ...rest
  }) {
    const ref = React.useRef(null);
    const [open, setOpen] = React.useState(false);

    useOutsideClick(ref, () => {
      if (open === true) {
        setOpen(false);
      }
    });

    if (flip) {
      return (
        <div ref={ref} {...rest}>
          <Popover direction={direction} open={open} relative={relative}>
            <PopoverContent>{children}</PopoverContent>
          </Popover>
          <Button
            iconDescription="Toggle"
            hasIconOnly
            onClick={() => {
              setOpen(!open);
            }}
            renderIcon={icon}
            size={size}
          />
        </div>
      );
    }

    return (
      <div ref={ref} {...rest}>
        <Button
          iconDescription="Toggle"
          hasIconOnly
          onClick={() => {
            setOpen(!open);
          }}
          renderIcon={icon}
          size={size}
        />
        <Popover direction={direction} open={open} relative={relative}>
          <PopoverContent>{children}</PopoverContent>
        </Popover>
      </div>
    );
  }

  return (
    <>
      <Example
        className="position-relative mb-3"
        icon={CaretDown32}
        direction="top-left">
        This is some text
      </Example>

      <Example
        className="position-relative mb-3"
        icon={CaretDown32}
        direction="top-left"
        size="sm">
        This is some text
      </Example>

      <Example
        className="flex justify-center position-relative mb-3"
        icon={CaretDown32}
        direction="top">
        This is some text
      </Example>

      <Example
        className="flex justify-center position-relative mb-3"
        icon={CaretDown32}
        direction="top"
        size="sm">
        This is some text
      </Example>

      <Example
        className="flex justify-end position-relative mb-3"
        icon={CaretDown32}
        direction="top-right">
        This is some text
      </Example>

      <Example
        className="flex justify-end position-relative mb-3"
        icon={CaretDown32}
        direction="top-right"
        size="sm">
        This is some text
      </Example>

      <Example
        className="position-relative mb-3"
        icon={CaretUp32}
        direction="bottom-left">
        This is some text
      </Example>

      <Example
        className="position-relative mb-3"
        icon={CaretUp32}
        direction="bottom-left"
        size="sm">
        This is some text
      </Example>

      <Example
        className="flex justify-center position-relative mb-3"
        icon={CaretUp32}
        direction="bottom">
        This is some text
      </Example>

      <Example
        className="flex justify-center position-relative mb-3"
        icon={CaretUp32}
        direction="bottom"
        size="sm">
        This is some text
      </Example>

      <Example
        className="flex justify-end position-relative mb-3"
        icon={CaretUp32}
        direction="bottom-right">
        This is some text
      </Example>

      <Example
        className="flex justify-end position-relative mb-3"
        icon={CaretUp32}
        direction="bottom-right"
        size="sm">
        This is some text
      </Example>

      <div className="grid grid-cols-3 mb-3">
        <div>
          <Example
            className="position-relative flex align-center mb-3"
            icon={CaretRight32}
            direction="left"
            relative>
            This is some text
          </Example>

          <Example
            className="position-relative flex align-center mb-3"
            icon={CaretRight32}
            direction="left"
            size="sm"
            relative>
            This is some text
          </Example>
        </div>

        <div>
          <Example
            className="position-relative flex align-center mb-3"
            icon={CaretRight32}
            direction="left-top"
            relative>
            This is some text
          </Example>

          <Example
            className="position-relative flex align-center mb-3"
            icon={CaretRight32}
            direction="left-top"
            size="sm"
            relative>
            This is some text
          </Example>
        </div>

        <div>
          <Example
            className="position-relative flex align-center mb-3"
            icon={CaretRight32}
            direction="left-bottom"
            relative>
            This is some text
          </Example>

          <Example
            className="position-relative flex align-center mb-3"
            icon={CaretRight32}
            direction="left-bottom"
            size="sm"
            relative>
            This is some text
          </Example>
        </div>
      </div>

      <div className="grid grid-cols-3 justify-items-end mb-3">
        <div>
          <Example
            className="position-relative flex align-center mb-3"
            icon={CaretLeft32}
            direction="right"
            relative
            flip>
            This is some text
          </Example>

          <Example
            className="position-relative flex align-center mb-3"
            icon={CaretLeft32}
            direction="right"
            size="sm"
            relative
            flip>
            This is some text
          </Example>
        </div>

        <div>
          <Example
            className="position-relative flex align-center mb-3"
            icon={CaretLeft32}
            direction="right-top"
            relative
            flip>
            This is some text
          </Example>

          <Example
            className="position-relative flex align-center mb-3"
            icon={CaretLeft32}
            direction="right-top"
            size="sm"
            relative
            flip>
            This is some text
          </Example>
        </div>

        <div>
          <Example
            className="position-relative flex align-center mb-3"
            icon={CaretLeft32}
            direction="right-bottom"
            relative
            flip>
            This is some text
          </Example>

          <Example
            className="position-relative flex align-center mb-3"
            icon={CaretLeft32}
            direction="right-bottom"
            size="sm"
            relative
            flip>
            This is some text
          </Example>
        </div>
      </div>

      <Example
        className="position-relative mb-3"
        icon={CaretDown32}
        direction="top-left">
        Consectetur et sit accusamus laboriosam pariatur. Asperiores eius
        expedita eligendi beatae vero commodi harum Illo hic accusamus fugit
        commodi cupiditate Explicabo distinctio quisquam culpa fugit eius
        Provident voluptatum ipsam quo.
      </Example>
    </>
  );
};
