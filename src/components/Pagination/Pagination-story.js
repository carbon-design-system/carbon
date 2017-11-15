import React from 'react';
import { storiesOf } from '@storybook/react';
import Pagination from '../Pagination';

const props = {
  onChange: ({ page, pageSize }) => {
    console.log(`Page: ${page}`, `Page Size: ${pageSize}`); // eslint-disable-line no-console
  },
  pageSizes: [10, 20, 30, 40, 50],
};

storiesOf('Pagination', module)
  .addDecorator(story => <div style={{ width: '800px' }}>{story()}</div>)
  .addWithInfo(
    'with known total number of items',
    `
      The pagination component is used to paginate through items with known total.
    `,
    () => <Pagination {...props} totalItems={103} />
  )
  .addWithInfo(
    'with unknown total number of items',
    `
      The pagination component is used to paginate through items with unknown total.
    `,
    () => (
      <Pagination
        {...props}
        pagesUnknown={true}
        isLastPage={false}
        pageInputDisabled={true}
      />
    )
  )
  .addWithInfo(
    'multipe pagination components',
    `Showcasing unique ids for each pagination component`,
    () => {
      return (
        <div>
          <Pagination {...props} totalItems={103} />
          <Pagination {...props} totalItems={103} />
        </div>
      );
    }
  );
