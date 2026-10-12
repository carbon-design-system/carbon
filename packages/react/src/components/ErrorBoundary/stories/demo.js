/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useState } from 'react';
import { ErrorBoundary, Button } from '@carbon/react';

function ThrowError({ children, errorMessage, shouldThrowError }) {
  if (shouldThrowError) {
    throw new Error(errorMessage);
  }
  return children;
}

const DemoComponent = ({
  buttonLabel,
  children,
  errorMessage,
  fallback,
  shouldThrowError: shouldThrowErrorArg,
}) => {
  const [shouldThrowError, setShouldThrowError] = useState(shouldThrowErrorArg);

  useEffect(() => {
    setShouldThrowError(shouldThrowErrorArg);
  }, [shouldThrowErrorArg]);

  function onClick() {
    setShouldThrowError(!shouldThrowError);
  }

  return (
    <>
      <Button onClick={onClick}>{buttonLabel}</Button>
      <div>
        <ErrorBoundary fallback={fallback}>
          <ThrowError
            shouldThrowError={shouldThrowError}
            errorMessage={errorMessage}>
            {children}
          </ThrowError>
        </ErrorBoundary>
      </div>
    </>
  );
};

export default DemoComponent;
