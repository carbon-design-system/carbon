import React from 'react';
import { default as Search } from './Search';
import SearchSkeleton from '../Search.Skeleton';
import { render, screen, cleanup } from '@testing-library/react';

describe('Search', () => {
  afterEach(cleanup);

  it('adds extra classes that are passed via className prop', () => {
    render(
      <Search
        id="test"
        className="extra-class"
        label="Search Field"
        labelText="testlabel"
      />
    );

    const search = screen.getByRole('search');
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
        id="testId"
        className="extra-class"
        label="Search Field"
        labelText="testlabel"
        placeholder="test"
      />
    );

    expect(screen.getByRole('searchbox')).toHaveAttribute(
      'placeholder',
      'test'
    );
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

    expect(screen.getByRole('searchbox')).toHaveAttribute(
      'placeholder',
      'Placeholder'
    );
  });

  it('should have small size class', () => {
    const { container } = render(
      <Search
        id="test"
        className="extra-class"
        label="Search Field"
        labelText="testlabel"
        size="sm"
      />
    );

    expect(container.classList.contains('bx--search--sm')).toBe(true);
  });

  it('should render skeleton', () => {
    const { container } = render(<SearchSkeleton />);

    expect(container.classList.contains(`bx--skeleton`)).toEqual(true);
  });
});
