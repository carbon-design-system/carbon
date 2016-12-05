import React from 'react';
import { storiesOf } from '@kadira/storybook';
import AppContainer from '../../components/AppContainer';
import Pagination from '../../components/Pagination';

const props = {
  onChange: ({ page, pageSize }) => {
    console.log(`Page: ${page}`, `Page Size: ${pageSize}`); // eslint-disable-line no-console
  },
  pageSizes: [10, 20, 30, 40, 50],
};

storiesOf('Pagination', module)
  .addDecorator((story) => (
    <AppContainer style={{ width: '800px' }}>
      {story()}
    </AppContainer>
  ))
  .addWithInfo(
    '',
    `
      Description coming soon.
    `,
    () => (
      <Pagination {...props} totalItems={103} />
    )
  );
