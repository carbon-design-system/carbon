/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import { CODE_SNIPPET_TYPE } from './code-snippet';
import styles from './code-snippet.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * Skeleton of code snippet.
 */
@customElement(`${prefix}-code-snippet-skeleton`)
class CDSCodeSnippetSkeleton extends LitElement {
  /**
   * The type of code snippet. Corresponds to the attribute with the same name.
   */
  @property({ reflect: true })
  type = CODE_SNIPPET_TYPE.SINGLE;

  render() {
    return html`
      <div class="${prefix}--snippet-container">
        ${this.type !== CODE_SNIPPET_TYPE.MULTI
          ? html` <span></span> `
          : html` <span></span><span></span><span></span> `}
      </div>
    `;
  }

  static styles = styles;
}

export default CDSCodeSnippetSkeleton;
