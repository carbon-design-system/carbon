/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable storybook/story-exports */

import React, { useEffect, useState } from 'react';
import Dialog from './';
import Button from '../Button';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Experimental/unstable_Dialog',
  component: Dialog,
};

const DialogWithState = ({ children, open: _open, ...args }) => {
  const [open, setOpen] = useState(_open);

  const handleOpenDialog = () => {
    setOpen(!open);
  };

  const closeAction = action('Close action');

  const handleCloseEvent = () => {
    closeAction();
    // keep local state the same as the dialog otherwise open will
    // need two clicks after a close
    setOpen(false);
  };

  const handleCloseClick = () => {
    setOpen(false);
  };

  useEffect(() => {
    setOpen(_open);
  }, [_open]);

  return (
    <div>
      <Button type="button" onClick={handleOpenDialog}>
        Toggle open
      </Button>
      <Dialog onClose={handleCloseEvent} open={open} {...args}>
        {children}
        <Button
          type="button"
          kind="secondary"
          onClick={handleCloseClick}
          autofocus>
          Close
        </Button>
      </Dialog>
    </div>
  );
};

export const Default = ({ open: _open, ...args }) => {
  return (
    <DialogWithState {...args}>
      <p>
        Elit hic at labore culpa itaque fugiat. Consequuntur iure autem autem
        officiis dolores facilis nulla earum! Neque quia nemo sequi assumenda
        ratione officia Voluptate beatae eligendi placeat nemo laborum, ratione.
      </p>
    </DialogWithState>
  );
};

export const DefaultStacked = ({ open: _open, ...args }) => {
  const [open, setOpen] = useState(_open);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  const handleOpenDialog = () => {
    setOpen(!open);
  };

  const handleOpenDialog2 = () => {
    setOpen2(!open2);
  };

  const handleOpenDialog3 = () => {
    setOpen3(!open3);
  };

  const closeAction = action('Close action');
  const closeAction2 = action('Close action 2');
  const closeAction3 = action('Close action 3');

  const handleCloseEvent = () => {
    closeAction();
    setOpen(false);
  };

  const handleCloseEvent2 = () => {
    closeAction2();
    setOpen2(false);
  };

  const handleCloseEvent3 = () => {
    closeAction3();
    setOpen3(false);
  };

  const handleCloseClick = () => {
    setOpen(false);
  };
  const handleCloseClick2 = () => {
    setOpen2(false);
  };
  const handleCloseClick3 = () => {
    setOpen3(false);
  };

  useEffect(() => {
    setOpen(_open);
  }, [_open]);

  return (
    <>
      <Button type="button" kind="primary" onClick={handleOpenDialog} autofocus>
        Open dialog 1
      </Button>
      <Dialog onClose={handleCloseEvent} open={open} {...args}>
        <p>
          Elit hic at labore culpa itaque fugiat. Consequuntur iure autem autem
          officiis dolores facilis nulla earum! Neque quia nemo sequi assumenda
          ratione officia Voluptate beatae eligendi placeat nemo laborum,
          ratione.
        </p>
        <Button
          type="button"
          kind="secondary"
          onClick={handleCloseClick}
          data-autofocus>
          Close
        </Button>
        <Button type="button" kind="primary" onClick={handleOpenDialog2}>
          Open dialog 2
        </Button>
      </Dialog>
      <Dialog onClose={handleCloseEvent2} open={open2} {...args}>
        <h2>Dialog 2</h2>
        <p>
          Elit hic at labore culpa itaque fugiat. Consequuntur iure autem autem
          officiis dolores facilis nulla earum! Neque quia nemo sequi assumenda
          ratione officia Voluptate beatae eligendi placeat nemo laborum,
          ratione.
        </p>
        <Button
          type="button"
          kind="secondary"
          onClick={handleCloseClick2}
          data-autofocus>
          Close
        </Button>
        <Button type="button" kind="primary" onClick={handleOpenDialog3}>
          Open dialog 3
        </Button>
      </Dialog>
      <Dialog onClose={handleCloseEvent3} open={open3} {...args}>
        <h2>Dialog 3</h2>
        <p>
          Elit hic at labore culpa itaque fugiat. Consequuntur iure autem autem
          officiis dolores facilis nulla earum! Neque quia nemo sequi assumenda
          ratione officia Voluptate beatae eligendi placeat nemo laborum,
          ratione.
        </p>
        <Button
          type="button"
          kind="secondary"
          onClick={handleCloseClick3}
          data-autofocus>
          Close
        </Button>
      </Dialog>
    </>
  );
};
