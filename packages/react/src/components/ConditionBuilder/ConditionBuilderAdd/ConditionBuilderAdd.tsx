/**
 * Copyright IBM Corp. 2024, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useContext } from 'react';
import cx from 'classnames';
import { AddAlt, TextNewLine } from '@carbon/icons-react';
import { ConditionBuilderButton } from '../ConditionBuilderButton/ConditionBuilderButton';
import { useTranslations } from '../utils/useTranslations';
import { ConditionBuilderContext } from '../ConditionBuilderContext/ConditionBuilderProvider';
import {
  ConditionBuilderState,
  ConditionGroup,
} from '../ConditionBuilder.types';
import { usePrefix } from '../../../internal/usePrefix';

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
  const prefix = usePrefix();
  const blockClass = `${prefix}--condition-builder`;

  const onClickHandler = () => {
    const { preventAdd } =
      (onAddItem?.({
        type: 'condition',
        state: rootState as ConditionBuilderState,
        group,
      }) as { preventAdd?: boolean }) ?? {};
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
      (onAddItem?.({
        type: 'subgroup',
        state: rootState as ConditionBuilderState,
        group,
      }) as { preventAdd?: boolean }) ?? {};
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
      aria-label={getAriaLabel()}>
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
