/**
 * Copyright IBM Corp. 2020, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { useId, useFallbackId, useCompatibleId } from '../useId';
import { IdPrefixContext } from '../useIdPrefix';

describe('useId', () => {
  it('should generate a unique id that is stable across renders', () => {
    function Test() {
      const id = useId('test');
      return <span id={id}>test</span>;
    }

    render(<Test />);
    expect(screen.getByText('test')).toHaveAttribute('id', 'test-_r_0_');
  });

  it('should generate a unique id when using the useFallbackId empty', () => {
    function Test() {
      const id = useFallbackId();
      return <span id={id}>test</span>;
    }

    render(<Test />);
    expect(screen.getByText('test')).toHaveAttribute('id', 'id-_r_1_');
  });

  it('should received a unique id by passing a string on params when using useFallbackId', () => {
    function Test() {
      const id = useFallbackId('idReceived');
      return <span id={id}>test</span>;
    }

    render(<Test />);
    expect(screen.getByText('test')).toHaveAttribute('id', 'idReceived');
  });

  it('should include context prefix when using useId', () => {
    const Test = () => {
      const id = useId('test');

      return <span data-testid="react-id">{id}</span>;
    };

    render(
      <IdPrefixContext.Provider value="beep">
        <Test />
      </IdPrefixContext.Provider>
    );

    expect(screen.getByTestId('react-id')).toHaveTextContent(/^beep-test-/);
  });
});

describe('useCompatibleId', () => {
  it('should patch from null with default prefix for both context and non-context values', () => {
    const Test = ({ testId }) => {
      const id = useCompatibleId();

      return <span data-testid={testId}>{id ?? 'null'}</span>;
    };

    render(
      <>
        <Test testId="compat-default-no-context" />
        <IdPrefixContext.Provider value="bop">
          <Test testId="compat-default-with-context" />
        </IdPrefixContext.Provider>
      </>
    );

    expect(screen.getByTestId('compat-default-no-context')).toHaveTextContent(
      /^id-\d+$/
    );
    expect(screen.getByTestId('compat-default-with-context')).toHaveTextContent(
      /^bop-id-\d+$/
    );
  });

  it('should patch an `id` on first render before handoff is completed', () => {
    const Test = () => {
      const id = useCompatibleId('compat');

      return <span data-testid="compat-id">{id ?? 'null'}</span>;
    };

    render(<Test />);

    expect(screen.getByTestId('compat-id')).toHaveTextContent(/^compat-\d+$/);
  });

  it('should initialize synchronously after handoff and include context prefix', () => {
    const Test = () => {
      const id = useCompatibleId('compat');

      return <span data-testid="compat-id">{id ?? 'null'}</span>;
    };

    const { unmount } = render(<Test />);

    expect(screen.getByTestId('compat-id')).toHaveTextContent(/^compat-\d+$/);

    unmount();
    render(
      <IdPrefixContext.Provider value="boop">
        <Test />
      </IdPrefixContext.Provider>
    );

    expect(screen.getByTestId('compat-id')).toHaveTextContent(
      /^boop-compat-\d+$/
    );
  });

  it('should select `useCompatibleId` when `React.useId` is unavailable', () => {
    jest.isolateModules(() => {
      jest.doMock('react', () => {
        const actual = jest.requireActual('react');

        return {
          __esModule: true,
          ...actual,
          default: { ...actual, useId: undefined },
          useId: undefined,
        };
      });

      const useIdModule = require('../useId');

      expect(useIdModule.useId).toBe(useIdModule.useCompatibleId);

      jest.dontMock('react');
    });
  });
});
