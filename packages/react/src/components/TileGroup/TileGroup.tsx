/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useState,
  type ComponentProps,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import RadioTile from '../RadioTile';
import { usePrefix } from '../../internal/usePrefix';
import { noopFn } from '../../internal/noopFn';

type ExcludedAttributes = 'onChange';

export interface TileGroupProps
  extends Omit<HTMLAttributes<HTMLFieldSetElement>, ExcludedAttributes> {
  /**
   * Provide a collection of <RadioTile> components to render in the group
   */
  children?: ReactNode;

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
  /**
   * `true` to specify if input selection in group is required.
   */
  required?: boolean;
}

export const TileGroup = ({
  children,
  className,
  defaultSelected,
  disabled,
  legend,
  name,
  onChange = noopFn,
  valueSelected,
  required,
}: TileGroupProps) => {
  const prefix = usePrefix();
  const [selected, setSelected] = useState(valueSelected ?? defaultSelected);

  useEffect(() => {
    if (typeof valueSelected !== 'undefined' && valueSelected !== selected) {
      setSelected(valueSelected);
    }
  }, [valueSelected, selected]);

  const handleChange: ComponentProps<typeof RadioTile>['onChange'] = (
    value,
    name,
    evt
  ) => {
    if (value !== selected) {
      setSelected(value);
      onChange(value, name ?? '', evt);
    }
  };

  const getRadioTilesWithWrappers = (elements: typeof children): ReactNode => {
    const traverseAndModifyChildren = (
      elements: typeof children
    ): ReactNode => {
      return Children.map(elements, (child) => {
        if (!isValidElement(child)) return child;

        // If a `RadioTile` is found, return it with necessary props,
        if (
          isValidElement<ComponentProps<typeof RadioTile>>(child) &&
          child.type === RadioTile
        ) {
          const { value, ...otherProps } = child.props;
          return (
            <RadioTile
              {...otherProps}
              required={required}
              name={name}
              key={value}
              value={value}
              onChange={handleChange}
              checked={value === selected}
            />
          );
        }

        // If the child is not RadioTile and has children, recheck the children
        const children = (child.props as { children?: ReactNode }).children;
        const hasChildren = Children.count(children) > 0;

        if (hasChildren) {
          return cloneElement(
            child,
            undefined,
            traverseAndModifyChildren(children)
          );
        }

        // If the child is neither a RadioTile nor has children, return it as is
        return child;
      });
    };

    return <>{traverseAndModifyChildren(elements)}</>;
  };

  return (
    <fieldset
      className={className ?? `${prefix}--tile-group`}
      disabled={disabled}>
      {legend && <legend className={`${prefix}--label`}>{legend}</legend>}
      <div>{getRadioTilesWithWrappers(children)}</div>
    </fieldset>
  );
};

TileGroup.displayName = 'TileGroup';
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
   * `true` to specify if input selection in group is required.
   */
  required: PropTypes.bool,

  /**
   * Specify the value that is currently selected in the group
   */
  valueSelected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
