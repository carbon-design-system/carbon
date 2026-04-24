import { Button } from '@carbon/react';
import { PageHeader } from "@carbon/ibm-products";
import { PageHeaderBreadcrumbBar, PageHeaderContent, PageHeaderTabBar } from "@carbon/ibm-products";

const Example = () => (
  <>
    <Button />
    <PageHeader.Root>
      <PageHeaderBreadcrumbBar />
      <PageHeaderContent title="Title" />
      <PageHeaderTabBar />
    </PageHeader.Root>
  </>
);
