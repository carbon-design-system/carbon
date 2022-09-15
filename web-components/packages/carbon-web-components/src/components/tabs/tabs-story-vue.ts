/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import createVueBindingsFromProps from '../../../.storybook/vue/create-vue-bindings-from-props';
import { Default as baseDefault } from './tabs-story';
import styles from './tabs-story.scss';

export { default } from './tabs-story';

const injectStoryStyle = () => {
  const found = document.querySelector('style#tabs-story');
  if (!found) {
    const style = document.createElement('style');
    style.id = 'tabs-story';
    style.textContent = styles.cssText;
    document.head.appendChild(style);
  }
};

export const Default = args => {
  const props = (({ onBeforeSelect, onSelect, ...rest }) => {
    function handleBeforeSelect(this: any, event: CustomEvent) {
      onBeforeSelect(event);
      // NOTE: Using class property ref instead of closure ref (from `original`)
      // because updating event handlers via Storybook Vue `methods` (upon knob update) does not seem to work
      if (this.disableSelection) {
        event.preventDefault();
      }
    }
    return {
      ...rest,
      handleBeforeSelect,
      handleAfterSelect: onSelect,
    };
  })(args?.['bx-tabs']);
  return {
    template: `
      <div>
        <bx-tabs
          :color-scheme="colorScheme"
          :trigger-content="triggerContent"
          :type="type"
          :value="value"
          @bx-tabs-beingselected="handleBeforeSelect"
          @bx-tabs-selected="handleAfterSelect"
        >
          <bx-tab target="panel-all" value="all">Option 1</bx-tab>
          <bx-tab target="panel-cloudFoundry" value="cloudFoundry" disabled>Option 2</bx-tab>
          <bx-tab target="panel-staging" value="staging">Option 3</bx-tab>
          <bx-tab target="panel-dea" value="dea">Option 4</bx-tab>
          <bx-tab target="panel-router" value="router">Option 5</bx-tab>
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
      </div>
    `,
    ...createVueBindingsFromProps(props),
    created() {
      injectStoryStyle();
    },
  };
};

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
