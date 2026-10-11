/**
 * Copyright IBM Corp. 2024, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
//cspell:disable

export const sampleDataStructure_Hierarchical = {
  operator: 'or',
  groups: [
    {
      groupOperator: 'and',
      statement: 'ifAll',
      id: crypto.randomUUID(),
      conditions: [
        {
          property: 'continent',
          operator: 'is',
          value: {
            label: 'Africa',
            id: 'Africa',
          },
          id: crypto.randomUUID(),
        },
        {
          property: 'region',
          operator: 'oneOf',
          value: [
            {
              label: 'Algeria',
              id: 'DZ',
            },
            {
              label: 'Andorra',
              id: 'AD',
            },
          ],
          id: crypto.randomUUID(),
        },
        {
          statement: 'unlessAll',
          groupOperator: 'and',
          conditions: [
            {
              property: 'delivery',
              operator: 'is',
              value: {
                label: 'Delivered',
                id: 'Delivered',
              },
              id: crypto.randomUUID(),
            },
            {
              property: 'id',
              operator: 'startsWith',
              value: '#delivered',
              id: crypto.randomUUID(),
            },
          ],
          id: crypto.randomUUID(),
        },
        {
          statement: 'ifAny',
          groupOperator: 'or',
          conditions: [
            {
              property: 'season',
              operator: 'is',
              value: {
                label: 'Summer',
                id: 'Summer',
              },
              id: crypto.randomUUID(),
            },
            {
              property: 'season',
              operator: 'is',
              value: {
                label: 'Fall',
                id: 'Fall',
              },
              id: crypto.randomUUID(),
            },
          ],
          id: crypto.randomUUID(),
        },
      ],
    },
    {
      statement: 'ifAll',
      groupOperator: 'and',
      id: crypto.randomUUID(),
      conditions: [
        {
          property: 'delivery',
          operator: 'oneOf',
          value: [
            {
              label: 'Processing',
              id: 'Processing',
            },
            {
              label: 'Preparing for dispatch',
              id: 'Preparing for dispatch',
            },
          ],
          id: crypto.randomUUID(),
        },
        {
          statement: 'ifAll',
          groupOperator: 'and',
          conditions: [
            {
              property: 'price',
              operator: 'greater',
              value: '50 Dollars',
              id: crypto.randomUUID(),
            },
            {
              property: 'id',
              operator: 'is',
              value: '#proccessing',
              id: crypto.randomUUID(),
            },
          ],
          id: crypto.randomUUID(),
        },
      ],
    },
  ],
};

export const sampleDataStructure_nonHierarchical = {
  groups: [
    {
      groupOperator: 'and',
      statement: 'ifAll',
      id: crypto.randomUUID(),
      conditions: [
        {
          property: 'continent',
          operator: 'is',
          value: {
            label: 'Asia',
            id: 'Asia',
          },
          id: crypto.randomUUID(),
        },
        {
          property: 'region',
          operator: 'oneOf',
          value: [
            {
              label: 'Afghanistan',
              id: 'AF',
            },
            {
              label: 'India',
              id: 'IN',
            },
          ],
          id: crypto.randomUUID(),
        },
        {
          property: 'date',
          operator: 'between',
          value: '10/03/2025 - 13/03/2025',
          id: crypto.randomUUID(),
        },
        {
          property: 'season',
          operator: 'is',
          value: {
            label: 'Fall',
            id: 'Fall',
          },
          id: crypto.randomUUID(),
        },
      ],
    },
  ],
  operator: 'or',
};

export const initialStateWithCustomOperators = {
  operator: 'or',
  groups: [
    {
      groupOperator: 'and',
      statement: 'ifAll',
      id: 'e1c37cb2-3e11-4eb6-937a-b9add468345b',
      conditions: [
        {
          property: 'continent',
          operator: 'hasValues',
          value: [
            {
              label: 'Africa',
              id: 'Africa',
            },
            {
              label: 'Antarctica',
              id: 'Antarctica',
            },
          ],
          id: 'b7720ec9-e52a-4a7b-90c1-b4aa3c55daeb',
        },
        {
          property: 'id',
          operator: 'hasValue',
          value: 'test',
          id: 'eba8a891-7203-4b22-bf44-c4a9f0c80c4b',
        },
      ],
    },
  ],
};
