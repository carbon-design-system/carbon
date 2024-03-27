/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes, { ReactNodeLike } from 'prop-types';
import React, { useState } from 'react';
import RadioTile from '../RadioTile';
import { usePrefix } from '../../internal/usePrefix';
import { ReactAttr } from '../../types/common';
import { noopFn } from '../../internal/noopFn';

type ExcludedAttributes = 'onChange';

export interface TileGroupProps
  extends Omit<ReactAttr<HTMLFieldSetElement>, ExcludedAttributes> {
  /**
   * Provide a collection of <RadioTile> components to render in the group
   */
  children?: ReactNodeLike;

  /**
   * Provide an optional className to be applied to the container node
   */
  className?: string;

  /**
   * Specify the the value of <RadioTile> to be selected by default
   */
  defaultSelected?: string | number;

  /**
   * Specify whether the group is disabled
   */
  disabled?: boolean;

  /**
   * Provide an optional legend for this group
   */
  legend?: string;

  /**
   * Specify the name of the underlying `<input>` nodes
   */
  name: string;

  /**
   * Provide an optional `onChange` hook that is called whenever the value of the group changes
   */
  onChange?: (selection: unknown, name: string, evt: unknown) => void;

  /**
   * Specify the value that is currently selected in the group
   */
  valueSelected?: string | number;
}

const TileGroup = (props) => {
  const {
    children,
    className,
    defaultSelected,
    disabled,
    legend,
    name,
    onChange = noopFn,
    valueSelected,
  } = props;
  const prefix = usePrefix();

  const [selected, setSelected] = useState(valueSelected ?? defaultSelected);
  const [prevValueSelected, setPrevValueSelected] = useState(valueSelected);

  /**
   * prop + state alignment - getDerivedStateFromProps
   * only update if selected prop changes
   */
  if (valueSelected !== prevValueSelected) {
    setSelected(valueSelected);
    setPrevValueSelected(valueSelected);
  }

  const getRadioTilesWithWrappers = (children) => {
    const traverseAndModifyChildren = (children) => {
      return React.Children.map(children, (child) => {
        // If RadioTile found, return it with necessary props
        if (child.type === RadioTile) {
          const { value, ...otherProps } = child.props;
          return (
            <RadioTile
              {...otherProps}
              name={name}
              key={value}
              value={value}
              onChange={handleChange}
              checked={value === selected}
            />
          );
        } else if (child.props && child.props.children) {
          // If the child is not RadioTile and has children, recheck the children
          return React.cloneElement(child, {
            ...child.props,
            children: traverseAndModifyChildren(child.props.children),
          });
        } else {
          // If the child is neither a RadioTile nor has children, return it as is
          return child;
        }
      });
    };

    return <>{traverseAndModifyChildren(children)}</>;
  };

  const handleChange = (newSelection, value, evt) => {
    if (newSelection !== selected) {
      setSelected(newSelection);
      onChange(newSelection, name, evt);
    }
  };

  const renderLegend = (legend) => {
    if (legend) {
      return <legend className={`${prefix}--label`}>{legend}</legend>;
    }
  };

  return (
    <fieldset
      className={className ?? `${prefix}--tile-group`}
      disabled={disabled}>
      {renderLegend(legend)}
      <div>{getRadioTilesWithWrappers(children)}</div>
    </fieldset>
  );
};

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

TileGroup.displayName = 'TileGroup';

export default TileGroup;
