/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import classNames from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import { useId } from '../../internal/useId';
import { ButtonBaseProps, ButtonProps } from './Button';

const ButtonBase = React.forwardRef(function ButtonBase<
  T extends React.ElementType
>(
  {
    as,
    children,
    className,
    dangerDescription = 'danger',
    disabled = false,
    hasIconOnly = false,
    href,
    iconDescription,
    isExpressive = false,
    isSelected,
    kind = 'primary',
    onBlur,
    onClick,
    onFocus,
    onMouseEnter,
    onMouseLeave,
    renderIcon: ButtonImageElement,
    size,
    tabIndex,
    type = 'button',
    ...rest
  }: ButtonProps<T>,
  ref: React.Ref<unknown>
) {
  const prefix = usePrefix();

  const buttonClasses = classNames(className, {
    [`${prefix}--btn`]: true,
    [`${prefix}--btn--sm`]: size === 'sm' && !isExpressive, // TODO: V12 - Remove this class
    [`${prefix}--btn--md`]: size === 'md' && !isExpressive, // TODO: V12 - Remove this class
    [`${prefix}--btn--xl`]: size === 'xl', // TODO: V12 - Remove this class
    [`${prefix}--btn--2xl`]: size === '2xl', // TODO: V12 - Remove this class
    [`${prefix}--layout--size-${size}`]: size,
    [`${prefix}--btn--${kind}`]: kind,
    [`${prefix}--btn--disabled`]: disabled,
    [`${prefix}--btn--expressive`]: isExpressive,
    [`${prefix}--btn--icon-only`]:
      hasIconOnly && !className?.includes(`${prefix}--btn--icon-only`),
    [`${prefix}--btn--selected`]: hasIconOnly && isSelected && kind === 'ghost',
  });

  const commonProps = {
    tabIndex,
    className: buttonClasses,
    ref,
  };

  const buttonImage = !ButtonImageElement ? null : (
    <ButtonImageElement
      aria-label={iconDescription}
      className={`${prefix}--btn__icon`}
      aria-hidden="true"
    />
  );

  const dangerButtonVariants = ['danger', 'danger--tertiary', 'danger--ghost'];

  let component: React.ElementType = 'button';
  const assistiveId = useId('danger-description');
  const { 'aria-pressed': ariaPressed, 'aria-describedby': ariaDescribedBy } =
    rest;
  let otherProps: Partial<ButtonBaseProps> = {
    disabled,
    type,
    'aria-describedby': dangerButtonVariants.includes(kind)
      ? assistiveId
      : ariaDescribedBy || undefined,
    'aria-pressed':
      ariaPressed ?? (hasIconOnly && kind === 'ghost' ? isSelected : undefined),
  };
  const anchorProps = {
    href,
  };

  let assistiveText: JSX.Element | null = null;
  if (dangerButtonVariants.includes(kind)) {
    assistiveText = (
      <span id={assistiveId} className={`${prefix}--visually-hidden`}>
        {dangerDescription}
      </span>
    );
  }

  if (as) {
    component = as;
    otherProps = {
      ...otherProps,
      ...anchorProps,
    };
  } else if (href && !disabled) {
    component = 'a';
    otherProps = anchorProps;
  }

  return React.createElement(
    component,
    {
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      onClick,
      ...rest,
      ...commonProps,
      ...otherProps,
    },
    assistiveText,
    children,
    buttonImage
  );
});

export default ButtonBase;
