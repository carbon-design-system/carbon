/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ReactiveController, ReactiveControllerHost } from 'lit';
import { isFeatureFlagEnabled } from '../../components/feature-flags';

/**
 * Lit property converter for `autoalign`. Unlike the default boolean
 * converter, `autoalign="false"` resolves to `false` so consumers can opt out
 * when the `enable-v12-autoalign` feature flag is on.
 */
export const autoAlignConverter = {
  fromAttribute: (value: string | null) => value !== null && value !== 'false',
};

/**
 * Applies the `enable-v12-autoalign` feature flag as the default value of a
 * component's auto-align property. A value set explicitly through the
 * attribute or property always takes precedence.
 */
export class AutoAlignController implements ReactiveController {
  constructor(
    private host: ReactiveControllerHost & HTMLElement,
    private property: string = 'autoalign'
  ) {
    host.addController(this);
  }

  hostConnected() {
    const host = this.host as unknown as Record<string, unknown>;
    if (host[this.property] === undefined) {
      host[this.property] = isFeatureFlagEnabled(
        'enable-v12-autoalign',
        this.host
      );
    }
  }
}
