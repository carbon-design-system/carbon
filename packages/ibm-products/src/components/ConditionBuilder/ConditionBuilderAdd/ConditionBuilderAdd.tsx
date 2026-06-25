/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useContext } from 'react';
import cx from 'classnames';
import { AddAlt, TextNewLine } from '@carbon/react/icons';
import { ConditionBuilderButton } from '../ConditionBuilderButton/ConditionBuilderButton';
import PropTypes from 'prop-types';
import { useTranslations } from '../utils/useTranslations';
import { blockClass } from '../utils/util';
import { ConditionBuilderContext } from '../ConditionBuilderContext/ConditionBuilderProvider';
import {
  ConditionBuilderState,
  ConditionGroup,
} from '../ConditionBuilder.types';

interface ConditionBuilderAddProps {
  className?: string;
  onClick: () => void;
  addConditionSubGroupHandler?: () => void;
  showConditionSubGroupPreviewHandler?: () => void;
  hideConditionSubGroupPreviewHandler?: () => void;
  showConditionPreviewHandler?: () => void;
  hideConditionPreviewHandler?: () => void;
  enableSubGroup?: boolean;
  buttonLabel?: string;
  tabIndex?: number;
  group?: ConditionGroup;
}
const ConditionBuilderAdd = ({
  className,
  onClick,
  addConditionSubGroupHandler,
  showConditionSubGroupPreviewHandler,
  hideConditionSubGroupPreviewHandler,
  showConditionPreviewHandler,
  hideConditionPreviewHandler,
  enableSubGroup,
  buttonLabel,
  tabIndex,
  group,
}: ConditionBuilderAddProps) => {
  const [addConditionText, addConditionRowText, addSubgroupText] =
    useTranslations([
      'addConditionText',
      'addConditionRowText',
      'addSubgroupText',
    ]);

  const { onAddItem, rootState } = useContext(ConditionBuilderContext);

  const onClickHandler = () => {
    const { preventAdd } =
      onAddItem?.({
        type: 'condition',
        state: rootState as ConditionBuilderState,
        group,
      }) ?? {};
    if (!preventAdd) {
      hideConditionPreviewHandler?.();
      onClick();
    }
  };
  const previewHandlers = () => {
    return enableSubGroup
      ? {
          onMouseEnter: showConditionPreviewHandler,
          onMouseLeave: hideConditionPreviewHandler,
          onFocus: showConditionPreviewHandler,
          onBlur: hideConditionPreviewHandler,
        }
      : {};
  };
  const previewHandlersForSubgroup = () => ({
    onMouseEnter: showConditionSubGroupPreviewHandler,
    onMouseLeave: hideConditionSubGroupPreviewHandler,
    onFocus: showConditionSubGroupPreviewHandler,
    onBlur: hideConditionSubGroupPreviewHandler,
  });

  const handleAddSubGroup = () => {
    const { preventAdd } =
      onAddItem?.({
        type: 'subgroup',
        state: rootState as ConditionBuilderState,
        group,
      }) ?? {};
    if (!preventAdd) {
      addConditionSubGroupHandler?.();
    }
  };

  const getAriaLabel = () => {
    return buttonLabel
      ? buttonLabel
      : !enableSubGroup
        ? addConditionRowText
        : undefined;
  };

  const wrapperProps = enableSubGroup
    ? {
        role: 'gridcell',
      }
    : {};
  return (
    <div
      className={`${className} ${blockClass}__add-button-wrapper`}
      role={!enableSubGroup ? 'gridcell' : 'none'}
      aria-label={getAriaLabel()}
    >
      <ConditionBuilderButton
        renderIcon={AddAlt}
        onClick={onClickHandler}
        {...previewHandlers()}
        wrapperProps={wrapperProps}
        className={`${blockClass}__add-button`}
        hideLabel
        data-name="addButton"
        label={buttonLabel ?? addConditionText}
        tabIndex={tabIndex}
        wrapperClassName={`${blockClass}__add-condition-wrapper`}
      />
      {enableSubGroup && (
        <ConditionBuilderButton
          renderIcon={TextNewLine}
          onClick={handleAddSubGroup}
          className={cx(`${blockClass}__add-condition-sub-group`)}
          hideLabel
          label={addSubgroupText}
          wrapperProps={wrapperProps}
          wrapperClassName={`${blockClass}__add-condition-sub-group-wrapper ${blockClass}__gap-left`}
          {...previewHandlersForSubgroup()}
        />
      )}
    </div>
  );
};

export default ConditionBuilderAdd;

ConditionBuilderAdd.propTypes = {
  /**
   * handler for hiding sub group preview
   */
  addConditionSubGroupHandler: PropTypes.func,
  /**
   * handler for hiding sub group preview
   */ /**
   * tooltip label for plus button
   */
  buttonLabel: PropTypes.string,

  /**
   * Provide an optional class to be applied to the containing node.
   */
  className: PropTypes.string,
  /**
   * boolean to enable sub groups for the tree variant
   */
  enableSubGroup: PropTypes.bool,
  /**
   * handler for hiding sub group preview
   */
  hideConditionPreviewHandler: PropTypes.func,
  hideConditionSubGroupPreviewHandler: PropTypes.func,
  /**
   * handler for hiding sub group preview
   */ /**
   * callback triggered on click of add button
   */
  onClick: PropTypes.func,
  showConditionPreviewHandler: PropTypes.func,
  showConditionSubGroupPreviewHandler: PropTypes.func,
  /**
   * handler for hiding sub group preview
   */
  /**
   * Tab index
   */
  tabIndex: PropTypes.number,
};
