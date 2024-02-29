/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import './index';
import storyDocs from './chat-button-story.mdx';
import Add16 from '@carbon/icons/lib/add/16';
import styles from './chat-button-story.scss';

export const Default = () => {
  return html`
    <style>
      ${styles}
    </style>
    <div class="test-button">
      <div class="test-button-sizes">
        <h3>Sizes</h3>
        <br />
        <cds-chat-button size="sm">
          Primary ${Add16({ slot: 'icon' })}
        </cds-chat-button>
        <cds-chat-button size="md">
          Primary ${Add16({ slot: 'icon' })}
        </cds-chat-button>
        <cds-chat-button size="lg">
          Primary ${Add16({ slot: 'icon' })}
        </cds-chat-button>
        <br />
        <br />
        <cds-chat-button size="sm"> Primary </cds-chat-button>
        <cds-chat-button size="md"> Primary </cds-chat-button>
        <cds-chat-button size="lg"> Primary </cds-chat-button>
      </div>
      <div class="test-button-kinds">
        <h3>Kinds</h3>
        <br />
        <cds-chat-button kind="primary">
          Primary ${Add16({ slot: 'icon' })}
        </cds-chat-button>
        <cds-chat-button kind="secondary">
          Secondary ${Add16({ slot: 'icon' })}
        </cds-chat-button>
        <cds-chat-button kind="tertiary">
          Tertiary ${Add16({ slot: 'icon' })}
        </cds-chat-button>
        <cds-chat-button kind="ghost">
          Ghost ${Add16({ slot: 'icon' })}
        </cds-chat-button>
        <cds-chat-button kind="danger">
          Danger ${Add16({ slot: 'icon' })}
        </cds-chat-button>
        <br />
        <br />
        <cds-chat-button kind="primary"> Primary </cds-chat-button>
        <cds-chat-button kind="secondary"> Secondary </cds-chat-button>
        <cds-chat-button kind="tertiary"> Tertiary </cds-chat-button>
        <cds-chat-button kind="ghost"> Ghost </cds-chat-button>
        <cds-chat-button kind="danger"> Danger </cds-chat-button>
      </div>
      <div class="test-button-quick-action">
        <h3>Quick action</h3>
        <br />
        <cds-chat-button is-quick-action>
          Quick action ${Add16({ slot: 'icon' })}
        </cds-chat-button>
        <cds-chat-button is-quick-action is-selected>
          Selected and Enabled ${Add16({ slot: 'icon' })}
        </cds-chat-button>
        <cds-chat-button is-quick-action is-selected disabled>
          Selected and disabled ${Add16({ slot: 'icon' })}
        </cds-chat-button>
        <cds-chat-button is-quick-action disabled>
          Disabled ${Add16({ slot: 'icon' })}
        </cds-chat-button>
        <br />
        <br />
        <cds-chat-button is-quick-action> Quick action </cds-chat-button>
        <cds-chat-button is-quick-action is-selected>
          Selected and Enabled
        </cds-chat-button>
        <cds-chat-button is-quick-action is-selected disabled>
          Selected and disabled
        </cds-chat-button>
        <cds-chat-button is-quick-action disabled> Disabled </cds-chat-button>
      </div>
      <div class="test-button-skeleton">
        <h3>Skeleton</h3>
        <br />
        <cds-chat-button-skeleton size="sm"></cds-chat-button-skeleton>
        <cds-chat-button-skeleton size="md"></cds-chat-button-skeleton>
        <cds-chat-button-skeleton size="lg"></cds-chat-button-skeleton>
      </div>
    </div>
  `;
};

export default {
  parameters: {
    ...storyDocs.parameters,
  },
  title: 'Experimental/Chat button',
  decorators: [(story) => html` ${story()} `],
};
