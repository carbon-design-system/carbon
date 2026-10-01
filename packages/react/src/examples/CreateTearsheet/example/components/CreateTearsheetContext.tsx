/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { createContext, useContext, ReactNode } from 'react';

interface CreateTearsheetContextType {
  open?: boolean;
}

const CreateTearsheetContext = createContext<
  CreateTearsheetContextType | undefined
>(undefined);

export const CreateTearsheetProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value: CreateTearsheetContextType;
}) => {
  return (
    <CreateTearsheetContext.Provider value={value}>
      {children}
    </CreateTearsheetContext.Provider>
  );
};

export const useCreateTearsheetContext = () => {
  const context = useContext(CreateTearsheetContext);
  if (context === undefined) {
    throw new Error(
      'useCreateTearsheetContext must be used within a CreateTearsheetProvider'
    );
  }
  return context;
};
