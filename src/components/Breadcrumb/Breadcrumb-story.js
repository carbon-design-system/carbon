/* eslint-disable no-console */

import React from 'react';
import { storiesOf } from '@storybook/react';
import Breadcrumb from '../Breadcrumb';
import BreadcrumbItem from '../BreadcrumbItem';

const additionalProps = {
  onClick: () => {
    console.log('Clicked!');
  }, // eslint-disable-line no-console
  className: 'some-class',
};

storiesOf('Breadcrumb', module).addWithInfo(
  'Default',
  `
      Breadcrumb enables users to quickly see their location within a path of navigation and move up to a parent level if desired.
    `,
  () => (
    <Breadcrumb {...additionalProps}>
      <BreadcrumbItem href="#">Breadcrumb 1</BreadcrumbItem>
      <BreadcrumbItem href="w#">Breadcrumb 2</BreadcrumbItem>
      <BreadcrumbItem href="#">Breadcrumb 3</BreadcrumbItem>
    </Breadcrumb>
  )
);
