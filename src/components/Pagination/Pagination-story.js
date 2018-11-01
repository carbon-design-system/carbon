import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import {
  withKnobs,
  array,
  boolean,
  number,
  text,
} from '@storybook/addon-knobs';
import Pagination from '../Pagination';
import PaginationV2 from '../PaginationV2';

const props = () => ({
  disabled: boolean('Disable backward/forward buttons (disabled)', false),
  page: number('The current page (page)', 1),
  totalItems: number('Total number of items (totalItems)', 103),
  pagesUnknown: boolean('Total number of items unknown (pagesUnknown)', false),
  pageInputDisabled: boolean('Disable page input (pageInputDisabled)', false),
  isLastPage: boolean('At the last page (isLastPage)', false),
  backwardText: text(
    'The description for the backward icon (backwardText)',
    'Backward'
  ),
  forwardText: text(
    'The description for the backward icon (forwardText)',
    'Forward'
  ),
  pageSize: number('Number of items per page (pageSize)', 10),
  pageSizes: array('Choices of `pageSize` (pageSizes)', [10, 20, 30, 40, 50]),
  itemsPerPageText: text(
    'Label for `pageSizes` select UI (itemsPerPageText)',
    'Items per page:'
  ),
  onChange: action('onChange'),
});

storiesOf('Pagination', module)
  .addDecorator(withKnobs)
  .addDecorator(story => <div style={{ width: '800px' }}>{story()}</div>)
  .add(
    'v2',
    withInfo({
      text: `
        V2 version of the Pagination
      `,
    })(() => <PaginationV2 {...props()} />)
  )
  .add(
    'v1',
    withInfo({
      text: `
        The pagination component is used to paginate through items.
      `,
    })(() => <Pagination {...props()} />)
  )
  .add(
    'multipe pagination components',
    withInfo({
      text: `Showcasing unique ids for each pagination component`,
    })(() => {
      return (
        <div>
          <Pagination {...props()} />
          <Pagination {...props()} />
        </div>
      );
    })
  );
