import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import InteriorLeftNav from '../../components/InteriorLeftNav';
import InteriorLeftNavItem from '../../components/InteriorLeftNavItem';
import InteriorLeftNavList from '../../components/InteriorLeftNavList';

storiesOf('InteriorLeftNav', module)
  .addWithInfo(
    '',
    `
      Interior left navigation organizes the content structure and provides
      context to support user orientation. This pattern accommodates the
      breadth of content and tasks users expect to see.
    `,
    () => (
      <InteriorLeftNav onToggle={action('onToggle')}>
        <InteriorLeftNavList title="Example Item 1">
          <InteriorLeftNavItem href="#example-item-1A">
            <a href="#example-item-1A">Example Item 1A</a>
          </InteriorLeftNavItem>
          <InteriorLeftNavItem href="#example-item-1B">
            <a href="#example-item-1B">Example Item 1B</a>
          </InteriorLeftNavItem>
          <InteriorLeftNavItem href="#example-item-1C">
            <a href="#example-item-1C">Example Item 1C</a>
          </InteriorLeftNavItem>
          <InteriorLeftNavItem href="#example-item-1D">
            <a href="#example-item-1D">Example Item 1D</a>
          </InteriorLeftNavItem>
        </InteriorLeftNavList>
        <InteriorLeftNavList title="Example Item 2">
          <InteriorLeftNavItem href="#example-item-2A">
            <a href="#example-item-2A">Example Item 2A</a>
          </InteriorLeftNavItem>
          <InteriorLeftNavItem href="#example-item-2B">
            <a href="#example-item-2B">Example Item 2B</a>
          </InteriorLeftNavItem>
          <InteriorLeftNavItem href="#example-item-2C">
            <a href="#example-item-2C">Example Item 2C</a>
          </InteriorLeftNavItem>
          <InteriorLeftNavItem href="#example-item-2D">
            <a href="#example-item-2D">Example Item 2D</a>
          </InteriorLeftNavItem>
        </InteriorLeftNavList>
        <InteriorLeftNavItem href="#example-item-3">
          <a href="#example-item-3">Example Item 3</a>
        </InteriorLeftNavItem>
        <InteriorLeftNavItem href="#example-item-4">
          <a href="#example-item-4">Example Item 4</a>
        </InteriorLeftNavItem>
      </InteriorLeftNav>
    ),
  );
