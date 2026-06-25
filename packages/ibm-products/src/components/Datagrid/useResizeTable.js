/**
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useIsomorphicEffect } from '../../global/js/hooks';

const useResizeTable = (hooks) => {
  const useInstanceBeforeDimensions = (instance) => {
    const { rootRef, handleResize } = instance;
    const parent = rootRef && rootRef.current && rootRef.current.parentElement;
    useIsomorphicEffect(() => {
      if (!parent) {
        return () => {};
      }
      handleResize();
      if (typeof ResizeObserver === 'function') {
        let resizeObserver = new ResizeObserver(() => {
          handleResize();
        });
        resizeObserver.observe(parent);
        return () => {
          resizeObserver.disconnect(parent);
          resizeObserver = null;
        };
      }
      return console.error(
        'Could not resize table, no support for ResizeObserver'
      );
    }, [handleResize, parent]);
  };
  hooks.useInstanceBeforeDimensions.push(useInstanceBeforeDimensions);
};

export default useResizeTable;
