/**
 * Copyright IBM Corp. 2024, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { TextInput } from '../../TextInput';

const CustomInput = ({ onChange, conditionState }) => {
  const onChangeHandler = (e) => {
    onChange(e.target.value);
  };
  return (
    <div className={`custom-component`}>
      <TextInput
        labelText={'labelText'}
        hideLabel
        value={conditionState.value ?? ''}
        id={'customInput'}
        onChange={onChangeHandler}
      />
    </div>
  );
};

CustomInput.propTypes = {
  conditionState: PropTypes.shape({
    value: PropTypes.string,
  }),
  onChange: PropTypes.func,
};

export default CustomInput;
