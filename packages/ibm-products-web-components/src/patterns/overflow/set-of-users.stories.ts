/**
 * @license
 *
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { generateUsers } from '../../../examples/set-of-users/src/example-data';
import '../../../examples/set-of-users/src';
import styles from './story-styles.scss?lit';

const argTypes = {
  usersCount: {
    control: { type: 'number' },
    description: 'Number of users avatars to display',
  },
  userSize: {
    control: { type: 'radio' },
    options: ['sm', 'md', 'lg', 'xl'],
  },
  condensed: { control: { type: 'boolean' } },
};

const defaultProps = {
  usersCount: 20,
  userSize: 'md',
  condensed: false,
};

const renderUsersTemplate = (args, { globals }) => {
  const { usersCount, userSize, condensed } = args;
  const usersData = generateUsers({
    count: usersCount,
    size: userSize,
  });

  const theme = ['white', 'g10'].includes(globals.theme) ? 'light' : 'dark';

  return html`
    <style>
      ${styles}
    </style>
    <div class="example">
      <div class="annotation parent">
        <div class="annotation__label">Parent container</div>
        <div class="annotation__content">
          <set-of-users
            theme=${theme}
            ?condensed=${condensed}
            .usersData=${usersData}
          ></set-of-users>
        </div>
      </div>
    </div>
  `;
};

export const SetOfUsers = {
  args: {
    ...defaultProps,
  },
  argTypes,
  render: renderUsersTemplate,
};

const meta = {
  title: 'Patterns/Item overflow',
};

export default meta;
