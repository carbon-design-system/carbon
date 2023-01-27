/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-html';
import { action } from '@storybook/addon-actions';
import { boolean, select } from '@storybook/addon-knobs';
// Below path will be there when an application installs `@carbon/web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import Add16 from '@carbon/web-components/es/icons/add/16';
import ifNonNull from '../../globals/directives/if-non-null';
import { BUTTON_KIND, BUTTON_SIZE, BUTTON_ICON_LAYOUT } from './button';
import './button-skeleton';
import textNullable from '../../../.storybook/knob-text-nullable';
import storyDocs from './button-story.mdx';

const kinds = {
  [`Primary button (${BUTTON_KIND.PRIMARY})`]: BUTTON_KIND.PRIMARY,
  [`Secondary button (${BUTTON_KIND.SECONDARY})`]: BUTTON_KIND.SECONDARY,
  [`Tertiary button (${BUTTON_KIND.TERTIARY})`]: BUTTON_KIND.TERTIARY,
  [`Danger button (${BUTTON_KIND.DANGER})`]: BUTTON_KIND.DANGER,
  [`Danger tertiary button (${BUTTON_KIND.DANGER_TERTIARY})`]:
    BUTTON_KIND.DANGER_TERTIARY,
  [`Danger ghost button (${BUTTON_KIND.DANGER_GHOST})`]:
    BUTTON_KIND.DANGER_GHOST,
  [`Ghost button (${BUTTON_KIND.GHOST})`]: BUTTON_KIND.GHOST,
};

const sizes = {
  'Regular size': null,
  [`Small size (${BUTTON_SIZE.SMALL})`]: BUTTON_SIZE.SMALL,
  [`XL size (${BUTTON_SIZE.EXTRA_LARGE})`]: BUTTON_SIZE.EXTRA_LARGE,
  [`Size for form field (${BUTTON_SIZE.FIELD})`]: BUTTON_SIZE.FIELD,
};

const iconLayouts = {
  Regular: null,
  [`Condensed (${BUTTON_ICON_LAYOUT.CONDENSED})`]: BUTTON_ICON_LAYOUT.CONDENSED,
};

export const Default = (args) => {
  const {
    autofocus,
    disabled,
    download,
    href,
    hreflang,
    isExpressive,
    kind,
    linkRole,
    ping,
    rel,
    size,
    target,
    type,
    onClick,
  } = args?.['bx-btn'] ?? {};
  return html`
    <bx-btn
      ?autofocus="${autofocus}"
      ?disabled="${disabled}"
      download="${ifNonNull(download)}"
      href="${ifNonNull(href)}"
      hreflang="${ifNonNull(hreflang)}"
      ?isExpressive="${isExpressive}"
      kind="${ifNonNull(kind)}"
      link-role="${ifNonNull(linkRole)}"
      ping="${ifNonNull(ping)}"
      rel="${ifNonNull(rel)}"
      size="${ifNonNull(size)}"
      target="${ifNonNull(target)}"
      type="${ifNonNull(type)}"
      @click=${onClick}>
      Button
    </bx-btn>
  `;
};

Default.parameters = {
  knobs: {
    'bx-btn': () => ({
      kind: select('Button kind (kind)', kinds, BUTTON_KIND.PRIMARY),
      disabled: boolean('Disabled (disabled)', false),
      size: select('Button size (size)', sizes, null),
      href: textNullable('Link href (href)', ''),
      onClick: action('click'),
      isExpressive: boolean('expressive (isExpressive)', false),
    }),
  },
};

export const icon = (args) => {
  const { kind, disabled, size, href, isExpressive, onClick } =
    args?.['bx-btn'] ?? {};
  return html`
    <bx-btn
      kind=${ifNonNull(kind)}
      ?disabled=${disabled}
      size=${ifNonNull(size)}
      href=${ifNonNull(href || undefined)}
      ?isExpressive="${isExpressive}"
      @click=${onClick}>
      ${Add16({ slot: 'icon' })}
    </bx-btn>
  `;
};

icon.parameters = Default.parameters;

export const textAndIcon = (args) => {
  const { kind, disabled, size, href, iconLayout, isExpressive, onClick } =
    args?.['bx-btn'] ?? {};
  return html`
    <bx-btn
      kind=${ifNonNull(kind)}
      ?disabled=${disabled}
      icon-layout="${ifNonNull(iconLayout)}"
      ?isExpressive="${isExpressive}"
      size=${ifNonNull(size)}
      href=${ifNonNull(href || undefined)}
      @click=${onClick}>
      Button ${Add16({ slot: 'icon' })}
    </bx-btn>
  `;
};

textAndIcon.storyName = 'Text and icon';

textAndIcon.parameters = {
  knobs: {
    'bx-btn': () => ({
      iconLayout: select('Icon layout (icon-layout)', iconLayouts, null),
      kind: select('Button kind (kind)', kinds, BUTTON_KIND.PRIMARY),
      disabled: boolean('Disabled (disabled)', false),
      size: select('Button size (size)', sizes, null),
      href: textNullable('Link href (href)', ''),
      onClick: action('click'),
      isExpressive: boolean('expressive (isExpressive)', false),
    }),
  },
};

export const skeleton = (args) => {
  const { disabled, size, href, isExpressive, onClick } =
    args?.['bx-btn-skeleton'];
  return html`
    <bx-btn-skeleton
      ?disabled=${disabled}
      size=${ifNonNull(size)}
      href=${ifNonNull(href || undefined)}
      ?isExpressive="${isExpressive}"
      @click=${onClick}>
    </bx-btn-skeleton>
  `;
};

skeleton.parameters = {
  percy: {
    skip: true,
  },
  knobs: {
    'bx-btn-skeleton': () => ({
      kind: select('Button kind (kind)', kinds, BUTTON_KIND.PRIMARY),
      disabled: boolean('Disabled (disabled)', false),
      size: select('Button size (size)', sizes, null),
      href: textNullable('Link href (href)', ''),
      onClick: action('click'),
      isExpressive: boolean('expressive (isExpressive)', false),
    }),
  },
};

export default {
  title: 'Components/Button',
  parameters: {
    ...storyDocs.parameters,
  },
};
