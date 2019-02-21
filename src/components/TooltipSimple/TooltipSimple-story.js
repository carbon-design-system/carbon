/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { storiesOf } from '@storybook/react';

import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import { iconInfoGlyph, iconAdd } from 'carbon-icons';
import { breakingChangesX } from '../../internal/FeatureFlags';
import TooltipSimple from '../TooltipSimple';

const icons = {
  'Info (iconInfo from `carbon-icons`)': 'iconInfoGlyph',
  'Add (iconAdd from `carbon-icons`)': 'iconAdd',
};

const iconMap = {
  iconInfoGlyph,
  iconAdd,
};

const directions = {
  'Bottom (bottom)': 'bottom',
  'Top (top)': 'top',
};

const props = {
  withIcon: () => ({
    className: 'some-class',
    clickToOpen: boolean('Click to open (clickToOpen)', false),
    direction: select('Tooltip direction (direction)', directions, 'bottom'),
    text: text('Tooltip content (text)', 'This is some Tooltip text.'),
    icon: iconMap[select('The icon (icon)', icons, 'iconInfoGlyph')],
    iconDescription: text('Icon description (iconDescription)', 'tooltip'),
  }),
  withoutIcon: () => ({
    className: 'some-class',
    showIcon: false,
    direction: select('Tooltip direction (direction)', directions, 'bottom'),
    text: text('Tooltip content (text)', 'This is some Tooltip text.'),
  }),
};

if (!breakingChangesX) {
  storiesOf('TooltipSimple', module)
    .addDecorator(withKnobs)
    .add(
      'default',
      () => (
        <div style={{ marginTop: '2rem' }}>
          <TooltipSimple {...props.withIcon()}>
            <p className="bx--tooltip__trigger">Tooltip - hover</p>
          </TooltipSimple>
        </div>
      ),
      {
        info: {
          text: `
              Tooltips are used to supply additional information to an element when hovering over it. By default,
              the tooltip will render above the element. The example below shows the default scenario.
            `,
        },
      }
    )
    .add(
      'no icon',
      () => (
        <div style={{ marginTop: '2rem' }}>
          <TooltipSimple {...props.withoutIcon()}>
            <p className="bx--tooltip__trigger">Tooltip - hover</p>
          </TooltipSimple>
        </div>
      ),
      {
        info: {
          text: `
              Tooltips are used to supply additional information to an element when hovering over it. By default,
              the tooltip will render with an information Icon. The example below shows the option to exclude the Icon.
            `,
        },
      }
    );
}
