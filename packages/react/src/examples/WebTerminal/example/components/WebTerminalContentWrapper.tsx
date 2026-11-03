/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { ReactNode } from 'react';
import cx from 'classnames';
import { useWebTerminal } from './WebTerminalProvider';

const blockClass = 'web-terminal-content-wrapper';

export interface WebTerminalContentWrapperProps {
  /** Main page content that shifts when the terminal opens */
  children: ReactNode;
  className?: string;
}

/**
 * Wraps the main page content and shifts it to accommodate the open terminal.
 * Connect it to the terminal's open state via the WebTerminalProvider.
 */
export const WebTerminalContentWrapper = ({
  children,
  className,
}: WebTerminalContentWrapperProps) => {
  const { open } = useWebTerminal();

  return (
    <div
      className={cx(blockClass, { [`${blockClass}--open`]: open }, className)}
    >
      {children}
    </div>
  );
};

WebTerminalContentWrapper.displayName = 'WebTerminalContentWrapper';
