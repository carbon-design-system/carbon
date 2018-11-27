import { settings } from 'carbon-components';
import wrapComponent from '../../tools/wrapComponent';

const { prefix } = settings;

const TableToolbar = wrapComponent({
  name: 'TableToolbar',
  type: 'section',
  className: `${prefix}--table-toolbar`,
});

export default TableToolbar;
