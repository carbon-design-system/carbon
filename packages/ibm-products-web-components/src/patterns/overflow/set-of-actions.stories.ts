/**
 * @license
 *
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { generateActions } from '../../../examples/set-of-actions/src/example-data';
import '../../../examples/set-of-actions/src';
import styles from './story-styles.scss?lit';

const argTypes = {
  actionsCount: {
    control: { type: 'number' },
    description: 'Number of actions to display',
  },
  actionSize: {
    control: { type: 'radio' },
    options: ['sm', 'md', 'lg'],
  },
  onClick: { action: 'onClick' },
  orientation: {
    control: { type: 'radio' },
    options: ['horizontal', 'vertical'],
  },
};

const defaultProps = {
  actionsCount: 11,
  actionSize: 'md',
  orientation: 'horizontal',
};

const renderActionsTemplate = (args) => {
  const { actionsCount, actionSize, onClick, orientation } = args;
  const actionsData = generateActions({
    count: actionsCount,
    size: actionSize,
    onClick,
  });

  return html`
    <style>
      ${styles}
    </style>
    <div class="example">
      <div
        class="annotation parent"
        style="height: ${orientation == 'horizontal'
          ? 'unset'
          : 'calc(100vh - 16rem)'}"
      >
        <div class="annotation__label">Parent container</div>
        <div class="annotation__content">
          <set-of-actions
            orientation=${orientation}
            .actionsData=${actionsData}
          ></set-of-actions>
        </div>
      </div>
    </div>
  `;
};

export const SetOfActions = {
  args: {
    ...defaultProps,
  },
  argTypes,
  render: renderActionsTemplate,
};

const meta = {
  title: 'Patterns/Item overflow',
};

export default meta;
