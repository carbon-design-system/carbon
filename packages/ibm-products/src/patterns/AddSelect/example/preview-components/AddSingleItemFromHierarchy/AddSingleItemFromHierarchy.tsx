/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { Button } from '@carbon/react';
import { Table, DataBase } from '@carbon/react/icons';
import { AddSingleItemFromHierarchy } from '../../components/AddSingleItemFromHierarchy/AddSingleItemFromHierarchy';
import { AddSelectItem } from '@carbon/ibm-products';
import './AddSingleItemFromHierarchy.scss';

// Sample hierarchical data matching the image: Connection → Schema → Tables
const sampleItems: AddSelectItem[] = [
  {
    id: 'connection-1',
    title: 'Connection',
    value: 'connection',
    subtitle: '7 schemas',
    icon: <DataBase size={20} />,
    itemDetails: {
      description:
        'Description text can go here in multiple lines to describe this category a little more and give the user more metadata. No more than 4 lines of text will be show.',
      details: {
        Columns: '19',
        Rows: '1,852',
        Size: '89.834 MB',
      },
      tags: ['Tag here', 'Long tag name here'],
    },
    children: {
      entries: [
        {
          id: 'schema-1',
          title: 'Schema 1',
          value: 'schema',
          subtitle: '54 tables',
          icon: <Table size={20} />,
          itemDetails: {
            description:
              'Primary schema containing 54 tables with comprehensive data collections and regional information.',
            details: {
              Tables: '54',
              'Total Rows': '78,456',
              'Total Size': '3.8 GB',
            },
            tags: ['Schema', 'Primary', 'Regional Data'],
          },
          children: {
            entries: [
              {
                id: 'table-1',
                title: 'Data table',
                value: 'data-table',
                subtitle: 'CSV from local',
                icon: <Table size={20} />,
                itemDetails: {
                  description:
                    'Description text can go here in multiple lines to describe this category a little more and give the user more metadata. No more than 4 lines of text will be show.',
                  details: {
                    Columns: '19',
                    Rows: '1,852',
                    Size: '89.834 MB',
                  },
                  tags: ['Tag here', 'Long tag name here'],
                },
              },
              {
                id: 'table-2',
                title: 'Quito table',
                value: 'quito-table',
                subtitle: 'CSV from local',
                icon: <Table size={20} />,
                itemDetails: {
                  description:
                    'This table contains data from Quito region with comprehensive information.',
                  details: {
                    Columns: '25',
                    Rows: '3,421',
                    Size: '125.5 MB',
                  },
                  tags: ['Regional', 'CSV'],
                },
              },
              {
                id: 'table-3',
                title: 'Hyderabad table',
                value: 'hyderabad-table',
                subtitle: 'CSV from local',
                icon: <Table size={20} />,
                itemDetails: {
                  description:
                    'Hyderabad regional data with detailed metrics and analytics.',
                  details: {
                    Columns: '18',
                    Rows: '2,156',
                    Size: '95.2 MB',
                  },
                  tags: ['Regional', 'Analytics'],
                },
              },
              {
                id: 'table-4',
                title: 'Durban table',
                value: 'durban-table',
                subtitle: 'CSV from local',
                icon: <Table size={20} />,
                itemDetails: {
                  description: 'Durban data collection with various metrics.',
                  details: {
                    Columns: '22',
                    Rows: '1,987',
                    Size: '102.3 MB',
                  },
                  tags: ['Regional'],
                },
              },
              {
                id: 'table-5',
                title: 'Durham table',
                value: 'durham-table',
                subtitle: 'CSV from local',
                icon: <Table size={20} />,
                itemDetails: {
                  description: 'Durham regional statistics and data points.',
                  details: {
                    Columns: '20',
                    Rows: '2,543',
                    Size: '110.7 MB',
                  },
                  tags: ['Regional', 'Statistics'],
                },
              },
              {
                id: 'table-6',
                title: 'Kiev table',
                value: 'kiev-table',
                subtitle: 'CSV from local',
                icon: <Table size={20} />,
                itemDetails: {
                  description:
                    'Kiev data with comprehensive regional information.',
                  details: {
                    Columns: '17',
                    Rows: '1,765',
                    Size: '88.9 MB',
                  },
                  tags: ['Regional'],
                },
              },
              {
                id: 'table-7',
                title: 'Baltimore table',
                value: 'baltimore-table',
                subtitle: 'CSV from local',
                icon: <Table size={20} />,
                itemDetails: {
                  description: 'Baltimore regional data collection.',
                  details: {
                    Columns: '21',
                    Rows: '2,234',
                    Size: '98.5 MB',
                  },
                  tags: ['Regional', 'CSV'],
                },
              },
              {
                id: 'table-8',
                title: 'Oslo table',
                value: 'oslo-table',
                subtitle: 'CSV from local',
                icon: <Table size={20} />,
                itemDetails: {
                  description: 'Oslo data with detailed regional metrics.',
                  details: {
                    Columns: '16',
                    Rows: '1,543',
                    Size: '79.2 MB',
                  },
                  tags: ['Regional'],
                },
              },
              {
                id: 'table-9',
                title: 'Caracas table',
                value: 'caracas-table',
                subtitle: 'CSV from local',
                icon: <Table size={20} />,
                itemDetails: {
                  description: 'Caracas regional statistics and analytics.',
                  details: {
                    Columns: '23',
                    Rows: '2,876',
                    Size: '115.4 MB',
                  },
                  tags: ['Regional', 'Analytics'],
                },
              },
              {
                id: 'table-10',
                title: 'Buenos Aires table',
                value: 'buenos-aires-table',
                subtitle: 'CSV from local',
                icon: <Table size={20} />,
                itemDetails: {
                  description:
                    'Description text can go here in multiple lines to describe this category a little more and give the user more metadata. No more than 4 lines of text will be show.',
                  details: {
                    Columns: '19',
                    Rows: '1,852',
                    Size: '89.834 MB',
                  },
                  tags: ['Tag here', 'Long tag name here'],
                },
              },
              {
                id: 'table-11',
                title: 'Lahore table',
                value: 'lahore-table',
                subtitle: 'CSV from local',
                icon: <Table size={20} />,
                itemDetails: {
                  description:
                    'Lahore regional data with comprehensive metrics.',
                  details: {
                    Columns: '24',
                    Rows: '3,123',
                    Size: '128.6 MB',
                  },
                  tags: ['Regional', 'CSV'],
                },
              },
              {
                id: 'table-12',
                title: 'Hamilton table',
                value: 'hamilton-table',
                subtitle: 'CSV from local',
                icon: <Table size={20} />,
                itemDetails: {
                  description:
                    'Hamilton data collection with various analytics.',
                  details: {
                    Columns: '18',
                    Rows: '1,987',
                    Size: '92.3 MB',
                  },
                  tags: ['Regional'],
                },
              },
              {
                id: 'table-13',
                title: 'Portland table',
                value: 'portland-table',
                subtitle: 'CSV from local',
                icon: <Table size={20} />,
                itemDetails: {
                  description: 'Portland regional statistics and data.',
                  details: {
                    Columns: '20',
                    Rows: '2,345',
                    Size: '105.7 MB',
                  },
                  tags: ['Regional', 'Statistics'],
                },
              },
              {
                id: 'table-14',
                title: 'Montreal table',
                value: 'montreal-table',
                subtitle: 'CSV from local',
                icon: <Table size={20} />,
                itemDetails: {
                  description: 'Montreal data with comprehensive information.',
                  details: {
                    Columns: '22',
                    Rows: '2,654',
                    Size: '112.8 MB',
                  },
                  tags: ['Regional', 'CSV'],
                },
              },
            ],
          },
        },
        {
          id: 'schema-2',
          title: 'Schema 2',
          value: 'schema-2',
          subtitle: '32 tables',
          icon: <Table size={20} />,
          itemDetails: {
            description:
              'Schema 2 contains 32 tables with various data collections and analytics information.',
            details: {
              Tables: '32',
              'Total Rows': '45,234',
              'Total Size': '2.1 GB',
            },
            tags: ['Schema', 'Database'],
          },
        },
        {
          id: 'schema-3',
          title: 'Schema 3',
          value: 'schema-3',
          subtitle: '18 tables',
          icon: <Table size={20} />,
          itemDetails: {
            description:
              'Schema 3 provides access to 18 specialized tables for data analysis.',
            details: {
              Tables: '18',
              'Total Rows': '28,567',
              'Total Size': '1.3 GB',
            },
            tags: ['Schema', 'Analytics'],
          },
        },
        {
          id: 'schema-4',
          title: 'Schema 4',
          value: 'schema-4',
          subtitle: '45 tables',
          icon: <Table size={20} />,
          itemDetails: {
            description:
              'Schema 4 is the largest schema with 45 tables containing comprehensive datasets.',
            details: {
              Tables: '45',
              'Total Rows': '67,890',
              'Total Size': '3.2 GB',
            },
            tags: ['Schema', 'Large Dataset'],
          },
        },
        {
          id: 'schema-5',
          title: 'Schema 5',
          value: 'schema-5',
          subtitle: '27 tables',
          icon: <Table size={20} />,
          itemDetails: {
            description:
              'Schema 5 contains 27 tables with regional and temporal data.',
            details: {
              Tables: '27',
              'Total Rows': '38,421',
              'Total Size': '1.8 GB',
            },
            tags: ['Schema', 'Regional'],
          },
        },
        {
          id: 'schema-6',
          title: 'Schema 6',
          value: 'schema-6',
          subtitle: '39 tables',
          icon: <Table size={20} />,
          itemDetails: {
            description:
              'Schema 6 provides 39 tables with business intelligence data.',
            details: {
              Tables: '39',
              'Total Rows': '52,345',
              'Total Size': '2.5 GB',
            },
            tags: ['Schema', 'Business Intelligence'],
          },
        },
        {
          id: 'schema-7',
          title: 'Schema 7',
          value: 'schema-7',
          subtitle: '21 tables',
          icon: <Table size={20} />,
          itemDetails: {
            description:
              'Schema 7 contains 21 tables with historical and archived data.',
            details: {
              Tables: '21',
              'Total Rows': '31,256',
              'Total Size': '1.5 GB',
            },
            tags: ['Schema', 'Historical'],
          },
        },
      ],
    },
  },
];

export const AddSingleItemFromHierarchyPreview = () => {
  const [open, setOpen] = useState(false);

  const handleSubmit = (itemId: string, value: string, item?: any) => {
    console.log('Submitted:', { itemId, value, item });
  };

  return (
    <div className="example-container">
      <h3>Add Single Item From Hierarchy Pattern Example</h3>
      <p>
        Click the button below to open the add single item dialog with
        hierarchical navigation and side panel for item details.
      </p>

      <Button
        kind="primary"
        className="launch-button"
        onClick={() => setOpen(true)}
      >
        Add asset
      </Button>

      <AddSingleItemFromHierarchy
        open={open}
        setOpen={setOpen}
        items={sampleItems}
        onSubmit={handleSubmit}
        title="Add asset"
        description="Select asset from the list lorem ipsum dolor infotext."
        itemsLabel="Assets"
        globalSearchLabel="Find assets"
        globalSearchPlaceholder="Find assets"
        searchResultsTitle="Search results"
        rootBreadcrumbTitle="Assets"
        noResultsTitle="No results found"
        noResultsDescription="Try adjusting your search or browse categories"
        primaryButtonText="Add"
        secondaryButtonText="Cancel"
        successNotificationTitle="Asset Added"
        successNotificationSubtitle="Successfully added: {value}"
        sidePanelTitle="Selected asset"
        sidePanelDescriptionLabel="Description"
        sidePanelDetailsLabel="Asset details"
        sidePanelTagsLabel="Tags"
        columnSearchPlaceholder="Find"
      />
    </div>
  );
};
