/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { settings } from 'carbon-components';
import { withKnobs, select, text, number } from '@storybook/addon-knobs';
import Tooltip from '../Tooltip';
import Button from '../Button';
import { OverflowMenuVertical16 } from '@carbon/icons-react';

const { prefix } = settings;
const directions = {
  'Bottom (bottom)': 'bottom',
  'Left (left)': 'left',
  'Top (top)': 'top',
  'Right (right)': 'right',
};
const props = {
  withIcon: () => ({
    direction: select('Tooltip direction (direction)', directions, 'bottom'),
    triggerText: text('Trigger text (triggerText)', 'Tooltip label'),
    tabIndex: number('Tab index (tabIndex in <Tooltip>)', 0),
  }),
  withoutIcon: () => ({
    showIcon: false,
    direction: select('Tooltip direction (direction)', directions, 'bottom'),
    triggerText: text('Trigger text (triggerText)', 'Tooltip label'),
    tabIndex: number('Tab index (tabIndex in <Tooltip>)', 0),
  }),
  customIcon: () => ({
    showIcon: true,
    direction: select('Tooltip direction (direction)', directions, 'bottom'),
    triggerText: text('Trigger text (triggerText)', 'Tooltip label'),
    tabIndex: number('Tab index (tabIndex in <Tooltip>)', 0),
    renderIcon: React.forwardRef((props, ref) => (
      <div ref={ref}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">
          <path d="M8.5 11V6.5h-2v1h1V11H6v1h4v-1zM8 3.5c-.4 0-.8.3-.8.8s.4.7.8.7.8-.3.8-.8-.4-.7-.8-.7z" />
          <path d="M8 15c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7zM8 2C4.7 2 2 4.7 2 8s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6z" />
          <path fill="none" d="M0 0h16v16H0z" />
        </svg>
      </div>
    )),
  }),
  customIconOnly: () => ({
    showIcon: true,
    direction: select('Tooltip direction (direction)', directions, 'bottom'),
    iconDescription: 'Helpful Information',
    tabIndex: number('Tab index (tabIndex in <Tooltip>)', 0),
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
          triggerText={<div>My text wrapped with tooltip</div>}
          open={value}
          showIcon={false}>
          Some text
        </Tooltip>
      </div>
    </>
  );
}

storiesOf('Tooltip', module)
  .addDecorator(withKnobs)
  .add(
    'default (bottom)',
    () => (
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
    ),
    {
      info: {
        text: `
            Interactive tooltip should be used if there are actions a user can take in the tooltip (e.g. a link or a button).
            For more regular use case, e.g. giving the user more text information about something, use definition tooltip or icon tooltip.
            By default, the tooltip will render above the element. The example below shows the default scenario.
          `,
      },
    }
  )
  .add(
    'no icon',
    () => (
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
    ),
    {
      info: {
        text: `
            Interactive tooltip should be used if there are actions a user can take in the tooltip (e.g. a link or a button).
            For more regular use case, e.g. giving the user more text information about something, use definition tooltip or icon tooltip.
            By default, the tooltip will render with an information Icon. The example below shows the option to exclude the Icon.
          `,
      },
    }
  )
  .add(
    'render custom icon',
    () => (
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
    ),
    {
      info: {
        text: `
            Interactive tooltip should be used if there are actions a user can take in the tooltip (e.g. a link or a button).
            For more regular use case, e.g. giving the user more text information about something, use definition tooltip or icon tooltip.
            By default, the tooltip will render with an information Icon. The example below shows the option to exclude the Icon.
          `,
      },
    }
  )
  .add(
    'only custom icon',
    () => (
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
    ),
    {
      info: {
        text: `
            Interactive tooltip should be used if there are actions a user can take in the tooltip (e.g. a link or a button).
            For more regular use case, e.g. giving the user more text information about something, use definition tooltip or icon tooltip.
            By default, the tooltip will render with an information Icon. The example below shows the option to exclude the Icon.
          `,
      },
    }
  )
  .add('uncontrolled tooltip', () => <UncontrolledTooltipExample />);
