import React from 'react';
import { render } from 'react-dom';
import CustomDataTable from './components/CustomDataTable';
import {
  rowsMany as demoRowsMany,
  columns as demoColumns,
  sortInfo as demoSortInfo,
} from './table-data';
import 'carbon-components/scss/globals/scss/styles.scss';

const App = () => (
  <CustomDataTable
    columns={demoColumns}
    rows={demoRowsMany}
    sortInfo={demoSortInfo}
    hasSelection={true}
    pageSize={5}
    start={0}
  />
);

render(<App />, document.getElementById('root'));
