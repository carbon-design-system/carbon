/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit/directives/class-map.js';
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import { LOADING_TYPE } from './defs';
import getLoadingIcon from './loading-icon';
import styles from './loading.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * Spinner indicating loading state.
 *
 * @element cds-loading
 */

@customElement(`${prefix}-loading`)
class CDSLoading extends LitElement {
  /**
   * @deprecated
   * The 'assistive-text' property will be deprecated in the next major release. Please use `description` instead.
   */
  @property({ attribute: 'assistive-text' })
  get assistiveText() {
    return this.description;
  }
  set assistiveText(value) {
    this.description = value;
  }

  /**
   * Specify a description that would be used to best describe the loading state
   */
  @property({ reflect: true })
  description = 'Loading';

  /**
   *
   * @deprecated The 'type' property will be deprecated in the next major release. Please use `small` instead.
   */
  @property()
  get type() {
    return this.small ? LOADING_TYPE.SMALL : LOADING_TYPE.REGULAR;
  }
  set type(value) {
    this.small = value == LOADING_TYPE.SMALL;
  }

  /**
   * Specify whether you would like the small variant of <Loading>
   */
  @property({ type: Boolean, reflect: true })
  small = false;

  /**
   * `true` if overlay should be applied.
   */
  @property({ type: Boolean, reflect: true })
  overlay = false;

  /**
   *
   * @deprecated
   * The 'inactive' property will be deprecated in the next major release. Please use `active` instead.
   */
  @property({ type: Boolean, reflect: true })
  get inactive(): boolean {
    return !this.active;
  }

  set inactive(value: boolean) {
    this.active = !value;
  }

  /**
   * Specify whether you want the loading indicator to be spinning or not
   */
  @property({ type: Boolean, reflect: true })
  active = false;

  render() {
    const { active, description, small, overlay } = this;

    const innerClasses = classMap({
      [`${prefix}--loading`]: true,
      [`${prefix}--loading--stop`]: !active,
      [`${prefix}--loading--small`]: small,
    });
    const icon = getLoadingIcon({ description, small });
    return overlay ? html`<div class="${innerClasses}">${icon}</div>` : icon;
  }

  static styles = styles;
}

export { LOADING_TYPE };

export default CDSLoading;
