/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { PropsWithChildren, createContext } from 'react';

type AccordionProviderProp = {
  /**
   * Global setting to disable all AccordionItems
   * within the Accordion. Individual AccordionItems can be
   * disabled by passing the `disabled` prop to the AccordionItem.
   */
  disabled: boolean;
};

export const AccordionContext = createContext({ disabled: false });

export const AccordionProvider = ({
  disabled,
  children,
}: PropsWithChildren<AccordionProviderProp>) => {
  return (
    <AccordionContext.Provider value={{ disabled }}>
      {children}
    </AccordionContext.Provider>
  );
};
