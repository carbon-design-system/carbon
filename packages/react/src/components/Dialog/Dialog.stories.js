/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable storybook/story-exports */

import React, { useEffect, useState } from 'react';
import { VStack } from '../Stack';
import {
  unstable__Dialog as Dialog,
  DialogControls,
  DialogCloseButton,
  DialogBody,
} from './';
import Button from '../Button';
import TextInput from '../TextInput';
import Select from '../Select';
import SelectItem from '../SelectItem';
import { action } from 'storybook/actions';
import mdx from './Dialog.mdx';

export default {
  title: 'Experimental/unstable_Dialog',
  component: Dialog,
  includeStories: [],
  parameters: {
    docs: {
      page: mdx,
    },
    controls: {
      exclude: ['hasScrollingContent', 'modal', 'open'],
    },
  },
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
    focusAfterCloseRef: {
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
    <>
      <Button type="button" onClick={toggleDialog}>
        Toggle open
      </Button>
      <Dialog
        {...args}
        open={open}
        onRequestClose={handleRequestClose}
        aria-labelledby="title">
        <Dialog.Header>
          <Dialog.Subtitle>Configure dialog settings</Dialog.Subtitle>
          <Dialog.Title id="title">Modal Dialog Example</Dialog.Title>
          <DialogControls>
            <DialogCloseButton onClick={closeDialog} />
          </DialogControls>
        </Dialog.Header>

        <DialogBody>
          <VStack>
            <p>
              Elit hic at labore culpa itaque fugiat. Consequuntur iure autem
              autem officiis dolores facilis nulla earum! Neque quia nemo sequi
              assumenda ratione officia Voluptate beatae eligendi placeat nemo
              laborum, ratione.
            </p>
            <p>
              Elit hic at labore culpa itaque fugiat. Consequuntur iure autem
              autem officiis dolores facilis nulla earum! Neque quia nemo sequi
              assumenda ratione officia Voluptate beatae eligendi placeat nemo
              laborum, ratione.
            </p>
            <TextInput
              id="dialog-text-input"
              labelText="Name"
              placeholder="Enter your name"
            />
            <Select
              id="dialog-select"
              labelText="Region"
              defaultValue="us-south">
              <SelectItem value="us-south" text="US South" />
              <SelectItem value="us-east" text="US East" />
            </Select>
            <p>
              Elit hic at labore culpa itaque fugiat. Consequuntur iure autem
              autem officiis dolores facilis nulla earum! Neque quia nemo sequi
              assumenda ratione officia Voluptate beatae eligendi placeat nemo
              laborum, ratione.
            </p>
            <p>
              Elit hic at labore culpa itaque fugiat. Consequuntur iure autem
              autem officiis dolores facilis nulla earum! Neque quia nemo sequi
              assumenda ratione officia Voluptate beatae eligendi placeat nemo
              laborum, ratione.
            </p>
            <p>
              Elit hic at labore culpa itaque fugiat. Consequuntur iure autem
              autem officiis dolores facilis nulla earum! Neque quia nemo sequi
              assumenda ratione officia Voluptate beatae eligendi placeat nemo
              laborum, ratione.
            </p>
            <p>
              Elit hic at labore culpa itaque fugiat. Consequuntur iure autem
              autem officiis dolores facilis nulla earum! Neque quia nemo sequi
              assumenda ratione officia Voluptate beatae eligendi placeat nemo
              laborum, ratione.
            </p>
            <p>
              Elit hic at labore culpa itaque fugiat. Consequuntur iure autem
              autem officiis dolores facilis nulla earum! Neque quia nemo sequi
              assumenda ratione officia Voluptate beatae eligendi placeat nemo
              laborum, ratione.
            </p>
            <p>
              Elit hic at labore culpa itaque fugiat. Consequuntur iure autem
              autem officiis dolores facilis nulla earum! Neque quia nemo sequi
              assumenda ratione officia Voluptate beatae eligendi placeat nemo
              laborum, ratione.
            </p>
          </VStack>
        </DialogBody>
        <Dialog.Footer>
          <Button type="button" kind="secondary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button type="button" kind="primary" onClick={closeDialog}>
            Save
          </Button>
        </Dialog.Footer>
      </Dialog>
    </>
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
    <>
      <Button type="button" onClick={toggleDialog}>
        Toggle open
      </Button>
      <Dialog
        {...args}
        open={open}
        onRequestClose={handleRequestClose}
        aria-label="Dialog Title">
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

          <TextInput
            id="dialog-text-input"
            labelText="Name"
            placeholder="Enter your name"
          />
          <Select id="dialog-select" labelText="Region" defaultValue="us-south">
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
          <Button type="button" kind="secondary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button type="button" kind="primary" onClick={closeDialog}>
            Submit
          </Button>
        </Dialog.Footer>
      </Dialog>
    </>
  );
};
NonModal.args = {
  modal: false,
  open: true,
};

export const WithScrollingContent = ({ open: _open, ...args }) => {
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
    <>
      <Button type="button" onClick={toggleDialog}>
        Toggle open
      </Button>
      <Dialog
        {...args}
        open={open}
        onRequestClose={handleRequestClose}
        aria-label="Dialog Title">
        <Dialog.Header>
          <Dialog.Subtitle>Configure dialog settings</Dialog.Subtitle>
          <Dialog.Title>Modal Dialog Example</Dialog.Title>
          <DialogControls>
            <DialogCloseButton onClick={closeDialog} />
          </DialogControls>
        </Dialog.Header>
        <Dialog.Body hasScrollingContent>
          <VStack>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              eu nibh odio. Nunc a consequat est, id porttitor sapien. Proin
              vitae leo vitae orci tincidunt auctor eget eget libero. Ut
              tincidunt ultricies fringilla. Aliquam erat volutpat. Aenean arcu
              odio, elementum vel vehicula vitae, porttitor ac lorem. Sed
              viverra elit ac risus tincidunt fermentum. Ut sollicitudin nibh id
              risus ornare ornare. Etiam gravida orci ut lectus dictum, quis
              ultricies felis mollis. Mauris nec commodo est, nec faucibus nibh.
              Nunc commodo ante quis pretium consectetur. Ut ac nisl vitae mi
              mattis vulputate a at elit. Nullam porttitor ex eget mi feugiat
              mattis. Nunc non sodales magna. Proin ornare tellus quis hendrerit
              egestas. Donec pharetra leo nec molestie sollicitudin.
            </p>

            <TextInput
              id="dialog-text-input"
              labelText="Name"
              placeholder="Enter your name"
            />
            <Select
              id="dialog-select"
              labelText="Region"
              defaultValue="us-south">
              <SelectItem value="us-south" text="US South" />
              <SelectItem value="us-east" text="US East" />
            </Select>
            <p>
              Elit hic at labore culpa itaque fugiat. Consequuntur iure autem
              autem officiis dolores facilis nulla earum! Neque quia nemo sequi
              assumenda ratione officia Voluptate beatae eligendi placeat nemo
              laborum, ratione.
            </p>
            <p>
              Elit hic at labore culpa itaque fugiat. Consequuntur iure autem
              autem officiis dolores facilis nulla earum! Neque quia nemo sequi
              assumenda ratione officia Voluptate beatae eligendi placeat nemo
              laborum, ratione.
            </p>

            <TextInput
              id="dialog-text-input"
              labelText="Name"
              placeholder="Enter your name"
            />
            <Select
              id="dialog-select"
              labelText="Region"
              defaultValue="us-south">
              <SelectItem value="us-south" text="US South" />
              <SelectItem value="us-east" text="US East" />
            </Select>
            <p>
              Elit hic at labore culpa itaque fugiat. Consequuntur iure autem
              autem officiis dolores facilis nulla earum! Neque quia nemo sequi
              assumenda ratione officia Voluptate beatae eligendi placeat nemo
              laborum, ratione.
            </p>
          </VStack>
        </Dialog.Body>
        <Dialog.Footer>
          <Button type="button" kind="secondary" onClick={closeDialog}>
            Close
          </Button>
          <Button type="button" kind="primary" onClick={closeDialog}>
            Save
          </Button>
        </Dialog.Footer>
      </Dialog>
    </>
  );
};
WithScrollingContent.args = {
  modal: true,
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
    <>
      <Button type="button" onClick={toggleDialog}>
        Toggle open
      </Button>
      <Dialog
        {...args}
        open={open}
        modal
        onRequestClose={handleRequestClose}
        aria-label="Dialog Title">
        <Dialog.Header>
          <Dialog.Title>Information Message</Dialog.Title>
          <Dialog.Controls>
            <Dialog.CloseButton onClick={closeDialog} />
          </Dialog.Controls>
        </Dialog.Header>
        <Dialog.Body>
          <p>You have been successfully signed out</p>
        </Dialog.Body>
      </Dialog>
    </>
  );
};

export const DangerDialog = (args) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}> Toggle open</Button>
      <Dialog
        {...args}
        open={open}
        onRequestClose={() => setOpen(false)}
        onRequestSubmit={() => {
          setOpen(false);
        }}>
        <Dialog.Header>
          <Dialog.Subtitle>Account resources</Dialog.Subtitle>
          <Dialog.Title>
            Are you sure you want to delete this custom domain?
          </Dialog.Title>
          <Dialog.Controls>
            <Dialog.CloseButton onClick={() => setOpen(false)} />
          </Dialog.Controls>
        </Dialog.Header>
        <Dialog.Body></Dialog.Body>
        <Dialog.Footer
          danger
          primaryButtonText="Delete"
          secondaryButtonText="Cancel"
          onRequestClose={() => setOpen(false)}
          onRequestSubmit={() => {
            setOpen(false);
          }}
        />
      </Dialog>
    </>
  );
};

DangerDialog.args = {
  modal: true,
  danger: true,
};
