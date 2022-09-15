/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { moduleMetadata } from '@storybook/angular';
import baseStory, { Default as baseDefault } from './tabs-story';
import styles from './tabs-story.scss';

export const Default = args => ({
  template: `
    <bx-tabs
      [colorScheme]="colorScheme"
      [triggerContent]="triggerContent"
      [type]="type"
      [value]="value"
      (bx-tabs-beingselected)="handleBeforeSelect($event)"
      (bx-tabs-selected)="handleAfterSelect($event)"
    >
      <bx-tab id="tab-all" target="panel-all" value="all">Option 1</bx-tab>
      <bx-tab id="tab-cloudFoundry" target="panel-cloudFoundry" disabled value="cloudFoundry">Option 2</bx-tab>
      <bx-tab id="tab-staging" target="panel-staging" value="staging">Option 3</bx-tab>
      <bx-tab id="tab-dea" target="panel-dea" value="dea">Option 4</bx-tab>
      <bx-tab id="tab-router" target="panel-router" value="router">Option 5</bx-tab>
    </bx-tabs>
    <div class="bx-ce-demo-devenv--tab-panels">
      <div id="panel-all" role="tabpanel" aria-labelledby="tab-all" hidden>
        <h1>Content for option 1</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>
      <div id="panel-cloudFoundry" role="tabpanel" aria-labelledby="tab-cloudFoundry" hidden>
        <h1>Content for option 2</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>
      <div id="panel-staging" role="tabpanel" aria-labelledby="tab-staging" hidden>
        <h1>Content for option 3</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>
      <div id="panel-dea" role="tabpanel" aria-labelledby="tab-dea" hidden>
        <h1>Content for option 4</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>
      <div id="panel-router" role="tabpanel" aria-labelledby="tab-router" hidden>
        <h1>Content for option 5</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>
    </div>
  `,
  props: (({ disableSelection, onBeforeSelect, onSelect, ...rest }) => {
    const handleBeforeSelect = (event: CustomEvent) => {
      onBeforeSelect(event);
      if (disableSelection) {
        event.preventDefault();
      }
    };
    return {
      ...rest,
      handleBeforeSelect,
      handleAfterSelect: onSelect,
    };
  })(args?.['bx-tabs']),
  styles: [styles.cssText],
});

Object.assign(Default, baseDefault);

export const skeleton = () => ({
  template: `
    <bx-tabs-skeleton>
      <bx-tab-skeleton></bx-tab-skeleton>
      <bx-tab-skeleton></bx-tab-skeleton>
      <bx-tab-skeleton></bx-tab-skeleton>
      <bx-tab-skeleton></bx-tab-skeleton>
      <bx-tab-skeleton></bx-tab-skeleton>
    </bx-tabs-skeleton>
  `,
});

export default Object.assign(baseStory, {
  decorators: [
    moduleMetadata({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }),
  ],
});
