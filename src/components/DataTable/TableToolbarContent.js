import wrapComponent from '../../tools/wrapComponent';
import { settings } from 'carbon-components';

const { prefix } = settings;

const TableToolbarContent = wrapComponent({
  name: 'TableToolbarContent',
  type: 'div',
  className: `${prefix}--toolbar-content`,
});

export default TableToolbarContent;
