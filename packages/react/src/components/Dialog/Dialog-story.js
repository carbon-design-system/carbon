/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable storybook/story-exports */

import React, { useEffect, useState } from 'react';
import { unstable__Dialog as Dialog } from './';
import Button from '../Button';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Experimental/unstable_Dialog',
  component: Dialog,
  includeStories: [],
};

export const Default = ({ open: _open, ...args }) => {
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
      <Dialog onRequestClose={handleCloseEvent} open={open} {...args}>
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
