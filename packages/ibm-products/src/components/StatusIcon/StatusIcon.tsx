import {
  CheckmarkFilled,
  CheckmarkOutline,
  ErrorFilled,
  InProgress,
  InformationSquareFilled,
  Misuse,
  Pending,
  UndefinedFilled,
  UnknownFilled,
  WarningAltFilled,
  WarningAltInvertedFilled,
} from '@carbon/react/icons';
/**
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, {
  PropsWithChildren,
  ReactSVGElement,
  Ref,
  forwardRef,
} from 'react';

import PropTypes from 'prop-types';
import cx from 'classnames';
import { getDevtoolsProps } from '../../global/js/utils/devtools';
import { pkg } from '../../settings';

const blockClass = `${pkg.prefix}--status-icon`;
const componentName = 'StatusIcon';

/**
The `StatusIcon` component follows the Carbon guidelines for status icons with
some added specifications around illustration usage. For additional usage
guidelines and documentation please refer to the links above.

_Status icons_ are an important method of communicating severity level
information to users. The shapes and colors, communicate severity that enable
users to quickly assess and identify status and respond accordingly.
 */

type Size = 'sm' | 'md' | 'lg' | 'xl';
type Theme = 'light' | 'dark';
type Kind =
  | 'fatal'
  | 'critical'
  | 'major-warning'
  | 'minor-warning'
  | 'undefined'
  | 'unknown'
  | 'normal'
  | 'info'
  | 'in-progress'
  | 'running'
  | 'pending';
export interface StatusIconProps extends PropsWithChildren {
  /**
   * Provide an optional class to be applied to the modal root node.
   */
  className?: string;
  /**
   * A required prop that provides a title element and tooltip for the icon for accessibility purposes
   */
  iconDescription: string;
  /**
   * A required prop that displays the respective icon associated with the status
   */
  kind: Kind;
  /**
   * A required prop that displays the size of the icon associate with the status
   */
  size: Size;
  /**
   * A required prop that displays the theme of the icon associated with the status
   */
  theme: Theme;
}
export const StatusIcon = forwardRef<ReactSVGElement | null, StatusIconProps>(
  (
    { kind, theme, size, className, iconDescription, ...rest }: StatusIconProps,
    ref
  ) => {
    const forwardedRef = ref as Ref<ReactSVGElement>;

    const icons = {
      fatal: {
        sm: forwardRef((props, _ref) => (
          <Misuse size={16} ref={forwardedRef} {...props} />
        )),
        md: forwardRef((props, _ref) => (
          <Misuse size={20} ref={forwardedRef} {...props} />
        )),
        lg: forwardRef((props, _ref) => (
          <Misuse size={24} ref={forwardedRef} {...props} />
        )),
        xl: forwardRef((props, _ref) => (
          <Misuse size={32} ref={forwardedRef} {...props} />
        )),
      },
      critical: {
        sm: forwardRef((props, _ref) => (
          <ErrorFilled size={16} ref={forwardedRef} {...props} />
        )),
        md: forwardRef((props, _ref) => (
          <ErrorFilled size={20} ref={forwardedRef} {...props} />
        )),
        lg: forwardRef((props, _ref) => (
          <ErrorFilled size={24} ref={forwardedRef} {...props} />
        )),
        xl: forwardRef((props, _ref) => (
          <ErrorFilled size={32} ref={forwardedRef} {...props} />
        )),
      },
      'major-warning': {
        sm: forwardRef((props, _ref) => (
          <WarningAltInvertedFilled size={16} ref={forwardedRef} {...props} />
        )),
        md: forwardRef((props, _ref) => (
          <WarningAltInvertedFilled size={20} ref={forwardedRef} {...props} />
        )),
        lg: forwardRef((props, _ref) => (
          <WarningAltInvertedFilled size={24} ref={forwardedRef} {...props} />
        )),
        xl: forwardRef((props, _ref) => (
          <WarningAltInvertedFilled size={32} ref={forwardedRef} {...props} />
        )),
      },
      'minor-warning': {
        sm: forwardRef((props, _ref) => (
          <WarningAltFilled size={16} ref={forwardedRef} {...props} />
        )),
        md: forwardRef((props, _ref) => (
          <WarningAltFilled size={20} ref={forwardedRef} {...props} />
        )),
        lg: forwardRef((props, _ref) => (
          <WarningAltFilled size={24} ref={forwardedRef} {...props} />
        )),
        xl: forwardRef((props, _ref) => (
          <WarningAltFilled size={32} ref={forwardedRef} {...props} />
        )),
      },
      undefined: {
        sm: forwardRef((props, _ref) => (
          <UndefinedFilled size={16} ref={forwardedRef} {...props} />
        )),
        md: forwardRef((props, _ref) => (
          <UndefinedFilled size={20} ref={forwardedRef} {...props} />
        )),
        lg: forwardRef((props, _ref) => (
          <UndefinedFilled size={24} ref={forwardedRef} {...props} />
        )),
        xl: forwardRef((props, _ref) => (
          <UndefinedFilled size={32} ref={forwardedRef} {...props} />
        )),
      },
      unknown: {
        sm: forwardRef((props, _ref) => (
          <UnknownFilled size={16} ref={forwardedRef} {...props} />
        )),
        md: forwardRef((props, _ref) => (
          <UnknownFilled size={20} ref={forwardedRef} {...props} />
        )),
        lg: forwardRef((props, _ref) => (
          <UnknownFilled size={24} ref={forwardedRef} {...props} />
        )),
        xl: forwardRef((props, _ref) => (
          <UnknownFilled size={32} ref={forwardedRef} {...props} />
        )),
      },
      normal: {
        sm: forwardRef((props, _ref) => (
          <CheckmarkFilled size={16} ref={forwardedRef} {...props} />
        )),
        md: forwardRef((props, _ref) => (
          <CheckmarkFilled size={20} ref={forwardedRef} {...props} />
        )),
        lg: forwardRef((props, _ref) => (
          <CheckmarkFilled size={24} ref={forwardedRef} {...props} />
        )),
        xl: forwardRef((props, _ref) => (
          <CheckmarkFilled size={32} ref={forwardedRef} {...props} />
        )),
      },
      info: {
        sm: forwardRef((props, _ref) => (
          <InformationSquareFilled size={16} ref={forwardedRef} {...props} />
        )),
        md: forwardRef((props, _ref) => (
          <InformationSquareFilled size={20} ref={forwardedRef} {...props} />
        )),
        lg: forwardRef((props, _ref) => (
          <InformationSquareFilled size={24} ref={forwardedRef} {...props} />
        )),
        xl: forwardRef((props, _ref) => (
          <InformationSquareFilled size={32} ref={forwardedRef} {...props} />
        )),
      },
      'in-progress': {
        sm: forwardRef((props, _ref) => (
          <InProgress size={16} ref={forwardedRef} {...props} />
        )),
        md: forwardRef((props, _ref) => (
          <InProgress size={20} ref={forwardedRef} {...props} />
        )),
        lg: forwardRef((props, _ref) => (
          <InProgress size={24} ref={forwardedRef} {...props} />
        )),
        xl: forwardRef((props, _ref) => (
          <InProgress size={32} ref={forwardedRef} {...props} />
        )),
      },
      running: {
        sm: forwardRef((props, _ref) => (
          <CheckmarkOutline size={16} ref={forwardedRef} {...props} />
        )),
        md: forwardRef((props, _ref) => (
          <CheckmarkOutline size={20} ref={forwardedRef} {...props} />
        )),
        lg: forwardRef((props, _ref) => (
          <CheckmarkOutline size={24} ref={forwardedRef} {...props} />
        )),
        xl: forwardRef((props, _ref) => (
          <CheckmarkOutline size={32} ref={forwardedRef} {...props} />
        )),
      },
      pending: {
        sm: forwardRef((props, _ref) => (
          <Pending size={16} ref={forwardedRef} {...props} />
        )),
        md: forwardRef((props, _ref) => (
          <Pending size={20} ref={forwardedRef} {...props} />
        )),
        lg: forwardRef((props, _ref) => (
          <Pending size={24} ref={forwardedRef} {...props} />
        )),
        xl: forwardRef((props, _ref) => (
          <Pending size={32} ref={forwardedRef} {...props} />
        )),
      },
    };

    const IconComponent = icons[kind]?.[size];

    const classNames = cx(className, blockClass, `${blockClass}--${theme}`, {
      [`${blockClass}--${theme}-${kind}`]: kind,
    });

    return (
      IconComponent && (
        <IconComponent
          {...rest}
          {...{
            className: classNames,
            ref,
          }}
          {...getDevtoolsProps(componentName)}
        >
          <title>{iconDescription}</title>
        </IconComponent>
      )
    );
  }
);

StatusIcon.displayName = componentName;

StatusIcon.propTypes = {
  /**
   * Provide an optional class to be applied to the modal root node.
   */
  className: PropTypes.string,
  /**
   * A required prop that provides a title element and tooltip for the icon for accessibility purposes
   */
  iconDescription: PropTypes.string.isRequired,
  /**
   * A required prop that displays the respective icon associated with the status
   */
  kind: PropTypes.oneOf<Kind>([
    'fatal',
    'critical',
    'major-warning',
    'minor-warning',
    'undefined',
    'unknown',
    'normal',
    'info',
    'in-progress',
    'running',
    'pending',
  ]).isRequired,
  /**
   * A required prop that displays the size of the icon associate with the status
   */
  size: PropTypes.oneOf<Size>(['sm', 'md', 'lg', 'xl']).isRequired,
  /**
   * A required prop that displays the theme of the icon associated with the status
   */
  theme: PropTypes.oneOf<Theme>(['light', 'dark']).isRequired,
};
