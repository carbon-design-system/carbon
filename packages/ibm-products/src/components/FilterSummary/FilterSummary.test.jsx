/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, forwardRef } from 'react';
import { render, screen } from '@testing-library/react';
import { FilterSummary } from '.';
import uuidv4 from '../../global/js/utils/uuidv4';

const componentName = FilterSummary.displayName;

const dataTestId = uuidv4();

const FilterSummaryWrapper = forwardRef(({ ...rest }, ref) => {
  const [filters, setFilters] = useState([
    { key: 'name', value: 'Thor' },
    { key: 'location', value: 'Asgard' },
    // cspell: disable
    { key: 'weapon', value: 'Mjölnir' },
  ]);
  const clearFilters = () => setFilters([]);
  return (
    <FilterSummary
      ref={ref}
      clearFiltersText={rest.clearFiltersText}
      filters={filters}
      clearFilters={clearFilters}
      renderLabel={rest.renderLabel}
      {...rest}
    />
  );
});

const renderComponent = ({ ...rest } = {}) =>
  render(<FilterSummaryWrapper {...rest} />);

describe(componentName, () => {
  let warn;

  beforeEach(() => {
    warn = jest.spyOn(console, 'warn').mockImplementation(jest.fn());
  });

  afterEach(() => {
    warn.mockRestore();
  });

  it('should render a filter summary component', () => {
    renderComponent({ 'data-testid': dataTestId });
    screen.getByTestId(dataTestId);
  });
});
