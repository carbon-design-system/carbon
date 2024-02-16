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
import styles from './skeleton-placeholder.scss';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * Skeleton placeholder.
 *
 * @element cds-skeleton-placeholder
 */
@customElement(`${prefix}-skeleton-placeholder`)
class CDSSkeletonPlaceholder extends LitElement {
  /**
   * Specify optional classes to be added to your SkeletonText
   */
  @property({ reflect: true, attribute: 'optional-classes' })
  optionalClasses;

  render() {
    let defaultClasses = {
      [`${prefix}--skeleton__placeholder`]: true,
    };

    if (this.optionalClasses) {
      const outputObject = {};
      this.optionalClasses?.split(' ').forEach((element) => {
        outputObject[element] = true;
      });
      defaultClasses = { ...defaultClasses, ...outputObject };
    }
    const classes = classMap(defaultClasses);

    return html` <div class="${classes}"></div> `;
  }

  static styles = styles;
}

export default CDSSkeletonPlaceholder;
