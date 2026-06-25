/**
 * @license
 *
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import './index';
import { prefix } from '../../globals/settings';
import '@carbon/web-components/es/components/button/index.js';
import styles from './story-styles.scss?lit';
import ExampleLogo from './_story-assets/example-logo.svg';

import '@carbon/web-components/es/components/link/index.js';
import {
  getAdditionalInfo,
  getLinks,
  getContent,
  getTitle,
} from './about-modal-helpers';

const storyPrefix = 'about-modal-stories__';

const argTypes = {
  closeIconDescription: {
    control: 'text',
    description: 'The accessibility title for the close icon.',
  },
  copyrightText: {
    control: 'text',
    description:
      'Trademark and copyright information. Displays first year of product release to current year.',
  },
  logo: {
    control: false,
    description: 'A visual symbol used to represent the product.',
  },
  title: {
    control: 'select',
    description: 'Provide the product name for the modal header',
    options: {
      'short title': 0,
      'long title': 1,
      'short title with formatting': 2,
    },
  },
  version: {
    control: 'text',
    description:
      'Text that provides information on the version number of your product.',
  },
  additionalInfo: {
    control: 'select',
    description:
      'If you are legally required to display logos of technologies used to build your product you can provide this in the additionalInfo. Additional information will be displayed in the footer.',
    options: {
      'no additional info': 0,
      'powered by logos': 1,
    },
  },
  content: {
    control: 'select',
    description:
      'Subhead text providing any relevant product disclaimers including legal information (optional)',
    options: {
      'no content': 0,
      'short content': 1,
      'medium content': 2,
      'long content': 3,
    },
  },
  links: {
    control: 'select',
    description:
      'An array of Carbon `Link` component if there are additional information to call out within the card. The about modal should be used to display the product information and not where users go to find help (optional) text providing any relevant product disclaimers including legal information (optional)',
    options: {
      none: 0,
      'one link': 1,
      'two links': 2,
      'three links': 3,
    },
  },
  modalAriaLabel: {
    control: 'text',
    description: 'Specifies aria label for AboutModal',
  },
};

export const Default = {
  args: {
    closeIconDescription: 'close',
    copyrightText: 'Copyright © IBM Corp. 2020, 2023',
    title: 2,
    version: 'Version 0.0.0',
    additionalInfo: 0,
    content: 0,
    links: 0,
    modalAriaLabel: '',
  },
  argTypes,
  render: (args) => {
    const openModal = () => {
      document.querySelector(`${prefix}-about-modal`)?.toggleAttribute('open');
    };
    return html`
      <style>
        ${styles}
      </style>
      <div class="${storyPrefix}story-container">
        <div class="${storyPrefix}story-header"></div>
        <div id="page-content-selector" class="${storyPrefix}story-content">
          <cds-button @click="${openModal}">Reopen the About Modal</cds-button>
        </div>
      </div>
      <c4p-about-modal
        closeIconDescription=${args.closeIconDescription}
        copyrightText=${args.copyrightText}
        .logo=${html`
          <img
            src=${ExampleLogo}
            alt="Example product or service logo"
            style="max-width: 6rem"
          />
        `}
        .title=${getTitle(args.title)}
        .version=${args.version}
        .additionalInfo=${getAdditionalInfo(args.additionalInfo)}
        .content=${getContent(args.content)}
        .links=${getLinks(args.links)}
        aria-label=${args.modalAriaLabel}
      ></c4p-about-modal>
    `;
  },
};

export const AboutModalWithAllPropsSet = {
  args: {
    closeIconDescription: 'close',
    copyrightText: 'Copyright © IBM Corp. 2020, 2023',
    title: 2,
    version: 'Version 0.0.0',
    additionalInfo: 1,
    content: 2,
    links: 3,
    modalAriaLabel: '',
  },
  argTypes,
  render: (args) => {
    const openModal = () => {
      document.querySelector(`${prefix}-about-modal`)?.toggleAttribute('open');
    };
    return html`
      <style>
        ${styles}
      </style>
      <div class="${storyPrefix}story-container">
        <div class="${storyPrefix}story-header"></div>
        <div id="page-content-selector" class="${storyPrefix}story-content">
          <cds-button @click="${openModal}">Reopen the About Modal</cds-button>
        </div>
      </div>
      <c4p-about-modal
        closeIconDescription=${args.closeIconDescription}
        copyrightText=${args.copyrightText}
        .logo=${html`
          <img
            src=${ExampleLogo}
            alt="Example product or service logo"
            style="max-width: 6rem"
          />
        `}
        .title=${getTitle(args.title)}
        .version=${args.version}
        .additionalInfo=${getAdditionalInfo(args.additionalInfo)}
        .content=${getContent(args.content)}
        .links=${getLinks(args.links)}
        aria-label=${args.modalAriaLabel}
      ></c4p-about-modal>
    `;
  },
};

const meta = {
  title: 'Components/AboutModal',
};

export default meta;
