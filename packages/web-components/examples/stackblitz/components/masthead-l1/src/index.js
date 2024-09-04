/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@carbon/ibmdotcom-web-components/es/components/masthead';
import './index.scss';

const l1Data = {
  title: 'L1 section name',
  url: 'https://www.ibm.com/analytics',
  menuItems: [
    {
      title: 'Single Column',
      titleEnglish: 'Single Column',
      submenu: {
        columns: 1,
        menuSections: [
          {
            span: 1,
            items: [
              {
                title: 'Link item (A1)',
                url: 'https://example.com',
              },
              {
                title: 'Link item (A2)',
                url: 'https://example.com',
              },
              {
                title: 'Link item (A3)',
                url: 'https://example.com',
              },
              {
                title: 'Link item (A4)',
                url: 'https://example.com',
              },
            ],
          },
        ],
      },
    },
    {
      title: 'Two Column',
      submenu: {
        columns: 2,
        announcement:
          '<strong>Lorem ipsum:</strong> Full announcement may be linked or only a portion as an <a href="#">inline link</a>',
        footer: {
          title: 'View all lorem ipsum (B)',
          url: 'https://example.com',
        },
        menuSections: [
          {
            span: 1,
            heading: {
              headingLevel: 2,
              title: 'Heading level 2 (B1)',
              url: 'https://example.com',
            },
            items: [
              {
                title: 'Link item (B1)',
                url: 'https://example.com',
              },
              {
                title: 'Link item (B2)',
                url: 'https://example.com',
              },
              {
                title: 'Link item (B3)',
                url: 'https://example.com',
              },
            ],
          },
          {
            span: 1,
            heading: {
              headingLevel: 2,
              title: 'Heading level 2 (B2)',
            },
            items: [
              {
                title: 'Link item (B4)',
                url: 'https://example.com',
              },
              {
                title: 'Link item (B5)',
                url: 'https://example.com',
              },
              {
                title: 'Link item (B6)',
                url: 'https://example.com',
              },
            ],
          },
        ],
      },
    },
    {
      title: 'Three Column',
      submenu: {
        columns: 3,
        announcement:
          '<strong>Lorem ipsum:</strong> Full announcement may be linked or only a portion as an <a href="#">inline link</a>',
        menuSections: [
          {
            span: 1,
            heading: {
              headingLevel: 2,
              title: 'Heading level 2',
              description:
                'Description text lorem ipsum dolor sit amet commondo ligua eaget',
            },
            items: [
              {
                title: 'Link item (C1)',
                url: 'https://example.com',
              },
              {
                title: 'Link item (C2)',
                url: 'https://example.com',
              },
            ],
          },
          {
            span: 1,
            heading: {
              headingLevel: 2,
              title: 'Heading level 2',
            },
            items: [
              {
                title: 'Link item (C3)',
                url: 'https://example.com',
                description:
                  'Description text lorem ipsum dolor sit amet commondo ligua eaget',
              },
              {
                title: 'Link item (C4)',
                url: 'https://example.com',
                description:
                  'Description text lorem ipsum dolor sit amet commondo ligua eaget',
              },
              {
                title: 'Link item (C5)',
                url: 'https://example.com',
                description:
                  'Description text lorem ipsum dolor sit amet commondo ligua eaget',
              },
              {
                title: 'Link item (C6)',
                url: 'https://example.com',
                description:
                  'Description text lorem ipsum dolor sit amet commondo ligua eaget',
              },
            ],
          },
          {
            span: 1,
            heading: {
              headingLevel: 2,
              title: 'Heading level 2',
            },
            items: [
              {
                title: 'Link item  (C7)',
                url: 'https://example.com',
              },
              {
                title: 'Link item (C8)',
                url: 'https://example.com',
              },
              {
                title: 'Link item (C9)',
                url: 'https://example.com',
              },
              {
                title: 'Link item (C10)',
                url: 'https://example.com',
              },
              {
                title: 'Link item (C11)',
                url: 'https://example.com',
              },
            ],
          },
        ],
      },
    },
    {
      title: 'Three Column',
      submenu: {
        columns: 3,
        announcement:
          '<strong>Lorem ipsum:</strong> Full announcement may be linked or only a portion as an <a href="#">inline link</a>',
        menuSections: [
          {
            span: 1,
            heading: {
              headingLevel: 2,
              title: 'Narrow 1',
              description:
                'Description text lorem ipsum dolor sit amet commondo ligua eaget',
            },
            items: [
              {
                title: 'Link item (D1)',
                url: 'https://example.com',
              },
              {
                title: 'Link item (D2)',
                url: 'https://example.com',
              },
            ],
          },
          {
            span: 2,
            heading: {
              headingLevel: 2,
              title: 'Wide 1',
            },
            items: [
              {
                title: 'Link item (D3)',
                url: 'https://example.com',
                description:
                  'Description text lorem ipsum dolor sit amet commondo ligua eaget',
              },
              {
                title: 'Link item (D4)',
                url: 'https://example.com',
                description:
                  'Description text lorem ipsum dolor sit amet commondo ligua eaget',
              },
              {
                title: 'Link item (D5)',
                url: 'https://example.com',
                description:
                  'Description text lorem ipsum dolor sit amet commondo ligua eaget',
              },
              {
                title: 'Link item (D6)',
                url: 'https://example.com',
                description:
                  'Description text lorem ipsum dolor sit amet commondo ligua eaget',
              },
              {
                title: 'Link item (D7)',
                url: 'https://example.com',
                description:
                  'Description text lorem ipsum dolor sit amet commondo ligua eaget',
              },
              {
                title: 'Link item (D8)',
                url: 'https://example.com',
                description:
                  'Description text lorem ipsum dolor sit amet commondo ligua eaget',
              },
              {
                title: 'Link item (D9)',
                url: 'https://example.com',
                description:
                  'Description text lorem ipsum dolor sit amet commondo ligua eaget',
              },
              {
                title: 'Link item (D10)',
                url: 'https://example.com',
                description:
                  'Description text lorem ipsum dolor sit amet commondo ligua eaget',
              },
            ],
          },
          {
            span: 1,
            heading: {
              headingLevel: 2,
              title: 'Narrow 2',
              description:
                'Description text lorem ipsum dolor sit amet commondo ligua eaget',
            },
            items: [
              {
                title: 'Link item (D11)',
                url: 'https://example.com',
              },
              {
                title: 'Link item (D12)',
                url: 'https://example.com',
              },
            ],
          },
          {
            span: 2,
            heading: {
              headingLevel: 2,
              title: 'Wide 2',
            },
            items: [
              {
                title: 'Link item (D13)',
                url: 'https://example.com',
                description:
                  'Description text lorem ipsum dolor sit amet commondo ligua eaget',
              },
              {
                title: 'Link item (D14)',
                url: 'https://example.com',
                description:
                  'Description text lorem ipsum dolor sit amet commondo ligua eaget',
              },
              {
                title: 'Link item (D15)',
                url: 'https://example.com',
                description:
                  'Description text lorem ipsum dolor sit amet commondo ligua eaget',
              },
              {
                title: 'Link item (D16)',
                url: 'https://example.com',
                description:
                  'Description text lorem ipsum dolor sit amet commondo ligua eaget',
              },
              {
                title: 'Link item (D17)',
                url: 'https://example.com',
                description:
                  'Description text lorem ipsum dolor sit amet commondo ligua eaget',
              },
              {
                title: 'Link item (D18)',
                url: 'https://example.com',
                description:
                  'Description text lorem ipsum dolor sit amet commondo ligua eaget',
              },
              {
                title: 'Link item (D19)',
                url: 'https://example.com',
                description:
                  'Description text lorem ipsum dolor sit amet commondo ligua eaget',
              },
              {
                title: 'Link item (D20)',
                url: 'https://example.com',
                description:
                  'Description text lorem ipsum dolor sit amet commondo ligua eaget',
              },
            ],
          },
        ],
      },
    },
    {
      title: 'Plain Link',
      url: 'https://example.com',
    },
    {
      title: 'Two Column',
      submenu: {
        columns: 2,
        announcement:
          '<strong>Lorem ipsum:</strong> Full announcement may be linked or only a portion as an <a href="#">inline link</a>',
        footer: {
          title: 'View all lorem ipsum (E)',
          url: 'https://example.com',
        },
        menuSections: [
          {
            span: 1,
            heading: {
              headingLevel: 2,
              title: 'Heading level 2 (E1)',
              url: 'https://example.com',
            },
            items: [
              {
                title: 'Link item (E1)',
                url: 'https://example.com',
              },
              {
                title: 'Link item (E2)',
                url: 'https://example.com',
              },
              {
                title: 'Link item (E3)',
                url: 'https://example.com',
              },
            ],
          },
          {
            span: 1,
            heading: {
              headingLevel: 2,
              title: 'Heading level 2',
            },
            items: [
              {
                title: 'Link item (E4)',
                url: 'https://example.com',
              },
              {
                title: 'Link item (E5)',
                url: 'https://example.com',
              },
              {
                title: 'Link item (E6)',
                url: 'https://example.com',
              },
            ],
          },
        ],
      },
    },
  ],
  actions: {
    login: {
      title: 'Log in',
      url: 'https://example.com',
    },
    cta: {
      title: 'Optional CTA',
      url: 'https://example.com',
    },
  },
};

document.querySelector('c4d-masthead-container').l1Data = l1Data;
