/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// cspell:words joebob

import React, {
  ForwardedRef,
  MutableRefObject,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import cx from 'classnames';
import { Button, Theme } from '@carbon/react';
import { Close, Help } from '@carbon/react/icons';
import { useWebTerminal } from './WebTerminalProvider';

const blockClass = 'web-terminal';

interface DocumentationLink {
  itemText: string;
  href?: string;
  onClick?: () => void;
}

interface Action {
  renderIcon?: React.ElementType;
  onClick: () => void;
  iconDescription: string;
}

export interface WebTerminalProps extends PropsWithChildren {
  /** Your terminal implementation */
  children: ReactNode;
  /** Icon-button actions rendered in the terminal header bar */
  actions?: readonly Action[];
  /** Custom class name */
  className?: string;
  /** Accessible label for the close button */
  closeIconDescription: string;
  /** Links displayed in the documentation overflow menu */
  documentationLinks?: readonly DocumentationLink[];
  /** Tooltip label for the documentation overflow menu trigger */
  documentationLinksIconDescription?: string;
  /** Whether the terminal should be open on first render */
  isInitiallyOpen?: boolean;
  /** Aria-label for the terminal header bar */
  webTerminalAriaLabel?: string;
}

/**
 * WebTerminal pattern component.
 *
 * Copy this file into your application and adapt it as needed.
 * It intentionally does not import from @carbon/ibm-products — only from
 * @carbon/react and local context.
 */
export const WebTerminal = React.forwardRef(
  (
    {
      actions = [],
      children,
      className,
      closeIconDescription,
      documentationLinks = [],
      documentationLinksIconDescription = 'Show documentation links',
      isInitiallyOpen = false,
      webTerminalAriaLabel = 'Web terminal header',
      ...rest
    }: WebTerminalProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const localRef = useRef<HTMLDivElement>(null);
    const terminalRef = (ref ?? localRef) as MutableRefObject<HTMLDivElement>;

    const { open, openWebTerminal, closeWebTerminal } = useWebTerminal();

    // Keep the DOM node in the tree during the close animation
    const [shouldRender, setShouldRender] = useState(open);
    const [docsMenuOpen, setDocsMenuOpen] = useState(false);
    const docsMenuRef = useRef<HTMLDivElement>(null);

    const showDocumentationLinks = useMemo(
      () => documentationLinks.length > 0,
      [documentationLinks]
    );

    useEffect(() => {
      if (open) {
        setShouldRender(true);
      }
    }, [open]);

    // Open on first render if requested
    useEffect(() => {
      if (isInitiallyOpen) {
        openWebTerminal();
      }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Close docs menu when clicking outside
    useEffect(() => {
      if (!docsMenuOpen) return;
      const handleOutsideClick = (e: MouseEvent) => {
        if (
          docsMenuRef.current &&
          !docsMenuRef.current.contains(e.target as Node)
        ) {
          setDocsMenuOpen(false);
        }
      };
      document.addEventListener('mousedown', handleOutsideClick);
      return () =>
        document.removeEventListener('mousedown', handleOutsideClick);
    }, [docsMenuOpen]);

    const onAnimationEnd = useCallback(() => {
      if (!open) {
        setShouldRender(false);
      }
    }, [open]);

    const handleClose = useCallback(() => {
      closeWebTerminal();
    }, [closeWebTerminal]);

    return shouldRender ? (
      <div
        {...rest}
        ref={terminalRef}
        className={cx(blockClass, className, {
          [`${blockClass}--open`]: open,
          [`${blockClass}--closed`]: !open,
        })}
        onAnimationEnd={onAnimationEnd}
      >
        <header
          aria-label={webTerminalAriaLabel}
          className={`${blockClass}__bar`}
        >
          <div className={`${blockClass}__actions`}>
            {showDocumentationLinks && (
              <div
                ref={docsMenuRef}
                className={`${blockClass}__docs-trigger-wrapper`}
              >
                <button
                  type="button"
                  aria-label={documentationLinksIconDescription}
                  aria-expanded={docsMenuOpen}
                  aria-haspopup="true"
                  className={cx(
                    `${blockClass}__action-btn`,
                    `${blockClass}__docs-trigger`
                  )}
                  onClick={() => setDocsMenuOpen((prev) => !prev)}
                >
                  <Help size={16} />
                </button>
                {docsMenuOpen && (
                  <ul
                    role="menu"
                    aria-label={documentationLinksIconDescription}
                    className={`${blockClass}__docs-menu`}
                  >
                    {documentationLinks.map((link, i) => (
                      <li key={i} role="none">
                        <a
                          role="menuitem"
                          href={link.href ?? '#'}
                          className={`${blockClass}__docs-menu-item`}
                          onClick={() => {
                            link.onClick?.();
                            setDocsMenuOpen(false);
                          }}
                        >
                          {link.itemText}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
            {actions.map(({ renderIcon: Icon, onClick, iconDescription }) => (
              <Button
                key={iconDescription}
                kind="ghost"
                aria-label={iconDescription}
                onClick={onClick}
                className={`${blockClass}__action-btn`}
              >
                {Icon && <Icon />}
              </Button>
            ))}
          </div>
          <Button
            kind="ghost"
            aria-label={closeIconDescription}
            onClick={handleClose}
            onAnimationEnd={(event) => event.stopPropagation()}
            className={`${blockClass}__action-btn`}
          >
            <Close size={16} />
          </Button>
        </header>
        <Theme theme="g100">
          <div className={`${blockClass}__body`}>{children}</div>
        </Theme>
      </div>
    ) : null;
  }
);

WebTerminal.displayName = 'WebTerminal';
