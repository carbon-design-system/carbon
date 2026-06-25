/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {
  RadioButton,
  RadioButtonChecked,
  Checkbox,
  CheckboxCheckedFilled,
} from '@carbon/react/icons';
import PropTypes from 'prop-types';
import { pkg } from '../../settings';
import { UserProfileImage } from '../UserProfileImage';

const componentName = 'AddSelectFormControl';
const blockClass = `${pkg.prefix}--add-select__selections`;

export let AddSelectFormControl = ({ item, onClick, selected, type }) => {
  const controlProps = {
    onClick,
    className: `${blockClass}-form-control-wrapper ${blockClass}-form-control-wrapper--${type}`,
    size: 20,
    [`aria-labelledby`]: `control-label-${item.id}`,
  };

  const getCheckbox = () => {
    if (selected) {
      return <CheckboxCheckedFilled {...controlProps} />;
    }

    return <Checkbox {...controlProps} />;
  };

  const getRadio = () => {
    if (selected) {
      return <RadioButtonChecked {...controlProps} />;
    }

    return <RadioButton {...controlProps} />;
  };

  const getFormControl = () => {
    if (!item) {
      return;
    }
    if (type === 'checkbox') {
      return getCheckbox();
    } else {
      return getRadio();
    }
  };

  const getAvatarProps = ({ src, alt, icon, backgroundColor, theme }) => ({
    className: `${blockClass}-cell-avatar`,
    size: 'lg',
    theme,
    image: src,
    imageDescription: alt,
    icon,
    backgroundColor,
  });

  const getItemIcon = ({ icon: Icon }) => <Icon />;

  return (
    <div className={`${blockClass}-form-control`}>
      {getFormControl()}
      <div className={`${blockClass}-form-control-label-wrapper`}>
        {item.avatar && <UserProfileImage {...getAvatarProps(item.avatar)} />}
        {item.icon && (
          <div className={`${blockClass}-cell-icon`}>{getItemIcon(item)}</div>
        )}
        <div className={`${blockClass}-form-control-label-text`}>
          <span
            className={`${blockClass}-cell-title`}
            id={`control-label-${item.id}`}
          >
            {item.title}
          </span>
          {item.subtitle && (
            <span className={`${blockClass}-cell-subtitle`}>
              {item.subtitle}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

AddSelectFormControl.propTypes = {
  item: PropTypes.object,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  type: PropTypes.oneOf(['checkbox', 'radio']),
};

AddSelectFormControl.displayName = componentName;
