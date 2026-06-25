/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { StoryDocsPage } from '../../../../global/js/utils/StoryDocsPage';

export const DocsPage = () => (
  <StoryDocsPage
    omitCodedExample
    blocks={[
      {
        description: `The \`Datagrid\` supports expandable rows with the use of the \`useExpandedRow\` hook.`,
        source: {
          language: 'jsx',
          code: `
import { Datagrid, useDatagrid, useExpandedRow } from '@carbon/ibm-products';

const App = () => {
  const columns = React.useMemo(() => defaultHeader, []); // These are the columns that will be used by the datagrid
  const [data] = useState(makeData(10)); // This is the data that will be rendered by the datagrid

  const expansionRenderer = ({ row }) => {
    return <div>Content for row index: {row.id}</div>;
  };

  const datagridState = useDatagrid(
    {
      columns,
      data,
      ExpandedRowContentComponent: expansionRenderer,
      expanderButtonTitleExpanded: 'Collapse row',
      expanderButtonTitleCollapsed: 'Expand row',
    },
    useExpandedRow
  );

  return <Datagrid datagridState={datagridState} />;
};
          `,
        },
      },
    ]}
  />
);
