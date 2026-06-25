/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect } from 'react';

export const useRetrieveFormTitles = ({ formContext, formNumber, title }) => {
  useEffect(() => {
    if (formContext) {
      formContext.setFormTitles((prev) => {
        const prevTitle = prev[formNumber];
        if (prevTitle !== title) {
          const clone = [...prev];
          clone[formNumber] = title;
          return clone;
        }
        return prev;
      });
    }
  }, [title, formContext, formNumber]);
};
