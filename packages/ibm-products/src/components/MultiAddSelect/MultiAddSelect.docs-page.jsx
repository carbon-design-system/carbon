/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { StoryDocsPage } from '../../global/js/utils/StoryDocsPage';

const DocsPage = () => {
  return (
    <StoryDocsPage
      altGuidelinesHref="https://pages.github.ibm.com/carbon/ibm-products/patterns/add-and-select/usage"
      blocks={[
        {
          title: 'Structuring items',
          description: `The \`items\` object has a lot of customization potential and can greatly effect
the way the component is displayed and how you interact with it.

Let's walk through an example.`,
          source: {
            code: `items: {
  modifiers: { // adds a modifier dropdown inside the items
    label: PropTypes.string, // label for the dropdown
    options: PropTypes.array, // list of options / values for the dropdown
    multiSelect: PropTypes.bool // option to switch the options dropdown to multiselect
  },
  sortBy: ['title'], // designates which properties should be used to sort the column when using a hierarchy
  entries: [ // the actual list of items / entries
    {
      id: '1', // required unique id for the entry
      value: '1', // required value of the entry
      title: 'item 1', // required title to display
      subtitle: 'item 1 subtitle', // subtitle to display
      children: { // designates if entry has children. if the children prop is found a hierarchy list will be used
        sortBy: ['title', 'size'],
        filterBy: 'fileType', // designates which property should be used to filter the column of items
        entries: [
          {
            id: '1-1',
            value: 'file1.pdf',
            title: 'file1.pdf',
            fileType: 'pdf',
            size: '100',
            icon: Document16, // designates if an icon should be displayed. While similar to avatar icon, both have different displays.
            tag: 'business',
            avatar: { // designates if an avatar should be displayed
              alt: 'alt text',
              icon: <Icon />,
              src: 'avatar.png',
            },
          },
        ],
      },
    },
  ],
}`,
          },
        },
        {
          description: `The properties that have been commented on like \`id\`, \`value\`, and \`icon\` have
specific use within the component and are generally required. Other properties
like \`fileType\` and \`size\` do not and will simply show up as details in the
sidebar when selected.`,
        },
      ]}
    />
  );
};

export default DocsPage;
