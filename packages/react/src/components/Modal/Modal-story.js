/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import Modal from '../Modal';
import TextInput from '../TextInput';
import { settings } from 'carbon-components';

const { prefix } = settings;

const props = () => ({
  className: 'some-class',
  open: boolean('Open (open)', true),
  passiveModal: boolean('Without footer (passiveModal)', false),
  danger: boolean('Danger mode (danger)', false),
  shouldSubmitOnEnter: boolean(
    'Enter key to submit (shouldSubmitOnEnter)',
    false
  ),
  focusTrap: boolean('Trap focus (focusTrap)', false),
  hasScrollingContent: boolean(
    'Modal contains scrollable content (hasScrollingContent)',
    true
  ),
  modalHeading: text('Modal heading (modalHeading)', 'Modal heading'),
  modalLabel: text('Optional label (modalLabel)', 'Label'),
  modalAriaLabel: text(
    'ARIA label, used only if modalLabel not provided (modalAriaLabel)',
    'A label to be read by screen readers on the modal root node'
  ),
  primaryButtonText: text(
    'Primary button text (primaryButtonText)',
    'Primary Button'
  ),
  secondaryButtonText: text(
    'Secondary button text (secondaryButtonText)',
    'Secondary Button'
  ),
  selectorPrimaryFocus: text(
    'Primary focus element selector (selectorPrimaryFocus)',
    '[data-modal-primary-focus]'
  ),
  iconDescription: text(
    'Close icon description (iconDescription)',
    'Close the modal'
  ),
  onBlur: action('onBlur'),
  onClick: action('onClick'),
  onFocus: action('onFocus'),
  onRequestClose: action('onRequestClose'),
  onRequestSubmit: action('onRequestSubmit'),
  onSecondarySubmit: action('onSecondarySubmit'),
});

storiesOf('Modal', module)
  .addDecorator(withKnobs)
  .add(
    'Default',
    () => (
      <Modal {...props()}>
        <p className={`${prefix}--modal-content__text`}>
          Please see ModalWrapper for more examples and demo of the
          functionality.
        </p>
        {props().hasScrollingContent && (
          <>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id
              accumsan augue. Phasellus consequat augue vitae tellus tincidunt
              posuere. Curabitur justo urna, consectetur vel elit iaculis,
              ultrices condimentum risus. Nulla facilisi. Etiam venenatis
              molestie tellus. Quisque consectetur non risus eu rutrum.{' '}
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id
              accumsan augue. Phasellus consequat augue vitae tellus tincidunt
              posuere. Curabitur justo urna, consectetur vel elit iaculis,
              ultrices condimentum risus. Nulla facilisi. Etiam venenatis
              molestie tellus. Quisque consectetur non risus eu rutrum.{' '}
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id
              accumsan augue. Phasellus consequat augue vitae tellus tincidunt
              posuere. Curabitur justo urna, consectetur vel elit iaculis,
              ultrices condimentum risus. Nulla facilisi. Etiam venenatis
              molestie tellus. Quisque consectetur non risus eu rutrum.{' '}
            </p>
            <h3>Lorem ipsum</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id
              accumsan augue. Phasellus consequat augue vitae tellus tincidunt
              posuere. Curabitur justo urna, consectetur vel elit iaculis,
              ultrices condimentum risus. Nulla facilisi. Etiam venenatis
              molestie tellus. Quisque consectetur non risus eu rutrum.{' '}
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id
              accumsan augue. Phasellus consequat augue vitae tellus tincidunt
              posuere. Curabitur justo urna, consectetur vel elit iaculis,
              ultrices condimentum risus. Nulla facilisi. Etiam venenatis
              molestie tellus. Quisque consectetur non risus eu rutrum.{' '}
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id
              accumsan augue. Phasellus consequat augue vitae tellus tincidunt
              posuere. Curabitur justo urna, consectetur vel elit iaculis,
              ultrices condimentum risus. Nulla facilisi. Etiam venenatis
              molestie tellus. Quisque consectetur non risus eu rutrum.{' '}
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id
              accumsan augue. Phasellus consequat augue vitae tellus tincidunt
              posuere. Curabitur justo urna, consectetur vel elit iaculis,
              ultrices condimentum risus. Nulla facilisi. Etiam venenatis
              molestie tellus. Quisque consectetur non risus eu rutrum.{' '}
            </p>
          </>
        )}
      </Modal>
    ),
    {
      info: {
        text: `
            Modals communicate information via a secondary window and allow the user to maintain the context of a particular task.
            Use the Modal Wrapper component to encapsulate your Modal within a button.
          `,
      },
    }
  )
  .add(
    'Trap Focus',
    () => (
      <>
        <Modal {...props()} selectorPrimaryFocus="#text-input-2">
          <TextInput
            id="text-input-1"
            labelText="Text Input 1"
            placeholder="Enter text..."
            style={{ marginBottom: '1rem' }}
          />
          <TextInput
            id="text-input-2"
            labelText="Text Input 2"
            placeholder="Enter text..."
          />
        </Modal>
      </>
    ),
    {
      info: {
        text: `
            Specify a selector for the primary element to focus when opening a modal.
          `,
      },
    }
  );
