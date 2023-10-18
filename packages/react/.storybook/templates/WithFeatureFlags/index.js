/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import LinkTo from '@storybook/addon-links/react';

import { FeatureFlags as FeatureFlagScope } from '@carbon/feature-flags';
import { FeatureFlags } from '../../../src/components/FeatureFlags';

import { Annotation } from '../Annotation';

const allFlagsEnabled = Object.fromEntries(
  Array.from(FeatureFlagScope.flags.keys()).map((k) => [k, true])
);

function WithFeatureFlags({ children }) {
  return (
    <FeatureFlags flags={allFlagsEnabled}>
      <Annotation
        type="feature-flags"
        text={
          <span>
            This story is rendered with{' '}
            <LinkTo title="Experimental/Feature Flags" name="Overview">
              all available feature flags
            </LinkTo>{' '}
            enabled
          </span>
        }>
        {children}
      </Annotation>
    </FeatureFlags>
  );
}

WithFeatureFlags.propTypes = {
  /**
   * The story to be rendered with the provided feature flags.
   */
  children: PropTypes.node,

  /**
   * Provide the feature flags to enabled or disabled in the current React tree
   */
  flags: PropTypes.objectOf(PropTypes.bool),
};

export { WithFeatureFlags };
