import { Link } from '@carbon/react';
import {
  ProductiveCard,
  PageHeader,
  PageHeaderContent,
  PageHeaderContentText as Text,
} from '@carbon/ibm-products';

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
