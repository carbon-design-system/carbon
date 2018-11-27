import { settings } from 'carbon-components';
import wrapComponent from '../../tools/wrapComponent';

const { prefix } = settings;

const TableActionList = wrapComponent({
  name: 'TableActionList',
  type: 'div',
  className: `${prefix}--action-list`,
});

export default TableActionList;
