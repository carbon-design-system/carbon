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
  DialogTitle,
  DialogSubtitle,
  DialogBody,
  DialogFooter,
} from './';
import Button from '../Button';
import TextInput from '../TextInput';
import Select from '../Select';
import SelectItem from '../SelectItem';
import { action } from '@storybook/addon-actions';
import mdx from './Dialog.mdx';

export default {
  title: 'Experimental/unstable_Dialog',
  component: Dialog,
  // includeStories: [],
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
        <Dialog.Header>
          <Dialog.Subtitle>Configure dialog settings</Dialog.Subtitle>
          <Dialog.Title>Modal Dialog Example</Dialog.Title>
          <DialogControls>
            <DialogCloseButton onClick={closeDialog} />
          </DialogControls>
        </Dialog.Header>
        <Dialog.Body>
          <p>
            Elit hic at labore culpa itaque fugiat. Consequuntur iure autem
            autem officiis dolores facilis nulla earum! Neque quia nemo sequi
            assumenda ratione officia Voluptate beatae eligendi placeat nemo
            laborum, ratione.
          </p>
          <br></br>
          <p>
            Elit hic at labore culpa itaque fugiat. Consequuntur iure autem
            autem officiis dolores facilis nulla earum! Neque quia nemo sequi
            assumenda ratione officia Voluptate beatae eligendi placeat nemo
            laborum, ratione.
          </p>
          <br></br>
          <p>
            Elit hic at labore culpa itaque fugiat. Consequuntur iure autem
            autem officiis dolores facilis nulla earum! Neque quia nemo sequi
            assumenda ratione officia Voluptate beatae eligendi placeat nemo
            laborum, ratione.
          </p>
          <br></br>
        </Dialog.Body>
        <Dialog.Footer>
          <Button
            type="button"
            kind="secondary"
            onClick={closeDialog}
            autoFocus>
            Close
          </Button>
          <Button type="button" kind="primary" onClick={closeDialog}>
            Save
          </Button>
        </Dialog.Footer>
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
        <Dialog.Header>
          <Dialog.Subtitle>Non-modal dialog example Subtitle</Dialog.Subtitle>
          <Dialog.Title>Non-Modal Dialog</Dialog.Title>
          <DialogControls>
            <DialogCloseButton onClick={closeDialog} />
          </DialogControls>
        </Dialog.Header>
        <Dialog.Body>
          <p>
            Elit hic at labore culpa itaque fugiat. Consequuntur iure autem
            autem officiis dolores facilis nulla earum! Neque quia nemo sequi
            assumenda ratione officia Voluptate beatae eligendi placeat nemo
            laborum, ratione.
          </p>
          <br></br>
          <TextInput
            id="dialog-text-input"
            labelText="Name"
            placeholder="Enter your name"
            style={{ marginBottom: '1rem' }}
          />
          <Select
            id="dialog-select"
            labelText="Region"
            defaultValue="us-south"
            style={{ marginBottom: '1rem' }}>
            <SelectItem value="us-south" text="US South" />
            <SelectItem value="us-east" text="US East" />
          </Select>
          <p>
            Elit hic at labore culpa itaque fugiat. Consequuntur iure autem
            autem officiis dolores facilis nulla earum! Neque quia nemo sequi
            assumenda ratione officia Voluptate beatae eligendi placeat nemo
            laborum, ratione.
          </p>
        </Dialog.Body>
        <Dialog.Footer>
          <Button
            type="button"
            kind="secondary"
            onClick={closeDialog}
            autoFocus>
            Cancel
          </Button>
          <Button type="button" kind="primary" onClick={closeDialog}>
            Submit
          </Button>
        </Dialog.Footer>
      </Dialog>
    </div>
  );
};
NonModal.args = {
  modal: false,
  open: true,
};

export const PassiveDialog = ({ open: _open, ...args }) => {
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
      <Dialog {...args} open={open} modal onRequestClose={handleRequestClose}>
        <Dialog.Header>
          <Dialog.Title>Information Message</Dialog.Title>
          <Dialog.Controls>
            <Dialog.CloseButton onClick={closeDialog} />
          </Dialog.Controls>
        </Dialog.Header>
        <Dialog.Body>
          <p>
            This is a passive dialog example with no footer buttons. Passive
            dialogs are used for simple notifications or information displays.
          </p>
          <p style={{ marginTop: '1rem' }}>
            The user can dismiss this dialog by clicking the close button in the
            top-right corner or by clicking outside the dialog (if
            preventCloseOnClickOutside is not set).
          </p>
        </Dialog.Body>
        {/* No footer for passive dialog */}
      </Dialog>
    </div>
  );
};

export const DangerDialog = ({ open: _open, ...args }) => {
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
      <Dialog {...args} open={open} onRequestClose={handleRequestClose} danger>
        <Dialog.Header>
          <Dialog.Subtitle>Account resources</Dialog.Subtitle>
          <Dialog.Title>
            Are you sure you want to delete this custom domain?
          </Dialog.Title>
          <DialogControls>
            <DialogCloseButton onClick={closeDialog} />
          </DialogControls>
        </Dialog.Header>
        <Dialog.Body></Dialog.Body>
        <Dialog.Footer>
          <Button type="button" kind="secondary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button type="button" kind="danger" onClick={closeDialog}>
            Delete
          </Button>
        </Dialog.Footer>
      </Dialog>
    </div>
  );
};
DangerDialog.args = {
  modal: true,
  open: false,
};
