/**
 * Copyright IBM Corp. 2021, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  PropsWithChildren,
  createContext,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { bool, node, string } from 'prop-types';

// cspell:words Focusable focusable
import { getFocusableElements as _getFocusableElements } from '../../global/js/utils/getFocusableElements';
import cx from 'classnames';
import { getDevtoolsProps } from '../../global/js/utils/devtools';
import { pkg } from '../../settings';

const blockClass = `${pkg.prefix}--toolbar`;

export interface ToolbarProps {
  /** Provide an optional class to be applied to the containing node */
  className?: string;

  /** Determines whether the `Toolbar` is rendered vertically */
  vertical?: boolean;
}

interface ToolbarContextType {
  vertical?: boolean;
}

const ToolbarContext = createContext<ToolbarContextType>({});

/** Toolbars are a collection of action items that organize a program’s interaction patterns into a series of closely related commands. */
const Toolbar = forwardRef(
  (
    { children, className, vertical, ...rest }: PropsWithChildren<ToolbarProps>,
    r: React.Ref<HTMLDivElement>
  ) => {
    const focusableElements = useRef<HTMLElement[] | undefined>(undefined);

    const getFocusableElements = useCallback(
      (): HTMLElement[] | undefined => focusableElements.current,
      [focusableElements]
    );

    const localRef = useRef<HTMLDivElement>(null);
    const ref = r || localRef;

    const [focus, setFocus] = useState(-1);

    useEffect(() => {
      focusableElements.current = _getFocusableElements(
        ref?.['current']
      ) as HTMLElement[];

      if (focus !== -1) {
        getFocusableElements()?.forEach((element, index) => {
          element[index !== focus ? 'setAttribute' : 'removeAttribute'](
            'tabindex',
            '-1'
          );
        });
      }
    });

    useEffect(() => {
      if (focus !== -1) {
        getFocusableElements()?.[focus].focus();
      }
    }, [focus, getFocusableElements]);

    const [arrowNext, arrowPrevious] = !vertical
      ? ['ArrowRight', 'ArrowLeft']
      : ['ArrowDown', 'ArrowUp'];

    function onArrowDown(increment: number) {
      const nextFocus = focus + increment;

      if (getFocusableElements()?.[nextFocus]) {
        setFocus(nextFocus);
      }
    }

    function onFocus({ target }) {
      const elements = getFocusableElements();

      if (elements?.includes(target)) {
        setFocus(elements.indexOf(target));
      }
    }

    function onKeyDown({ key, target }) {
      if (getFocusableElements()?.includes(target)) {
        switch (key) {
          case arrowNext:
            onArrowDown(1);
            break;

          case arrowPrevious:
            onArrowDown(-1);
            break;
        }
      }
    }

    return (
      <div
        {...rest}
        ref={ref}
        className={cx(blockClass, className, {
          [`${blockClass}--vertical`]: vertical,
        })}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        {...(vertical && { 'aria-orientation': 'vertical' })}
        {...getDevtoolsProps(componentName)}
        role="toolbar"
      >
        <ToolbarContext.Provider value={{ vertical }}>
          {children}
        </ToolbarContext.Provider>
      </div>
    );
  }
);

const componentName = 'Toolbar';
Toolbar.displayName = componentName;

Toolbar.propTypes = {
  /** Provide the content of the `Toolbar` */
  children: node.isRequired,

  /** Provide an optional class to be applied to the containing node */
  className: string,

  /** Determines whether the `Toolbar` is rendered vertically */
  vertical: bool,
};

export { blockClass, componentName, Toolbar, ToolbarContext };
