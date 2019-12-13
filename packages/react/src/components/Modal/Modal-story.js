/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import Modal from '../Modal';
import TextInput from '../TextInput';
import { settings } from 'carbon-components';

const { prefix } = settings;

const sizes = {
  Default: '',
  'Extra small (xs)': 'xs',
  'Small (sm)': 'sm',
  'Large (lg)': 'lg',
};

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
    false
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
  size: select('Size (size)', sizes),
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

const titleOnlyProps = () => {
  const passiveModal = boolean('Without footer (passiveModal)', false);
  return {
    className: 'some-class',
    open: boolean('Open (open)', true),
    passiveModal,
    danger: !passiveModal && boolean('Danger mode (danger)', false),
    modalHeading: text(
      'Modal heading (modalHeading)',
      `
      Passive modal title as the message. Should be direct and 3 lines or less.
    `.trim()
    ),
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
    size: select('Size (size)', sizes, 'sm'),
    iconDescription: text(
      'Close icon description (iconDescription)',
      'Close the modal'
    ),
    onBlur: action('onBlur'),
    onClick: action('onClick'),
    onFocus: action('onFocus'),
    onRequestClose: action('onRequestClose'),
  };
};

storiesOf('Modal', module)
  .addDecorator(withKnobs)
  .add(
    'Default',
    () => {
      const { size, ...rest } = props();
      return (
        <Modal {...rest} size={size || undefined}>
          <p className={`${prefix}--modal-content__text`}>
            Please see ModalWrapper for more examples and demo of the
            functionality.
          </p>
          {rest.hasScrollingContent && (
            <>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                id accumsan augue. Phasellus consequat augue vitae tellus
                tincidunt posuere. Curabitur justo urna, consectetur vel elit
                iaculis, ultrices condimentum risus. Nulla facilisi. Etiam
                venenatis molestie tellus. Quisque consectetur non risus eu
                rutrum.{' '}
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                id accumsan augue. Phasellus consequat augue vitae tellus
                tincidunt posuere. Curabitur justo urna, consectetur vel elit
                iaculis, ultrices condimentum risus. Nulla facilisi. Etiam
                venenatis molestie tellus. Quisque consectetur non risus eu
                rutrum.{' '}
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                id accumsan augue. Phasellus consequat augue vitae tellus
                tincidunt posuere. Curabitur justo urna, consectetur vel elit
                iaculis, ultrices condimentum risus. Nulla facilisi. Etiam
                venenatis molestie tellus. Quisque consectetur non risus eu
                rutrum.{' '}
              </p>
              <h3>Lorem ipsum</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                id accumsan augue. Phasellus consequat augue vitae tellus
                tincidunt posuere. Curabitur justo urna, consectetur vel elit
                iaculis, ultrices condimentum risus. Nulla facilisi. Etiam
                venenatis molestie tellus. Quisque consectetur non risus eu
                rutrum.{' '}
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                id accumsan augue. Phasellus consequat augue vitae tellus
                tincidunt posuere. Curabitur justo urna, consectetur vel elit
                iaculis, ultrices condimentum risus. Nulla facilisi. Etiam
                venenatis molestie tellus. Quisque consectetur non risus eu
                rutrum.{' '}
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                id accumsan augue. Phasellus consequat augue vitae tellus
                tincidunt posuere. Curabitur justo urna, consectetur vel elit
                iaculis, ultrices condimentum risus. Nulla facilisi. Etiam
                venenatis molestie tellus. Quisque consectetur non risus eu
                rutrum.{' '}
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                id accumsan augue. Phasellus consequat augue vitae tellus
                tincidunt posuere. Curabitur justo urna, consectetur vel elit
                iaculis, ultrices condimentum risus. Nulla facilisi. Etiam
                venenatis molestie tellus. Quisque consectetur non risus eu
                rutrum.{' '}
              </p>
            </>
          )}
        </Modal>
      );
    },
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
    'Title only',
    () => {
      const { size, ...rest } = titleOnlyProps();
      return (
        <>
          <Modal {...rest} size={size || undefined}></Modal>
        </>
      );
    },
    {
      info: {
        text: `
          In "small" and "xs" modals size, the title is allowed to span multiple lines and be used for the main message.
          It should be less than 3 lines of text. If more room is required then use the standard body copy format.
        `,
      },
    }
  )
  .add(
    'Trap Focus',
    () => {
      const { size, ...rest } = props();
      return (
        <>
          <Modal
            {...rest}
            hasForm
            size={size || undefined}
            selectorPrimaryFocus="#text-input-2">
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
      );
    },
    {
      info: {
        text: `
            Specify a selector for the primary element to focus when opening a modal.
          `,
      },
    }
  );
