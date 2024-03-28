import React, { useCallback, useEffect } from 'react';
import cx from 'classnames';
import { ComposedModal, ComposedModalProps } from '../ComposedModal';
import { usePrefix } from '../../internal/usePrefix';
import PropTypes from 'prop-types';

export interface SidePanelProps extends Omit<ComposedModalProps, 'size'> {
  alignment?: 'start' | 'end';
  onClose?(event: MouseEvent): void | boolean;
  open?: boolean;
  selectorPageContent?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | '2xl';
}

export const SidePanel = React.forwardRef<HTMLDivElement, SidePanelProps>(
  function SidePanel(
    { alignment, className, onClose, open, size, selectorPageContent, ...rest },
    ref
  ) {
    const prefix = usePrefix();

    const handleOpenClose = useCallback(
      (force?: boolean) => {
        if (selectorPageContent) {
          const isOpen = force !== undefined ? force : open;

          console.log(selectorPageContent);

          try {
            const pageContent = document.querySelector(selectorPageContent);
            if (pageContent) {
              pageContent.classList.add(
                `${prefix}--side-panel--selector-page-content`
              );

              pageContent.setAttribute('data-open', `${isOpen}`);
              pageContent.setAttribute('data-alignment', alignment || 'end');
              pageContent.setAttribute('data-size', size || 'md');
            }
          } catch (err) {
            // do nothing
          }
        }
      },
      [alignment, open, prefix, selectorPageContent, size]
    );

    useEffect(() => {
      handleOpenClose();
    }, [handleOpenClose]);

    const handleClose = (ev) => {
      handleOpenClose(false);
      onClose?.(ev);
    };

    return (
      <ComposedModal
        {...rest}
        className={cx(
          className,
          `${prefix}--side-panel`,
          `${prefix}--side-panel--${alignment || 'end'}`,
          `${prefix}--side-panel--${size || 'md'}`
        )}
        onClose={handleClose}
        open={open}
        ref={ref}
        size={size === '2xl' ? 'lg' : size} /* Modal does not have a 2xl size */
      />
    );
  }
);

SidePanel.propTypes = {
  /**
   * Specify an optional location for the side kind. Defaults to 'end'
   */
  alignment: PropTypes.oneOf(['start', 'end']),

  /**
   * Specify the aria-label for cds--modal-container
   */
  ['aria-label']: PropTypes.string,

  /**
   * Specify the aria-labelledby for cds--modal-container
   */
  ['aria-labelledby']: PropTypes.string,

  /**
   * Specify the content to be placed in the ComposedModal
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the modal root node
   */
  className: PropTypes.string,

  /**
   * Specify an optional className to be applied to the modal node
   */
  containerClassName: PropTypes.string,

  /**
   * Specify whether the primary button should be replaced with danger button.
   * Note that this prop is not applied if you render primary/danger button by yourself
   */
  danger: PropTypes.bool,

  /**
   * Specify whether the Modal content should have any inner padding.
   */
  isFullWidth: PropTypes.bool,

  /**
   * Provide a ref to return focus to once the modal is closed.
   */
  // @ts-expect-error: Invalid derived type
  launcherButtonRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.any,
    }),
  ]),

  /**
   * Specify an optional handler for closing modal.
   * Returning `false` here prevents closing modal.
   */
  onClose: PropTypes.func,

  /**
   * Specify an optional handler for the `onKeyDown` event. Called for all
   * `onKeyDown` events that do not close the modal
   */
  onKeyDown: PropTypes.func,

  /**
   * Specify whether the Modal is currently open
   */
  open: PropTypes.bool,

  preventCloseOnClickOutside: PropTypes.bool,

  /**
   * Specify a selector which if provided will have it's margin adjusted
   * to reduce it's inline-size
   */
  selectorPageContent: PropTypes.string,

  /**
   * Specify a CSS selector that matches the DOM element that should be
   * focused when the Modal opens
   */
  selectorPrimaryFocus: PropTypes.string,

  /**
   * Specify the CSS selectors that match the floating menus
   */
  selectorsFloatingMenus: PropTypes.arrayOf(PropTypes.string),

  /**
   * Specify the size variant.
   */
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', '2xl']),

  /**
   * **Experimental**: Provide a `Slug` component to be rendered inside the `ComposedModal` component
   */
  slug: PropTypes.node,
};

SidePanel.displayName = 'SidePanel';

export default SidePanel;
