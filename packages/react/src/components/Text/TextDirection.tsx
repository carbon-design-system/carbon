/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { ReactNode, useEffect, useMemo, useRef } from 'react';
import {
  TextDirectionContext,
  type GetTextDirection,
  type TextDir,
  type TextDirectionContextType,
} from '.';

export interface TextDirectionProps {
  children: ReactNode;
  dir?: TextDir;
  getTextDirection?: GetTextDirection;
}

export const TextDirection = ({
  children,
  dir = 'auto',
  getTextDirection,
}: TextDirectionProps) => {
  const savedCallback = useRef(getTextDirection);
  const value = useMemo<TextDirectionContextType>(() => {
    return {
      direction: dir,
      getTextDirection: savedCallback,
    };
  }, [dir]);

  useEffect(() => {
    savedCallback.current = getTextDirection;
    // TODO: Is this `useEffect` supposed to have a dependency on
    // `getTextDirection`?
  });

  return (
    <TextDirectionContext.Provider value={value}>
      {children}
    </TextDirectionContext.Provider>
  );
};

TextDirection.propTypes = {
  /**
   * Provide children to be rendered inside of this component
   */
  children: PropTypes.node,

  /**
   * Specify the text direction for rendered children
   */
  dir: PropTypes.oneOf(['ltr', 'rtl', 'auto']),

  /**
   * Optionally provide a custom function to get the text direction for a piece
   * of text. Whatever is returned will become the value of the `dir` attribute
   * on a node of text. Should return one of: 'ltr', 'rtl', or 'auto'
   */
  getTextDirection: PropTypes.func,
};
