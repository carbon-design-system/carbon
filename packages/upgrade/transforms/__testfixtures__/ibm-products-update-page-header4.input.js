import {
  Link,
  preview__PageHeader as PageHeader,
  PageHeaderContent,
} from '@carbon/react';
import { ProductiveCard } from '@carbon/ibm-products';
import { PageHeaderContentText as Text } from '@carbon/react/es/components/PageHeader/index.js';

const Example = () => (
  <>
    <Link href="#" />
    <PageHeader.Root>
      <PageHeaderContent title="Title" />
      <Text>Example</Text>
    </PageHeader.Root>
    <ProductiveCard />
  </>
);
