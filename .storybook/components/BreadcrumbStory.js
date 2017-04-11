import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Breadcrumb from '../../components/Breadcrumb';
import BreadcrumbItem from '../../components/BreadcrumbItem';

const additionalProps = {
  onClick: () => { console.log('Clicked!'); },  // eslint-disable-line no-console
  className: 'some-class',
};

storiesOf('Breadcrumb', module)
  .addWithInfo(
    '',
    `
      Breadcrumb enables users to quickly see their location within a path of navigation and move up to a parent level if desired.
    `,
    () => (
      <Breadcrumb {...additionalProps}>
        <BreadcrumbItem href="www.google.com">Breadcrumb 1</BreadcrumbItem>
        <BreadcrumbItem href="www.google.com">Breadcrumb 2</BreadcrumbItem>
        <BreadcrumbItem href="www.google.com">Breadcrumb 3</BreadcrumbItem>
      </Breadcrumb>
  ));
