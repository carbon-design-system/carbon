//
// Copyright IBM Corp. 2020, 2021
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import cx from 'classnames';
import { useResizeObserver } from '../../global/js/hooks/useResizeObserver';
import {
  ButtonSet,
  Button,
  usePrefix,
  MenuButton,
  MenuItem,
} from '@carbon/react';

import { pkg } from '../../settings';
import { prepareProps } from '../../global/js/utils/props-helper';
const blockClass = `${pkg.prefix}--button-set-with-overflow`;
const componentName = 'ButtonSetWithOverflow';

const buttonSize = 'md';

export const ButtonSetWithOverflow = ({
  buttons,
  className,
  onWidthChange,
  buttonSetOverflowLabel,
  menuOptionsClass,
  rightAlign,
}) => {
  const carbonPrefix = usePrefix();
  const [showAsOverflow, setShowAsOverflow] = useState(false);
  const spaceAvailableRef = useRef(null);
  const sizingContainerRefSet = useRef(null);
  const sizingContainerRefCombo = useRef(null);
  const sizes = useRef({});

  /**
   * checkFullyVisibleItems determines display count based on space available and width of pageActions
   *
   * ButtonSetWithOverflow switches between a Carbon ButtonSet and use of the ButtonMenu component depending
   * on the space available. While there is sufficient space to show all of the buttons side by side the
   * ButtonSet is used, once this is no longer the case it switches to a ButtonMenu.
   *
   */
  const checkFullyVisibleItems = () => {
    const spaceAvailable = spaceAvailableRef.current?.offsetWidth;
    let newShowAsOverflow = true;

    // get all of the hidden sizing buttons
    const sizingSet = sizingContainerRefSet.current?.querySelectorAll(
      `.${carbonPrefix}--btn`
    );

    // calculate total width of button set
    let sizingSetTotalSize = 0;
    for (let item of sizingSet) {
      sizingSetTotalSize += item.offsetWidth;
    }

    // check ButtonMenu size
    const sizingComboSize = sizingContainerRefCombo.current?.offsetWidth;

    if (
      onWidthChange &&
      (sizes.current.minWidth !== sizingComboSize ||
        sizes.current.maxWidth !== sizingSetTotalSize)
    ) {
      sizes.current.minWidth = sizingComboSize;
      sizes.current.maxWidth = sizingSetTotalSize;

      // report min and max width required to host
      onWidthChange({
        ...sizes.current,
      });
    }

    // only if space available use ButtonSet.
    if (sizingSetTotalSize <= spaceAvailable) {
      newShowAsOverflow = false;
    }

    setShowAsOverflow(newShowAsOverflow);
  };

  useEffect(() => {
    checkFullyVisibleItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buttons]);

  const AButtonSet = React.forwardRef(
    ({ isHidden = false, buttons, ...rest }, ref) => {
      return (
        <ButtonSet {...rest} ref={ref}>
          {buttons.map(({ label, key, kind, id, ...other }) => {
            const kindFix = kind === 'default' ? 'primary' : kind;
            return (
              <Button
                {...other}
                key={key && `button-set-${key}`}
                size={buttonSize}
                type="button"
                kind={kindFix}
                id={id ? (isHidden ? `${id}--hidden` : id) : null}
              >
                {label}
              </Button>
            );
          })}
        </ButtonSet>
      );
    }
  );

  AButtonSet.propTypes = {
    /**
     *  isHidden - Used to conditionally change id if one is passed to the `AButtonSet` component
     *  in order to avoid duplicate ids between the visible and hidden button set buttons
     */
    isHidden: PropTypes.bool,
  };

  const AButtonMenu = React.forwardRef(({ buttons, ...rest }, ref) => {
    return (
      <MenuButton {...rest} ref={ref} label={buttonSetOverflowLabel}>
        {buttons
          .map(({ key, kind, ...other }) => {
            // menu items only come in default and danger flavors
            const kindFix = kind === 'danger' ? 'danger' : 'default';
            return (
              <MenuItem
                {...prepareProps(other, ['iconDescription', 'renderIcon'])}
                key={key && `button-menu-${key}`}
                kind={kindFix}
              />
            );
          })
          .reverse()}
      </MenuButton>
    );
  });

  useResizeObserver(sizingContainerRefSet, checkFullyVisibleItems);
  useResizeObserver(sizingContainerRefCombo, checkFullyVisibleItems);
  useResizeObserver(spaceAvailableRef, checkFullyVisibleItems);

  return (
    <div
      className={cx([
        blockClass,
        className,
        { [`${blockClass}--right`]: rightAlign },
      ])}
      ref={spaceAvailableRef}
    >
      {/* Hidden button set used to determine if space is available for a button set */}
      <div
        className={`${blockClass}__button-container ${blockClass}__button-container--hidden`}
      >
        <AButtonSet
          aria-hidden={true}
          ref={sizingContainerRefSet}
          size={buttonSize}
          buttons={buttons}
          isHidden
        />
      </div>
      {/* Hidden ButtonMenu used to report min size to host via onWidthChange */}
      <div
        className={`${blockClass}__button-container ${blockClass}__button-container--hidden`}
        aria-hidden={true}
      >
        <AButtonMenu
          className={menuOptionsClass}
          ref={sizingContainerRefCombo}
          buttons={buttons}
          size={buttonSize}
        />
      </div>
      <div
        className={`${blockClass}__button-container ${blockClass}__button-container--visible`}
      >
        {/* The displayed components */}
        {showAsOverflow ? (
          <AButtonMenu
            buttons={buttons}
            size={buttonSize}
            className={menuOptionsClass}
          />
        ) : (
          <AButtonSet
            className={`${blockClass}__button-container`}
            size={buttonSize}
            buttons={buttons}
          />
        )}
      </div>
    </div>
  );
};

ButtonSetWithOverflow.propTypes = {
  /**
   *  buttonSetOverflowLabel - used when button set is shown as combo button
   */
  buttonSetOverflowLabel: PropTypes.node.isRequired,
  /**
   * Specifies the buttons for the ButtonSetWithOverflow. Each item is specified as an object
   * with the properties of a Carbon Button plus a label.
   *
   * Carbon Button API https://react.carbondesignsystem.com/?path=/docs/components-button--default#component-api
   */
  buttons: PropTypes.array.isRequired,
  /**
   * className
   */
  className: PropTypes.string,
  /**
   * class name applied to the overflow options
   */
  menuOptionsClass: PropTypes.string,
  /**
   * onResize reports maxSize on resize
   */
  onWidthChange: PropTypes.func,
  /**
   * align buttons to right of available space
   */
  rightAlign: PropTypes.bool,
};

ButtonSetWithOverflow.displayName = componentName;
