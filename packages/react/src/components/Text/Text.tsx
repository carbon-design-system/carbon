/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { ReactNode, useContext } from 'react';
import { TextDir } from './TextDirection';
import { TextDirectionContext } from './TextDirectionContext';

export interface TextBaseProps {
  dir?: TextDir | undefined;
  children?: ReactNode;
}

type AsProp<C extends React.ElementType> = {
  as?: C;
};

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

// This is the first reusable type utility we built
type PolymorphicComponentProp<
  C extends React.ElementType,
  Props = {},
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

// This is a new type utitlity with ref!
type PolymorphicComponentPropWithRef<
  C extends React.ElementType,
  Props = {},
> = PolymorphicComponentProp<C, Props> & { ref?: PolymorphicRef<C> };

// This is the type for the "ref" only
type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>['ref'];

export type TextProps<T extends React.ElementType> =
  PolymorphicComponentPropWithRef<T, TextBaseProps>;

type TextComponent = <T extends React.ElementType = 'span'>(
  props: TextProps<T>
) => React.ReactElement | any;

const Text: TextComponent = React.forwardRef(
  <T extends React.ElementType = 'span'>(
    { as, children, dir = 'auto', ...rest }: TextProps<T>,
    ref?: PolymorphicRef<T>
  ) => {
    // TODO: Update with context typing once its been converted to TS
    const context = useContext<any>(TextDirectionContext);
    const textProps: { dir?: TextDir } = {};
    const BaseComponent = as ?? 'span';
    const value = {
      ...context,
    };

    if (!context) {
      textProps.dir = dir;
      value.direction = dir;
    } else {
      const { direction: parentDirection, getTextDirection } = context;

      if (getTextDirection && getTextDirection.current) {
        const text = getTextFromChildren(children);
        const override = getTextDirection.current(text);

        if (parentDirection !== override) {
          textProps.dir = override;
          value.direction = override;
        } else if (parentDirection === 'auto') {
          textProps.dir = override;
        }
      } else if (parentDirection !== dir) {
        textProps.dir = dir;
        value.direction = dir;
      } else if (parentDirection === 'auto') {
        textProps.dir = dir;
      }
    }

    return (
      <TextDirectionContext.Provider value={value}>
        <BaseComponent ref={ref} {...rest} {...textProps}>
          {children}
        </BaseComponent>
      </TextDirectionContext.Provider>
    );
  }
);

Text.propTypes = {
  /**
   * Provide a custom element type used to render the outermost node
   */
  as: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
    PropTypes.elementType,
  ]),

  /**
   * Provide child elements or text to be rendered inside of this component
   */
  children: PropTypes.node.isRequired,

  /**
   * Specify the text direction to be used for this component and any of its
   * children
   */
  dir: PropTypes.oneOf(['ltr', 'rtl', 'auto']),
};

function getTextFromChildren(children: ReactNode) {
  if (typeof children === 'string') {
    return children;
  }

  const text = React.Children.map(children, (child) => {
    if (typeof child === 'string') {
      return child;
    }
    return null;
  })?.filter((text) => {
    return text !== null;
  });

  if (text?.length === 1) {
    return text[0];
  }

  return text;
}

export { Text };
