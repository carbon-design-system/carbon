/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import Download16 from '@carbon/web-components/es/icons/download/16';
import { LINK_SIZE } from './link';
import storyDocs from './link.mdx';

const defaultArgs = {
  disabled: false,
  href: 'https://example.com',
  inline: false,
  size: LINK_SIZE.MEDIUM,
  visited: false,
}

const controls = {
  disabled: {
    control: 'boolean',
    description: `Specify if the control should be disabled, or not`,
  },
  href: {
    control: 'text',
    description: `Provide the href attribute for the <a> node`,
  },
  size: {
    control: 'radio', options: [LINK_SIZE.SMALL, LINK_SIZE.MEDIUM, LINK_SIZE.LARGE],
    description: `Specify the size of the Link. Currently supports either sm, 'md' (default) or 'lg' as an option.`
  },
  visited: {
    control: 'boolean',
    description: `Specify whether you want the link to receive visited styles after the link has been clicked`,
  },
}

export const Default = {
  render: () => html` <cds-link href="#"> Link </cds-link> `
};


export const Inline = {
  render: () => html`
    <cds-link inline href="#"
      >Lorem ipsum dolor sit amet, consectetur adipiscing elit.</cds-link
    >
    <p>
      Ut facilisis semper lorem in aliquet. Aliquam accumsan ante justo, vitae
      fringilla eros vehicula id. Ut at enim quis libero pharetra ullamcorper.
      Maecenas feugiat sodales arcu ut porttitor. In blandit ultricies est.
      Vivamus risus massa, cursus eu tellus sed, sagittis commodo nunc.
      <cds-link inline href="#"
        >Maecenas nunc mauris, consequat quis mauris sit amet,</cds-link
      >
      finibus suscipit nunc. Phasellus ex quam, placerat quis tempus sit amet,
      pretium nec sem. Etiam dictum scelerisque mauris, blandit ultrices erat
      pellentesque id. Quisque venenatis purus sit amet sodales condimentum.
      Duis at tincidunt orci. Ut velit ipsum, lacinia at ex quis, aliquet
      rhoncus purus. Praesent et scelerisque ligula.
    </p>
  `
};

export const PairedWithIcon = {
  args: defaultArgs,
  parameters: {
    controls: { exclude: /(.*?)/ },
  },
  render: ({ 
    disabled,
    href,
    size,
    onClick
   }) => html`
    <cds-link
      ?disabled="${disabled}"
      href="${ifDefined(href)}"
      size="${ifDefined(size)}"
      @click="${onClick}">
      Download ${Download16({ slot: 'icon' })}
    </cds-link>
  `,
};

export const Playground = {
  argTypes: controls,
  args: defaultArgs,
  render: ({ 
    disabled,
    href,
    inline,
    size,
    visited,
    onClick
   }) => html`
    <cds-link
      ?disabled="${disabled}"
      href="${ifDefined(href)}"
      size="${ifDefined(size)}"
      ?inline="${inline}"
      ?visited="${visited}"
      @click="${onClick}">
      Link
    </cds-link>
  `,
};

const meta = {
  title: 'Components/Link',
  parameters: {
    docs: {
      page: storyDocs,
    },
  },
};

export default meta;