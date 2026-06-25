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
import { POPOVER_ALIGNMENT } from '@carbon/web-components/es/components/popover/defs.js';
import Group from '@carbon/icons/es/group/16';
import { iconLoader } from '@carbon/web-components/es/globals/internal/icon-loader.js';
import styles from './story-styles.scss?lit';

const tooltipAlignments = {
  [`top`]: POPOVER_ALIGNMENT.TOP,
  [`top-left`]: POPOVER_ALIGNMENT.TOP_LEFT,
  [`top-right`]: POPOVER_ALIGNMENT.TOP_RIGHT,
  [`bottom`]: POPOVER_ALIGNMENT.BOTTOM,
  [`bottom-left`]: POPOVER_ALIGNMENT.BOTTOM_LEFT,
  [`bottom-right`]: POPOVER_ALIGNMENT.BOTTOM_RIGHT,
  [`left`]: POPOVER_ALIGNMENT.LEFT,
  [`right`]: POPOVER_ALIGNMENT.RIGHT,
};

const argTypes = {
  backgroundColor: {
    control: { type: 'select' },
    description: 'Provide the background color need to be set for UserAvatar.',
    options: [
      'order-1-cyan',
      'order-2-gray',
      'order-3-green',
      'order-4-magenta',
      'order-5-purple',
      'order-6-teal',
      'order-7-cyan',
      'order-8-gray',
      'order-9-green',
      'order-10-magenta',
      'order-11-purple',
      'order-12-teal',
    ],
  },
  tooltipAlignment: {
    control: 'select',
    description: 'Specify how the trigger should align with the tooltip',
    options: tooltipAlignments,
  },
  tooltipText: {
    control: 'text',
    description: 'Pass in the display name to have it shown on hover',
  },
  name: {
    control: 'text',
    description:
      "When passing the name prop, either send the initials to be used or the user's full name. The first two capital letters of the user's name will be used as the name.",
  },
  size: {
    control: { type: 'radio' },
    description: 'Set the size of the avatar circle',
    options: ['xl', 'lg', 'md', 'sm'],
  },
  image: {
    control: 'textNullable',
    description:
      'When passing the image prop, supply a full path to the image to be displayed.',
  },
  imageDescription: {
    control: 'text',
    description:
      'When passing the image prop use the imageDescription prop to describe the image for screen reader.',
  },
  theme: {
    control: { type: 'select' },
    description: 'Set theme in which the component will be rendered.',
    options: ['light', 'dark'],
  },
};

export const Default = {
  args: {
    tooltipAlignment: POPOVER_ALIGNMENT.RIGHT,
    size: 'md',
    tooltipText: 'TW, Thomas J. Watson user profile',
    name: 'thomas j. watson',
    backgroundColor: 'order-1-cyan',
  },
  argTypes,
  render: (args) => {
    return html`
      <style>
        ${styles}
      </style>
      <div class="user-avatar-story__wrapper">
        <div
          class="user-avatar-story__theme-section user-avatar-story__theme-section--white"
        >
          <p class="user-avatar-story__theme-text">
            useTheme reveals theme: 'white', isDark: 'false'
          </p>
          <c4p-user-avatar
            tooltip-alignment=${args.tooltipAlignment}
            tooltip-text=${args.tooltipText}
            name=${args.name}
            size=${args.size}
            background-color=${args.backgroundColor}
            theme="light"
          >
          </c4p-user-avatar>
        </div>
        <div
          class="user-avatar-story__theme-section user-avatar-story__theme-section--g10"
        >
          <p class="user-avatar-story__theme-text">
            useTheme reveals theme: 'g10', isDark: 'false'
          </p>
          <c4p-user-avatar
            tooltip-alignment=${args.tooltipAlignment}
            tooltip-text=${args.tooltipText}
            name=${args.name}
            size=${args.size}
            background-color=${args.backgroundColor}
            theme="light"
          >
          </c4p-user-avatar>
        </div>
        <div
          class="user-avatar-story__theme-section user-avatar-story__theme-section--g90"
        >
          <p class="user-avatar-story__theme-text">
            useTheme reveals theme: 'g90', isDark: 'true'
          </p>
          <c4p-user-avatar
            tooltip-alignment=${args.tooltipAlignment}
            tooltip-text=${args.tooltipText}
            name=${args.name}
            size=${args.size}
            background-color=${args.backgroundColor}
            theme="dark"
          >
          </c4p-user-avatar>
        </div>
        <div
          class="user-avatar-story__theme-section user-avatar-story__theme-section--g100"
        >
          <p class="user-avatar-story__theme-text">
            useTheme reveals theme: 'g100', isDark: 'true'
          </p>
          <c4p-user-avatar
            tooltip-alignment=${args.tooltipAlignment}
            tooltip-text=${args.tooltipText}
            name=${args.name}
            size=${args.size}
            background-color=${args.backgroundColor}
            theme="dark"
          >
          </c4p-user-avatar>
        </div>
      </div>
    `;
  },
};

export const WithIcon = {
  args: {
    tooltipAlignment: POPOVER_ALIGNMENT.RIGHT,
    size: 'md',
    tooltipText: 'TW, Thomas J. Watson user profile',
    name: 'Thomas J. Watson',
    backgroundColor: 'order-1-cyan',
    theme: 'light',
  },
  argTypes,
  render: (args) => {
    return html`
      <c4p-user-avatar
        tooltip-alignment=${args.tooltipAlignment}
        tooltip-text=${args.tooltipText}
        name=${args.name}
        size=${args.size}
        background-color=${args.backgroundColor}
        theme=${args.theme}
      >
        ${iconLoader(Group, { slot: 'rendericon' })}
      </c4p-user-avatar>
    `;
  },
};

export const WithImage = {
  args: {
    tooltipAlignment: POPOVER_ALIGNMENT.RIGHT,
    size: 'md',
    image:
      'https://assets.ibm.com/is/image/ibm/christina-frohn?wid=2760&hei=1552&fit=constrain,0&qlt=85,0&fmt=png-alpha',
    tooltipText: 'TW, Thomas J. Watson user profile',
    imageDescription: 'Avatar of Thomas J. Watson',
    theme: 'light',
  },
  argTypes,
  render: (args) => {
    return html`
      <c4p-user-avatar
        tooltip-alignment=${args.tooltipAlignment}
        tooltip-text=${args.tooltipText}
        size=${args.size}
        image=${args.image}
        image-description=${args.imageDescription}
        theme=${args.theme}
      >
      </c4p-user-avatar>
    `;
  },
};

const meta = { title: 'Components/UserAvatar' };

export default meta;
