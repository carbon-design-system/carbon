/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React, {
  type HTMLAttributes,
  type RefObject,
  useEffect,
  useRef,
} from 'react';
import { keys, match } from '../../internal/keyboard';
import { usePrefix } from '../../internal/usePrefix';
import { deprecate } from '../../prop-types/deprecate';

const isModalDialog = (element: Element) => {
  if (element.matches('[aria-modal="true"]')) return true;
  if (!(element instanceof HTMLDialogElement) || !element.open) return false;

  try {
    return element.matches(':modal');
  } catch {
    return true;
  }
};

const isLayeredOnTop = (target: EventTarget | null, overlay: Element) => {
  if (!(target instanceof Element)) return false;

  for (
    let element: Element | null = target;
    element;
    element = element.parentElement
  ) {
    if (isModalDialog(element)) return !element.contains(overlay);
  }

  return false;
};

const focusWithBorrowedTabIndex = (element: HTMLElement) => {
  const hadTabIndex = element.hasAttribute('tabindex');

  if (!hadTabIndex) {
    element.setAttribute('tabindex', '-1');
  }

  element.focus();

  if (hadTabIndex) return;

  if (document.activeElement === element) {
    element.addEventListener(
      'blur',
      () => element.removeAttribute('tabindex'),
      { once: true }
    );
  } else {
    element.removeAttribute('tabindex');
  }
};

const restoreFocus = (
  overlay: HTMLElement,
  previouslyFocused: HTMLElement | null
) => {
  const activeElement = document.activeElement;
  const overlayOwnsFocus =
    !activeElement ||
    activeElement === document.body ||
    overlay.contains(activeElement);

  if (!overlayOwnsFocus || !previouslyFocused?.isConnected) return;

  previouslyFocused.focus();
  if (document.activeElement === previouslyFocused) return;

  const fallback = previouslyFocused.parentElement;
  if (
    !fallback ||
    fallback === document.body ||
    fallback === document.documentElement
  ) {
    return;
  }

  focusWithBorrowedTabIndex(fallback);
};

const useFocusTrap = (
  overlayRef: RefObject<HTMLDivElement | null>,
  active: boolean
) => {
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!active || !overlay) return;

    const previouslyFocused =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    if (
      document.activeElement === document.body &&
      !isLayeredOnTop(previouslyFocused, overlay)
    ) {
      overlay.focus();
    }

    let reclaiming = false;

    const reclaimFocus = () => {
      if (reclaiming) return;

      reclaiming = true;
      try {
        overlay.focus();
      } finally {
        reclaiming = false;
      }
    };

    const handleFocusIn = (event: FocusEvent) => {
      const { target } = event;
      if (!(target instanceof Node) || overlay.contains(target)) return;
      if (isLayeredOnTop(target, overlay)) return;

      reclaimFocus();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!match(event, keys.Tab)) return;
      if (isLayeredOnTop(event.target, overlay)) return;

      event.preventDefault();
      reclaimFocus();
    };

    document.addEventListener('focusin', handleFocusIn, true);
    document.addEventListener('keydown', handleKeyDown, true);

    return () => {
      document.removeEventListener('focusin', handleFocusIn, true);
      document.removeEventListener('keydown', handleKeyDown, true);

      restoreFocus(overlay, previouslyFocused);
    };
  }, [overlayRef, active]);
};

export interface LoadingProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Specify whether you want the loading indicator to be spinning or not
   */
  active?: boolean;

  /**
   * Provide an optional className to be applied to the containing node
   */
  className?: string;

  /**
   * Specify a description that would be used to best describe the loading state
   */
  description?: string;

  /**
   * @deprecated The prop `id` is no longer needed
   */
  id?: string;

  /**
   * Specify whether you would like the small variant of <Loading>
   */
  small?: boolean;

  /**
   * Specify whether you want the loader to be applied with an overlay
   */
  withOverlay?: boolean;
}

function Loading({
  active = true,
  className: customClassName,
  withOverlay = true,
  small = false,
  description = 'loading',
  ...rest
}: LoadingProps) {
  const prefix = usePrefix();
  const overlayRef = useRef<HTMLDivElement>(null);

  useFocusTrap(overlayRef, withOverlay && active);

  const loadingClassName = cx(customClassName, {
    [`${prefix}--loading`]: true,
    [`${prefix}--loading--small`]: small,
    [`${prefix}--loading--stop`]: !active,
  });
  const overlayClassName = cx({
    [`${prefix}--loading-overlay`]: true,
    [`${prefix}--loading-overlay--stop`]: !active,
  });

  const loading = (
    <div
      {...rest}
      aria-atomic="true"
      aria-live={active ? 'assertive' : 'off'}
      className={loadingClassName}>
      <svg
        className={`${prefix}--loading__svg`}
        viewBox="0 0 100 100"
        role="img"
        aria-label={description}>
        <title>{description}</title>
        {small ? (
          <circle
            className={`${prefix}--loading__background`}
            cx="50%"
            cy="50%"
            r="42"
          />
        ) : null}
        <circle
          className={`${prefix}--loading__stroke`}
          cx="50%"
          cy="50%"
          r={small ? '42' : '44'}
        />
      </svg>
    </div>
  );

  return withOverlay ? (
    <div className={overlayClassName} role="presentation">
      <div
        ref={overlayRef}
        role={active ? 'dialog' : undefined}
        aria-label={active ? description : undefined}
        tabIndex={active ? -1 : undefined}>
        {loading}
      </div>
    </div>
  ) : (
    loading
  );
}

Loading.propTypes = {
  /**
   * Specify whether you want the loading indicator to be spinning or not
   */
  active: PropTypes.bool,

  /**
   * Provide an optional className to be applied to the containing node
   */
  className: PropTypes.string,

  /**
   * Specify a description that would be used to best describe the loading state
   */
  description: PropTypes.string,

  /**
   * Provide an `id` to uniquely identify the label
   */
  id: deprecate(PropTypes.string, `\nThe prop \`id\` is no longer needed.`),

  /**
   * Specify whether you would like the small variant of <Loading>
   */
  small: PropTypes.bool,

  /**
   * Specify whether you want the loader to be applied with an overlay
   */
  withOverlay: PropTypes.bool,
};

export default Loading;
