import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import { iconInfoGlyph, iconAdd } from 'carbon-icons';
import TooltipSimple from '../TooltipSimple';

const icons = {
  iconInfoGlyph: 'Info (iconInfo from `carbon-icons`)',
  iconAdd: 'Add (iconAdd from `carbon-icons`)',
};

const iconMap = {
  iconInfoGlyph,
  iconAdd,
};

const directions = {
  bottom: 'Bottom (bottom)',
  top: 'Top (top)',
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

storiesOf('TooltipSimple', module)
  .addDecorator(withKnobs)
  .add(
    'default',
    withInfo({
      text: `
        Tooltips are used to supply additional information to an element when hovering over it. By default,
        the tooltip will render above the element. The example below shows the default scenario.
      `,
    })(() => (
      <div style={{ marginTop: '2rem' }}>
        <TooltipSimple {...props.withIcon()}>
          <p className="bx--tooltip__trigger">Tooltip - hover</p>
        </TooltipSimple>
      </div>
    ))
  )
  .add(
    'no icon',
    withInfo({
      text: `
        Tooltips are used to supply additional information to an element when hovering over it. By default,
        the tooltip will render with an information Icon. The example below shows the option to exclude the Icon.
      `,
    })(() => (
      <div style={{ marginTop: '2rem' }}>
        <TooltipSimple {...props.withoutIcon()}>
          <p className="bx--tooltip__trigger">Tooltip - hover</p>
        </TooltipSimple>
      </div>
    ))
  );
