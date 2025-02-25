import React from 'react';
import {
  HTTPError403,
  HTTPError404,
  HTTPErrorOther,
} from '@carbon/ibm-products';
import './_example.scss';

export const Example = () => (
  <>
    <HTTPError403
      description="You are not authorized to access this resource."
      errorCodeLabel="Error 403"
      links={[
        {
          href: 'https://www.carbondesignsystem.com',
          text: 'Carbon Design System',
        },
        {
          href: 'https://github.com/carbon-design-system/ibm-products',
          text: 'Carbon for IBM Products component library',
        },
        {
          href: 'https://github.com/carbon-design-system/ibm-products',
          text: 'Carbon for IBM Products component library',
        },
        {
          href: 'https://github.com/carbon-design-system/ibm-products',
          text: 'Carbon for IBM Products component library',
        },
        {
          href: 'https://github.com/carbon-design-system/ibm-products',
          text: 'Carbon for IBM Products component library',
        },
      ]}
      title="Forbidden"
    />
    <HTTPError404
      description="The page you are looking for was not found."
      errorCodeLabel="Error 404"
      links={[
        {
          href: 'https://www.carbondesignsystem.com',
          text: 'Carbon Design System',
        },
        {
          href: 'https://github.com/carbon-design-system/ibm-products',
          text: 'Carbon for IBM Products component library',
        },
      ]}
      title="Page not found"
    />
    <HTTPErrorOther
      description="Received an invalid response."
      errorCodeLabel="Error 502"
      links={[
        {
          href: 'https://www.carbondesignsystem.com',
          text: 'Carbon Design System',
        },
        {
          href: 'https://github.com/carbon-design-system/ibm-products',
          text: 'Carbon for IBM Products component library',
        },
      ]}
      title="Bad gateway"
    />
    <MyComponent
      errorCodeLabel="error"
      links={[
        {
          href: 'https://www.carbondesignsystem.com',
          text: 'Carbon Design System',
        },
        {
          href: 'https://github.com/carbon-design-system/ibm-products',
          text: 'Carbon for IBM Products component library',
        },
      ]}
    />
  </>
);
