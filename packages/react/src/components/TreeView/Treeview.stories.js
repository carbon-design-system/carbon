/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from 'storybook/actions';
import { Document, Folder } from '@carbon/icons-react';
import { default as TreeView, TreeNode } from './';
import { Button } from '../Button/index';
import mdx from './TreeView.mdx';

import './story.scss';
import TextInput from '../TextInput';

function renderTree({ nodes, expanded, withIcons = false, withLinks = false }) {
  if (!nodes) {
    return;
  }
  return nodes.map(
    ({ children, renderIcon, href, isExpanded, ...nodeProps }) => (
      <TreeNode
        key={nodeProps.id}
        renderIcon={withIcons ? renderIcon : null}
        href={withLinks ? href : null}
        isExpanded={expanded ?? isExpanded}
        onClick={withLinks ? (event) => event.preventDefault() : null} // This is so that we only simulate links within the storybook
        {...nodeProps}>
        {renderTree({ nodes: children, expanded, withIcons, withLinks })}
      </TreeNode>
    )
  );
}

export default {
  title: 'components/TreeView',
  component: TreeView,
  subcomponents: {
    TreeNode,
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
  args: {
    onSelect: action('onSelect'),
  },
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },

    className: {
      table: {
        disable: true,
      },
    },

    label: {
      table: {
        disable: true,
      },
    },

    onSelect: {
      table: {
        disable: true,
      },
    },
  },
};

export const Default = (args) => {
  const nodes = [
    {
      id: '1',
      value: 'Application development and integration solutions',
      label: 'Application development and integration solutions',
      renderIcon: Document,
    },
    {
      id: '2',
      value: 'Blockchain',
      label: 'Blockchain',
      renderIcon: Document,
    },
    {
      id: '3',
      value: 'Business automation',
      label: 'Business automation',
      renderIcon: Folder,
      children: [
        {
          id: '3-1',
          value: 'Business process automation',
          label: 'Business process automation',
          renderIcon: Document,
        },
        {
          id: '3-2',
          value: 'Business process mapping',
          label: 'Business process mapping',
          renderIcon: Document,
        },
      ],
    },
    {
      id: '4',
      value: 'Business operations',
      label: 'Business operations',
      renderIcon: Document,
    },
    {
      id: '5',
      value: 'Cloud computing',
      label: 'Cloud computing',
      isExpanded: true,
      renderIcon: Folder,
      children: [
        {
          id: '5-1',
          value: 'Containers',
          label: 'Containers',
          renderIcon: Document,
        },
        {
          id: '5-2',
          value: 'Databases',
          label: 'Databases',
          renderIcon: Document,
        },
        {
          id: '5-3',
          value: 'DevOps',
          label: 'DevOps',
          isExpanded: true,
          renderIcon: Folder,
          children: [
            {
              id: '5-4',
              value: 'Solutions',
              label: 'Solutions',
              renderIcon: Document,
            },
            {
              id: '5-5',
              value: 'Case studies',
              label: 'Case studies',
              isExpanded: true,
              renderIcon: Folder,
              children: [
                {
                  id: '5-6',
                  value: 'Resources',
                  label: 'Resources',
                  renderIcon: Document,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: '6',
      value: 'Data & Analytics',
      label: 'Data & Analytics',
      renderIcon: Folder,
      children: [
        {
          id: '6-1',
          value: 'Big data',
          label: 'Big data',
          renderIcon: Document,
        },
        {
          id: '6-2',
          value: 'Business intelligence',
          label: 'Business intelligence',
          renderIcon: Document,
        },
      ],
    },
    {
      id: '7',
      value: 'Models',
      label: 'Models',
      isExpanded: true,
      disabled: true,
      renderIcon: Folder,
      children: [
        {
          id: '7-1',
          value: 'Audit',
          label: 'Audit',
          renderIcon: Document,
        },
        {
          id: '7-2',
          value: 'Monthly data',
          label: 'Monthly data',
          renderIcon: Document,
        },
        {
          id: '8',
          value: 'Data warehouse',
          label: 'Data warehouse',
          isExpanded: true,
          renderIcon: Folder,
          children: [
            {
              id: '8-1',
              value: 'Report samples',
              label: 'Report samples',
              renderIcon: Document,
            },
            {
              id: '8-2',
              value: 'Sales performance',
              label: 'Sales performance',
              renderIcon: Document,
            },
          ],
        },
      ],
    },
  ];

  function renderTree({ nodes, expanded, withIcons = false }) {
    if (!nodes) {
      return;
    }
    return nodes.map(({ children, renderIcon, isExpanded, ...nodeProps }) => (
      <TreeNode
        key={nodeProps.id}
        renderIcon={withIcons ? renderIcon : null}
        isExpanded={expanded ?? isExpanded}
        {...nodeProps}>
        {renderTree({ nodes: children, expanded, withIcons })}
      </TreeNode>
    ));
  }
  return (
    <TreeView label="Tree View" {...args}>
      {renderTree({ nodes })}
    </TreeView>
  );
};

Default.args = {
  hideLabel: false,
  multiselect: false,
};

Default.argTypes = {
  active: { control: { type: 'text' } },
  size: {
    options: ['xs', 'sm'],
    control: { type: 'select' },
  },
};

export const WithIcons = () => {
  const nodes = [
    {
      id: '1',
      value: 'Artificial intelligence',
      label: <span>Artificial intelligence</span>,
      renderIcon: Document,
    },
    {
      id: '2',
      value: 'Blockchain',
      label: 'Blockchain',
      renderIcon: Document,
    },
    {
      id: '3',
      value: 'Business automation',
      label: 'Business automation',
      renderIcon: Folder,
      children: [
        {
          id: '3-1',
          value: 'Business process automation',
          label: 'Business process automation',
          renderIcon: Document,
        },
        {
          id: '3-2',
          value: 'Business process mapping',
          label: 'Business process mapping',
          renderIcon: Document,
        },
      ],
    },
    {
      id: '4',
      value: 'Business operations',
      label: 'Business operations',
      renderIcon: Document,
    },
    {
      id: '5',
      value: 'Cloud computing',
      label: 'Cloud computing',
      isExpanded: true,
      renderIcon: Folder,
      children: [
        {
          id: '5-1',
          value: 'Containers',
          label: 'Containers',
          renderIcon: Document,
        },
        {
          id: '5-2',
          value: 'Databases',
          label: 'Databases',
          renderIcon: Document,
        },
        {
          id: '5-3',
          value: 'DevOps',
          label: 'DevOps',
          isExpanded: true,
          renderIcon: Folder,
          children: [
            {
              id: '5-4',
              value: 'Solutions',
              label: 'Solutions',
              renderIcon: Document,
            },
            {
              id: '5-5',
              value: 'Case studies',
              label: 'Case studies',
              isExpanded: true,
              renderIcon: Folder,
              children: [
                {
                  id: '5-6',
                  value: 'Resources',
                  label: 'Resources',
                  renderIcon: Document,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: '6',
      value: 'Data & Analytics',
      label: 'Data & Analytics',
      renderIcon: Folder,
      children: [
        {
          id: '6-1',
          value: 'Big data',
          label: 'Big data',
          renderIcon: Document,
        },
        {
          id: '6-2',
          value: 'Business intelligence',
          label: 'Business intelligence',
          renderIcon: Document,
        },
      ],
    },
    {
      id: '7',
      value: 'Models',
      label: 'Models',
      isExpanded: true,
      disabled: true,
      renderIcon: Folder,
      children: [
        {
          id: '7-1',
          value: 'Audit',
          label: 'Audit',
          renderIcon: Document,
        },
        {
          id: '7-2',
          value: 'Monthly data',
          label: 'Monthly data',
          renderIcon: Document,
        },
        {
          id: '8',
          value: 'Data warehouse',
          label: 'Data warehouse',
          isExpanded: true,
          renderIcon: Folder,
          children: [
            {
              id: '8-1',
              value: 'Report samples',
              label: 'Report samples',
              renderIcon: Document,
            },
            {
              id: '8-2',
              value: 'Sales performance',
              label: 'Sales performance',
              renderIcon: Document,
            },
          ],
        },
      ],
    },
  ];

  function renderTree({ nodes, expanded, withIcons = false }) {
    if (!nodes) {
      return;
    }
    return nodes.map(({ children, renderIcon, isExpanded, ...nodeProps }) => (
      <TreeNode
        key={nodeProps.id}
        renderIcon={withIcons ? renderIcon : null}
        isExpanded={expanded ?? isExpanded}
        {...nodeProps}>
        {renderTree({ nodes: children, expanded, withIcons })}
      </TreeNode>
    ));
  }
  return (
    <TreeView label="Tree View">
      {renderTree({ nodes, withIcons: true })}
    </TreeView>
  );
};

const TreeViewWithLinks = React.memo(({ setCurrentPage }) => {
  const nodes = [
    {
      id: '1',
      value: 'Artificial intelligence',
      label: <span>Artificial intelligence</span>,
      href: '/artificial-intelligence',
      renderIcon: Document,
    },
    {
      id: '2',
      value: 'Blockchain',
      label: 'Blockchain',
      href: '/blockchain',
      renderIcon: Document,
    },
    {
      id: '3',
      value: 'Business automation',
      label: 'Business automation',
      href: '/business-automation',
      renderIcon: Folder,
      children: [
        {
          id: '3-1',
          value: 'Business process automation',
          label: 'Business process automation',
          href: '/business-process-automation',
          renderIcon: Document,
        },
        {
          id: '3-2',
          value: 'Business process mapping',
          label: 'Business process mapping',
          href: '/business-process-mapping',
          renderIcon: Document,
        },
      ],
    },
    {
      id: '4',
      value: 'Business operations',
      label: 'Business operations',
      href: '/business-operations',
      renderIcon: Document,
    },
    {
      id: '5',
      value: 'Cloud computing',
      label: 'Cloud computing',
      href: '/cloud-computing',
      isExpanded: true,
      renderIcon: Folder,
      children: [
        {
          id: '5-1',
          value: 'Containers',
          label: 'Containers',
          href: '/containers',
          renderIcon: Document,
        },
        {
          id: '5-2',
          value: 'Databases',
          label: 'Databases',
          href: '/databases',
          renderIcon: Document,
        },
        {
          id: '5-3',
          value: 'DevOps',
          label: 'DevOps',
          href: '/devops',
          isExpanded: true,
          renderIcon: Folder,
          children: [
            {
              id: '5-4',
              value: 'Solutions',
              label: 'Solutions',
              href: '/solutions',
              renderIcon: Document,
            },
            {
              id: '5-5',
              value: 'Case studies',
              label: 'Case studies',
              href: '/case-studies',
              isExpanded: true,
              renderIcon: Folder,
              children: [
                {
                  id: '5-6',
                  value: 'Resources',
                  label: 'Resources',
                  href: '/resources',
                  renderIcon: Document,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: '6',
      value: 'Data & Analytics',
      label: 'Data & Analytics',
      href: '/data-analytics',
      renderIcon: Folder,
      children: [
        {
          id: '6-1',
          value: 'Big data',
          label: 'Big data',
          href: '/big-data',
          renderIcon: Document,
        },
        {
          id: '6-2',
          value: 'Business intelligence',
          label: 'Business intelligence',
          href: '/business-intelligence',
          renderIcon: Document,
        },
      ],
    },
    {
      id: '7',
      value: 'Models',
      label: 'Models',
      href: '/models',
      isExpanded: true,
      disabled: true,
      renderIcon: Folder,
      children: [
        {
          id: '7-1',
          value: 'Audit',
          label: 'Audit',
          href: '/audit',
          renderIcon: Document,
        },
        {
          id: '7-2',
          value: 'Monthly data',
          label: 'Monthly data',
          href: '/monthly-data',
          renderIcon: Document,
        },
        {
          id: '8',
          value: 'Data warehouse',
          label: 'Data warehouse',
          href: '/data-warehouse',
          isExpanded: true,
          renderIcon: Folder,
          children: [
            {
              id: '8-1',
              value: 'Report samples',
              label: 'Report samples',
              href: '/report-samples',
              renderIcon: Document,
            },
            {
              id: '8-2',
              value: 'Sales performance',
              label: 'Sales performance',
              href: '/sales-performance',
              renderIcon: Document,
            },
          ],
        },
      ],
    },
  ];

  return (
    <TreeView
      label="Tree View"
      hideLabel
      active="1"
      selected={['1']}
      onSelect={(event, node) => setCurrentPage(node.value)}>
      {renderTree({ nodes, withLinks: true })}
    </TreeView>
  );
});

export const WithLinks = () => {
  const [currentPage, setCurrentPage] = React.useState(
    'Artificial Intelligence'
  );

  return (
    <div id="page-body">
      <TreeViewWithLinks setCurrentPage={setCurrentPage} />
      <main>
        <h3>The current page is: {currentPage}</h3>
      </main>
    </div>
  );
};

export const WithControlledExpansion = () => {
  const nodes = [
    {
      id: '1',
      value: 'Artificial intelligence',
      label: <span>Artificial intelligence</span>,
      renderIcon: Document,
    },
    {
      id: '2',
      value: 'Blockchain',
      label: 'Blockchain',
      renderIcon: Document,
    },
    {
      id: '3',
      value: 'Business automation',
      label: 'Business automation',
      renderIcon: Folder,
      children: [
        {
          id: '3-1',
          value: 'Business process automation',
          label: 'Business process automation',
          renderIcon: Document,
        },
        {
          id: '3-2',
          value: 'Business process mapping',
          label: 'Business process mapping',
          renderIcon: Document,
        },
      ],
    },
    {
      id: '4',
      value: 'Business operations',
      label: 'Business operations',
      renderIcon: Document,
    },
    {
      id: '5',
      value: 'Cloud computing',
      label: 'Cloud computing',
      isExpanded: true,
      renderIcon: Folder,
      children: [
        {
          id: '5-1',
          value: 'Containers',
          label: 'Containers',
          renderIcon: Document,
        },
        {
          id: '5-2',
          value: 'Databases',
          label: 'Databases',
          renderIcon: Document,
        },
        {
          id: '5-3',
          value: 'DevOps',
          label: 'DevOps',
          isExpanded: true,
          renderIcon: Folder,
          children: [
            {
              id: '5-4',
              value: 'Solutions',
              label: 'Solutions',
              renderIcon: Document,
            },
            {
              id: '5-5',
              value: 'Case studies',
              label: 'Case studies',
              isExpanded: true,
              renderIcon: Folder,
              children: [
                {
                  id: '5-6',
                  value: 'Resources',
                  label: 'Resources',
                  renderIcon: Document,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: '6',
      value: 'Data & Analytics',
      label: 'Data & Analytics',
      renderIcon: Folder,
      children: [
        {
          id: '6-1',
          value: 'Big data',
          label: 'Big data',
          renderIcon: Document,
        },
        {
          id: '6-2',
          value: 'Business intelligence',
          label: 'Business intelligence',
          renderIcon: Document,
        },
      ],
    },
    {
      id: '7',
      value: 'Models',
      label: 'Models',
      isExpanded: true,
      disabled: true,
      renderIcon: Folder,
      children: [
        {
          id: '7-1',
          value: 'Audit',
          label: 'Audit',
          renderIcon: Document,
        },
        {
          id: '7-2',
          value: 'Monthly data',
          label: 'Monthly data',
          renderIcon: Document,
        },
        {
          id: '8',
          value: 'Data warehouse',
          label: 'Data warehouse',
          isExpanded: true,
          renderIcon: Folder,
          children: [
            {
              id: '8-1',
              value: 'Report samples',
              label: 'Report samples',
              renderIcon: Document,
            },
            {
              id: '8-2',
              value: 'Sales performance',
              label: 'Sales performance',
              renderIcon: Document,
            },
          ],
        },
      ],
    },
  ];

  const [expanded, setExpanded] = React.useState(undefined);

  function renderTree({ nodes, expanded, withIcons = false }) {
    if (!nodes) {
      return;
    }
    return nodes.map(({ children, renderIcon, isExpanded, ...nodeProps }) => (
      <TreeNode
        key={nodeProps.id}
        renderIcon={withIcons ? renderIcon : null}
        isExpanded={expanded ?? isExpanded}
        {...nodeProps}>
        {renderTree({ nodes: children, expanded, withIcons })}
      </TreeNode>
    ));
  }

  return (
    <>
      <div style={{ marginBottom: '1rem' }}>
        <Button onClick={() => setExpanded(true)}>Expand all</Button>
        &nbsp;
        <Button onClick={() => setExpanded(false)}>Collapse all</Button>
      </div>
      <TreeView label="Tree View">{renderTree({ nodes, expanded })}</TreeView>
    </>
  );
};
