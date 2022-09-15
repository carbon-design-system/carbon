/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import createVueBindingsFromProps from '../../../.storybook/vue/create-vue-bindings-from-props';
import baseStory, {
  Default as baseDefault,
  SingleButton as baseSingleButton,
  ThreeButtons as baseThreeButtons,
} from './modal-story';
import styles from './modal-story.scss';

const injectStoryStyle = () => {
  const found = document.querySelector('style#modal-story');
  if (!found) {
    const style = document.createElement('style');
    style.textContent = styles.cssText;
    document.head.appendChild(style);
  }
};

export const Default = args => ({
  template: `
    <bx-modal
      :open="open"
      :size="size"
      @bx-modal-beingclosed="handleBeforeClose"
      @bx-modal-closed="handleClose"
    >
      <bx-modal-header>
        <bx-modal-close-button></bx-modal-close-button>
        <bx-modal-label>Label (Optional)</bx-modal-label>
        <bx-modal-heading>Modal Title</bx-modal-heading>
      </bx-modal-header>
      <bx-modal-body><p>Modal text description</p></bx-modal-body>
      <bx-modal-footer>
        <bx-modal-footer-button kind="secondary" data-modal-close>Cancel</bx-modal-footer-button>
        <bx-modal-footer-button kind="primary">Save</bx-modal-footer-button>
      </bx-modal-footer>
    </bx-modal>
  `,
  ...createVueBindingsFromProps(
    (({ disableClose, onBeforeClose, onClose, ...rest }) => ({
      ...rest,
      handleBeforeClose: (event: CustomEvent) => {
        onBeforeClose(event);
        if (disableClose) {
          event.preventDefault();
        }
      },
      handleClose: onClose,
    }))(args?.['bx-modal'])
  ),
  created() {
    injectStoryStyle();
  },
});

Object.assign(Default, baseDefault);

export const SingleButton = args => ({
  ...Default(args),
  template: `
    <bx-modal
      :open="open"
      :size="size"
      @bx-modal-beingclosed="handleBeforeClose"
      @bx-modal-closed="handleClose"
    >
      <bx-modal-header>
        <bx-modal-close-button></bx-modal-close-button>
        <bx-modal-label>Label (Optional)</bx-modal-label>
        <bx-modal-heading>Modal Title</bx-modal-heading>
      </bx-modal-header>
      <bx-modal-body><p>Modal text description</p></bx-modal-body>
      <bx-modal-footer>
        <bx-modal-footer-button kind="primary">Save</bx-modal-footer-button>
      </bx-modal-footer>
    </bx-modal>
  `,
});

Object.assign(SingleButton, baseSingleButton);

export const ThreeButtons = args => ({
  ...Default(args),
  template: `
    <bx-modal
      :open="open"
      :size="size"
      @bx-modal-beingclosed="handleBeforeClose"
      @bx-modal-closed="handleClose"
    >
      <bx-modal-header>
        <bx-modal-close-button></bx-modal-close-button>
        <bx-modal-label>Label (Optional)</bx-modal-label>
        <bx-modal-heading>Modal Title</bx-modal-heading>
      </bx-modal-header>
      <bx-modal-body><p>Modal text description</p></bx-modal-body>
      <bx-modal-footer>
        <bx-modal-footer-button kind="secondary">Apply</bx-modal-footer-button>
        <bx-modal-footer-button kind="secondary" data-modal-close>Cancel</bx-modal-footer-button>
        <bx-modal-footer-button kind="primary">Save</bx-modal-footer-button>
      </bx-modal-footer>
    </bx-modal>
  `,
});

Object.assign(ThreeButtons, baseThreeButtons);

// Creating a shallow clone with spread operator seems to cause
// `Cannot read property 'name' of undefined` error in `@storybook/source-loader`
export default { ...baseStory, decorators: [] };
