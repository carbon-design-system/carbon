import React from 'react';
import { storiesOf } from '@kadira/storybook';
import InteriorLeftNav from '../../components/InteriorLeftNav';
import InteriorLeftNavItem from '../../components/InteriorLeftNavItem';
import InteriorLeftNavList from '../../components/InteriorLeftNavList';

storiesOf('InteriorLeftNav', module).addWithInfo(
  '',
  `
      Interior left navigation organizes the content structure and provides
      context to support user orientation. This pattern accommodates the
      breadth of content and tasks users expect to see.
    `,
  () => (
    <InteriorLeftNav>
      <InteriorLeftNavList title="Example Item 1">
        <InteriorLeftNavItem href="#example-item-1A" label="Example Item 1A" />
        <InteriorLeftNavItem href="#example-item-1B" label="Example Item 1B" />
        <InteriorLeftNavItem href="#example-item-1C" label="Example Item 1C" />
        <InteriorLeftNavItem href="#example-item-1D" label="Example Item 1D" />
      </InteriorLeftNavList>
      <InteriorLeftNavList title="Example Item 2">
        <InteriorLeftNavItem href="#example-item-2A" label="Example Item 2A" />
        <InteriorLeftNavItem href="#example-item-2B" label="Example Item 2B" />
        <InteriorLeftNavItem href="#example-item-2C" label="Example Item 2C" />
        <InteriorLeftNavItem href="#example-item-2D" label="Example Item 2D" />
      </InteriorLeftNavList>
      <InteriorLeftNavItem href="#example-item-3" label="Example Item 3" />
      <InteriorLeftNavItem href="#example-item-4" label="Example Item 4" />
    </InteriorLeftNav>
  )
);
