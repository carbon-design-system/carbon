import { Button, preview__PageHeader as PageHeader } from '@carbon/react';
import {
  PageHeaderBreadcrumbBar,
  PageHeaderContent,
  PageHeaderTabBar,
} from '@carbon/react';

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
