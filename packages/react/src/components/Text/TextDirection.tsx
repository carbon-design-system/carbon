/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { ReactNode, useEffect, useMemo, useRef } from 'react';
import { TextDirectionContext } from './TextDirectionContext';

export type TextDir = 'ltr' | 'rtl' | 'auto';
export type GetTextDirection = (text: string | string[] | undefined) => TextDir;

export interface TextDirectionProps {
  children: ReactNode | undefined;
  dir?: TextDir;
  getTextDirection?: GetTextDirection;
}

function TextDirection({
  children,
  dir = 'auto',
  getTextDirection,
}: TextDirectionProps) {
  const savedCallback = useRef(getTextDirection);
  const value = useMemo(() => {
    return {
      direction: dir,
      getTextDirection: savedCallback,
    };
  }, [dir]);

  useEffect(() => {
    savedCallback.current = getTextDirection;
  });

  return (
    <TextDirectionContext.Provider value={value}>
      {children}
    </TextDirectionContext.Provider>
  );
}

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

export { TextDirection };
