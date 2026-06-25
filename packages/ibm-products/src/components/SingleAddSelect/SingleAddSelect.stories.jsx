//
// Copyright IBM Corp. 2022, 2024
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

import React, { useState } from 'react';
// import styles from './_storybook-styles.scss?inline'; // import index in case more files are added later.
import { SingleAddSelect } from '.';
import { Button } from '@carbon/react';
import DocsPage from './SingleAddSelect.docs-page';
// import { action } from 'storybook/actions';

export default {
  title: 'Patterns/Prebuilt patterns/Add and select/SingleAddSelect',
  component: SingleAddSelect,
  tags: ['autodocs'],
  parameters: {
    // styles,
    docs: {
      page: DocsPage,
    },
  },
  argTypes: {
    items: {
      control: {
        type: 'select',
        labels: {
          0: 'no items',
          1: 'three items',
          2: 'with hierarchy',
        },
      },
      options: [0, 1, 2],
      mapping: {
        0: { entries: [] },
        1: {
          entries: [
            {
              id: '1',
              title: 'Kansas',
              value: 'kansas',
            },
            {
              id: '2',
              title: 'Texas',
              value: 'texas',
            },
            {
              id: '3',
              title: 'Florida',
              value: 'florida',
            },
          ],
        },
        2: {
          entries: [
            {
              id: '1',
              title: 'Kansas',
              value: 'kansas',
            },
            {
              id: '2',
              title: 'Texas',
              value: 'texas',
            },
            {
              id: '3',
              title: 'Florida',
              value: 'florida',
            },
            {
              id: '4',
              title: 'California',
              value: 'california',
              children: {
                entries: [
                  {
                    id: '5',
                    title: 'Los Angeles',
                    value: 'la',
                    children: {
                      entries: [
                        {
                          id: '6',
                          title: 'Beverly Hills',
                          value: 'bh',
                        },
                        {
                          id: '7',
                          title: 'Malibu',
                          value: 'malibu',
                          children: {
                            entries: [
                              {
                                id: '8',
                                title: 'Malibu Rd',
                                value: 'malibu-rd',
                              },
                            ],
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    },
  },
};

const defaultProps = {
  className: 'placeholder-class',
  description: 'select a category lorem ipsum',
  globalSearchLabel: 'global search label',
  globalSearchPlaceholder: 'Find categories',
  illustrationTheme: 'light',
  itemsLabel: 'Categories',
  navIconDescription: 'View children',
  noResultsTitle: 'No results',
  noResultsDescription: 'Try again',
  noTearsheet: false,
  onCloseButtonText: 'Cancel',
  onSubmit: (selection) => console.log(selection),
  onSubmitButtonText: 'Select',
  searchResultsTitle: 'Search results',
  title: 'Select category',
};

const Template = (args, context) => {
  const [open, setOpen] = useState(context?.viewMode !== 'docs');

  return (
    <>
      <SingleAddSelect {...args} open={open} onClose={() => setOpen(false)} />
      {args?.noTearsheet === false && (
        <Button onClick={() => setOpen(true)}>Launch AddSelect</Button>
      )}
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  items: 1,
  ...defaultProps,
};

export const WithHierarchy = Template.bind({});
WithHierarchy.args = {
  items: 2,
  ...defaultProps,
};
