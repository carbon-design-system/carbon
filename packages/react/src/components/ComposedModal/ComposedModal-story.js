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
import ComposedModal, {
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '../ComposedModal';
import Button from '../Button';
import { settings } from 'carbon-components';

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

storiesOf('ComposedModal', module)
  .addDecorator(withKnobs)
  .add(
    'Using Header / Footer Props',
    () => {
      const { size, ...rest } = props.composedModal();
      const { hasScrollingContent, ...bodyProps } = props.modalBody();
      return (
        <ComposedModal {...rest} size={size || undefined}>
          <ModalHeader {...props.modalHeader()} />
          <ModalBody
            {...bodyProps}
            aria-label={hasScrollingContent ? 'Modal content' : undefined}>
            <p className={`${prefix}--modal-content__text`}>
              Please see ModalWrapper for more examples and demo of the
              functionality.
            </p>
            {hasScrollingContent && scrollingContent}
          </ModalBody>
          <ModalFooter {...props.modalFooter()} />
        </ComposedModal>
      );
    },
    {
      info: {
        text: `
            Composed Modal allows you to create your own modal with just the parts you need. The ComposedModal element provides the state management for open/close, as well as passes the ModalHeader a prop to close the modal (with the close button).

            The interior components - ModalHeader / ModalBody / ModalFooter - are all container elements that will render any children you add in, wrapped in the appropriate CSS classes.

            The Modal Header / Modal Footer come with some built in props to let you accelerate towards standard Carbon modal UI. If there are customizations you need to do, see the next example of just using the interior components as containers.
          `,
      },
    }
  )
  .add(
    'Using child nodes',
    () => {
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
              Please see ModalWrapper for more examples and demo of the
              functionality.
            </p>
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
    },
    {
      info: {
        text: `
            Alternatively, you can just use the Modal components as wrapper elements and figure the children out yourself. We do suggest for the header you utilize the built in props for label and title though, for the footer it's mostly a composed element so creating the two buttons yourself (using the Button component) is probably the most straight-forward pattern.
          `,
      },
    }
  )
  .add(
    'Title only',
    () => {
      const { size, ...rest } = props.composedModal({ titleOnly: true });
      return (
        <ComposedModal {...rest} size={size || undefined}>
          <ModalHeader {...props.modalHeader({ titleOnly: true })} />
          <ModalBody />
          <ModalFooter {...props.modalFooter()} />
        </ComposedModal>
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
    'Example usage with trigger button',
    () => {
      class ComposedModalExample extends React.Component {
        state = { open: false };
        toggleModal = open => this.setState({ open });
        render() {
          const { open } = this.state;
          const { size, ...rest } = props.composedModal();
          const { hasScrollingContent, ...bodyProps } = props.modalBody();
          return (
            <>
              <Button onClick={() => this.toggleModal(true)}>
                Launch composed modal
              </Button>
              <ComposedModal
                {...rest}
                open={open}
                size={size || undefined}
                onClose={() => this.toggleModal(false)}>
                <ModalHeader {...props.modalHeader()} />
                <ModalBody
                  {...bodyProps}
                  aria-label={
                    hasScrollingContent ? 'Modal content' : undefined
                  }>
                  <p className={`${prefix}--modal-content__text`}>
                    Please see ModalWrapper for more examples and demo of the
                    functionality.
                  </p>
                  {hasScrollingContent && scrollingContent}
                </ModalBody>
                <ModalFooter {...props.modalFooter()} />
              </ComposedModal>
            </>
          );
        }
      }
      return <ComposedModalExample />;
    },
    {
      info: {
        text: `
            An example ComposedModal with a trigger button
          `,
      },
    }
  );
