//
// Copyright IBM Corp. 2022, 2022
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

import React, { useState } from 'react';
// import styles from './_storybook-styles.scss?inline'; // import index in case more files are added later.
import { MultiAddSelect } from '.';
import { Button } from '@carbon/react';
import image from '../UserProfileImage/headshot.jpg'; // cspell:disable-line
import { Group, Document } from '@carbon/react/icons';

import { pkg } from '../../settings';
import DocsPage from './MultiAddSelect.docs-page';
const blockClass = `${pkg.prefix}--add-select__meta-panel`;

export default {
  title: 'Patterns/Prebuilt patterns/Add and select/MultiAddSelect',
  component: MultiAddSelect,
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
          3: 'with modifiers',
          4: 'with avatars',
        },
      },
      options: [0, 1, 2, 3, 4],
      mapping: {
        0: { entries: [] },
        1: {
          entries: [
            {
              id: '1',
              value: '1',
              title: 'item 1',
              subtitle: 'item 1 subtitle',
              meta: (
                <div className={`${blockClass}-entry`}>
                  <p className={`${blockClass}-entry-title`}>html support</p>
                  <p className={`${blockClass}-entry-body`}>
                    also supports nodes in the meta attribute
                  </p>
                </div>
              ),
            },
            {
              id: '2',
              value: '2',
              title: 'item 2',
              meta: [
                {
                  id: 'description',
                  title: 'description',
                  value: 'description text',
                },
                {
                  id: 'secondary_category',
                  title: 'secondary category',
                  value: 'knowledge accelerator',
                },
              ],
            },
            {
              id: '3',
              value: '3',
              title: 'item 3',
              subtitle: 'item 3 subtitle',
            },
          ],
        },
        2: {
          sortBy: ['title'],
          entries: [
            {
              id: '1',
              value: 'folder 1',
              title: 'folder 1',
              children: {
                sortBy: ['title', 'size'],
                filterBy: 'fileType',
                entries: [
                  {
                    id: '1-1',
                    value: 'file1.pdf',
                    title: 'file1.pdf',
                    fileType: 'pdf',
                    size: '100',
                    icon: (props) => <Document size={16} {...props} />,
                    tag: 'business',
                    children: {
                      entries: [
                        {
                          id: '9000',
                          value: '9000.html',
                          title: '9000.html',
                          fileType: 'html',
                          size: '9000',
                          icon: (props) => <Document size={16} {...props} />,
                        },
                      ],
                    },
                  },
                  {
                    id: '1-2',
                    value: 'index.js',
                    title: 'index.js',
                    fileType: 'js',
                    size: '200',
                    icon: (props) => <Document size={16} {...props} />,
                  },
                  {
                    id: '1-3',
                    value: 'sitemap.xml',
                    title: 'sitemap.xml',
                    fileType: 'xml',
                    size: '10',
                    icon: (props) => <Document size={16} {...props} />,
                  },
                ],
              },
            },
            {
              id: '2',
              value: 'folder 2',
              title: 'folder 2',
              children: {
                entries: [
                  {
                    id: '7000',
                    value: '7000.html',
                    title: '7000.html',
                    fileType: 'html',
                    size: '7000',
                    icon: (props) => <Document size={16} {...props} />,
                  },
                ],
              },
            },
          ],
        },
        3: {
          modifiers: {
            id: 'role',
            label: 'Select Roles',
            title: 'Role',
            options: ['editor', 'viewer', 'admin'],
            multiSelect: true,
          },
          entries: [
            {
              id: '1',
              value: '1',
              title: 'item 1',
              subtitle: 'item 1 subtitle',
              role: ['editor', 'viewer'],
            },
            {
              id: '2',
              value: '2',
              title: 'item 2',
              role: ['editor'],
            },
            {
              id: '3',
              value: '3',
              title: 'item 3',
              subtitle: 'item 3 subtitle',
              role: ['admin'],
            },
          ],
        },
        4: {
          entries: [
            {
              id: '1',
              value: '1',
              title: 'item 1',
              subtitle: 'item 1 subtitle',
              avatar: {
                src: image,
                alt: 'head shot',
                theme: 'light',
              },
            },
            {
              id: '2',
              value: '2',
              title: 'item 2',
              subtitle: 'item 2 subtitle',
              avatar: {
                icon: (props) => <Group size={24} {...props} />,
                backgroundColor: 'dark-green',
                theme: 'light',
              },
            },
            {
              id: '3',
              value: '3',
              title: 'item 3',
              subtitle: 'item 3 subtitle',
              avatar: {
                icon: (props) => <Group size={24} {...props} />,
                theme: 'light',
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
  clearFiltersText: 'Clear filters',
  closeIconDescription: 'Close',
  columnInputPlaceholder: 'Find',
  description: 'Select business terms from the list',
  globalSearchLabel: 'global search label',
  globalSearchPlaceholder: 'Find business terms',
  illustrationTheme: 'light',
  influencerTitle: 'Selected business terms',
  itemsLabel: 'Business terms',
  metaIconDescription: 'View meta information',
  metaPanelTitle: 'Personal information',
  navIconDescription: 'View children',
  noResultsTitle: 'No results',
  noSelectionDescription:
    'Select a term to include the full set of the governance artifacts it contains in the governance scope.',
  noSelectionTitle: 'No business terms selected',
  noResultsDescription: 'Try again',
  noTearsheet: false,
  onCloseButtonText: 'Cancel',
  onSubmit: (selections) => console.log(selections),
  onSubmitButtonText: 'Add',
  searchResultsTitle: 'Search results',
  title: 'Add business terms',
  sortByLabel: 'Sort',
  filterByLabel: 'Filter',
};

const Template = (args, context) => {
  const [open, setOpen] = useState(context?.viewMode !== 'docs');
  return (
    <>
      <MultiAddSelect {...args} open={open} onClose={() => setOpen(false)} />
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
  globalFilters: [
    {
      id: 'fileType',
      label: 'File type',
    },
    {
      id: 'size',
      label: 'Size',
    },
    {
      id: 'tag',
      label: 'Tag',
    },
  ],
  globalFiltersIconDescription: 'Filter',
  globalFiltersLabel: 'Filters',
  globalFiltersPlaceholderText: 'Choose an option',
  globalFiltersPrimaryButtonText: 'Apply',
  globalFiltersSecondaryButtonText: 'Reset',
  globalSortBy: ['title'],
};

export const WithModifiers = Template.bind({});
WithModifiers.args = {
  items: 3,
  ...defaultProps,
};

export const WithAvatars = Template.bind({});
WithAvatars.parameters = {
  chromatic: { disableSnapshot: true },
};
WithAvatars.args = {
  items: 4,
  ...defaultProps,
};
