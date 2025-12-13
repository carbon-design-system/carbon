/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  RadioButtonChecked,
  RadioButton,
  CheckmarkFilled,
} from '@carbon/icons-react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { cloneElement } from 'react';
import { keys, matches } from '../../internal/keyboard';
import { useFallbackId } from '../../internal/useId';
import { usePrefix } from '../../internal/usePrefix';
import { deprecate } from '../../prop-types/deprecate';
import { noopFn } from '../../internal/noopFn';
import { Text } from '../Text';
import { useFeatureFlag } from '../FeatureFlags';
import { AILabel } from '../AILabel';
import { isComponentElement } from '../../internal';

export interface RadioTileProps {
  /**
   * Specify whether the `RadioTile` should be checked.
   */
  checked?: boolean;

  /**
   * The `RadioTile` content.
   */
  children?: React.ReactNode;

  /**
   * Provide an optional `className` to be applied to the underlying `<label>`.
   */
  className?: string;

  /**
   * **Experimental**: Provide a `decorator` component to be rendered inside the `RadioTile` component
   */
  decorator?: React.ReactNode;

  /**
   * Specify whether the `RadioTile` should be disabled.
   */
  disabled?: boolean;

  /**
   * **Experimental**: Specify if the `ExpandableTile` component should be rendered with rounded corners.
   * Only valid when `slug` prop is present
   */
  hasRoundedCorners?: boolean;

  /**
   * Provide a unique id for the underlying `<input>`.
   */
  id?: string;

  /**
   * `true` to use the light version. For use on `$layer-01` backgrounds only.
   * Don't use this to make tile background color the same as the container background color.
   *
   * @deprecated This prop is no longer needed and has been deprecated in v11 in favor of the new Layer component. It will be removed in the next major release.
   */
  light?: boolean;

  /**
   * Provide a `name` for the underlying `<input>`.
   */
  name?: string;

  /**
   * Provide an optional `onChange` hook that is called each time the value of
   * the underlying `<input>` changes.
   */
  onChange?: (
    value: string | number,
    name: string | undefined,
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) => void;

  /**
   * @deprecated please use `decorator` instead.
   * **Experimental**: Provide a `Slug` component to be rendered inside the `RadioTile` component
   */
  slug?: React.ReactNode;

  /**
   * Specify the tab index of the underlying `<input>`.
   */
  tabIndex?: number;

  /**
   * Specify the value of the underlying `<input>`.
   */
  value: string | number;

  /**
   * `true` to specify if the input is required.
   */
  required?: boolean;
}
type AriaSupportedProps = React.AriaAttributes;

const RadioTile = React.forwardRef(
  (
    {
      children,
      className: customClassName,
      decorator,
      disabled,
      light,
      checked,
      name,
      value,
      id,
      onChange = noopFn,
      tabIndex = 0,
      hasRoundedCorners,
      slug,
      required,
      ...rest
    }: RadioTileProps & AriaSupportedProps,
    ref: React.Ref<HTMLInputElement>
  ) => {
    const prefix = usePrefix();
    const inputId = useFallbackId(id);
    const className = cx(
      customClassName,
      `${prefix}--tile`,
      `${prefix}--tile--selectable`,
      `${prefix}--tile--radio`,
      {
        [`${prefix}--tile--is-selected`]: checked,
        [`${prefix}--tile--light`]: light,
        [`${prefix}--tile--disabled`]: disabled,
        [`${prefix}--tile--slug`]: slug,
        [`${prefix}--tile--slug-rounded`]: slug && hasRoundedCorners,
        [`${prefix}--tile--decorator`]: decorator,
        [`${prefix}--tile--decorator-rounded`]: decorator && hasRoundedCorners,
      }
    );
    const {
      'aria-describedby': ariaDescribedBy,
      'aria-labelledby': ariaLabelledBy,
      ...labelProps
    } = rest;
    const v12TileRadioIcons = useFeatureFlag('enable-v12-tile-radio-icons');
    function icon() {
      if (v12TileRadioIcons) {
        if (checked) {
          return <RadioButtonChecked />;
        } else {
          return <RadioButton />;
        }
      } else {
        return <CheckmarkFilled />;
      }
    }

    function handleOnChange(
      evt:
        | React.ChangeEvent<HTMLInputElement>
        | React.KeyboardEvent<HTMLInputElement>
    ) {
      onChange(value, name, evt);
    }

    function handleOnKeyDown(evt: React.KeyboardEvent<HTMLInputElement>) {
      if (matches(evt, [keys.Enter, keys.Space])) {
        evt.preventDefault();
        onChange(value, name, evt);
      }
    }

    // AILabel is always size `xs`
    const candidate = slug ?? decorator;
    const candidateIsAILabel = isComponentElement(candidate, AILabel);
    const normalizedDecorator = candidateIsAILabel
      ? cloneElement(candidate, { size: 'xs' })
      : candidate;

    return (
      <div>
        <input
          checked={checked}
          className={`${prefix}--tile-input`}
          disabled={disabled}
          id={inputId}
          name={name}
          onChange={!disabled ? handleOnChange : undefined}
          onKeyDown={!disabled ? handleOnKeyDown : undefined}
          tabIndex={!disabled ? tabIndex : undefined}
          type="radio"
          value={value}
          {...(ariaDescribedBy && { 'aria-describedby': ariaDescribedBy })}
          {...(ariaLabelledBy && { 'aria-labelledby': ariaLabelledBy })}
          ref={ref}
          required={required}
        />
        <label {...labelProps} htmlFor={inputId} className={className}>
          <span className={`${prefix}--tile__checkmark`}>{icon()}</span>
          <Text className={`${prefix}--tile-content`}>{children}</Text>
          {slug ? (
            normalizedDecorator
          ) : decorator ? (
            <div className={`${prefix}--tile--inner-decorator`}>
              {normalizedDecorator}
            </div>
          ) : (
            ''
          )}
        </label>
      </div>
    );
  }
);

RadioTile.displayName = 'RadioTile';

RadioTile.propTypes = {
  /**
   * Specify whether the `RadioTile` should be checked.
   */
  checked: PropTypes.bool,

  /**
   * The `RadioTile` content.
   */
  children: PropTypes.node,

  /**
   * Provide an optional `className` to be applied to the underlying `<label>`.
   */
  className: PropTypes.string,

  /**
   * **Experimental**: Provide a `decorator` component to be rendered inside the `RadioTile` component
   */
  decorator: PropTypes.node,

  /**
   * Specify whether the `RadioTile` should be disabled.
   */
  disabled: PropTypes.bool,

  /**
   * Specify if the `ExpandableTile` component should be rendered with rounded corners.
   * Only valid when `slug` prop is present
   */
  hasRoundedCorners: PropTypes.bool,

  /**
   * Provide a unique id for the underlying `<input>`.
   */
  id: PropTypes.string,

  /**
   * `true` to use the light version. For use on `$layer-01` backgrounds only.
   * Don't use this to make tile background color same as container background color.
   */
  light: deprecate(
    PropTypes.bool,
    'The `light` prop for `RadioTile` is no longer needed and has ' +
      'been deprecated in v11 in favor of the new `Layer` component. It will be removed in the next major release.'
  ),

  /**
   * Provide a `name` for the underlying `<input>`.
   */
  name: PropTypes.string,

  /**
   * Provide an optional `onChange` hook that is called each time the value of
   * the underlying `<input>` changes.
   */
  onChange: PropTypes.func,

  /**
   * `true` to specify if the control is required.
   */
  required: PropTypes.bool,

  /**
   * **Experimental**: Provide a `Slug` component to be rendered inside the `RadioTile` component
   */
  slug: deprecate(
    PropTypes.node,
    'The `slug` prop for `RadioTile` has ' +
      'been deprecated in favor of the new `decorator` prop. It will be removed in the next major release.'
  ),

  /**
   * Specify the tab index of the underlying `<input>`.
   */
  tabIndex: PropTypes.number,

  /**
   * Specify the value of the underlying `<input>`.
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default RadioTile;
