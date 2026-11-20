/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { forwardRef, useContext } from 'react';
import cx from 'classnames';
import { Heading } from '../../Heading';
import { TruncatedText } from '../../TruncatedText';
import { usePrefix } from '../../../internal/usePrefix';
import { SidePanelContext } from './context';
import type { SidePanelHeaderContentProps } from './SidePanel.types';

/**
 * ----------------
 * SidePanelHeaderContent
 * ----------------
 *
 * Renders the label, title, description, and header actions. Scroll-collapse
 * and action overflow are implemented in follow-up issues.
 */
const SidePanelHeaderContent = forwardRef<
  HTMLDivElement,
  SidePanelHeaderContentProps
>(
  (
    {
      children,
      className,
      description,
      headerActions,
      label,
      title,
      titleEnd,
      titleMedia,
      titleStart,
    },
    ref
  ) => {
    const prefix = usePrefix();
    const blockClass = `${prefix}--side-panel__next`;
    const { titleId } = useContext(SidePanelContext);

    return (
      <div ref={ref} className={cx(`${blockClass}__header-content`, className)}>
        {titleMedia && (
          <div className={`${blockClass}__title-media`}>{titleMedia}</div>
        )}
        {label && <div className={`${blockClass}__header-label`}>{label}</div>}
        {/* The row is always rendered so the header height is preserved when
            there is no title. */}
        <div className={`${blockClass}__title-row`}>
          {title && (
            <Heading className={`${blockClass}__header-title`} id={titleId}>
              {titleStart && (
                <span className={`${blockClass}__title-start`}>
                  {titleStart}
                </span>
              )}
              {typeof title === 'string' ? (
                <TruncatedText
                  id={`${titleId}-truncated`}
                  className={`${blockClass}__title`}
                  align="bottom"
                  autoAlign
                  value={title}
                  lines={2}
                />
              ) : (
                <span className={`${blockClass}__title`}>{title}</span>
              )}
              {titleEnd && (
                <span className={`${blockClass}__title-end`}>{titleEnd}</span>
              )}
            </Heading>
          )}
          {headerActions}
        </div>
        {description && (
          <div className={`${blockClass}__header-description`}>
            {description}
          </div>
        )}
        {children}
      </div>
    );
  }
);
SidePanelHeaderContent.displayName = 'SidePanelHeaderContent';

export default SidePanelHeaderContent;
