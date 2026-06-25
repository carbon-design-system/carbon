/**
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const getScrollbarWidth = () => {
  const scrollDiv = document.createElement('div');
  scrollDiv.setAttribute(
    'style',
    'width: 100px; height: 100px; overflow: scroll; position:absolute; top:-9999px;'
  );
  document.body.appendChild(scrollDiv);
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);
  return scrollbarWidth;
};
