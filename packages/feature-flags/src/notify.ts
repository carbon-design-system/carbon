/**
 * Copyright IBM Corp. 2015, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { isV12Flag, v12ReleaseFlag } from './FeatureFlagScope';
import { featureFlagInfo } from './generated/feature-flags';

const descriptions = new Map<string, string>(
  featureFlagInfo.map(({ name, description }) => [name, description])
);

// Flags that have already been reported, so that a flag checked on every render
// only produces a single notice per session.
const notified = new Set<string>();

/**
 * Log a one-time notice that a v12 feature flag is available but not enabled.
 *
 * A v12 flag becomes the default behavior in v12, so a consumer on v11 is opted
 * out of a change they will eventually receive regardless. Surfacing it lets
 * them preview and migrate on their own schedule instead of absorbing it all at
 * the major release.
 *
 * Only v12 flags are reported. Other flags are opt-in indefinitely and have no
 * deadline attached, so announcing them would be noise.
 *
 * Callers are responsible for restricting this to development. This package is
 * bundled with `process.env.NODE_ENV` inlined at publish time, so a guard here
 * would be resolved once when the package is built rather than by the
 * consumer's bundler. The framework packages guard at their call sites, where
 * `process.env.NODE_ENV` survives for the consumer to replace.
 *
 * @param name - The flag that was checked.
 * @param enabled - Whether the flag resolved to enabled.
 */
export const notifyAvailableFlag = (name: string, enabled: boolean) => {
  if (enabled || !isV12Flag(name) || notified.has(name)) {
    return;
  }

  notified.add(name);

  const description = descriptions.get(name)?.trim();

  // eslint-disable-next-line no-console
  console.info(
    `[@carbon/feature-flags] \`${name}\` is available but not enabled.` +
      (description ? `\n${description}` : '') +
      `\nThis becomes the default behavior in v12. Enable it to migrate early, ` +
      `or enable \`${v12ReleaseFlag}\` to turn on every v12 flag at once.`
  );
};
