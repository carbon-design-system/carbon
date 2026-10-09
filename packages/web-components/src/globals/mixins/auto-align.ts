/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { LitElement } from 'lit';
import { isFeatureFlagEnabled } from '../../components/feature-flags';

const attribute = 'autoalign';

/**
 * @param Base The base class.
 * @param property The name of the element's auto-align property.
 * @returns A mix-in that resolves the default value of the auto-align property and lets the `autoalign` attribute opt out of it.
 */
const AutoAlignMixin = <T extends Constructor<LitElement>>(
  Base: T,
  property = 'autoalign'
): {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new (...args: any[]): {
    connectedCallback(): void;
    attributeChangedCallback(
      name: string,
      old: string | null,
      value: string | null
    ): void;
  };
} & T => {
  /**
   * A mix-in class that resolves the default value of the auto-align property and lets the `autoalign` attribute opt out of it.
   */
  class AutoAlignMixinImpl extends Base {
    connectedCallback() {
      super.connectedCallback();
      // A value set through the attribute or the property always wins. When
      // neither is set, the `enable-v12-autoalign` feature flag decides.
      const host = this as unknown as Record<string, boolean | undefined>;
      host[property] ??= isFeatureFlagEnabled('enable-v12-autoalign', this);
    }

    attributeChangedCallback(
      name: string,
      old: string | null,
      value: string | null
    ) {
      // A boolean attribute can only express `true`, which leaves markup with
      // no way to turn off a default that is on. Treat `autoalign="false"` as
      // that opt-out. The attribute is removed instead of kept, because styles
      // and scripts select on its presence (`[autoalign]`, `:not([autoalign])`)
      // and removing it sets the property to `false`.
      if (name === attribute && value === 'false') {
        this.removeAttribute(attribute);
        return;
      }
      super.attributeChangedCallback(name, old, value);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return AutoAlignMixinImpl as any;
};

export default AutoAlignMixin;
