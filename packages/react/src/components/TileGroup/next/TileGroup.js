/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import RadioTile from '../RadioTile';
import { usePrefix } from '../../../internal/usePrefix';
import { warning } from '../../internal/warning';

const getRadioTiles = ({ children, name, handleChange, selected }) => {
  const childrenArray = React.Children.toArray(children);
  const tiles = childrenArray.map((tileRadio) => {
    const { value, ...other } = tileRadio.props;
    /* istanbul ignore if */
    if (typeof tileRadio.props.checked !== 'undefined') {
      warning(
        false,
        `Instead of using the checked property on the RadioTile, set
          the defaultSelected property or valueSelected property on the TileGroup.`
      );
    }

    return (
      <RadioTile
        {...other}
        name={name}
        key={value}
        value={value}
        onChange={handleChange}
        checked={value === selected}
      />
    );
  });

  return tiles;
};

const TileGroup = React.forwardRef(function TileGroup(
  {
    children,
    className,
    defaultSelected,
    disabled,
    legend,
    name,
    onChange,
    valueSelected,
  },
  ref
) {
  const prefix = usePrefix();
  const [selected, setSelected] = useState(
    valueSelected || defaultSelected || null
  );
  const [prevValueSelected, setPrevValueSelected] = useState(valueSelected);

  if (prevValueSelected !== valueSelected) {
    setSelected(valueSelected);
    setPrevValueSelected(valueSelected);
  }

  const handleChange = (newSelection, __, evt) => {
    if (newSelection !== selected) {
      setSelected(newSelection);
      onChange(newSelection, name, evt);
    }
  };

  return (
    <fieldset
      className={classNames(`${prefix}--tile-group`, className)}
      disabled={disabled}
      ref={ref}>
      {legend ? <legend className={`${prefix}--label`}>{legend}</legend> : null}
      <div>{getRadioTiles({ children, name, handleChange, selected })}</div>
    </fieldset>
  );
});

TileGroup.propTypes = {
  /**
   * Provide a collection of <RadioTile> components to render in the group
   */
  children: PropTypes.node,

  /**
   * Provide an optional className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * Specify the the value of <RadioTile> to be selected by default
   */
  defaultSelected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Specify whether the group is disabled
   */
  disabled: PropTypes.bool,

  /**
   * Provide an optional legend for this group
   */
  legend: PropTypes.string,

  /**
   * Specify the name of the underlying `<input>` nodes
   */
  name: PropTypes.string.isRequired,

  /**
   * Provide an optional `onChange` hook that is called whenever the value of
   * the group changes
   */
  onChange: PropTypes.func,

  /**
   * Specify the value that is currently selected in the group
   */
  valueSelected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

TileGroup.defaultProps = {
  onChange: /* istanbul ignore next */ () => {},
};

export default TileGroup;
