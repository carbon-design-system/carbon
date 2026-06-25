/**
 * Copyright IBM Corp. 2023, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import useInlineEdit from './useInlineEdit';

const useEditableCell = (hooks) => {
  useInlineEdit(hooks, 'usingEditableCell');
};

export default useEditableCell;
