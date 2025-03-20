/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable storybook/story-exports */

import React, { useEffect, useState } from 'react';
import {
  unstable__Dialog as Dialog,
  DialogHeader,
  DialogControls,
  DialogCloseButton,
} from './';
import Button from '../Button';
import { action } from '@storybook/addon-actions';
import mdx from './Dialog.mdx';

export default {
  title: 'Experimental/unstable_Dialog',
  component: Dialog,
  includeStories: [],
  parameters: {
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
    onRequestClose: {
      table: {
        disable: true,
      },
    },
  },
};

export const Modal = ({ open: _open, ...args }) => {
  const [open, setOpen] = useState(_open);

  function toggleDialog() {
    setOpen(!open);
  }

  function closeDialog(e) {
    setOpen(false);
  }

  function handleRequestClose(e) {
    action('Dialog onRequestClose');
    closeDialog(e);
  }

  useEffect(() => {
    setOpen(_open);
  }, [_open]);

  return (
    <div>
      <Button type="button" onClick={toggleDialog}>
        Toggle open
      </Button>
      <Dialog {...args} open={open} onRequestClose={handleRequestClose}>
        <DialogHeader>
          {/* <DialogSubtitle></DialogSubtitle>
          <DialogTitle></DialogTitle> */}
          <DialogControls>
            <DialogCloseButton onClick={closeDialog} />
          </DialogControls>
        </DialogHeader>
        <p>
          Elit hic at labore culpa itaque fugiat. Consequuntur iure autem autem
          officiis dolores facilis nulla earum! Neque quia nemo sequi assumenda
          ratione officia Voluptate beatae eligendi placeat nemo laborum,
          ratione.
        </p>
        <br></br>
        <p>
          Elit hic at labore culpa itaque fugiat. Consequuntur iure autem autem
          officiis dolores facilis nulla earum! Neque quia nemo sequi assumenda
          ratione officia Voluptate beatae eligendi placeat nemo laborum,
          ratione.
        </p>
        <br></br>
        <p>
          Elit hic at labore culpa itaque fugiat. Consequuntur iure autem autem
          officiis dolores facilis nulla earum! Neque quia nemo sequi assumenda
          ratione officia Voluptate beatae eligendi placeat nemo laborum,
          ratione.
        </p>
        <br></br>
        <Button type="button" kind="secondary" onClick={closeDialog} autoFocus>
          Close
        </Button>
      </Dialog>
    </div>
  );
};
Modal.args = {
  modal: true,
  open: true,
};

export const NonModal = ({ open: _open, ...args }) => {
  const [open, setOpen] = useState(_open);

  function toggleDialog() {
    setOpen(!open);
  }

  function closeDialog(e) {
    setOpen(false);
  }

  function handleRequestClose(e) {
    action('Dialog onRequestClose');
    closeDialog(e);
  }

  useEffect(() => {
    setOpen(_open);
  }, [_open]);

  return (
    <div>
      <Button type="button" onClick={toggleDialog}>
        Toggle open
      </Button>
      <Dialog {...args} open={open} onRequestClose={handleRequestClose}>
        <DialogHeader>
          <p>TODO: Modal example</p>
          <DialogControls>
            <DialogCloseButton onClick={closeDialog} />
          </DialogControls>
        </DialogHeader>
        <p>
          Elit hic at labore culpa itaque fugiat. Consequuntur iure autem autem
          officiis dolores facilis nulla earum! Neque quia nemo sequi assumenda
          ratione officia Voluptate beatae eligendi placeat nemo laborum,
          ratione.
        </p>
        <br></br>
        <p>
          Elit hic at labore culpa itaque fugiat. Consequuntur iure autem autem
          officiis dolores facilis nulla earum! Neque quia nemo sequi assumenda
          ratione officia Voluptate beatae eligendi placeat nemo laborum,
          ratione.
        </p>
        <br></br>
        <p>
          Elit hic at labore culpa itaque fugiat. Consequuntur iure autem autem
          officiis dolores facilis nulla earum! Neque quia nemo sequi assumenda
          ratione officia Voluptate beatae eligendi placeat nemo laborum,
          ratione.
        </p>
        <br></br>
        <Button type="button" kind="secondary" onClick={closeDialog} autoFocus>
          Close
        </Button>
      </Dialog>
    </div>
  );
};
NonModal.args = {
  modal: false,
  open: true,
};
