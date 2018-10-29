import wrapComponent from '../../tools/wrapComponent';
import { global } from './classNames';

/**
 * Generic container for `HeaderGlobalAction` components
 */
export default wrapComponent({
  name: 'HeaderGlobalBar',
  className: global.global,
  type: 'div',
});
