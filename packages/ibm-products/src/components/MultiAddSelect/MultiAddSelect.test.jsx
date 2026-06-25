//
// Copyright IBM Corp. 2022, 2022
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

import { render } from '@testing-library/react';
import React from 'react';
import { MultiAddSelect } from './MultiAddSelect';

const componentName = MultiAddSelect.name;
const defaultProps = {
  closeIconDescription: 'test icon description',
  description: 'test description',
  globalFiltersLabel: 'filters',
  globalSearchLabel: 'global search label',
  items: {
    entries: [
      {
        id: 'test-entry-1',
        title: 'test entry 1 title',
        value: 'test-entry-1',
      },
    ],
  },
  itemsLabel: 'test items label',
  multi: true,
  noResultsDescription: 'no results body',
  noResultsTitle: 'no results title',
  noSelectionDescription: 'no results body',
  noSelectionTitle: 'no results title',
  onClose: () => {},
  onCloseButtonText: 'close button text',
  onSubmit: () => {},
  onSubmitButtonText: 'submit button text',
  open: true,
  title: 'test title',
};

describe(componentName, () => {
  it('renders', async () => {
    render(<MultiAddSelect {...defaultProps} />);
  });
});
