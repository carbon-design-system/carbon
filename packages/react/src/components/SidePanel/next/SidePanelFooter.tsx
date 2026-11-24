/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { forwardRef } from 'react';
import cx from 'classnames';
import Button from '../../Button';
import { ButtonSet } from '../../ButtonSet';
import { usePrefix } from '../../../internal/usePrefix';
import type { SidePanelFooterProps } from './SidePanel.types';

const SidePanelFooter = forwardRef<HTMLDivElement, SidePanelFooterProps>(
  ({ actions, buttonSize = 'lg', children, className }, ref) => {
    const prefix = usePrefix();
    const blockClass = `${prefix}--side-panel__next`;
    const hasChildren = children !== undefined && children !== null;

    return (
      <div ref={ref} className={cx(`${blockClass}__footer`, className)}>
        {children}
        {!hasChildren && actions && actions.length > 0 && (
          <ButtonSet fluid className={`${blockClass}__footer-button-set`}>
            {actions.map(({ label, key, ...action }, i) => (
              <Button key={key ?? i} {...action} size={buttonSize}>
                {label}
              </Button>
            ))}
          </ButtonSet>
        )}
      </div>
    );
  }
);
SidePanelFooter.displayName = 'SidePanelFooter';

export default SidePanelFooter;
