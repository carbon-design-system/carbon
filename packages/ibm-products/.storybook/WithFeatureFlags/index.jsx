/**
 * Copyright IBM Corp. 2024, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import LinkTo from '@storybook/addon-links/react';

import { FeatureFlags } from '../../src/components/FeatureFlags';
import { Annotation } from '../Annotation';

function WithFeatureFlags({ flags, children, ...rest }) {
  const props = Object.values(rest).reduce((acc, key) => {
    acc[key] = true;
    return acc;
  }, {}); // new way of setting props on feature flag
  const merged = { ...props, ...flags };

  return (
    <FeatureFlags {...props} flags={flags}>
      <Annotation
        type="feature-flags"
        text={
          <span>
            This story is rendered with{' '}
            <LinkTo title="IBM Products/Components/FeatureFlags" name="Docs">
              {Object.keys(merged).length === 0
                ? 'all available feature flags'
                : Object.keys(merged).map((key, index) => {
                    return Object.keys(merged).length > 1
                      ? index === Object.keys(merged).length - 1
                        ? key
                        : `${key}, `
                      : key;
                  })}
            </LinkTo>{' '}
            enabled
          </span>
        }
      >
        {children}
      </Annotation>
    </FeatureFlags>
  );
}

WithFeatureFlags.propTypes = {
  children: PropTypes.node,
};
export { WithFeatureFlags };
