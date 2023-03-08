/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { action } from '@storybook/addon-actions';
import { boolean, select } from '@storybook/addon-knobs';
import { ifDefined } from 'lit/directives/if-defined.js';
import '../button/button';
import { MODAL_SIZE } from './modal';
import './modal-header';
import './modal-close-button';
import './modal-heading';
import './modal-label';
import './modal-body';
import './modal-footer';
import './modal-footer-button';
import styles from './modal-story.scss';
import storyDocs from './modal-story.mdx';

const sizes = {
  [`Extra small size (${MODAL_SIZE.EXTRA_SMALL})`]: MODAL_SIZE.EXTRA_SMALL,
  [`Small size (${MODAL_SIZE.SMALL})`]: MODAL_SIZE.SMALL,
  [`Regular size`]: null,
  [`Large size (${MODAL_SIZE.LARGE})`]: MODAL_SIZE.LARGE,
};

export const Default = (args) => {
  const { danger, open, size, disableClose, onBeforeClose, onClose } =
    args?.['cds-modal'] ?? {};
  const handleBeforeClose = (event: CustomEvent) => {
    onBeforeClose(event);
    if (disableClose) {
      event.preventDefault();
    }
  };
  return html`
    <cds-modal
      ?open="${open}"
      size="${ifDefined(size)}"
      @cds-modal-beingclosed=${handleBeforeClose}
      @cds-modal-closed=${onClose}>
      <cds-modal-header>
        <cds-modal-close-button></cds-modal-close-button>
        <cds-modal-label>Label (Optional)</cds-modal-label>
        <cds-modal-heading>Modal Title</cds-modal-heading>
      </cds-modal-header>
      <cds-modal-body><p>Modal text description</p></cds-modal-body>
      <cds-modal-footer>
        <cds-modal-footer-button kind="secondary" data-modal-close
          >Cancel</cds-modal-footer-button
        >
        <cds-modal-footer-button kind="${danger ? 'danger' : 'primary'}"
          >Save</cds-modal-footer-button
        >
      </cds-modal-footer>
    </cds-modal>
  `;
};

Default.storyName = 'Default';

export const SingleButton = (args) => {
  const { danger, open, size, disableClose, onBeforeClose, onClose } =
    args?.['cds-modal'] ?? {};
  const handleBeforeClose = (event: CustomEvent) => {
    onBeforeClose(event);
    if (disableClose) {
      event.preventDefault();
    }
  };
  return html`
    <cds-modal
      ?open="${open}"
      size="${ifDefined(size)}"
      @cds-modal-beingclosed=${handleBeforeClose}
      @cds-modal-closed=${onClose}>
      <cds-modal-header>
        <cds-modal-close-button></cds-modal-close-button>
        <cds-modal-label>Label (Optional)</cds-modal-label>
        <cds-modal-heading>Modal Title</cds-modal-heading>
      </cds-modal-header>
      <cds-modal-body><p>Modal text description</p></cds-modal-body>
      <cds-modal-footer>
        <cds-modal-footer-button kind="${danger ? 'danger' : 'primary'}"
          >Save</cds-modal-footer-button
        >
      </cds-modal-footer>
    </cds-modal>
  `;
};

SingleButton.storyName = 'Single button';

export const ThreeButtons = (args) => {
  const { danger, open, size, disableClose, onBeforeClose, onClose } =
    args?.['cds-modal'] ?? {};
  const handleBeforeClose = (event: CustomEvent) => {
    onBeforeClose(event);
    if (disableClose) {
      event.preventDefault();
    }
  };
  return html`
    <cds-modal
      ?open="${open}"
      size="${ifDefined(size)}"
      @cds-modal-beingclosed=${handleBeforeClose}
      @cds-modal-closed=${onClose}>
      <cds-modal-header>
        <cds-modal-close-button></cds-modal-close-button>
        <cds-modal-label>Label (Optional)</cds-modal-label>
        <cds-modal-heading>Modal Title</cds-modal-heading>
      </cds-modal-header>
      <cds-modal-body><p>Modal text description</p></cds-modal-body>
      <cds-modal-footer>
        <cds-modal-footer-button kind="secondary"
          >Apply</cds-modal-footer-button
        >
        <cds-modal-footer-button kind="secondary" data-modal-close
          >Cancel</cds-modal-footer-button
        >
        <cds-modal-footer-button kind="${danger ? 'danger' : 'primary'}"
          >Save</cds-modal-footer-button
        >
      </cds-modal-footer>
    </cds-modal>
  `;
};

ThreeButtons.storyName = 'Three buttons';

export default {
  title: 'Components/Modal',
  decorators: [
    (story) => html`
      <style type="text/css">
        ${styles.cssText}
      </style>
      ${story()}
    `,
  ],
  parameters: {
    ...storyDocs.parameters,
    knobs: {
      'cds-modal': () => ({
        open: boolean('Open (open)', true),
        danger: boolean('Danger mode (danger)', false),
        disableClose: boolean(
          'Disable user-initiated close action (Call event.preventDefault() in cds-modal-beingclosed event)',
          false
        ),
        size: select('Modal size (size)', sizes, null),
        onBeforeClose: action('cds-modal-beingclosed'),
        onClose: action('cds-modal-closed'),
      }),
    },
  },
};
