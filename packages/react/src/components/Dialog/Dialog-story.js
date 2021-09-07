/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import { FocusScope } from '../FocusScope';
import { Dialog } from '../Dialog';
import { useId } from '../../internal/useId';
import { Portal } from '../Portal';

export default {
  title: 'Experimental/unstable_Dialog',
  includeStories: [],
};

export const Default = () => {
  function DemoComponent() {
    const [open, setOpen] = React.useState(false);
    const ref = React.useRef(null);

    return (
      <div
        style={{
          border: '1px solid black',
          background: 'rgba(0, 0, 0, 0.1)',
          padding: '1rem',
        }}>
        <button
          type="button"
          onClick={() => {
            setOpen(true);
          }}>
          Open
        </button>
        {open ? (
          <FocusScope>
            <div>
              <p>
                Elit hic at labore culpa itaque fugiat. Consequuntur iure autem
                autem officiis dolores facilis nulla earum! Neque quia nemo
                sequi assumenda ratione officia Voluptate beatae eligendi
                placeat nemo laborum, ratione.
              </p>
              <DemoComponent />
              <button
                ref={ref}
                type="button"
                onClick={() => {
                  setOpen(false);
                }}>
                Close
              </button>
            </div>
          </FocusScope>
        ) : null}
      </div>
    );
  }
  return (
    <>
      <DemoComponent />
      <button type="button">Hello</button>
    </>
  );
};

export const DialogExample = () => {
  function Example() {
    const [open, setOpen] = React.useState(false);
    const id = useId();

    return (
      <div>
        <div>
          <button type="button">First</button>
        </div>
        <button
          type="button"
          onClick={() => {
            setOpen(true);
          }}>
          Open
        </button>
        {open ? (
          <Portal
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              zIndex: 9999,
            }}>
            <FullPage />
            <Dialog
              aria-labelledby={id}
              onDismiss={() => {
                setOpen(false);
              }}
              style={{
                position: 'relative',
                zIndex: 9999,
                padding: '1rem',
                background: 'white',
              }}>
              <div>
                <span id={id}>Hello</span>
              </div>
              <div>
                <Example />
              </div>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                }}>
                Close
              </button>
            </Dialog>
          </Portal>
        ) : null}

        <div>
          <button type="button">Last</button>
        </div>
      </div>
    );
  }

  return <Example />;
};

const FullPage = React.forwardRef(function FullPage(props, ref) {
  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        transform: 'translateZ(0)',
        background: 'rgba(0, 0, 0, 0.5)',
      }}
      {...props}
    />
  );
});
