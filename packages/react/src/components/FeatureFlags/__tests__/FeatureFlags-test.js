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
  it('should provide access to the feature flags for a scope through deprecated flags prop', () => {
    consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
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
    consoleSpy.mockRestore();
  });

  it('should provide access to the feature flags for a scope', () => {
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
      <FeatureFlags enableV12Overflowmenu>
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

    const { rerender } = render(
      <FeatureFlags enableV12Overflowmenu>
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

    rerender(
      <FeatureFlags enableTreeviewControllable>
        <TestComponent />
      </FeatureFlags>
    );

    expect(checkFlags).toHaveBeenLastCalledWith({
      enableV12Overflowmenu: false,
      enableTreeviewControllable: true,
    });
    expect(checkFlag).toHaveBeenLastCalledWith({
      enableV12Overflowmenu: false,
      enableTreeviewControllable: true,
    });
  });

  it('should merge scopes and overwrite duplicate keys', () => {
    const checkFlag = jest.fn();

    function TestComponent() {
      const enableV12Overflowmenu = useFeatureFlag('enable-v12-overflowmenu');
      const enableTreeviewControllable = useFeatureFlag(
        'enable-treeview-controllable'
      );

      checkFlag({ enableV12Overflowmenu, enableTreeviewControllable });

      return null;
    }

    render(
      <FeatureFlags enableTreeviewControllable>
        <TestComponent />
      </FeatureFlags>
    );

    expect(checkFlag).toHaveBeenLastCalledWith({
      enableV12Overflowmenu: false,
      enableTreeviewControllable: true,
    });

    render(
      <FeatureFlags enableTreeviewControllable>
        <FeatureFlags enableV12Overflowmenu>
          <TestComponent />
        </FeatureFlags>
      </FeatureFlags>
    );

    expect(checkFlag).toHaveBeenLastCalledWith({
      enableV12Overflowmenu: true,
      enableTreeviewControllable: false,
    });

    render(
      <FeatureFlags enableTreeviewControllable>
        <FeatureFlags enableV12Overflowmenu>
          <FeatureFlags
            enableTreeviewControllable={false}
            enableV12Overflowmenu={false}>
            <TestComponent />
          </FeatureFlags>
        </FeatureFlags>
      </FeatureFlags>
    );

    expect(checkFlag).toHaveBeenLastCalledWith({
      enableV12Overflowmenu: false,
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
      <FeatureFlags enableExperimentalFocusWrapWithoutSentinels>
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
});
