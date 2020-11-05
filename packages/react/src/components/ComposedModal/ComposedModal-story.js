/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import { settings } from 'carbon-components';
import ComposedModal, {
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '../ComposedModal';
import Button from '../Button';
import mdx from './ComposedModal.mdx';

const { prefix } = settings;

const sizes = {
  Default: '',
  'Extra small (xs)': 'xs',
  'Small (sm)': 'sm',
  'Large (lg)': 'lg',
};

const props = {
  composedModal: ({ titleOnly } = {}) => ({
    open: boolean('Open (open in <ComposedModal>)', true),
    onKeyDown: action('onKeyDown'),
    danger: boolean('Danger mode (danger)', false),
    selectorPrimaryFocus: text(
      'Primary focus element selector (selectorPrimaryFocus)',
      '[data-modal-primary-focus]'
    ),
    size: select('Size (size)', sizes, titleOnly ? 'sm' : ''),
    preventCloseOnClickOutside: boolean(
      'Prevent closing on click outside of modal (preventCloseOnClickOutside)',
      false
    ),
  }),
  composedModalWithLauncher: ({ titleOnly } = {}) => ({
    onKeyDown: action('onKeyDown'),
    danger: boolean('Danger mode (danger)', false),
    selectorPrimaryFocus: text(
      'Primary focus element selector (selectorPrimaryFocus)',
      '[data-modal-primary-focus]'
    ),
    size: select('Size (size)', sizes, titleOnly ? 'sm' : ''),
    preventCloseOnClickOutside: boolean(
      'Prevent closing on click outside of modal (preventCloseOnClickOutside)',
      false
    ),
  }),
  modalHeader: ({ titleOnly } = {}) => ({
    label: text('Optional Label (label in <ModalHeader>)', 'Optional Label'),
    title: text(
      'Optional title (title in <ModalHeader>)',
      titleOnly
        ? `
      Passive modal title as the message. Should be direct and 3 lines or less.
    `.trim()
        : 'Example'
    ),
    iconDescription: text(
      'Close icon description (iconDescription in <ModalHeader>)',
      'Close'
    ),
    buttonOnClick: action('buttonOnClick'),
    preventCloseOnClickOutside: boolean(
      'Prevent closing on click outside of modal (preventCloseOnClickOutside)',
      false
    ),
  }),
  modalBody: () => ({
    hasScrollingContent: boolean(
      'Modal contains scrollable content (hasScrollingContent)',
      true
    ),
    'aria-label': text('ARIA label for content', 'Example modal content'),
  }),
  modalFooter: () => ({
    primaryButtonText: text(
      'Primary button text (primaryButtonText in <ModalFooter>)',
      'Save'
    ),
    primaryButtonDisabled: boolean(
      'Primary button disabled (primaryButtonDisabled in <ModalFooter>)',
      false
    ),
    secondaryButtonText: text(
      'Secondary button text (secondaryButtonText in <ModalFooter>)',
      ''
    ),
    onRequestClose: action('onRequestClose'),
    onRequestSubmit: action('onRequestSubmit'),
  }),
};

const scrollingContent = (
  <>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id
      accumsan augue. Phasellus consequat augue vitae tellus tincidunt posuere.
      Curabitur justo urna, consectetur vel elit iaculis, ultrices condimentum
      risus. Nulla facilisi. Etiam venenatis molestie tellus. Quisque
      consectetur non risus eu rutrum.{' '}
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id
      accumsan augue. Phasellus consequat augue vitae tellus tincidunt posuere.
      Curabitur justo urna, consectetur vel elit iaculis, ultrices condimentum
      risus. Nulla facilisi. Etiam venenatis molestie tellus. Quisque
      consectetur non risus eu rutrum.{' '}
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id
      accumsan augue. Phasellus consequat augue vitae tellus tincidunt posuere.
      Curabitur justo urna, consectetur vel elit iaculis, ultrices condimentum
      risus. Nulla facilisi. Etiam venenatis molestie tellus. Quisque
      consectetur non risus eu rutrum.{' '}
    </p>
    <h3>Lorem ipsum</h3>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id
      accumsan augue. Phasellus consequat augue vitae tellus tincidunt posuere.
      Curabitur justo urna, consectetur vel elit iaculis, ultrices condimentum
      risus. Nulla facilisi. Etiam venenatis molestie tellus. Quisque
      consectetur non risus eu rutrum.{' '}
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id
      accumsan augue. Phasellus consequat augue vitae tellus tincidunt posuere.
      Curabitur justo urna, consectetur vel elit iaculis, ultrices condimentum
      risus. Nulla facilisi. Etiam venenatis molestie tellus. Quisque
      consectetur non risus eu rutrum.{' '}
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id
      accumsan augue. Phasellus consequat augue vitae tellus tincidunt posuere.
      Curabitur justo urna, consectetur vel elit iaculis, ultrices condimentum
      risus. Nulla facilisi. Etiam venenatis molestie tellus. Quisque
      consectetur non risus eu rutrum.{' '}
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id
      accumsan augue. Phasellus consequat augue vitae tellus tincidunt posuere.
      Curabitur justo urna, consectetur vel elit iaculis, ultrices condimentum
      risus. Nulla facilisi. Etiam venenatis molestie tellus. Quisque
      consectetur non risus eu rutrum.{' '}
    </p>
  </>
);

/**
 * Simple state manager for modals.
 */
const ModalStateManager = ({
  renderLauncher: LauncherContent,
  children: ModalContent,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {!ModalContent || typeof document === 'undefined'
        ? null
        : ReactDOM.createPortal(
            <ModalContent open={open} setOpen={setOpen} />,
            document.body
          )}
      {LauncherContent && <LauncherContent open={open} setOpen={setOpen} />}
    </>
  );
};

export default {
  title: 'ComposedModal',
  decorators: [withKnobs],
  parameters: {
    component: ComposedModal,
    subcomponents: {
      ModalHeader,
      ModalBody,
      ModalFooter,
    },
    docs: {
      page: mdx,
    },
  },
};

export const UsingHeaderFooterProps = () => {
  const { size, ...rest } = props.composedModalWithLauncher();
  const { hasScrollingContent, ...bodyProps } = props.modalBody();
  return (
    <ComposedModal {...rest} danger={true} size={size || undefined}>
      <ModalHeader {...props.modalHeader()} />
      <ModalBody
        {...bodyProps}
        aria-label={hasScrollingContent ? 'Modal content' : undefined}>
        <p className={`${prefix}--modal-content__text`}>
          Please see the &quot;With Trigger Button&quot; storybook example for a
          demo of this functionality.
        </p>
        <br />
        {hasScrollingContent && scrollingContent}
      </ModalBody>
      <ModalFooter {...props.modalFooter()} />
    </ComposedModal>
  );
};

UsingHeaderFooterProps.storyName = 'Using Header / Footer Props';

UsingHeaderFooterProps.parameters = {
  info: {
    text: `
        Composed Modal allows you to create your own modal with just the parts you need. The ComposedModal element provides the state management for open/close, as well as passes the ModalHeader a prop to close the modal (with the close button).

        The interior components - ModalHeader / ModalBody / ModalFooter - are all container elements that will render any children you add in, wrapped in the appropriate CSS classes.

        The Modal Header / Modal Footer come with some built in props to let you accelerate towards standard Carbon modal UI. If there are customizations you need to do, see the next example of just using the interior components as containers.
      `,
  },
};

export const UsingChildNodes = () => {
  const { size, ...rest } = props.composedModal();
  const { hasScrollingContent, ...bodyProps } = props.modalBody();
  return (
    <ComposedModal {...rest} size={size || undefined}>
      <ModalHeader {...props.modalHeader()}>
        <h1>Testing</h1>
      </ModalHeader>
      <ModalBody
        {...bodyProps}
        aria-label={hasScrollingContent ? 'Modal content' : undefined}>
        <p>
          Please see the &quot;With Trigger Button&quot; storybook example for a
          demo of this functionality.
        </p>
        <br />
        {hasScrollingContent && scrollingContent}
      </ModalBody>
      <ModalFooter>
        <Button kind="secondary">Cancel</Button>
        <Button kind={props.composedModal().danger ? 'danger' : 'primary'}>
          Save
        </Button>
      </ModalFooter>
    </ComposedModal>
  );
};

UsingChildNodes.storyName = 'Using child nodes';

UsingChildNodes.parameters = {
  info: {
    text: `
        Alternatively, you can just use the Modal components as wrapper elements and figure the children out yourself. We do suggest for the header you utilize the built in props for label and title though, for the footer it's mostly a composed element so creating the two buttons yourself (using the Button component) is probably the most straight-forward pattern.
      `,
  },
};

export const TitleOnly = () => {
  const { size, ...rest } = props.composedModal({ titleOnly: true });
  return (
    <ComposedModal {...rest} size={size || undefined}>
      <ModalHeader {...props.modalHeader({ titleOnly: true })} />
      <ModalBody />
      <ModalFooter {...props.modalFooter()} />
    </ComposedModal>
  );
};

TitleOnly.storyName = 'Title only';

TitleOnly.parameters = {
  info: {
    text: `
      In "small" and "xs" modals size, the title is allowed to span multiple lines and be used for the main message.
      It should be less than 3 lines of text. If more room is required then use the standard body copy format.
    `,
  },
};

export const WithTriggerButton = () => {
  const { size, ...rest } = props.composedModalWithLauncher();
  const { hasScrollingContent, ...bodyProps } = props.modalBody();
  return (
    <ModalStateManager
      renderLauncher={({ setOpen }) => (
        <Button onClick={() => setOpen(true)}>Launch composed modal</Button>
      )}>
      {({ open, setOpen }) => (
        <ComposedModal
          {...rest}
          open={open}
          size={size || undefined}
          onClose={() => setOpen(false)}>
          <ModalHeader {...props.modalHeader()} />
          <ModalBody
            {...bodyProps}
            aria-label={hasScrollingContent ? 'Modal content' : undefined}>
            {hasScrollingContent && scrollingContent}
          </ModalBody>
          <ModalFooter {...props.modalFooter()} />
        </ComposedModal>
      )}
    </ModalStateManager>
  );
};

WithTriggerButton.storyName = 'Example usage with trigger button';

WithTriggerButton.parameters = {
  info: {
    text: `
        An example ComposedModal with a trigger button
      `,
  },
};
