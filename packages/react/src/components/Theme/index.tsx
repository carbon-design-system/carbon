/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React, {
  ElementType,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';
import { usePrefix } from '../../internal/usePrefix';
import { PolymorphicProps } from '../../types/common';
import { LayerContext } from '../Layer/LayerContext';
import { usePrefersDarkScheme } from '../../internal/usePrefersDarkScheme';
interface GlobalThemeProps {
  theme?: 'white' | 'g10' | 'g90' | 'g100' | 'system';
  themeSystemLight?: 'white' | 'g10';
  themeSystemDark?: 'g90' | 'g100';
  children?: React.ReactNode;
}

export const ThemeContext = React.createContext<GlobalThemeProps>({
  theme: 'system',
  themeSystemLight: 'white',
  themeSystemDark: 'g90',
});

export const GlobalTheme = React.forwardRef(function GlobalTheme(
  {
    children,
    theme,
    themeSystemLight = 'white',
    themeSystemDark = 'g90',
  }: PropsWithChildren<GlobalThemeProps>,
  ref: React.Ref<unknown>
) {
  const prefersDarkScheme = usePrefersDarkScheme();

  const value = useMemo(() => {
    if (theme === 'system') {
      return prefersDarkScheme
        ? { theme: themeSystemLight }
        : { theme: themeSystemDark };
    }
    return {
      theme: theme,
    };
  }, [prefersDarkScheme, theme, themeSystemDark, themeSystemLight]);

  const childrenWithProps = React.cloneElement(
    children as React.ReactElement<any>,
    { ref: ref }
  );

  return (
    <ThemeContext.Provider value={value}>
      {childrenWithProps}
    </ThemeContext.Provider>
  );
});

GlobalTheme.propTypes = {
  /**
   * Provide child elements to be rendered inside of `GlobalTheme`, this is
   * typically the root of your app
   */
  children: PropTypes.node,

  /**
   * Specify the global theme for your app
   */
  theme: PropTypes.oneOf(['white', 'g10', 'g90', 'g100', 'system']),

  /**
   * Specify the `system` theme dark
   */
  themeSystemDark: PropTypes.oneOf(['g90', 'g100']),

  /**
   * Specify the `system` theme light
   */
  themeSystemLight: PropTypes.oneOf(['white', 'g10']),
};

type ThemeBaseProps = GlobalThemeProps & {
  className?: string;
};

type ThemeProps<E extends ElementType> = PolymorphicProps<E, ThemeBaseProps>;

/**
 * Specify the theme to be applied to a page, or a region in a page
 */
export function Theme<E extends ElementType = 'div'>({
  as: BaseComponent = 'div' as E,
  className: customClassName,
  theme,
  themeSystemDark = 'g90',
  themeSystemLight = 'white',
  ...rest
}: ThemeProps<E>) {
  const prefersDarkScheme = usePrefersDarkScheme();
  const prefix = usePrefix();
  const [actualTheme, setActualTheme] = useState('white');
  useEffect(() => {
    if (theme === 'system') {
      const newTheme =
        (prefersDarkScheme ? themeSystemDark : themeSystemLight) ?? 'white';

      setActualTheme(newTheme);
    } else {
      setActualTheme(theme ?? 'white');
    }
  }, [theme, themeSystemLight, themeSystemDark, prefersDarkScheme]);

  const className = cx(customClassName, {
    [`${prefix}--white`]: actualTheme === 'white',
    [`${prefix}--g10`]: actualTheme === 'g10',
    [`${prefix}--g90`]: actualTheme === 'g90',
    [`${prefix}--g100`]: actualTheme === 'g100',
    [`${prefix}--layer-one`]: true,
  });
  const value = React.useMemo(() => {
    return {
      theme: actualTheme as 'white' | 'g10' | 'g90' | 'g100',
    };
  }, [actualTheme]);
  const BaseComponentAsAny = BaseComponent as any;

  return (
    <ThemeContext.Provider value={value}>
      <LayerContext.Provider value={1}>
        <BaseComponentAsAny {...rest} className={className} />
      </LayerContext.Provider>
    </ThemeContext.Provider>
  );
}

Theme.propTypes = {
  /**
   * Specify a custom component or element to be rendered as the top-level
   * element in the component
   */
  as: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
    PropTypes.elementType,
  ]),

  /**
   * Provide child elements to be rendered inside of `Theme`
   */
  children: PropTypes.node,

  /**
   * Provide a custom class name to be used on the outermost element rendered by
   * the component
   */
  className: PropTypes.string,

  /**
   * Specify the theme
   */
  theme: PropTypes.oneOf(['white', 'g10', 'g90', 'g100', 'system']),
};

/**
 * Get access to the current theme
 */
export function useTheme() {
  return React.useContext(ThemeContext);
}
