/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/0F9dKH2abAd7gSfvnacfWf/-v11--IBM-Products-%E2%80%93-Carbon-Design-System?node-id=16334-6720',
  {
    props: {
      kind: figma.enum('Type', {
        Custom: 'custom',
        '403 – Access denied': '403',
        '404 – Page not found': '404',
      }),
      baseProps: figma.nestedProps('_FP error content base', {
        label: figma.enum('Type', {
          Custom: figma.string('Error code'),
          '403': 'Error 403',
          '404': 'Error 404',
          '408': 'Error 408',
          '500': 'Error 500',
          '502': 'Error 502',
          '503': 'Error 503',
          '504': 'Error 504',
        }),

        title: figma.enum('Type', {
          Custom: figma.string('Title text'),
          '403': 'Access denied',
          '404': 'Page not found',
          '408': 'Request time-out',
          '500': 'Internal server error',
          '502': 'Bad gateway',
          '503': 'Service unavailable',
          '504': 'Gateway timeout',
        }),
        description: figma.enum('Type', {
          Custom: figma.string('Description'),
          '403':
            'You are not authorized to access the requested page. Please verify that you are logged in to the hosting environment and your access permissions are correct.',
          '404':
            'The page you requested has moved or is unavailable, or the specified URL is not valid. Please check the URL or search the site for the requested content.',
          '408':
            'The server fails to complete a request within the given time due to increased network activity causing delays.',
          '500': 'A general error message for undefined server-side issues.',
          '502':
            'A gateway or proxy server receives an invalid response from an upstream server.',
          '503':
            'A gateway or proxy server receives an invalid response from an upstream server.',
          '504':
            "The server doesn't receive a response from another server within the specified time period.",
        }),
        children: figma.children('Link'),
      }),
    },
    example: (props) =>
      html`<c4p-full-page-error
        kind=${props.kind}
        description=${props.baseProps.description}
        label=${props.baseProps.label}
        title=${props.baseProps.title}
      >
        ${props.baseProps.children}
      </c4p-full-page-error>`,
    imports: [
      "import '@carbon/ibm-products-web-components/es/components/full-page-error/index.js'",
    ],
  }
);
