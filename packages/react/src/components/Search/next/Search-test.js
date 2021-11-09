import React from 'react';
import { default as Search } from './Search';
import { render, screen } from '@testing-library/react';

describe('Search', () => {
  it('adds extra classes that are passed via className prop', () => {
    render(
      <Search
        id="test"
        className="extra-class"
        label="Search Field"
        labelText="testlabel"
      />
    );

    const search = screen.getByDisplayValue('test');
    expect(search.classList.contains('extra-class')).toBe(true);
  });

  it('should render type as expected', () => {
    render(
      <Search
        id="test"
        className="extra-class"
        label="Search Field"
        labelText="testlabel"
      />
    );

    expect(screen.getByRole('searchbox')).toHaveAttribute('type', 'text');
  });

  it('should have placeholder', () => {
    render(
      <Search
        id="test"
        className="extra-class"
        label="Search Field"
        labelText="testlabel"
        placeholder="Placeholder" />
    );

      expect(screen.getByRole('searchbox')).toHaveAttribute('placeholder', 'Placeholder');
  });

  it('should have a label', () => {
    render(
      <Search
        id="test"
        className="extra-class"
        label="Search Field"
        labelText="testlabel"
      />
    );

      expect(screen.getByRole('searchbox')).toHaveAttribute('placeholder', 'Placeholder');
  });

  it('should have small size class', () => {
    const { container } = render(
      <Search
        id="test"
        className="extra-class"
        label="Search Field"
        labelText="testlabel"
        size="sm" />
      );

      expect(container.classList.contains('bx--search--sm')).toBe(true);
  });

  it('should render skeleton', () => {
    const { container } = render(
      <Search
        id="test"
        className="extra-class"
        label="Search Field"
        labelText="testlabel"
        size="sm" />
      );

      expect(container.classList.contains(`bx--skeleton`)).toEqual(true);
  });
});


