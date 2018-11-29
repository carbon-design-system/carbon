import { settings } from 'carbon-components';
import wrapComponent from '../../tools/wrapComponent';

const { prefix } = settings;

/**
 * Generic container for `HeaderGlobalAction` components
 */
export default wrapComponent({
  name: 'HeaderGlobalBar',
  className: `${prefix}--header__global`,
  type: 'div',
});
