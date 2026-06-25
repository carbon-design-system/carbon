/**
 * Copyright IBM Corp. 2024, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, {
  FC,
  forwardRef,
  ForwardRefExoticComponent,
  ReactElement,
  ReactNode,
  RefAttributes,
  useContext,
  useEffect,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import { blockClass, CoachmarkContext } from './context';
import { CoachmarkContentHeaderProps } from './CoachmarkContentHeader';
import { CoachmarkContentBodyProps } from './CoachmarkContentBody';
import { PopoverContent } from '@carbon/react';
import { carbon } from '../../../../settings';
import cx from 'classnames';
import { getDevtoolsProps } from '../../../../global/js/utils/devtools';

export interface CoachmarkContentProps {
  /**
   * Provide an optional class to be applied to the containing node.
   */
  className?: string;
  /**
   * This is a required callback that has to return the content to render in the body section.
   * It can be a single child or an array of children depending on your need
   */
  children: ReactElement | ReactNode;
  /**
   * Accessible label for the coachmark content region.
   */
  'aria-label': string;
}

export type CoachmarkContentComponent = ForwardRefExoticComponent<
  CoachmarkContentProps & RefAttributes<HTMLDivElement>
> & {
  Header: FC<CoachmarkContentHeaderProps>;
  Body: FC<CoachmarkContentBodyProps>;
};

const CoachmarkContent = forwardRef<HTMLDivElement, CoachmarkContentProps>(
  (props, ref) => {
    const {
      className = '',
      children,
      'aria-label': ariaLabel,
      ...rest
    } = props;
    const coachmarkContentBlockClass = `${blockClass}--coachmark-content`;
    const {
      open,
      setContentRef,
      onClose,
      setOpen,
      triggerRef,
      selectorPrimaryFocus,
    } = useContext(CoachmarkContext);

    const handleRef = useRef<HTMLDivElement | null>(null);
    const contentRef = ref || handleRef;

    useEffect(() => {
      if (open && 'current' in contentRef && contentRef.current) {
        // Find the actual popover container (parent of PopoverContent)
        const popoverContent = contentRef.current;
        const popoverContainer = popoverContent?.closest(
          `.${carbon.prefix}--popover`
        );
        if (popoverContainer instanceof HTMLElement) {
          setContentRef(popoverContainer);
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps -- setContentRef is intentionally excluded as it's a stable setter function from context
    }, [open, contentRef]);

    // Handle Escape key to close Coachmark and return focus to trigger
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape' && open) {
          onClose?.();
          setOpen(false);
          // Return focus to the trigger element
          if (triggerRef?.current) {
            triggerRef.current.focus();
          }
        }
      };

      if (open) {
        document.addEventListener('keydown', handleKeyDown);
      }

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [open, onClose, setOpen, triggerRef]);

    // Handle Escape key to close Coachmark
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape' && open) {
          onClose?.();
          setOpen(false);
        }
      };
      if (open) {
        document.addEventListener('keydown', handleKeyDown);
      }
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [open, onClose, setOpen]);

    // Handle focus management with selectorPrimaryFocus or default to close button
    useEffect(() => {
      if (open) {
        // Use setTimeout to ensure DOM is ready and give time for any other focus management
        setTimeout(() => {
          requestAnimationFrame(() => {
            let elementToFocus: HTMLElement | null = null;

            // If selectorPrimaryFocus is provided, use it
            if (selectorPrimaryFocus) {
              elementToFocus =
                document.querySelector<HTMLElement>(selectorPrimaryFocus);
            }

            // If no selectorPrimaryFocus or element not found, default to close button
            if (
              !elementToFocus &&
              contentRef &&
              'current' in contentRef &&
              contentRef.current
            ) {
              elementToFocus = contentRef.current.querySelector<HTMLElement>(
                `.${blockClass}--content-header--close-button`
              );
            }

            if (elementToFocus) {
              elementToFocus.focus();
            }
          });
        }, 100);
      }
    }, [open, selectorPrimaryFocus, contentRef]);

    return (
      <PopoverContent
        ref={contentRef}
        className={cx(coachmarkContentBlockClass, className) || ''}
        role="region"
        aria-label={ariaLabel}
        {...rest}
        {...getDevtoolsProps('CoachmarkContent')}
      >
        {children}
      </PopoverContent>
    );
  }
) as CoachmarkContentComponent;

export default CoachmarkContent;

CoachmarkContent.propTypes = {
  /**
   * Accessible label for the coachmark content region.
   */
  'aria-label': PropTypes.string.isRequired,
  /**
   * This is a required callback that has to return the content to render in the body section.
   * It can be a single child or an array of children depending on your need
   */
  children: PropTypes.node,
  /**
   * Provide an optional class to be applied to the containing node.
   */
  className: PropTypes.string,
};
