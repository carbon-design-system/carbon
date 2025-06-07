/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, {
  Children,
  forwardRef,
  useContext,
  type ElementType,
  type FC,
  type ReactElement,
  type ReactNode,
} from 'react';
import {
  PolymorphicComponentPropWithRef,
  PolymorphicRef,
} from '../../internal/PolymorphicProps';
import { TextDirectionContext, type TextDir } from '.';

export interface TextBaseProps {
  dir?: TextDir;
  children?: ReactNode;
}

export type TextProps<T extends ElementType> = PolymorphicComponentPropWithRef<
  T,
  TextBaseProps
>;

type TextComponent = <T extends ElementType = 'span'>(
  props: TextProps<T> & { ref?: PolymorphicRef<T> }
) => ReactElement | null;

const TextBase = React.forwardRef(
  (
    {
      as,
      children,
      dir = 'auto',
      ...rest
    }: TextBaseProps & {
      as?: React.ElementType;
      dir?: 'auto' | 'ltr' | 'rtl';
    } & React.HTMLAttributes<HTMLSpanElement>,
    ref: React.Ref<HTMLSpanElement>
  ) => {
    const context = useContext(TextDirectionContext);
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
) as TextComponent;
export const Text = TextBase as TextComponent;
(Text as FC).propTypes = {
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

const getTextFromChildren = (children: ReactNode) => {
  if (typeof children === 'string') {
    return children;
  }

  const text = Children.map(children, (child) => {
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
};
