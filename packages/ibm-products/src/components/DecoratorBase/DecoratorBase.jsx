/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import PropTypes from 'prop-types';
import cx from 'classnames';

import { pkg } from '../../settings';

import { getMagnitude, truncate } from './utils';
import { DecoratorIcon } from './DecoratorIcon';

const blockClass = `${pkg.prefix}--decorator`;
const componentName = 'DecoratorBase';

const defaults = {
  onClick: () => {},
  onClickLabel: () => {},
  onClickValue: () => {},
  onContextMenu: () => {},
  onContextMenuLabel: () => {},
  onContextMenuValue: () => {},
  scoreThresholds: [0, 4, 7, 10],
};

/**
 * The DecoratorBase groups a key/value pair to look and behave like a single UI element.
 *
 * DecoratorBase is for internal use only. Refer to the other Decorator types as components for your app.
 */
export let DecoratorBase = React.forwardRef(
  (
    {
      // The component props, in alphabetical order (for consistency).
      className,
      disabled,
      hideIcon,
      href,
      kind,
      label,
      setLabelTitle,
      onClick = defaults.onClick,
      onClickLabel = defaults.onClickLabel,
      onClickValue = defaults.onClickValue,
      onContextMenu = defaults.onContextMenu,
      onContextMenuLabel = defaults.onContextMenuLabel,
      onContextMenuValue = defaults.onContextMenuValue,
      score,
      scoreThresholds = defaults.scoreThresholds,
      small,
      theme,
      truncateValue,
      value,
      valueTitle,
      // Collect any other property values passed in.
      ...rest
    },
    ref
  ) => {
    const magnitude = getMagnitude(score, scoreThresholds);
    const _labelTitle =
      setLabelTitle && setLabelTitle(score, scoreThresholds, magnitude);
    const _value = truncate(value, truncateValue);

    // These class names apply to all types of DecoratorBase.
    const classNames = cx(blockClass, className, {
      [`${blockClass}--${theme}`]: theme,
      [`${blockClass}--sm`]: small,
      [`${blockClass}--truncate-end`]: truncateValue === 'end',
      [`${blockClass}--truncate-start`]: truncateValue === 'start',
      [`${blockClass}--truncate-midline`]: truncateValue?.maxLength,
    });

    // These properties apply to all <DecoratorIcons>.
    const decoratorIconsProps = {
      className: `${blockClass}__icon`,
      magnitude: magnitude.toLowerCase(), // e.g. "Medium" -> "medium"
      small: small,
    };

    // Optional callback functions specific to "link" or "single-button".
    const handleOnClick = (event) => {
      onClick(event, { score, label, value, magnitude });
    };
    const handleOnContextMenu = (event) => {
      onContextMenu(event, { score, label, value, magnitude });
    };

    // RETURN DUAL BUTTONS
    if (kind === 'dual-button') {
      // Optional callback functions specific to "dual-button".
      const handleOnClickLabel = (event) => {
        onClickLabel(event, { score, label, value, magnitude });
      };
      const handleOnClickValue = (event) => {
        onClickValue(event, { score, label, value, magnitude });
      };
      const handleOnContextMenuLabel = (event) => {
        onContextMenuLabel(event, { score, label, value, magnitude });
      };
      const handleOnContextMenuValue = (event) => {
        onContextMenuValue(event, { score, label, value, magnitude });
      };

      return (
        <span
          {...rest}
          className={cx(classNames, `${blockClass}--dual-button`, {
            [`${blockClass}-disabled`]: disabled,
          })}
          ref={ref}
        >
          <button
            className={`${blockClass}__label`}
            disabled={disabled}
            onClick={!disabled && handleOnClickLabel}
            onContextMenu={!disabled && handleOnContextMenuLabel}
            title={_labelTitle || label}
            type="button"
          >
            {!hideIcon && <DecoratorIcon {...decoratorIconsProps} />}
            {!!label && label}
          </button>
          <button
            className={`${blockClass}__value`}
            disabled={disabled}
            onClick={!disabled && handleOnClickValue}
            onContextMenu={!disabled && handleOnContextMenuValue}
            title={valueTitle || value}
            type="button"
          >
            {_value}
          </button>
        </span>
      );
    }

    // RETURN SINGLE BUTTON
    if (kind === 'single-button') {
      return (
        <button
          {...rest}
          className={cx(classNames, `${blockClass}--single-button`, {
            [`${blockClass}-disabled`]: disabled,
          })}
          disabled={disabled}
          onClick={!disabled && handleOnClick}
          onContextMenu={!disabled && handleOnContextMenu}
          ref={ref}
          type="button"
        >
          <span className={`${blockClass}__label`} title={_labelTitle || label}>
            {!hideIcon && <DecoratorIcon {...decoratorIconsProps} />}
            {!!label && label}
          </span>
          <span className={`${blockClass}__value`} title={valueTitle || value}>
            {_value}
          </span>
        </button>
      );
    }

    // RETURN LINK
    if (kind === 'link') {
      return (
        <a
          {...rest}
          href={href}
          className={cx(classNames, `${blockClass}--link`)}
          onClick={handleOnClick}
          onContextMenu={handleOnContextMenu}
          ref={ref}
        >
          <span className={`${blockClass}__label`} title={_labelTitle || label}>
            {!hideIcon && <DecoratorIcon {...decoratorIconsProps} />}
            {!!label && label}
          </span>
          <span className={`${blockClass}__value`} title={valueTitle || value}>
            {_value}
          </span>
        </a>
      );
    }

    // RETURN DEFAULT (NON-INTERACTIVE)
    return (
      <span
        {...rest}
        className={cx(classNames, `${blockClass}--default`)}
        ref={ref}
      >
        <span className={`${blockClass}__label`} title={_labelTitle || label}>
          {!hideIcon && <DecoratorIcon {...decoratorIconsProps} />}
          {!!label && label}
        </span>
        <span className={`${blockClass}__value`} title={valueTitle || value}>
          {_value}
        </span>
      </span>
    );
  }
);

DecoratorBase.displayName = componentName;

// See the other Decorator types for detailed, context-specific comments.
DecoratorBase.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  hideIcon: PropTypes.bool,
  href: PropTypes.string,
  /**
   * `kind` differentiates between each type of Decorator, and is for internal use only.
   */
  kind: PropTypes.oneOf(['default', 'link', 'single-button', 'dual-button']),
  label: PropTypes.string,
  onClick: PropTypes.func,
  onClickLabel: PropTypes.func,
  onClickValue: PropTypes.func,
  onContextMenu: PropTypes.func,
  onContextMenuLabel: PropTypes.func,
  onContextMenuValue: PropTypes.func,
  score: PropTypes.number,
  scoreThresholds: PropTypes.arrayOf(PropTypes.number),
  setLabelTitle: PropTypes.func,
  small: PropTypes.bool,
  theme: PropTypes.oneOf(['light', 'dark']),
  truncateValue: PropTypes.oneOfType([
    PropTypes.oneOf(['end', 'start']),
    PropTypes.shape({
      maxLength: PropTypes.number,
      front: PropTypes.number,
      back: PropTypes.number,
    }),
  ]),
  value: PropTypes.string.isRequired,
  valueTitle: PropTypes.string,
};
