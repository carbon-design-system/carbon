/**
 * Copyright IBM Corp. 2024, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import * as GlobalFeatureFlags from '@carbon/feature-flags';
import { render } from '@testing-library/react';
import { FeatureFlags, useFeatureFlags, useFeatureFlag } from '.';

describe('FeatureFlags base tests', () => {
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
      const enableTestFlagB = useFeatureFlag('enable-test-flag-b');
      const enableTestFlagA = useFeatureFlag('enable-test-flag-a');

      checkFlags({
        enableTestFlagB: featureFlags.enabled('enable-test-flag-b'),
        enableTestFlagA: featureFlags.enabled('enable-test-flag-a'),
      });

      checkFlag({
        enableTestFlagB,
        enableTestFlagA,
      });

      return null;
    }

    render(
      <FeatureFlags enableTestFlagB>
        <TestComponent />
      </FeatureFlags>
    );

    expect(checkFlags).toHaveBeenLastCalledWith({
      enableTestFlagB: true,
      enableTestFlagA: false,
    });
    expect(checkFlag).toHaveBeenLastCalledWith({
      enableTestFlagB: true,
      enableTestFlagA: false,
    });
  });

  it('should re-render when flags change', () => {
    const checkFlags = jest.fn();
    const checkFlag = jest.fn();

    function TestComponent() {
      const featureFlags = useFeatureFlags();
      const enableTestFlagB = useFeatureFlag('enable-test-flag-b');
      const enableTestFlagA = useFeatureFlag('enable-test-flag-a');

      checkFlags({
        enableTestFlagB: featureFlags.enabled('enable-test-flag-b'),
        enableTestFlagA: featureFlags.enabled('enable-test-flag-a'),
      });

      checkFlag({
        enableTestFlagB,
        enableTestFlagA,
      });

      return null;
    }

    const { rerender } = render(
      <FeatureFlags enableTestFlagB>
        <TestComponent />
      </FeatureFlags>
    );

    expect(checkFlags).toHaveBeenLastCalledWith({
      enableTestFlagB: true,
      enableTestFlagA: false,
    });
    expect(checkFlag).toHaveBeenLastCalledWith({
      enableTestFlagB: true,
      enableTestFlagA: false,
    });

    rerender(
      <FeatureFlags enableTestFlagA>
        <TestComponent />
      </FeatureFlags>
    );

    expect(checkFlags).toHaveBeenLastCalledWith({
      enableTestFlagB: false,
      enableTestFlagA: true,
    });
    expect(checkFlag).toHaveBeenLastCalledWith({
      enableTestFlagB: false,
      enableTestFlagA: true,
    });
  });

  it('should merge scopes and overwrite duplicate keys', () => {
    const checkFlag = jest.fn();

    function TestComponent() {
      const enableTestFlagB = useFeatureFlag('enable-test-flag-b');
      const enableTestFlagA = useFeatureFlag('enable-test-flag-a');

      checkFlag({ enableTestFlagB, enableTestFlagA });

      return null;
    }

    render(
      <FeatureFlags enableTestFlagA>
        <TestComponent />
      </FeatureFlags>
    );

    expect(checkFlag).toHaveBeenLastCalledWith({
      enableTestFlagB: false,
      enableTestFlagA: true,
    });

    render(
      <FeatureFlags enableTestFlagA>
        <FeatureFlags enableTestFlagB>
          <TestComponent />
        </FeatureFlags>
      </FeatureFlags>
    );

    expect(checkFlag).toHaveBeenLastCalledWith({
      enableTestFlagB: true,
      enableTestFlagA: false,
    });

    render(
      <FeatureFlags enableTestFlagA>
        <FeatureFlags enableTestFlagB>
          <FeatureFlags enableTestFlagA={false} enableTestFlagB={false}>
            <TestComponent />
          </FeatureFlags>
        </FeatureFlags>
      </FeatureFlags>
    );

    expect(checkFlag).toHaveBeenLastCalledWith({
      enableTestFlagB: false,
      enableTestFlagA: false,
    });
  });

  it('should handle boolean props and flags object with no overlapping keys', () => {
    const checkFlags = jest.fn();
    const checkFlag = jest.fn();

    function TestComponent() {
      const featureFlags = useFeatureFlags();
      const enableTestFlagB = useFeatureFlag('enable-test-flag-b'); // true default
      const enableTestFlagA = useFeatureFlag('enable-test-flag-a'); // false default

      checkFlags({
        enableTestFlagB: featureFlags.enabled('enable-test-flag-b'),
        enableTestFlagA: featureFlags.enabled('enable-test-flag-a'),
      });

      checkFlag({
        enableTestFlagB,
        enableTestFlagA,
      });

      return null;
    }

    render(
      <FeatureFlags enableTestFlagA>
        <TestComponent />
      </FeatureFlags>
    );

    expect(checkFlags).toHaveBeenLastCalledWith({
      enableTestFlagB: false,
      enableTestFlagA: true,
    });
    expect(checkFlag).toHaveBeenLastCalledWith({
      enableTestFlagB: false,
      enableTestFlagA: true,
    });
  });

  it('should handle boolean props correctly when no flags object is provided', () => {
    const checkFlags = jest.fn();
    const checkFlag = jest.fn();

    function TestComponent() {
      const featureFlags = useFeatureFlags();
      const enableTestFlagB = useFeatureFlag('enable-test-flag-b');
      const enableTestFlagA = useFeatureFlag('enable-test-flag-a');

      checkFlags({
        enableTestFlagB: featureFlags.enabled('enable-test-flag-b'),
        enableTestFlagA: featureFlags.enabled('enable-test-flag-a'),
      });

      checkFlag({
        enableTestFlagB,
        enableTestFlagA,
      });

      return null;
    }

    render(
      <FeatureFlags enableTestFlagB enableTestFlagA={false}>
        <TestComponent />
      </FeatureFlags>
    );

    expect(checkFlags).toHaveBeenLastCalledWith({
      enableTestFlagB: true,
      enableTestFlagA: false,
    });
    expect(checkFlag).toHaveBeenLastCalledWith({
      enableTestFlagB: true,
      enableTestFlagA: false,
    });
  });
});

// TODO: add flag specific tests
// describe('FeatureFlags flag specific tests', () => {
//   it('should support a prop for each feature flag coming from deprecated format', () => {});
// });
