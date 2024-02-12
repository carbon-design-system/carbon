/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit/directives/class-map.js';
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import { CHAT_BUTTON_SIZE } from './defs';
import styles from './chat-button.scss';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

export { CHAT_BUTTON_SIZE };
/**
 * Chat button skeleton.
 *
 * @element cds-chat-button-skeleton
 */
@customElement(`${prefix}-chat-button-skeleton`)
class CDSChatButtonSkeleton extends LitElement {
  /**
   * Specify the size of the `ChatButtonSkeleton`, from the following list of sizes: 'sm', 'md', 'lg'
   */
  @property({ reflect: true })
  size = CHAT_BUTTON_SIZE.LARGE;

  render() {
    const skeletonClasses = classMap({
      [`${prefix}--skeleton`]: true,
      [`${prefix}--btn`]: true,
      [`${prefix}--chat-btn`]: true,
      [`${prefix}--layout--size-${this.size}`]: this.size,
    });

    return html` <div class="${skeletonClasses}"></div> `;
  }

  static styles = styles;
}

export default CDSChatButtonSkeleton;
