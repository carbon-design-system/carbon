/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TextDirection, Text } from '../';

describe('Text', () => {
  it('should support specifying direction with the `dir` prop', () => {
    render(
      <Text dir="rtl" data-testid="test">
        test
      </Text>
    );

    const node = screen.getByTestId('test');
    expect(node).toHaveAttribute('dir', 'rtl');
  });

  it('should support custom elements with the `as` prop', () => {
    render(
      <Text as="p" data-testid="test">
        test
      </Text>
    );

    const node = screen.getByTestId('test');
    expect(node.tagName).toBe('P');
  });

  it('should support spreading props onto the outermost node', () => {
    render(
      <Text data-testid="test" id="test">
        test
      </Text>
    );

    const node = screen.getByTestId('test');
    expect(node).toHaveAttribute('id', 'test');
  });

  it('should not use redundant `dir` attributes on text nodes', () => {
    render(
      <Text data-testid="outside" dir="rtl">
        outside{' '}
        <Text data-testid="inside" dir="rtl">
          inside
        </Text>
      </Text>
    );

    const outside = screen.getByTestId('outside');
    expect(outside).toHaveAttribute('dir', 'rtl');

    const inside = screen.getByTestId('inside');
    expect(inside).not.toHaveAttribute('dir');
  });

  it('should support overriding `dir` with `getTextDirection`', () => {
    const getTextDirection = jest.fn().mockImplementation((input) => {
      if (input === 'test') {
        return 'auto';
      }
      if (input === 'inner') {
        return 'ltr';
      }
      return 'rtl';
    });

    render(
      <TextDirection dir="ltr" getTextDirection={getTextDirection}>
        <Text data-testid="flat">test</Text>
        <Text data-testid="outer">
          pre<Text data-testid="inner">inner</Text>post
        </Text>
        <Text data-testid="inherit">
          inherit <Text data-testid="nested">nested</Text>
        </Text>
      </TextDirection>
    );

    expect(screen.getByTestId('flat')).toHaveAttribute('dir', 'auto');
    expect(getTextDirection).toHaveBeenCalledWith('test');

    expect(screen.getByTestId('outer')).toHaveAttribute('dir', 'rtl');
    expect(getTextDirection).toHaveBeenCalledWith(['pre', 'post']);

    expect(screen.getByTestId('inner')).toHaveAttribute('dir', 'ltr');
    expect(getTextDirection).toHaveBeenCalledWith('inner');

    expect(screen.getByTestId('inherit')).toHaveAttribute('dir', 'rtl');
    expect(getTextDirection).toHaveBeenCalledWith('inherit ');

    expect(screen.getByTestId('nested')).not.toHaveAttribute('dir');
    expect(getTextDirection).toHaveBeenCalledWith('nested');
  });
});
