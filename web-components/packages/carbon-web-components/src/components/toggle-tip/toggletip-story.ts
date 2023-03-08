/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { select } from '@storybook/addon-knobs';
// Below path will be there when an application installs `carbon-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import Filter16 from 'carbon-web-components/es/icons/filter/16';
import textNullable from '../../../.storybook/knob-text-nullable';
import { ifDefined } from 'lit/directives/if-defined';
import { prefix } from '../../globals/settings';
import './toggletip';
import '../button';
import { TOOLTIP_ALIGNMENT } from '../tooltip/defs';
import storyDocs from './toggletip-story.mdx';

const tooltipAlignments = {
  [`top`]: TOOLTIP_ALIGNMENT.TOP,
  [`top-left`]: TOOLTIP_ALIGNMENT.TOP_LEFT,
  [`top-right`]: TOOLTIP_ALIGNMENT.TOP_RIGHT,
  [`bottom`]: TOOLTIP_ALIGNMENT.BOTTOM,
  [`bottom-left`]: TOOLTIP_ALIGNMENT.BOTTOM_LEFT,
  [`bottom-right`]: TOOLTIP_ALIGNMENT.BOTTOM_RIGHT,
  [`left`]: TOOLTIP_ALIGNMENT.LEFT,
  [`left-bottom`]: TOOLTIP_ALIGNMENT.LEFT_BOTTOM,
  [`left-top`]: TOOLTIP_ALIGNMENT.LEFT_TOP,
  [`right`]: TOOLTIP_ALIGNMENT.RIGHT,
  [`right-bottom`]: TOOLTIP_ALIGNMENT.RIGHT_BOTTOM,
  [`right-top`]: TOOLTIP_ALIGNMENT.RIGHT_TOP,
};

export const Default = (args) => {
  const { alignment, bodyText } = args?.[`${prefix}-toggletip`] ?? {};
  return html`
    <cds-toggletip alignment="${ifDefined(alignment)}">
      Toggletip label

      <p slot="body-text">${bodyText}</p>
      <cds-link slot="actions">Test</cds-link>
      <cds-btn slot="actions">Button</cds-btn>
    </cds-toggletip>
  `;
};

Default.parameters = {
  knobs: {
    [`${prefix}-toggletip`]: () => ({
      alignment: select(
        'Toggletip alignment to trigger button (alignment)',
        tooltipAlignments,
        TOOLTIP_ALIGNMENT.BOTTOM
      ),
      bodyText: textNullable(
        'Toggletip content (bodyText)',
        `Lorem ipsum dolor sit amet, di os consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.`
      ),
    }),
  },
};

export default {
  title: 'Components/Toggletip',
  parameters: {
    ...storyDocs.parameters,
  },
};
