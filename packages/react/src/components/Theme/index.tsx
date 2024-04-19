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

type themesType = 'white' | 'g10' | 'g90' | 'g100';
interface GlobalThemeProps {
  theme?: themesType | 'system';
  themeCompliment?: themesType | 'system';
  themeSystemDark?: 'g90' | 'g100';
  themeSystemLight?: 'white' | 'g10';
  children?: React.ReactNode;
}

const defaultCompliment = {
  white: 'g90',
  g10: 'g100',
  g90: 'white',
  g100: 'g10',
};

export const ThemeContext = React.createContext<GlobalThemeProps>({
  theme: 'system',
  themeCompliment: undefined,
  themeSystemLight: 'white',
  themeSystemDark: 'g90',
});

export const GlobalTheme = React.forwardRef(function GlobalTheme(
  {
    children,
    themeCompliment,
    theme = 'white',
    themeSystemLight = 'white',
    themeSystemDark = 'g90',
  }: PropsWithChildren<GlobalThemeProps>,
  ref: React.Ref<unknown>
) {
  const prefersDarkScheme = usePrefersDarkScheme();

  const value = useMemo(() => {
    if (theme === 'system') {
      return prefersDarkScheme
        ? {
            theme: themeSystemLight,
            themeCompliment: themeSystemDark,
            isDark: true,
          }
        : {
            theme: themeSystemDark,
            themeCompliment: themeSystemLight,
            isDark: true,
          };
    }

    return {
      theme: theme,
      themeCompliment: (themeCompliment ||
        defaultCompliment[theme]) as themesType,
      isDark: ['g90', 'g100'].includes(theme),
    };
  }, [
    prefersDarkScheme,
    theme,
    themeCompliment,
    themeSystemDark,
    themeSystemLight,
  ]);

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
   * Optional complimentary when not using `system`
   */
  themeCompliment: PropTypes.oneOf(['white', 'g10', 'g90', 'g100']),

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
  theme = 'white',
  themeCompliment,
  themeSystemDark = 'g90',
  themeSystemLight = 'white',
  ...rest
}: ThemeProps<E>) {
  const prefersDarkScheme = usePrefersDarkScheme();
  const prefix = usePrefix();
  const [actualTheme, setActualTheme] = useState('white');
  const [actualCompliment, setActualCompliment] = useState(
    defaultCompliment['white']
  );
  useEffect(() => {
    if (theme === 'system') {
      const newTheme =
        (prefersDarkScheme ? themeSystemDark : themeSystemLight) ?? 'white';
      const newCompliment =
        (prefersDarkScheme ? themeSystemLight : themeSystemDark) ??
        defaultCompliment[newTheme];

      setActualTheme(newTheme);
      setActualCompliment(newCompliment);
    } else {
      setActualTheme(theme ?? 'white');
      setActualCompliment(themeCompliment ?? defaultCompliment[theme]);
    }
  }, [
    theme,
    themeCompliment,
    themeSystemLight,
    themeSystemDark,
    prefersDarkScheme,
  ]);

  const className = cx(customClassName, {
    [`${prefix}--white`]: actualTheme === 'white',
    [`${prefix}--g10`]: actualTheme === 'g10',
    [`${prefix}--g90`]: actualTheme === 'g90',
    [`${prefix}--g100`]: actualTheme === 'g100',
    [`${prefix}--layer-one`]: true,
  });
  const value = React.useMemo(() => {
    return {
      theme: actualTheme as themesType,
      themeCompliment: actualCompliment as themesType,
      isDark: ['g90', 'g100'].includes(actualTheme),
    };
  }, [actualTheme, actualCompliment]);
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
   * Specify the theme. A theme of `system` selects `themeSystemLight` or `themeSystemDark` based
   * on the user system preferences.
   */
  theme: PropTypes.oneOf(['white', 'g10', 'g90', 'g100', 'system']),

  /**
   * Switches to this theme inside `<ThemeCompliment />`
   */
  themeCompliment: PropTypes.oneOf(['white', 'g10', 'g90', 'g100']),

  /**
   * Specify the `system` theme dark defaults to `g90`
   */
  themeSystemDark: PropTypes.oneOf(['g90', 'g100']),

  /**
   * Specify the `system` theme light defaults to `white`
   */
  themeSystemLight: PropTypes.oneOf(['white', 'g10']),
};

export function ThemeCompliment({ children, ...rest }) {
  const { theme, themeCompliment } = useTheme();

  return (
    <Theme theme={themeCompliment} themeCompliment={theme} {...rest}>
      {children}
    </Theme>
  );
}

ThemeCompliment.propTypes = {
  /**
   * Provide child elements to be rendered inside of `Theme`
   */
  children: PropTypes.node,
};

/**
 * Get access to the current theme
 */
export function useTheme() {
  return React.useContext(ThemeContext);
}
