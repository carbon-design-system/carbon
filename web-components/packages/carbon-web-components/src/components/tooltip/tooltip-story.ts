/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { boolean, number, select } from '@storybook/addon-knobs';
// Below path will be there when an application installs `@carbon/web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import Filter16 from '@carbon/web-components/es/icons/filter/16';
import '../button/button';
import './tooltip';
import './tooltip-body';
import './tooltip-footer';
import { TOOLTIP_ALIGNMENT } from './defs';
import { prefix } from '../../globals/settings';
import styles from './tooltip-story.scss';
import storyDocs from './tooltip-story.mdx';

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
  const { open } = args?.['cds-tooltip'] ?? {};
  const { alignment, direction, enterDelay, exitDelay } =
    args?.[`${prefix}-tooltip`] ?? {};
  return html`
    <style>
      ${styles}
    </style>
    <cds-tooltip
      ?open="${open}"
      align=${alignment}
      direction=${direction}
      enter-delay-ms=${enterDelay}
      exit-delay-ms=${exitDelay}>
      This is some tooltip text. This box shows the maximum amount of text that
      should appear inside. If more room is needed please use a modal instead.
    </cds-tooltip>
  `;
};

Default.storyName = 'Default';

Default.parameters = {
  knobs: {
    [`${prefix}-tooltip`]: () => ({
      open: boolean('Open (open)', false),
      alignment: select(
        'Tooltip alignment to trigger button (alignment)',
        tooltipAlignments,
        TOOLTIP_ALIGNMENT.TOP
      ),
      enterDelay: number('Enter delay (in ms)', 100),
      exitDelay: number('Exit delay (in ms)', 300),
    }),
  },
};

export default {
  title: 'Components/Tooltip',
  parameters: {
    ...storyDocs.parameters,
  },
};
