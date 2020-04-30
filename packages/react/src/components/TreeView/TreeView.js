/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { settings } from 'carbon-components';

const { prefix } = settings;

export default function TreeView({
  children,
  className,
  multiselect,
  onChange,
  selected: preselected = '',
  size = 'default',
  ...rest
}) {
  const treeClasses = classNames(className, `${prefix}--tree`, {
    [`${prefix}--tree--${size}`]: size !== 'default',
  });
  const [selected, setSelected] = useState(preselected);
  const handleSelect = (event, { value } = {}) => {
    if (multiselect && event.metaKey) {
      const valuesList = selected.split(',');
      if (valuesList.indexOf(value) < 0) {
        setSelected(
          valuesList
            .concat([value])
            .sort()
            .join(',')
        );
      }
    } else {
      setSelected(value);
    }
    if (onChange) {
      onChange(event, { value: value?.value });
    }
  };
  const nodesWithProps = React.Children.map(children, node => {
    if (React.isValidElement(node)) {
      return React.cloneElement(node, {
        depth: 0,
        onSelect: handleSelect,
        selected,
      });
    }
  });

  useEffect(() => {
    setSelected(preselected);
  }, [preselected]);

  return (
    <ul {...rest} className={treeClasses} role="tree">
      {nodesWithProps}
    </ul>
  );
}
