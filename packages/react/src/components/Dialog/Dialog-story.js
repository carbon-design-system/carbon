/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import { FocusScope } from './FocusScope';
import { Dialog } from '../Dialog';

export default {
  title: 'Experimental/unstable_Dialog',
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
      <button>Hello</button>
    </>
  );
};

export const DialogExample = () => {
  function Example() {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <div>
          <button>First</button>
        </div>
        <button
          type="button"
          onClick={() => {
            setOpen(true);
          }}>
          Open
        </button>
        <Dialog
          open={open}
          onDismiss={() => {
            setOpen(false);
          }}>
          <h1>Hello</h1>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
            }}>
            Close
          </button>
        </Dialog>
        <div>
          <button>Last</button>
        </div>
      </>
    );
  }

  return <Example />;
};
