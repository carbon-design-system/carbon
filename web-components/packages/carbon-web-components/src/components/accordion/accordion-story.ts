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
import { prefix } from '../../globals/settings';
import { ACCORDION_SIZE } from './accordion';
import './index';
import './accordion-skeleton';
import '../button/index';
import storyDocs from './accordion-story.mdx';

const sizes = {
  [`Small size (${ACCORDION_SIZE.SMALL})`]: ACCORDION_SIZE.SMALL,
  [`Medium size (${ACCORDION_SIZE.MEDIUM})`]: ACCORDION_SIZE.MEDIUM,
  [`Large size (${ACCORDION_SIZE.LARGE})`]: ACCORDION_SIZE.LARGE,
};

export const Default = () => {
  return html`
    <cds-accordion>
      <cds-accordion-item title="Section 1 title">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </cds-accordion-item>
      <cds-accordion-item title="Section 2 title">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </cds-accordion-item>
      <cds-accordion-item title="Section 3 title">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </cds-accordion-item>
      <cds-accordion-item title="Section 4 title">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </cds-accordion-item>
    </cds-accordion>
  `;
};

Default.storyName = 'Default';

export const Skeleton = (args) => {
  const { alignment, isFlush } = args?.[`${prefix}-accordion-skeleton`] ?? {};
  return html`
    <cds-accordion-skeleton alignment="${alignment}" ?isFlush="${isFlush}">
    </cds-accordion-skeleton>
  `;
};

Skeleton.decorators = [
  (story) => {
    return html`<div style="width: 500px">${story()}</div>`;
  },
];

Skeleton.parameters = {
  percy: {
    skip: true,
  },
  knobs: {
    [`${prefix}-accordion-skeleton`]: () => ({
      alignment: select(
        'Accordion alignment (alignment)',
        ['start', 'end'],
        'end'
      ),
      isFlush: boolean('isFlush', false),
    }),
  },
};

const noop = () => {};

export const Playground = (args) => {
  const {
    disabled,
    disableToggle,
    onBeforeToggle = noop,
    onToggle = noop,
    size,
    alignment,
    isFlush,
  } = args?.[`${prefix}-accordion-playground`] ?? {};
  const handleBeforeToggle = (event: CustomEvent) => {
    onBeforeToggle(event);
    if (disableToggle) {
      event.preventDefault();
    }
  };

  return html`
    <cds-accordion
      @cds-accordion-item-beingtoggled="${handleBeforeToggle}"
      @cds-accordion-item-toggled="${onToggle}"
      size="${size}"
      alignment="${alignment}"
      ?isFlush="${isFlush}">
      <cds-accordion-item ?disabled="${disabled}" title="Section 1 title">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </cds-accordion-item>
      <cds-accordion-item ?disabled="${disabled}" title="Section 2 title">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </cds-accordion-item>
      <cds-accordion-item ?disabled="${disabled}" title="Section 3 title">
        <cds-btn>This is a button.</cds-btn>
      </cds-accordion-item>
      <cds-accordion-item ?disabled="${disabled}">
        <slot slot="title">
          <span> Section 4 title (<em>the title can be a node</em>) </span>
        </slot>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </cds-accordion-item>
    </cds-accordion>
  `;
};

Playground.parameters = {
  percy: {
    skip: true,
  },
  knobs: {
    [`${prefix}-accordion-playground`]: () => ({
      alignment: select(
        'Specify the alignment of the accordion heading title and chevron (alignment)',
        ['start', 'end'],
        'end'
      ),
      disabled: boolean(
        'Specify whether an individual AccordionItem should be disabled (disabled)',
        false
      ),
      isFlush: boolean(
        'Specify whether Accordion text should be flush, default is false, does not work with align="start" (isFlush)',
        false
      ),
      size: select(
        'Specify the size of the Accordion (size)',
        sizes,
        ACCORDION_SIZE.MEDIUM
      ),
      disableToggle: boolean(
        `Disable user-initiated toggle action (Call event.preventDefault() in ${prefix}-accordion-beingtoggled event)`,
        false
      ),
      onBeforeToggle: action(`${prefix}-accordion-item-beingtoggled`),
      onToggle: action(`${prefix}-accordion-item-toggled`),
    }),
  },
};

export default {
  title: 'Components/Accordion',
  parameters: {
    ...storyDocs.parameters,
  },
};
