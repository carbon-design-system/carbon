/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';
import { Section, Heading } from '../';

describe('Heading', () => {
  afterEach(cleanup);

  it('should begin with an <h1> tag', () => {
    render(<Heading data-testid="h1">test</Heading>);
    const element = screen.getByTestId('h1');
    expect(element.tagName).toBe('H1');
  });

  it('should increment heading levels as you nest sections', () => {
    render(
      <>
        <Heading data-testid="h1">h1</Heading>
        <Section>
          <Heading data-testid="h2">h2</Heading>
          <Section>
            <Heading data-testid="h3">h3</Heading>
            <Section>
              <Heading data-testid="h4">h4</Heading>
              <Section>
                <Heading data-testid="h5">h5</Heading>
                <Section>
                  <Heading data-testid="h6">h6</Heading>
                </Section>
              </Section>
            </Section>
          </Section>
        </Section>
      </>
    );

    const levels = [1, 2, 3, 4, 5, 6];

    for (const level of levels) {
      const testId = `h${level}`;
      const element = screen.getByTestId(testId);
      expect(element.tagName).toBe(testId.toUpperCase());
    }
  });

  it('should stop increment heading levels past level 6', () => {
    render(
      <>
        <Heading data-testid="h1">h1</Heading>
        <Section>
          <Heading data-testid="h2">h2</Heading>
          <Section>
            <Heading data-testid="h3">h3</Heading>
            <Section>
              <Heading data-testid="h4">h4</Heading>
              <Section>
                <Heading data-testid="h5">h5</Heading>
                <Section>
                  <Heading data-testid="h6">h6</Heading>
                  <Section>
                    <Heading data-testid="max">max</Heading>
                  </Section>
                </Section>
              </Section>
            </Section>
          </Section>
        </Section>
      </>
    );

    const element = screen.getByTestId('max');
    expect(element.tagName).toBe('H6');
  });

  describe('Component API', () => {
    it('should pass through all props for <Section>', () => {
      render(<Section data-testid="test">test</Section>);
      expect(() => {
        screen.getByTestId('test');
      }).not.toThrow();
    });

    it('should use the `as` prop to change the element in <Section>', () => {
      render(
        <Section as="article" data-testid="test">
          test
        </Section>
      );
      const element = screen.getByTestId('test');
      expect(element.tagName).toBe('ARTICLE');
    });

    it('should pass through all props for <Heading>', () => {
      render(<Heading data-testid="test">test</Heading>);
      expect(() => {
        screen.getByTestId('test');
      }).not.toThrow();
    });
  });
});
