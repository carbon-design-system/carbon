/**
 * Copyright IBM Corp. 2015, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { FeatureFlags, useFeatureFlags } from '../FeatureFlags';
import { Annotation } from '../../../.storybook/templates/Annotation';
import Tag from '../Tag';
import { CheckmarkOutline, CloseOutline } from '@carbon/icons-react';

export default {
  title: 'Getting Started/Feature Flags',
  component: FeatureFlags,
  parameters: {
    controls: { disable: true },
  },
  tags: ['!autodocs'],
};

const ALL_FLAGS = [
  'enable-v12-tile-default-icons',
  'enable-v12-tile-radio-icons',
  'enable-v12-overflowmenu',
  'enable-treeview-controllable',
  'enable-experimental-focus-wrap-without-sentinels',
  'enable-focus-wrap-without-sentinels',
  'enable-dialog-element',
  'enable-v12-dynamic-floating-styles',
  'enable-enhanced-file-uploader',
  'enable-presence',
];

// Reads the current scope and renders active flags as green, overridden-to-false
// flags (present in parent but explicitly turned off here) as red.
function FlagList({ overrides = [] }) {
  const scope = useFeatureFlags();
  const activeFlags = ALL_FLAGS.filter((flag) => scope.enabled(flag));
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.25rem',
        marginBottom: '1rem',
      }}>
      {activeFlags.map((flag) => (
        <Tag key={flag} size="md" type="green" renderIcon={CheckmarkOutline}>
          {flag}
        </Tag>
      ))}
      {overrides.map((flag) => (
        <Tag key={flag} size="md" type="red" renderIcon={CloseOutline}>
          {flag}
        </Tag>
      ))}
    </div>
  );
}

function ScopeView({ label, overrides, children }) {
  return (
    <Annotation type="feature-flags" text={<code>{label}</code>}>
      <FlagList overrides={overrides} />
      {children}
    </Annotation>
  );
}

export const SingleScope = () => (
  <FeatureFlags
    enableDialogElement
    enableFocusWrapWithoutSentinels
    enableV12DynamicFloatingStyles>
    <ScopeView label="<FeatureFlags enableDialogElement enableFocusWrapWithoutSentinels enableV12DynamicFloatingStyles>" />
  </FeatureFlags>
);
SingleScope.storyName = 'Single scope';

export const NestedScopes = () => (
  <FeatureFlags enableV12Overflowmenu>
    <ScopeView label="<FeatureFlags enableV12Overflowmenu>  ← level 1">
      <FeatureFlags enableTreeviewControllable>
        <ScopeView label="<FeatureFlags enableTreeviewControllable>  ← level 2">
          <FeatureFlags enablePresence>
            <ScopeView label="<FeatureFlags enablePresence>  ← level 3" />
          </FeatureFlags>
        </ScopeView>
      </FeatureFlags>
    </ScopeView>
  </FeatureFlags>
);
NestedScopes.storyName = 'Nested scopes';

export const ScopeOverride = () => (
  <FeatureFlags enableV12TileRadioIcons enableDialogElement>
    <ScopeView label="<FeatureFlags enableV12TileRadioIcons enableDialogElement>  ← outer">
      <FeatureFlags enableDialogElement={false}>
        <ScopeView
          label="<FeatureFlags enableDialogElement={false}>  ← inner overrides to false"
          overrides={['enable-dialog-element']}
        />
      </FeatureFlags>
    </ScopeView>
  </FeatureFlags>
);
ScopeOverride.storyName = 'Scope override';
