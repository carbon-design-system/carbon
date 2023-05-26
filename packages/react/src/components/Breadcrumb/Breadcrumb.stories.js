/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-console */

import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbSkeleton } from '../Breadcrumb';
import OverflowMenu from '../OverflowMenu';
import OverflowMenuItem from '../OverflowMenuItem';
import mdx from './Breadcrumb.mdx';

export default {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  subcomponents: {
    BreadcrumbItem,
    BreadcrumbSkeleton,
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

const CarbonBuilderLink = () => {
  return (
    <>
      <a href="https://builder.carbondesignsystem.com/from-json/%7B%22title%22%3A%22BreadcrumbFragment%22%2C%22data%22%3A%7B%22items%22%3A%5B%7B%22type%22%3A%22breadcrumb%22%2C%22noTrailingSlash%22%3Afalse%2C%22items%22%3A%5B%7B%22type%22%3A%22breadcrumb-item%22%2C%22label%22%3A%22Breadcrumb%22%2C%22href%22%3A%22%2F%22%2C%22id%22%3A%223%22%2C%22codeContext%22%3A%7B%22name%22%3A%22breadcrumb-item-3%22%7D%7D%5D%2C%22id%22%3A%222%22%2C%22codeContext%22%3A%7B%22name%22%3A%22breadcrumb-2%22%7D%7D%5D%2C%22id%22%3A1%7D%2C%22allCssClasses%22%3A%5B%5D%7D" target="_blank">
        Edit on Carbon UI Builder 
      </a>
      <br></br>
      <br></br>
    </>
  );
};

export const Default = () => (
  <div>
    <CarbonBuilderLink></CarbonBuilderLink>
    <Breadcrumb>
      <BreadcrumbItem>
        <a href="/#">Breadcrumb 1</a>
      </BreadcrumbItem>
      <BreadcrumbItem href="#">Breadcrumb 2</BreadcrumbItem>
      <BreadcrumbItem href="#">Breadcrumb 3</BreadcrumbItem>
      <BreadcrumbItem>Breadcrumb 4</BreadcrumbItem>
    </Breadcrumb>
  </div>
);

export const BreadcrumbWithOverflowMenu = () => (
  <div>
    <CarbonBuilderLink></CarbonBuilderLink>
    <Breadcrumb>
      <BreadcrumbItem>
        <a href="/#">Breadcrumb 1</a>
      </BreadcrumbItem>
      <BreadcrumbItem href="#">Breadcrumb 2</BreadcrumbItem>
      <BreadcrumbItem data-floating-menu-container>
        <OverflowMenu aria-label="Overflow menu in a breadcrumb">
          <OverflowMenuItem itemText="Breadcrumb 3" />
          <OverflowMenuItem itemText="Breadcrumb 4" />
        </OverflowMenu>
      </BreadcrumbItem>
      <BreadcrumbItem href="#">Breadcrumb 5</BreadcrumbItem>
      <BreadcrumbItem>Breadcrumb 6</BreadcrumbItem>
    </Breadcrumb>
  </div>
);

export const Skeleton = () => <div><CarbonBuilderLink></CarbonBuilderLink><BreadcrumbSkeleton /></div>;

export const Playground = (args) => (
  <div>
    <CarbonBuilderLink></CarbonBuilderLink>
    <Breadcrumb {...args}>
      <BreadcrumbItem>
        <a href="/#">Breadcrumb 1</a>
      </BreadcrumbItem>
      <BreadcrumbItem href="#">Breadcrumb 2</BreadcrumbItem>
      <BreadcrumbItem href="#">Breadcrumb 3</BreadcrumbItem>
      <BreadcrumbItem>Breadcrumb 4</BreadcrumbItem>
    </Breadcrumb>
  </div>
);

Playground.argTypes = {
  children: {
    table: {
      disable: true,
    },
  },
};
