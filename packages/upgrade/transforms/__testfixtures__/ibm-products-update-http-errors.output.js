import { Link } from "@carbon/react";
import React from 'react';
import { FullPageError } from '@carbon/ibm-products';
import './_example.scss';

export const Example = () => (
  <>
    <FullPageError
      description="You are not authorized to access this resource."
      label="Error 403"
      children={<><Link href={"https://www.carbondesignsystem.com"}>Carbon Design System</Link><br /><Link href={"https://github.com/carbon-design-system/ibm-products"}>Carbon for IBM Products component library</Link><br /><Link href={"https://github.com/carbon-design-system/ibm-products"}>Carbon for IBM Products component library</Link><br /><Link href={"https://github.com/carbon-design-system/ibm-products"}>Carbon for IBM Products component library</Link><br /><Link href={"https://github.com/carbon-design-system/ibm-products"}>Carbon for IBM Products component library</Link></>}
      title="Forbidden"
      kind="403" />
    <FullPageError
      description="The page you are looking for was not found."
      label="Error 404"
      children={<><Link href={"https://www.carbondesignsystem.com"}>Carbon Design System</Link><br /><Link href={"https://github.com/carbon-design-system/ibm-products"}>Carbon for IBM Products component library</Link></>}
      title="Page not found"
      kind="404" />
    <FullPageError
      description="Received an invalid response."
      label="Error 502"
      children={<><Link href={"https://www.carbondesignsystem.com"}>Carbon Design System</Link><br /><Link href={"https://github.com/carbon-design-system/ibm-products"}>Carbon for IBM Products component library</Link></>}
      title="Bad gateway"
      kind="custom" />
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
