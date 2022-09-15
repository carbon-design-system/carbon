/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import '../button/button';
// Below path will be there when an application installs `carbon-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import BXModal from 'carbon-web-components/es/components-react/modal/modal';
// @ts-ignore
import BXModalHeader from 'carbon-web-components/es/components-react/modal/modal-header';
// @ts-ignore
import BXModalCloseButton from 'carbon-web-components/es/components-react/modal/modal-close-button';
// @ts-ignore
import BXModalHeading from 'carbon-web-components/es/components-react/modal/modal-heading';
// @ts-ignore
import BXModalLabel from 'carbon-web-components/es/components-react/modal/modal-label';
// @ts-ignore
import BXModalBody from 'carbon-web-components/es/components-react/modal/modal-body';
// @ts-ignore
import BXModalFooter from 'carbon-web-components/es/components-react/modal/modal-footer';
// @ts-ignore
import BXModalFooterButton from 'carbon-web-components/es/components-react/modal/modal-footer-button';
import baseStory, {
  Default as baseDefault,
  SingleButton as baseSingleButton,
  ThreeButtons as baseThreeButtons,
} from './modal-story';
import styles from './modal-story.scss';

export const Default = args => {
  const { open, size, disableClose, onBeforeClose, onClose } = args?.['bx-modal'];
  const handleBeforeClose = (event: CustomEvent) => {
    onBeforeClose(event);
    if (disableClose) {
      event.preventDefault();
    }
  };
  return (
    <BXModal open={open} size={size} onBeforeClose={handleBeforeClose} onClose={onClose}>
      <BXModalHeader>
        <BXModalCloseButton />
        <BXModalLabel>Label (Optional)</BXModalLabel>
        <BXModalHeading>Modal Title</BXModalHeading>
      </BXModalHeader>
      <BXModalBody>
        <p>Modal text description</p>
      </BXModalBody>
      <BXModalFooter>
        <BXModalFooterButton kind="secondary" data-modal-close>
          Cancel
        </BXModalFooterButton>
        <BXModalFooterButton kind="primary">Save</BXModalFooterButton>
      </BXModalFooter>
    </BXModal>
  );
};

Object.assign(Default, baseDefault);

export const SingleButton = args => {
  const { open, size, disableClose, onBeforeClose, onClose } = args?.['bx-modal'];
  const handleBeforeClose = (event: CustomEvent) => {
    onBeforeClose(event);
    if (disableClose) {
      event.preventDefault();
    }
  };
  return (
    <BXModal open={open} size={size} onBeforeClose={handleBeforeClose} onClose={onClose}>
      <BXModalHeader>
        <BXModalCloseButton />
        <BXModalLabel>Label (Optional)</BXModalLabel>
        <BXModalHeading>Modal Title</BXModalHeading>
      </BXModalHeader>
      <BXModalBody>
        <p>Modal text description</p>
      </BXModalBody>
      <BXModalFooter>
        <BXModalFooterButton kind="primary">Save</BXModalFooterButton>
      </BXModalFooter>
    </BXModal>
  );
};

Object.assign(SingleButton, baseSingleButton);

export const ThreeButtons = args => {
  const { open, size, disableClose, onBeforeClose, onClose } = args?.['bx-modal'];
  const handleBeforeClose = (event: CustomEvent) => {
    onBeforeClose(event);
    if (disableClose) {
      event.preventDefault();
    }
  };
  return (
    <BXModal open={open} size={size} onBeforeClose={handleBeforeClose} onClose={onClose}>
      <BXModalHeader>
        <BXModalCloseButton />
        <BXModalLabel>Label (Optional)</BXModalLabel>
        <BXModalHeading>Modal Title</BXModalHeading>
      </BXModalHeader>
      <BXModalBody>
        <p>Modal text description</p>
      </BXModalBody>
      <BXModalFooter>
        <BXModalFooterButton kind="secondary">Apply</BXModalFooterButton>
        <BXModalFooterButton kind="secondary" data-modal-close>
          Cancel
        </BXModalFooterButton>
        <BXModalFooterButton kind="primary">Save</BXModalFooterButton>
      </BXModalFooter>
    </BXModal>
  );
};

Object.assign(ThreeButtons, baseThreeButtons);

// Creating a shallow clone with spread operator seems to cause
// `Cannot read property 'name' of undefined` error in `@storybook/source-loader`
export default {
  ...baseStory,
  decorators: [
    story => (
      <>
        <style type="text/css">{styles.cssText}</style>
        {story()}
      </>
    ),
  ],
};
