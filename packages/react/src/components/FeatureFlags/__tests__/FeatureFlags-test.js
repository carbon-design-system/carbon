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

  describe('should support a prop for each feature flag', () => {
    it('enable-v12-tile-default-icons - enableV12TileDefaultIcons', () => {
      const checkFlags = jest.fn();
      const checkFlag = jest.fn();

      function TestComponent() {
        const featureFlags = useFeatureFlags();
        const enableV12TileDefaultIcons = useFeatureFlag(
          'enable-v12-tile-default-icons'
        );

        checkFlags({
          enableV12TileDefaultIcons: featureFlags.enabled(
            'enable-v12-tile-default-icons'
          ),
        });

        checkFlag({
          enableV12TileDefaultIcons,
        });

        return null;
      }

      // Render the default
      const { rerender } = render(
        <FeatureFlags>
          <TestComponent />
        </FeatureFlags>
      );

      // Ensure the default value is as defined and as expected
      expect(checkFlags).toHaveBeenLastCalledWith({
        enableV12TileDefaultIcons: false,
      });
      expect(checkFlag).toHaveBeenLastCalledWith({
        enableV12TileDefaultIcons: false,
      });

      // Enable the flag
      rerender(
        <FeatureFlags enableV12TileDefaultIcons>
          <TestComponent />
        </FeatureFlags>
      );

      // Ensure that when enabled, this flag does not error
      expect(checkFlags).toHaveBeenLastCalledWith({
        enableV12TileDefaultIcons: true,
      });
      expect(checkFlag).toHaveBeenLastCalledWith({
        enableV12TileDefaultIcons: true,
      });
    });

    it('enable-v12-tile-radio-icons - enableV12TileRadioIcons', () => {
      const checkFlags = jest.fn();
      const checkFlag = jest.fn();

      function TestComponent() {
        const featureFlags = useFeatureFlags();
        const enableV12TileRadioIcons = useFeatureFlag(
          'enable-v12-tile-radio-icons'
        );

        checkFlags({
          enableV12TileRadioIcons: featureFlags.enabled(
            'enable-v12-tile-radio-icons'
          ),
        });

        checkFlag({
          enableV12TileRadioIcons,
        });

        return null;
      }

      // Render the default
      const { rerender } = render(
        <FeatureFlags>
          <TestComponent />
        </FeatureFlags>
      );

      // Ensure the default value is as defined and as expected
      expect(checkFlags).toHaveBeenLastCalledWith({
        enableV12TileRadioIcons: false,
      });
      expect(checkFlag).toHaveBeenLastCalledWith({
        enableV12TileRadioIcons: false,
      });

      // Enable the flag
      rerender(
        <FeatureFlags enableV12TileRadioIcons>
          <TestComponent />
        </FeatureFlags>
      );

      // Ensure that when enabled, this flag does not error
      expect(checkFlags).toHaveBeenLastCalledWith({
        enableV12TileRadioIcons: true,
      });
      expect(checkFlag).toHaveBeenLastCalledWith({
        enableV12TileRadioIcons: true,
      });
    });

    it('enable-v12-overflowmenu - enableV12Overflowmenu', () => {
      const checkFlags = jest.fn();
      const checkFlag = jest.fn();

      function TestComponent() {
        const featureFlags = useFeatureFlags();
        const enableV12Overflowmenu = useFeatureFlag('enable-v12-overflowmenu');

        checkFlags({
          enableV12Overflowmenu: featureFlags.enabled(
            'enable-v12-overflowmenu'
          ),
        });

        checkFlag({
          enableV12Overflowmenu,
        });

        return null;
      }

      // Render the default
      const { rerender } = render(
        <FeatureFlags>
          <TestComponent />
        </FeatureFlags>
      );

      // Ensure the default value is as defined and as expected
      expect(checkFlags).toHaveBeenLastCalledWith({
        enableV12Overflowmenu: false,
      });
      expect(checkFlag).toHaveBeenLastCalledWith({
        enableV12Overflowmenu: false,
      });

      // Enable the flag
      rerender(
        <FeatureFlags enableV12Overflowmenu>
          <TestComponent />
        </FeatureFlags>
      );

      // Ensure that when enabled, this flag does not error
      expect(checkFlags).toHaveBeenLastCalledWith({
        enableV12Overflowmenu: true,
      });
      expect(checkFlag).toHaveBeenLastCalledWith({
        enableV12Overflowmenu: true,
      });
    });

    it('enable-treeview-controllable - enableTreeviewControllable', () => {
      const checkFlags = jest.fn();
      const checkFlag = jest.fn();

      function TestComponent() {
        const featureFlags = useFeatureFlags();
        const enableTreeviewControllable = useFeatureFlag(
          'enable-treeview-controllable'
        );

        checkFlags({
          enableTreeviewControllable: featureFlags.enabled(
            'enable-treeview-controllable'
          ),
        });

        checkFlag({
          enableTreeviewControllable,
        });

        return null;
      }

      // Render the default
      const { rerender } = render(
        <FeatureFlags>
          <TestComponent />
        </FeatureFlags>
      );

      // Ensure the default value is as defined and as expected
      expect(checkFlags).toHaveBeenLastCalledWith({
        enableTreeviewControllable: false,
      });
      expect(checkFlag).toHaveBeenLastCalledWith({
        enableTreeviewControllable: false,
      });

      // Enable the flag
      rerender(
        <FeatureFlags enableTreeviewControllable>
          <TestComponent />
        </FeatureFlags>
      );

      // Ensure that when enabled, this flag does not error
      expect(checkFlags).toHaveBeenLastCalledWith({
        enableTreeviewControllable: true,
      });
      expect(checkFlag).toHaveBeenLastCalledWith({
        enableTreeviewControllable: true,
      });
    });

    it('enable-experimental-focus-wrap-without-sentinels - enableExperimentalFocusWrapWithoutSentinels', () => {
      const checkFlags = jest.fn();
      const checkFlag = jest.fn();

      function TestComponent() {
        const featureFlags = useFeatureFlags();
        const enableExperimentalFocusWrapWithoutSentinels = useFeatureFlag(
          'enable-experimental-focus-wrap-without-sentinels'
        );

        checkFlags({
          enableExperimentalFocusWrapWithoutSentinels: featureFlags.enabled(
            'enable-experimental-focus-wrap-without-sentinels'
          ),
        });

        checkFlag({
          enableExperimentalFocusWrapWithoutSentinels,
        });

        return null;
      }

      // Render the default
      const { rerender } = render(
        <FeatureFlags>
          <TestComponent />
        </FeatureFlags>
      );

      // Ensure the default value is as defined and as expected
      expect(checkFlags).toHaveBeenLastCalledWith({
        enableExperimentalFocusWrapWithoutSentinels: false,
      });
      expect(checkFlag).toHaveBeenLastCalledWith({
        enableExperimentalFocusWrapWithoutSentinels: false,
      });

      // Enable the flag
      rerender(
        <FeatureFlags enableExperimentalFocusWrapWithoutSentinels>
          <TestComponent />
        </FeatureFlags>
      );

      // Ensure that when enabled, this flag does not error
      expect(checkFlags).toHaveBeenLastCalledWith({
        enableExperimentalFocusWrapWithoutSentinels: true,
      });
      expect(checkFlag).toHaveBeenLastCalledWith({
        enableExperimentalFocusWrapWithoutSentinels: true,
      });
    });

    it('enable-v12-dynamic-floating-styles - enableV12DynamicFloatingStyles', () => {
      const checkFlags = jest.fn();
      const checkFlag = jest.fn();

      function TestComponent() {
        const featureFlags = useFeatureFlags();
        const enableV12DynamicFloatingStyles = useFeatureFlag(
          'enable-v12-dynamic-floating-styles'
        );

        checkFlags({
          enableV12DynamicFloatingStyles: featureFlags.enabled(
            'enable-v12-dynamic-floating-styles'
          ),
        });

        checkFlag({
          enableV12DynamicFloatingStyles,
        });

        return null;
      }

      // Render the default
      const { rerender } = render(
        <FeatureFlags>
          <TestComponent />
        </FeatureFlags>
      );

      // Ensure the default value is as defined and as expected
      expect(checkFlags).toHaveBeenLastCalledWith({
        enableV12DynamicFloatingStyles: false,
      });
      expect(checkFlag).toHaveBeenLastCalledWith({
        enableV12DynamicFloatingStyles: false,
      });

      // Enable the flag
      rerender(
        <FeatureFlags enableV12DynamicFloatingStyles>
          <TestComponent />
        </FeatureFlags>
      );

      // Ensure that when enabled, this flag does not error
      expect(checkFlags).toHaveBeenLastCalledWith({
        enableV12DynamicFloatingStyles: true,
      });
      expect(checkFlag).toHaveBeenLastCalledWith({
        enableV12DynamicFloatingStyles: true,
      });
    });
  });
});
