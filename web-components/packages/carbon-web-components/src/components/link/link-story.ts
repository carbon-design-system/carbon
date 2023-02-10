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
import { action } from '@storybook/addon-actions';
import { boolean, select } from '@storybook/addon-knobs';
// Below path will be there when an application installs `@carbon/web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import Download16 from '@carbon/web-components/es/icons/download/16';
import textNullable from '../../../.storybook/knob-text-nullable';
import { LINK_SIZE } from './link';
import storyDocs from './link-story.mdx';

const sizes = {
  'Regular size': null,
  [`Small size (${LINK_SIZE.SMALL})`]: LINK_SIZE.SMALL,
  [`Large size (${LINK_SIZE.LARGE})`]: LINK_SIZE.LARGE,
};

export const Default = (args) => {
  const {
    disabled,
    download,
    href,
    hreflang,
    linkRole,
    ping,
    rel,
    size,
    target,
    type,
    onClick,
  } = args?.['bx-link'] ?? {};
  return html`
    <bx-link
      ?disabled="${disabled}"
      download="${ifDefined(download)}"
      href="${ifDefined(href)}"
      hreflang="${ifDefined(hreflang)}"
      link-role="${ifDefined(linkRole)}"
      ping="${ifDefined(ping)}"
      rel="${ifDefined(rel)}"
      size="${ifDefined(size)}"
      target="${ifDefined(target)}"
      type="${ifDefined(type)}"
      @click="${onClick}">
      Link
    </bx-link>
  `;
};

Default.storyName = 'Default';

export const pairedWithIcon = (args) => {
  const {
    disabled,
    download,
    href,
    hreflang,
    linkRole,
    ping,
    rel,
    size,
    target,
    type,
    onClick,
  } = args?.['bx-link'] ?? {};
  return html`
    <bx-link
      ?disabled="${disabled}"
      download="${ifDefined(download)}"
      href="${ifDefined(href)}"
      hreflang="${ifDefined(hreflang)}"
      link-role="${ifDefined(linkRole)}"
      ping="${ifDefined(ping)}"
      rel="${ifDefined(rel)}"
      size="${ifDefined(size)}"
      target="${ifDefined(target)}"
      type="${ifDefined(type)}"
      @click="${onClick}">
      Download ${Download16({ slot: 'icon' })}
    </bx-link>
  `;
};

export default {
  title: 'Components/Link',
  parameters: {
    ...storyDocs.parameters,
    knobs: {
      'bx-link': () => ({
        disabled: boolean('Disabled (disabled)', false),
        href: textNullable(
          'Link href (href)',
          'https://github.com/carbon-design-system/carbon-web-components'
        ),
        onClick: action('click'),
        size: select('Link size (size)', sizes, null),
      }),
    },
  },
};
