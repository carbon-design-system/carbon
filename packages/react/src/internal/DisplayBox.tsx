/**
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import React, { type ReactNode } from 'react';

const blockClass = 'ccs-sb--display-box';

interface DisplayBoxProps {
  children?: ReactNode;
  className?: string;
  msg?: ReactNode;
}

export const DisplayBox = ({ children, className, msg }: DisplayBoxProps) => {
  return (
    <div className={cx(blockClass, className)}>
      <div className={`${blockClass}__indicator`}>
        <div className={`${blockClass}__message`}>
          {msg || (
            <>
              width available to component
              <br />
              (use containerWidth control to adjust)
            </>
          )}
        </div>
        <div className={`${blockClass}__indicator--left`} />
        <div className={`${blockClass}__indicator--right`} />
      </div>
      {children}
    </div>
  );
};
