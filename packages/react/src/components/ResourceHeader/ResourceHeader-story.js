import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import ResourceHeader from './ResourceHeader';
import {
  Breadcrumb,
  BreadcrumbItem,
} from '@rocketsoftware/carbon-components-react';

const props = {
  simple: () => ({
    title: text('Title', 'Page Header'),
    subtitle: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pretium varius dolor, elementum vestibulum massa congue nec. Fusce at massa vitae urna mattis vestibulum. Pellentesque semper dolor ipsum, et rutrum libero molestie et. Curabitur in facilisis magna. Sed est libero, pellentesque vel accumsan ut, aliquet feugiat nunc.',
    ],
  }),
};

storiesOf('ResourceHeader', module)
  .addDecorator(withKnobs)
  .add(
    'Page Header',
    () => {
      return (
        <div style={{ width: 80 + '%' }}>
          <ResourceHeader
            renderBreadcrumbs={() => (
              <Breadcrumb>
                <BreadcrumbItem href="#">Breadcrumb 1</BreadcrumbItem>
                <BreadcrumbItem href="#">Breadcrumb 2</BreadcrumbItem>
              </Breadcrumb>
            )}
            {...props.simple()}
          />
        </div>
      );
    },
    {
      info: {
        text: `
              Interactive tooltip should be used if there are actions a user can take in the tooltip (e.g. a link or a button).
              For more regular use case, e.g. giving the user more text information about something, use definition tooltip or icon tooltip.
              By default, the tooltip will render above the element. The example below shows the default scenario.
            `,
      },
    }
  );
