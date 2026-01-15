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
  Dialog,
  DialogControls,
  DialogCloseButton,
  DialogBody,
  DialogHeader,
  DialogSubtitle,
  DialogTitle,
  DialogFooter,
} from './Dialog';
import Button from '../Button';
import TextInput from '../TextInput';
import Select from '../Select';
import SelectItem from '../SelectItem';
import { action } from 'storybook/actions';
import mdx from './Dialog.mdx';

export default {
  title: 'Preview/preview__Dialog',
  component: Dialog,
  parameters: {
    docs: {
      page: mdx,
    },
    controls: {
      exclude: ['hasScrollingContent', 'modal', 'open', 'focusAfterCloseRef'],
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
        <DialogHeader>
          <DialogSubtitle>Configure dialog settings</DialogSubtitle>
          <DialogTitle id="title">Modal Dialog Example</DialogTitle>
          <DialogControls>
            <DialogCloseButton onClick={closeDialog} />
          </DialogControls>
        </DialogHeader>
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
        <DialogFooter>
          <Button type="button" kind="secondary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button type="button" kind="primary" onClick={closeDialog}>
            Save
          </Button>
        </DialogFooter>
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
        <DialogHeader>
          <DialogSubtitle>Non-modal dialog example Subtitle</DialogSubtitle>
          <DialogTitle>Non-Modal Dialog</DialogTitle>
          <DialogControls>
            <DialogCloseButton onClick={closeDialog} />
          </DialogControls>
        </DialogHeader>
        <DialogBody>
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
        </DialogBody>
        <DialogFooter>
          <Button type="button" kind="secondary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button type="button" kind="primary" onClick={closeDialog}>
            Submit
          </Button>
        </DialogFooter>
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
        <DialogHeader>
          <DialogSubtitle>Configure dialog settings</DialogSubtitle>
          <DialogTitle>Modal Dialog Example</DialogTitle>
          <DialogControls>
            <DialogCloseButton onClick={closeDialog} />
          </DialogControls>
        </DialogHeader>
        <DialogBody hasScrollingContent>
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
        </DialogBody>
        <DialogFooter>
          <Button type="button" kind="secondary" onClick={closeDialog}>
            Close
          </Button>
          <Button type="button" kind="primary" onClick={closeDialog}>
            Save
          </Button>
        </DialogFooter>
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
        <DialogHeader>
          <DialogTitle>Information Message</DialogTitle>
          <DialogControls>
            <DialogCloseButton onClick={closeDialog} />
          </DialogControls>
        </DialogHeader>
        <DialogBody>
          <p>You have been successfully signed out</p>
        </DialogBody>
      </Dialog>
    </>
  );
};

export const DangerDialog = (args) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}> Toggle open</Button>
      <Dialog {...args} open={open} onRequestClose={() => setOpen(false)}>
        <DialogHeader>
          <DialogSubtitle>Account resources</DialogSubtitle>
          <DialogTitle>
            Are you sure you want to delete this custom domain?
          </DialogTitle>
          <DialogControls>
            <DialogCloseButton onClick={() => setOpen(false)} />
          </DialogControls>
        </DialogHeader>
        <DialogBody></DialogBody>
        <DialogFooter
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
};
