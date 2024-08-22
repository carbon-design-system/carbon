/**
 * Copyright IBM Corp. 2015, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as GlobalFeatureFlags from '@carbon/feature-flags';
import { render } from '@testing-library/react';
import React from 'react';
import { FeatureFlags, useFeatureFlags, useFeatureFlag } from '../';

describe('FeatureFlags', () => {
  it('should default to the global feature flag scope', () => {
    GlobalFeatureFlags.add('enable-feature-flags-test', true);

    const checkFlags = jest.fn();
    const checkFlag = jest.fn();

    function TestComponent() {
      const featureFlags = useFeatureFlags();
      const featureFlag = useFeatureFlag('enable-feature-flags-test');

      checkFlags(featureFlags.enabled('enable-feature-flags-test'));
      checkFlag(featureFlag);

      return null;
    }

    render(<TestComponent />);

    expect(checkFlags).toHaveBeenLastCalledWith(true);
    expect(checkFlag).toHaveBeenLastCalledWith(true);
  });

  it('should provide access to the feature flags for a scope', () => {
    const checkFlags = jest.fn();
    const checkFlag = jest.fn();

    function TestComponent() {
      const featureFlags = useFeatureFlags();
      const a = useFeatureFlag('a');
      const b = useFeatureFlag('b');

      checkFlags({
        a: featureFlags.enabled('a'),
        b: featureFlags.enabled('b'),
      });

      checkFlag({
        a,
        b,
      });

      return null;
    }

    render(
      <FeatureFlags flags={{ a: true, b: false }}>
        <TestComponent />
      </FeatureFlags>
    );

    expect(checkFlags).toHaveBeenLastCalledWith({
      a: true,
      b: false,
    });
    expect(checkFlag).toHaveBeenLastCalledWith({
      a: true,
      b: false,
    });
  });

  it('should provide access to the feature flags for a scope', () => {
    const checkFlags = jest.fn();
    const checkFlag = jest.fn();

    function TestComponent() {
      const featureFlags = useFeatureFlags();
      const flag1 = useFeatureFlag('enable-v12-overflowmenu');
      const flag2 = useFeatureFlag('enable-treeview-controllable');

      checkFlags({
        enableV12Overflowmenu: featureFlags.enabled('enable-v12-overflowmenu'),
        enableTreeviewControllable: featureFlags.enabled(
          'enable-treeview-controllable'
        ),
      });

      checkFlag({
        enableV12Overflowmenu: flag1,
        enableTreeviewControllable: flag2,
      });

      return null;
    }

    render(
      <FeatureFlags enableV12Overflowmenu enableTreeviewControllable={false}>
        <TestComponent />
      </FeatureFlags>
    );

    expect(checkFlags).toHaveBeenLastCalledWith({
      enableV12Overflowmenu: true,
      enableTreeviewControllable: false,
    });
    expect(checkFlag).toHaveBeenLastCalledWith({
      enableV12Overflowmenu: true,
      enableTreeviewControllable: false,
    });
  });

  it('should re-render when flags change', () => {
    const checkFlags = jest.fn();
    const checkFlag = jest.fn();

    function TestComponent() {
      const featureFlags = useFeatureFlags();
      const a = useFeatureFlag('a');
      const b = useFeatureFlag('b');

      checkFlags({
        a: featureFlags.enabled('a'),
        b: featureFlags.enabled('b'),
      });

      checkFlag({
        a,
        b,
      });

      return null;
    }

    const { rerender } = render(
      <FeatureFlags flags={{ a: true, b: false }}>
        <TestComponent />
      </FeatureFlags>
    );

    expect(checkFlags).toHaveBeenLastCalledWith({
      a: true,
      b: false,
    });
    expect(checkFlag).toHaveBeenLastCalledWith({
      a: true,
      b: false,
    });

    rerender(
      <FeatureFlags flags={{ a: false, b: true }}>
        <TestComponent />
      </FeatureFlags>
    );

    expect(checkFlags).toHaveBeenLastCalledWith({
      a: false,
      b: true,
    });
    expect(checkFlag).toHaveBeenLastCalledWith({
      a: false,
      b: true,
    });
  });

  it('should handle boolean props correctly when no flags object is provided', () => {
    const checkFlags = jest.fn();
    const checkFlag = jest.fn();

    function TestComponent() {
      const featureFlags = useFeatureFlags();
      const enableV12Overflowmenu = useFeatureFlag('enable-v12-overflowmenu');
      const enableTreeviewControllable = useFeatureFlag(
        'enable-treeview-controllable'
      );

      checkFlags({
        enableV12Overflowmenu: featureFlags.enabled('enable-v12-overflowmenu'),
        enableTreeviewControllable: featureFlags.enabled(
          'enable-treeview-controllable'
        ),
      });

      checkFlag({
        enableV12Overflowmenu,
        enableTreeviewControllable,
      });

      return null;
    }

    render(
      <FeatureFlags enableV12Overflowmenu enableTreeviewControllable={false}>
        <TestComponent />
      </FeatureFlags>
    );

    expect(checkFlags).toHaveBeenLastCalledWith({
      enableV12Overflowmenu: true,
      enableTreeviewControllable: false,
    });
    expect(checkFlag).toHaveBeenLastCalledWith({
      enableV12Overflowmenu: true,
      enableTreeviewControllable: false,
    });
  });

  it('should handle boolean props and flags object with no overlapping keys', () => {
    const checkFlags = jest.fn();
    const checkFlag = jest.fn();

    function TestComponent() {
      const featureFlags = useFeatureFlags();
      const enableV12Overflowmenu = useFeatureFlag('enable-v12-overflowmenu');
      const enableExperimentalFocusWrapWithoutSentinels = useFeatureFlag(
        'enable-experimental-focus-wrap-without-sentinels'
      );

      checkFlags({
        enableV12Overflowmenu: featureFlags.enabled('enable-v12-overflowmenu'),
        enableExperimentalFocusWrapWithoutSentinels: featureFlags.enabled(
          'enable-experimental-focus-wrap-without-sentinels'
        ),
      });

      checkFlag({
        enableV12Overflowmenu,
        enableExperimentalFocusWrapWithoutSentinels,
      });

      return null;
    }

    render(
      <FeatureFlags
        flags={{
          'enable-v12-overflowmenu': false,
        }}
        enableExperimentalFocusWrapWithoutSentinels>
        <TestComponent />
      </FeatureFlags>
    );

    expect(checkFlags).toHaveBeenLastCalledWith({
      enableV12Overflowmenu: false,
      enableExperimentalFocusWrapWithoutSentinels: true,
    });
    expect(checkFlag).toHaveBeenLastCalledWith({
      enableV12Overflowmenu: false,
      enableExperimentalFocusWrapWithoutSentinels: true,
    });
  });

  it('should merge scopes and overwrite duplicate keys', () => {
    GlobalFeatureFlags.add('global', true);

    const checkFlag = jest.fn();

    function TestComponent() {
      const global = useFeatureFlag('global');
      const local = useFeatureFlag('local');

      checkFlag({ global, local });

      return null;
    }

    render(
      <FeatureFlags flags={{ local: true }}>
        <TestComponent />
      </FeatureFlags>
    );

    expect(checkFlag).toHaveBeenLastCalledWith({
      global: true,
      local: true,
    });

    render(
      <FeatureFlags flags={{ local: true }}>
        <FeatureFlags flags={{ global: false }}>
          <TestComponent />
        </FeatureFlags>
      </FeatureFlags>
    );

    expect(checkFlag).toHaveBeenLastCalledWith({
      global: false,
      local: true,
    });

    render(
      <FeatureFlags flags={{ local: true }}>
        <FeatureFlags flags={{ global: false }}>
          <FeatureFlags flags={{ local: false }}>
            <TestComponent />
          </FeatureFlags>
        </FeatureFlags>
      </FeatureFlags>
    );

    expect(checkFlag).toHaveBeenLastCalledWith({
      global: false,
      local: false,
    });
  });
});
