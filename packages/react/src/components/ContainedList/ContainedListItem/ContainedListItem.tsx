/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  type ComponentType,
  type FunctionComponent,
  ReactNode,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { LayoutConstraint } from '../../Layout';
import { usePrefix } from '../../../internal/usePrefix';

interface ContainedListItemProps {
  /**
   * A slot for a possible interactive element to render within the item.
   */
  action?: ReactNode;

  /**
   * The content of this item. Must not contain any interactive elements. Use props.action to include those.
   */
  children?: ReactNode;

  /**
   * Additional CSS class names.
   */
  className?: string;

  /**
   * Whether this item is disabled.
   */
  disabled?: boolean;

  /**
   * Provide an optional function to be called when the item is clicked.
   */
  onClick?: () => void;

  /**
   * Provide an optional icon to render in front of the item's content.
   */
  renderIcon?: ComponentType | FunctionComponent;
}

const ContainedListItem: React.FC<ContainedListItemProps> = ({
  action,
  children,
  className,
  disabled = false,
  onClick,
  renderIcon: IconElement,
  ...rest
}) => {
  const prefix = usePrefix();

  const isClickable = onClick !== undefined;

  const classes = classNames(`${prefix}--contained-list-item`, className, {
    [`${prefix}--contained-list-item--clickable`]: isClickable,
    [`${prefix}--contained-list-item--with-icon`]: IconElement,
    [`${prefix}--contained-list-item--with-action`]: action,
  });

  const content = (
    <>
      {IconElement && (
        <div className={`${prefix}--contained-list-item__icon`}>
          <IconElement />
        </div>
      )}
      <div>{children}</div>
    </>
  );

  return (
    <li className={classes} {...rest}>
      {isClickable ? (
        <button
          className={`${prefix}--contained-list-item__content`}
          type="button"
          disabled={disabled}
          onClick={onClick}>
          {content}
        </button>
      ) : (
        <div className={`${prefix}--contained-list-item__content`}>
          {content}
        </div>
      )}
      {action && (
        <LayoutConstraint
          size={{ min: 'sm', max: 'lg' }}
          className={`${prefix}--contained-list-item__action`}>
          {action}
        </LayoutConstraint>
      )}
    </li>
  );
};

ContainedListItem.propTypes = {
  /**
   * A slot for a possible interactive element to render within the item.
   */
  action: PropTypes.node,

  /**
   * The content of this item. Must not contain any interactive elements. Use props.action to include those.
   */
  children: PropTypes.node,

  /**
   * Additional CSS class names.
   */
  className: PropTypes.string,

  /**
   * Whether this item is disabled.
   */
  disabled: PropTypes.bool,

  /**
   * Provide an optional function to be called when the item is clicked.
   */
  onClick: PropTypes.func,

  /**
   * Provide an optional icon to render in front of the item's content.
   */
  // @ts-expect-error: PropTypes are not expressive enough to cover this case
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

export default ContainedListItem;
