/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useState } from 'react';
import { useQuery } from 'urql';

function Query({ children, fallback, query, variables }) {
  const [shouldShowFallback, setShouldShowFallback] = useState(false);
  const [result] = useQuery({
    query,
    variables,
  });

  useEffect(() => {
    if (result.fetching) {
      const timeoutId = setTimeout(() => {
        setShouldShowFallback(true);
      }, 1000);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [result.fetching]);

  if (result.error) {
    throw result.error;
  }

  if (result.fetching) {
    if (shouldShowFallback) {
      return fallback;
    }
    return null;
  }

  if (result.data) {
    return children(result.data);
  }

  return null;
}

export { Query };
