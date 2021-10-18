/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { settings } from 'carbon-components';
import {
  withKnobs,
  select,
  text,
  number,
  boolean,
} from '@storybook/addon-knobs';
import Tooltip from '../Tooltip';
import { Tooltip as OGTooltip } from './Tooltip';
import Button from '../Button';
import { OverflowMenuVertical16 } from '@carbon/icons-react';
import mdx from './Tooltip.mdx';

const { prefix } = settings;
const directions = {
  'Bottom (bottom)': 'bottom',
  'Left (left)': 'left',
  'Top (top)': 'top',
  'Right (right)': 'right',
};
const alignments = {
  'Start (start)': 'start',
  'Center (center)': 'center',
  'End (end)': 'end',
};

const props = {
  withIcon: () => ({
    align: select('Tooltip alignment (align)', alignments, 'center'),
    direction: select('Tooltip direction (direction)', directions, 'bottom'),
    triggerText: text('Trigger text (triggerText)', 'Tooltip label'),
    tabIndex: number('Tab index (tabIndex in <Tooltip>)', 0),
    selectorPrimaryFocus: text(
      'Primary focus element selector (selectorPrimaryFocus)',
      ''
    ),
  }),
  autoOrientation: () => ({
    align: select('Tooltip alignment (align)', alignments, 'center'),
    direction: select('Tooltip direction (direction)', directions, 'bottom'),
    triggerText: text('Trigger text (triggerText)', 'Test'),
    tabIndex: number('Tab index (tabIndex in <Tooltip>)', 0),
    selectorPrimaryFocus: text(
      'Primary focus element selector (selectorPrimaryFocus)',
      ''
    ),
    autoOrientation: boolean('Auto orientation', true),
  }),
  withoutIcon: () => ({
    showIcon: false,
    align: select('Tooltip alignment (align)', alignments, 'center'),
    direction: select('Tooltip direction (direction)', directions, 'bottom'),
    triggerText: text('Trigger text (triggerText)', 'Tooltip label'),
    tabIndex: number('Tab index (tabIndex in <Tooltip>)', 0),
    selectorPrimaryFocus: text(
      'Primary focus element selector (selectorPrimaryFocus)',
      ''
    ),
  }),
  customIcon: () => ({
    showIcon: true,
    align: select('Tooltip alignment (align)', alignments, 'center'),
    direction: select('Tooltip direction (direction)', directions, 'bottom'),
    triggerText: text('Trigger text (triggerText)', 'Tooltip label'),
    tabIndex: number('Tab index (tabIndex in <Tooltip>)', 0),
    selectorPrimaryFocus: text(
      'Primary focus element selector (selectorPrimaryFocus)',
      ''
    ),
    // eslint-disable-next-line react/display-name
    renderIcon: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">
        <path d="M8.5 11V6.5h-2v1h1V11H6v1h4v-1zM8 3.5c-.4 0-.8.3-.8.8s.4.7.8.7.8-.3.8-.8-.4-.7-.8-.7z" />
        <path d="M8 15c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7zM8 2C4.7 2 2 4.7 2 8s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6z" />
        <path fill="none" d="M0 0h16v16H0z" />
      </svg>
    ),
  }),
  customIconOnly: () => ({
    showIcon: true,
    align: select('Tooltip alignment (align)', alignments, 'center'),
    direction: select('Tooltip direction (direction)', directions, 'bottom'),
    iconDescription: 'Helpful Information',
    tabIndex: number('Tab index (tabIndex in <Tooltip>)', 0),
    selectorPrimaryFocus: text(
      'Primary focus element selector (selectorPrimaryFocus)',
      ''
    ),
    renderIcon: OverflowMenuVertical16,
  }),
};

const containerStyles = {
  height: 'calc(100vh - 6rem)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

Tooltip.displayName = 'Tooltip';

function UncontrolledTooltipExample() {
  const [value, setValue] = useState(true);
  return (
    <>
      <Button
        style={{ padding: '15px 20px', margin: '4px 20px' }}
        onClick={() => setValue(false)}>
        Hide
      </Button>
      <Button
        style={{ padding: '15px 20px', margin: '4px 20px' }}
        onClick={() => setValue(true)}>
        Show
      </Button>
      <div style={{ padding: '15px', margin: '4px 20px' }}>
        <Tooltip
          {...{
            ...props.withoutIcon(),
            focusTrap: boolean('Focus trap (focusTrap)', true),
          }}
          triggerText={<div>My text wrapped with tooltip</div>}
          open={value}>
          <p id="tooltip-body">
            This is some tooltip text. This box shows the maximum amount of text
            that should appear inside. If more room is needed please use a modal
            instead.
          </p>
          <div className={`${prefix}--tooltip__footer`}>
            <a href="/" className={`${prefix}--link`}>
              Learn More
            </a>
            <Button size="small">Create</Button>
          </div>
        </Tooltip>
      </div>
    </>
  );
}

export default {
  title: 'Components/Tooltip',
  component: OGTooltip,
  decorators: [withKnobs],

  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const DefaultBottom = () => (
  <div style={containerStyles}>
    <Tooltip {...props.withIcon()} tooltipBodyId="tooltip-body">
      <p id="tooltip-body">
        This is some tooltip text. This box shows the maximum amount of text
        that should appear inside. If more room is needed please use a modal
        instead.
      </p>
      <div className={`${prefix}--tooltip__footer`}>
        <a href="/" className={`${prefix}--link`}>
          Learn More
        </a>
        <Button size="small">Create</Button>
      </div>
    </Tooltip>
  </div>
);

DefaultBottom.storyName = 'default (bottom)';

DefaultBottom.parameters = {
  info: {
    text: `
        Interactive tooltip should be used if there are actions a user can take in the tooltip (e.g. a link or a button).
        For more regular use case, e.g. giving the user more text information about something, use definition tooltip or icon tooltip.
        By default, the tooltip will render above the element. The example below shows the default scenario.
      `,
  },
};

export const AutoOrientation = () => (
  <div
    style={{
      ...containerStyles,
      justifyContent: 'unset',
      alignItems: 'unset',
      flexWrap: 'wrap',
    }}>
    {/* Top Left */}
    <div style={{ flex: '50%' }}>
      <Tooltip {...props.autoOrientation()} tooltipBodyId="tooltip-body">
        <p id="tooltip-body">
          This is some tooltip text. This box shows the maximum amount of text
          that should appear inside. If more room is needed please use a modal
          instead.
        </p>
        <div className={`${prefix}--tooltip__footer`}>
          <a href="/" className={`${prefix}--link`}>
            Learn More
          </a>
          <Button size="small">Create</Button>
        </div>
      </Tooltip>
    </div>
    {/* Top Right */}
    <div style={{ flex: '50%', textAlign: 'right' }}>
      <Tooltip {...props.autoOrientation()} tooltipBodyId="tooltip-body">
        <p id="tooltip-body">
          This is some tooltip text. This box shows the maximum amount of text
          that should appear inside. If more room is needed please use a modal
          instead.
        </p>
        <div className={`${prefix}--tooltip__footer`}>
          <a href="/" className={`${prefix}--link`}>
            Learn More
          </a>
          <Button size="small">Create</Button>
        </div>
      </Tooltip>
    </div>
    {/* Bottom Left */}
    <div style={{ flex: '50%', marginTop: 'auto' }}>
      <Tooltip {...props.autoOrientation()} tooltipBodyId="tooltip-body">
        <p id="tooltip-body">
          This is some tooltip text. This box shows the maximum amount of text
          that should appear inside. If more room is needed please use a modal
          instead.
        </p>
        <div className={`${prefix}--tooltip__footer`}>
          <a href="/" className={`${prefix}--link`}>
            Learn More
          </a>
          <Button size="small">Create</Button>
        </div>
      </Tooltip>
    </div>
    {/* Bottom Right */}
    <div style={{ flex: '50%', textAlign: 'right', marginTop: 'auto' }}>
      <Tooltip {...props.autoOrientation()} tooltipBodyId="tooltip-body">
        <p id="tooltip-body">
          This is some tooltip text. This box shows the maximum amount of text
          that should appear inside. If more room is needed please use a modal
          instead.
        </p>
        <div className={`${prefix}--tooltip__footer`}>
          <a href="/" className={`${prefix}--link`}>
            Learn More
          </a>
          <Button size="small">Create</Button>
        </div>
      </Tooltip>
    </div>
  </div>
);

AutoOrientation.storyName = 'auto orientation';

AutoOrientation.parameters = {
  info: {
    text: `
        Interactive tooltip should be used if there are actions a user can take in the tooltip (e.g. a link or a button).
        For more regular use case, e.g. giving the user more text information about something, use definition tooltip or icon tooltip.
        By default, the tooltip will render above the element. The example below shows the default scenario.
      `,
  },
};

export const NoIcon = () => (
  <div style={containerStyles}>
    <Tooltip {...props.withoutIcon()}>
      <p>
        This is some tooltip text. This box shows the maximum amount of text
        that should appear inside. If more room is needed please use a modal
        instead.
      </p>
      <div className={`${prefix}--tooltip__footer`}>
        <a href="/" className={`${prefix}--link`}>
          Learn More
        </a>
        <Button size="small">Create</Button>
      </div>
    </Tooltip>
  </div>
);

NoIcon.storyName = 'no icon';

NoIcon.parameters = {
  info: {
    text: `
        Interactive tooltip should be used if there are actions a user can take in the tooltip (e.g. a link or a button).
        For more regular use case, e.g. giving the user more text information about something, use definition tooltip or icon tooltip.
        By default, the tooltip will render with an information Icon. The example below shows the option to exclude the Icon.
      `,
  },
};

export const RenderCustomIcon = () => (
  <div style={containerStyles}>
    <Tooltip {...props.customIcon()}>
      <p>
        This is some tooltip text. This box shows the maximum amount of text
        that should appear inside. If more room is needed please use a modal
        instead.
      </p>
      <div className={`${prefix}--tooltip__footer`}>
        <a href="/" className={`${prefix}--link`}>
          Learn More
        </a>
        <Button size="small">Create</Button>
      </div>
    </Tooltip>
  </div>
);

RenderCustomIcon.storyName = 'render custom icon';

RenderCustomIcon.parameters = {
  info: {
    text: `
        Interactive tooltip should be used if there are actions a user can take in the tooltip (e.g. a link or a button).
        For more regular use case, e.g. giving the user more text information about something, use definition tooltip or icon tooltip.
        By default, the tooltip will render with an information Icon. The example below shows the option to exclude the Icon.
      `,
  },
};

export const OnlyCustomIcon = () => (
  <div style={containerStyles}>
    <Tooltip {...props.customIconOnly()}>
      <p>
        This is some tooltip text. This box shows the maximum amount of text
        that should appear inside. If more room is needed please use a modal
        instead.
      </p>
      <div className={`${prefix}--tooltip__footer`}>
        <a href="/" className={`${prefix}--link`}>
          Learn More
        </a>
        <Button size="small">Create</Button>
      </div>
    </Tooltip>
  </div>
);

OnlyCustomIcon.storyName = 'only custom icon';

OnlyCustomIcon.parameters = {
  info: {
    text: `
        Interactive tooltip should be used if there are actions a user can take in the tooltip (e.g. a link or a button).
        For more regular use case, e.g. giving the user more text information about something, use definition tooltip or icon tooltip.
        By default, the tooltip will render with an information Icon. The example below shows the option to exclude the Icon.
      `,
  },
};

export const UncontrolledTooltip = () => <UncontrolledTooltipExample />;

UncontrolledTooltip.storyName = 'uncontrolled tooltip';
