/**
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import ArrowRight16 from '@carbon/icons/es/arrow--right/16.js';
import { LINK_SIZE } from './link';
import { iconLoader } from '../../globals/internal/icon-loader';

const defaultArgs = {
  disabled: false,
  href: '#',
  inline: false,
  size: LINK_SIZE.MEDIUM,
  visited: false,
};

const controls = {
  disabled: {
    control: 'boolean',
    description: `Specify if the control should be disabled, or not`,
  },
  inline: {
    control: 'boolean',
    description: `Specify whether the link should render inline`,
  },
  href: {
    control: 'text',
    description: `Provide the href attribute for the <a> node`,
  },
  size: {
    control: 'radio',
    options: [LINK_SIZE.SMALL, LINK_SIZE.MEDIUM, LINK_SIZE.LARGE],
    description: `Specify the size of the Link. Currently supports either sm, 'md' (default) or 'lg' as an option.`,
  },
  visited: {
    control: 'boolean',
    description: `Specify whether you want the link to receive visited styles after the link has been clicked`,
  },
};

export const Default = {
  argTypes: controls,
  args: defaultArgs,
  render: ({ disabled, href, inline, size, visited, onClick }) => html`
    <cds-link
      ?disabled="${disabled}"
      .href="${ifDefined(href)}"
      .size="${ifDefined(size)}"
      ?inline="${inline}"
      ?visited="${visited}"
      @click="${onClick}">
      Link
    </cds-link>
  `,
};

export const Inline = {
  argTypes: controls,
  args: {
    ...defaultArgs,
    inline: true,
  },
  render: ({ disabled, href, inline, size, visited, onClick }) => html`
    <cds-link
      ?disabled="${disabled}"
      .href="${ifDefined(href)}"
      .size="${ifDefined(size)}"
      ?inline="${inline}"
      ?visited="${visited}"
      @click="${onClick}"
      >Lorem ipsum dolor sit amet, consectetur adipiscing elit.</cds-link
    >
    <p>
      Ut facilisis semper lorem in aliquet. Aliquam accumsan ante justo, vitae
      fringilla eros vehicula id. Ut at enim quis libero pharetra ullamcorper.
      Maecenas feugiat sodales arcu ut porttitor. In blandit ultricies est.
      Vivamus risus massa, cursus eu tellus sed, sagittis commodo nunc.
      <cds-link
        ?disabled="${disabled}"
        .href="${ifDefined(href)}"
        .size="${ifDefined(size)}"
        ?inline="${inline}"
        ?visited="${visited}"
        @click="${onClick}"
        >Maecenas nunc mauris, consequat quis mauris sit amet,</cds-link
      >
      finibus suscipit nunc. Phasellus ex quam, placerat quis tempus sit amet,
      pretium nec sem. Etiam dictum scelerisque mauris, blandit ultrices erat
      pellentesque id. Quisque venenatis purus sit amet sodales condimentum.
      Duis at tincidunt orci. Ut velit ipsum, lacinia at ex quis, aliquet
      rhoncus purus. Praesent et scelerisque ligula.
    </p>
  `,
};

export const PairedWithIcon = {
  args: defaultArgs,
  argTypes: controls,
  render: ({ disabled, href, size, visited, onClick }) => html`
    <cds-link
      ?disabled="${disabled}"
      .href="${ifDefined(href)}"
      .size="${ifDefined(size)}"
      ?visited="${visited}"
      @click="${onClick}">
      Carbon Docs ${iconLoader(ArrowRight16, { slot: 'icon' })}
    </cds-link>
  `,
};

const meta = {
  title: 'Components/Link',
};

export default meta;
