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
the way the component is displayed and how you interact with it..

Let's walk through an example.`,
          source: {
            code: `items: {
  entries: [ // the actual list of items / entries
    {
      id: '1', // required unique id for the entry
      value: '1', // required value of the entry
      title: 'item 1', // required title to display
      subtitle: 'item 1 subtitle', // subtitle to display
      children: { // designates if entry has children. if the children prop is found a hierarchy list will be used
        entries: [
          {
            id: '1-1',
            value: 'file1.pdf',
            title: 'file1.pdf',
          },
        ],
      },
    },
  ],
}`,
          },
        },
      ]}
    />
  );
};

export default DocsPage;
