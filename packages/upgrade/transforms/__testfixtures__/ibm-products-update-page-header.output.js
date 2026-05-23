import { Button } from '@carbon/react';
import { PageHeader, PageHeaderBreadcrumbBar, PageHeaderContent, PageHeaderTabBar } from "@carbon/ibm-products";

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
