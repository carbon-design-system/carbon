/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  RefObject,
} from 'react';
import classnames from 'classnames';
import { Popover, PopoverContent } from '@carbon/react';
import { blockClass } from '../PageHeaderUtils';
import { createOverflowHandler as localOverflowHandler } from './overflowHandler';
import { pkg } from '../../../settings';

export interface PageHeaderTagOverflowProps {
  // Maybe scope this more to only accept tag or operational tag children
  children: React.ReactNode;
  renderOverflowTag?: (
    hiddenBreadcrumbs: HTMLElement[],
    handleOverflowClick: (event: React.MouseEvent) => void,
    openPopover: boolean,
    triggerId?: string
  ) => React.ReactElement;
  renderPopoverContent?: (
    hiddenBreadcrumbs: HTMLElement[]
  ) => React.ReactElement;
}

export const PageHeaderTagOverflow = React.forwardRef<
  HTMLDivElement,
  PageHeaderTagOverflowProps
>(({ renderOverflowTag, renderPopoverContent, children }, ref) => {
  const [openPopover, setOpenPopover] = useState(false);
  const [hiddenTags, setHiddenTags] = useState<HTMLElement[]>([]);
  const overflowButtonId = `${pkg.prefix}--page-header--tag-overflow-btn`;

  const localRef = useRef<HTMLDivElement>(null);
  const tagsContainerRef = (ref || localRef) as RefObject<HTMLDivElement>;

  // To close popover when window resizes
  useEffect(() => {
    const handleResize = () => {
      // Return focus to the trigger before closing so keyboard users are not
      // stranded when the popover is dismissed programmatically.
      if (openPopover) {
        const trigger = tagsContainerRef.current?.querySelector<HTMLElement>(
          `#${overflowButtonId}`
        );
        trigger?.focus();
      }
      setOpenPopover(false);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [openPopover, overflowButtonId, tagsContainerRef]);

  const handleOverflowClick = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
    setOpenPopover((prev) => !prev);
  }, []);

  useEffect(() => {
    if (tagsContainerRef.current) {
      localOverflowHandler({
        container: tagsContainerRef.current,
        onChange: (_, hidden) => {
          setHiddenTags(hidden);
        },
      });
    }
    // Don't want ref in dependency array
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={tagsContainerRef}
      className={classnames(
        `${pkg.prefix}--page-header--tag-overflow-container`,
        {
          [`${pkg.prefix}--page-header--tag-overflow-container__has-no-hidden-items`]:
            !hiddenTags.length,
        }
      )}>
      {children}
      <Popover
        open={openPopover}
        onRequestClose={() => setOpenPopover(false)}
        data-fixed
        aria-labelledby={overflowButtonId}
        className={classnames(
          `${pkg.prefix}--page-header--tag-overflow-popover`,
          {
            [`${pkg.prefix}--page-header--tag-overflow-popover__hidden`]:
              !hiddenTags.length,
          }
        )}>
        {renderOverflowTag?.(
          hiddenTags,
          handleOverflowClick,
          openPopover,
          overflowButtonId
        )}
        <PopoverContent>
          <ul
            className={`${blockClass}__tags-popover-list`}
            aria-label="Hidden tags">
            {renderPopoverContent?.(hiddenTags)}
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
});

PageHeaderTagOverflow.displayName = 'PageHeaderTagOverflow';
