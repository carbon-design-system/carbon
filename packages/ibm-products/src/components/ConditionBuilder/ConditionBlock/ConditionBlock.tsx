/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useContext, useState } from 'react';
import { Close } from '@carbon/react/icons';
import { ConditionBuilderItem } from '../ConditionBuilderItem/ConditionBuilderItem';
import PropTypes from 'prop-types';
import cx from 'classnames';
import ConditionConnector from '../ConditionBuilderConnector/ConditionConnector';
import { ConditionBuilderItemNumber } from '../ConditionBuilderItem/ConditionBuilderItemNumber/ConditionBuilderItemNumber';
import { ConditionBuilderItemText } from '../ConditionBuilderItem/ConditionBuilderItemText/ConditionBuilderItemText';
import { ConditionBuilderItemDate } from '../ConditionBuilderItem/ConditionBuilderItemDate/ConditionBuilderItemDate';
import { ConditionBuilderContext } from '../ConditionBuilderContext/ConditionBuilderProvider';
import { ConditionBuilderButton } from '../ConditionBuilderButton/ConditionBuilderButton';
import {
  blockClass,
  checkIsValid,
  focusThisField,
  HIERARCHICAL_VARIANT,
  NON_HIERARCHICAL_VARIANT,
} from '../utils/util';
import { ConditionBuilderItemTime } from '../ConditionBuilderItem/ConditionBuilderItemTime/ConditionBuilderItemTime';
import ConditionBuilderAdd from '../ConditionBuilderAdd/ConditionBuilderAdd';
import { ItemOption } from '../ConditionBuilderItem/ConditionBuilderItemOption/ItemOption';
import { ItemOptionForValueField } from '../ConditionBuilderItem/ConditionBuilderItemOption/ItemOptionForValueField';
import { useTranslations } from '../utils/useTranslations';
import { useDataConfigs } from '../utils/useDataConfigs';

import {
  Condition,
  ConditionGroup,
  ConfigType,
  LogicalOperator,
  Property,
  PropertyConfigCustom,
} from '../ConditionBuilder.types';

/**
 * This component build each block of condition consisting of property, operator value and close button.
 */

interface ConditionBlockProps {
  condition?: Condition;
  onRemove: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onChange: (condition: Condition) => void;
  onConnectorOperatorChange?: (op: string) => void;
  onStatementChange?: (v: string) => void;
  addConditionHandler?: (conditionIndex: number) => void;
  addConditionSubGroupHandler?: (conditionIndex: number) => void;
  hideConditionSubGroupPreviewHandler?: () => void;
  showConditionSubGroupPreviewHandler?: () => void;
  hideConditionPreviewHandler?: () => void;
  showConditionPreviewHandler?: () => void;
  conjunction?: LogicalOperator;
  isStatement?: boolean;
  group: ConditionGroup;
  conditionIndex: number;
  aria: {
    level: number;
    posinset: number;
    setsize?: number;
  };
  isLastCondition: (
    index: number,
    conditions: (ConditionGroup | Condition)[]
  ) => void;
}
const ConditionBlock = (props: ConditionBlockProps) => {
  const {
    onRemove,
    onChange,
    condition = {},
    conjunction,
    onConnectorOperatorChange,
    isStatement,
    group,
    onStatementChange,
    conditionIndex,
    addConditionHandler,
    addConditionSubGroupHandler,
    aria,
    hideConditionSubGroupPreviewHandler,
    showConditionSubGroupPreviewHandler,
    hideConditionPreviewHandler,
    showConditionPreviewHandler,
    isLastCondition,
  } = props;
  const { property, value, operator } = condition;
  const { inputConfig, variant, conditionBuilderRef, readOnly } = useContext(
    ConditionBuilderContext
  );

  const [showDeletionPreview, setShowDeletionPreview] = useState(false);
  const [showAllActions, setShowAllActions] = useState(false);

  const [
    conditionRowText,
    conditionText,
    propertyText,
    operatorText,
    removeConditionText,
  ] = useTranslations([
    'conditionRowText',
    'conditionText',
    'propertyText',
    'operatorText',
    'removeConditionText',
  ]);

  const { statementConfig, operatorConfig } = useDataConfigs();

  //filtering the current property to access its properties and config options
  const getCurrentConfig = (property) => {
    return (
      inputConfig?.properties?.find(
        (eachProperty) => eachProperty.id == property
      ) ?? {}
    );
  };

  const { icon, type, config, label, description }: Property = getCurrentConfig(
    property
  ) as Property;

  //Below possible input types expected for value field.
  const itemComponents = {
    text: ConditionBuilderItemText,
    number: ConditionBuilderItemNumber,
    date: ConditionBuilderItemDate,
    time: ConditionBuilderItemTime,
    option: ItemOptionForValueField,
    custom: (config as PropertyConfigCustom['config'])?.component,
    textarea: ConditionBuilderItemText,
  };
  const ItemComponent = itemComponents[type];

  const showAllActionsHandler = () => {
    setShowAllActions(true);
  };
  const hideAllActionsHandler = () => {
    setShowAllActions(false);
  };
  const onStatementChangeHandler = (v, evt) => {
    focusThisField(evt, conditionBuilderRef);
    onStatementChange?.(v);
  };

  const onPropertyChangeHandler = (newProperty) => {
    onChange({
      ...condition,
      property: newProperty,
      operator: undefined,
      value: '',
      popoverToOpen: checkIsValid(newProperty) ? 'operatorField' : '',
    });
  };
  const onOperatorChangeHandler = (newOperator) => {
    onChange({
      ...condition,
      operator: newOperator,
      value: undefined,
      popoverToOpen: checkIsValid(newOperator) ? 'valueField' : '',
    });
  };
  const onValueChangeHandler = (newValue) => {
    const currentCondition = { ...condition };
    delete currentCondition.popoverToOpen;

    onChange({
      ...currentCondition,
      value: newValue,
    });
  };
  const handleShowDeletionPreview = () => {
    setShowDeletionPreview(true);
  };
  const handleHideDeletionPreview = () => {
    setShowDeletionPreview(false);
  };
  const manageActionButtons = (conditionIndex, conditions) => {
    if (variant === HIERARCHICAL_VARIANT) {
      return true;
    }
    return isLastCondition(conditionIndex, conditions);
  };
  const getOperators = () => {
    if ((config as ConfigType)?.operators) {
      return (config as ConfigType)?.operators;
    }
    return operatorConfig.filter(
      (operator) => operator.type.indexOf(type) != -1 || operator.type == 'all'
    );
  };
  const getAriaAttributes = () => {
    return variant == HIERARCHICAL_VARIANT
      ? {
          'aria-level': aria.level,
          'aria-posinset': aria.posinset,
          'aria-setsize': aria.setsize,
        }
      : {};
  };

  const renderChildren = (popoverRef, closePopover) => {
    return (
      <ItemComponent
        conditionState={{
          property,
          operator,
          value,
        }}
        onChange={onValueChangeHandler}
        config={config}
        data-name="valueField"
        parentRef={popoverRef}
        type={type}
        closePopover={closePopover}
      />
    );
  };
  const renderItemOption = (popoverRef, closePopover) => {
    return (
      <ItemOption
        conditionState={{
          value: property,
          label: propertyText,
        }}
        onChange={onPropertyChangeHandler}
        config={{ options: inputConfig?.properties }}
        closePopover={closePopover}
        group={group}
      />
    );
  };
  return (
    // eslint-disable-next-line jsx-a11y/interactive-supports-focus
    <div
      className={cx(
        `${blockClass}__condition-block`,
        {
          [`${blockClass}__condition__deletion-preview`]: showDeletionPreview,
        },
        {
          [`${blockClass}__gap-bottom`]: variant == HIERARCHICAL_VARIANT,
        },
        {
          [`${blockClass}__gap ${blockClass}__gap-bottom`]:
            variant == NON_HIERARCHICAL_VARIANT,
        },
        {
          [`${blockClass}__condition--interacting`]: showAllActions,
        }
      )}
      role="row"
      aria-label={conditionRowText}
      {...getAriaAttributes()}
      onMouseEnter={showAllActionsHandler}
      onMouseLeave={hideAllActionsHandler}
      onBlur={hideAllActionsHandler}
    >
      {conjunction ? (
        <ConditionConnector
          className={`${blockClass}__gap`}
          operator={conjunction}
          onChange={(op) => onConnectorOperatorChange?.(op)}
        />
      ) : (
        ''
      )}

      {isStatement && (
        <ConditionBuilderItem
          label={group.statement}
          title={conditionText}
          data-name="connectorField"
          popOverClassName={`${blockClass}__gap ${blockClass}__connector`}
          className={`${blockClass}__statement-button`}
          tabIndex={0}
        >
          <ItemOption
            conditionState={{
              value: group.statement,
              label: conditionText,
            }}
            onChange={onStatementChangeHandler}
            config={{ options: statementConfig, isStatement: true }}
          />
        </ConditionBuilderItem>
      )}
      <div className={`${blockClass}__condition-inner-block`}>
        <ConditionBuilderItem
          label={label ?? condition?.property}
          title={propertyText}
          renderIcon={icon ?? undefined}
          className={`${blockClass}__property-field`}
          data-name="propertyField"
          condition={condition}
          type={type}
          description={description}
          onChange={onPropertyChangeHandler}
          renderChildren={renderItemOption}
        />
        {checkIsValid(property) && (
          <ConditionBuilderItem
            label={operator}
            title={operatorText}
            data-name="operatorField"
            condition={condition}
            type={type}
            config={config as ConfigType}
            onChange={onOperatorChangeHandler}
          >
            <ItemOption
              config={{
                options: getOperators(),
              }}
              conditionState={{
                value: operator,
                label: operatorText,
              }}
              onChange={onOperatorChangeHandler}
            />
          </ConditionBuilderItem>
        )}
        {checkIsValid(property) && checkIsValid(operator) && (
          <ConditionBuilderItem
            label={value}
            type={type}
            title={label}
            showToolTip={true}
            data-name="valueField"
            condition={condition}
            config={config as ConfigType}
            onChange={onValueChangeHandler}
            renderChildren={renderChildren}
          />
        )}
      </div>
      {!readOnly && (
        <span role="gridcell" aria-label={removeConditionText}>
          <ConditionBuilderButton
            hideLabel
            label={removeConditionText}
            onClick={onRemove}
            onMouseEnter={handleShowDeletionPreview}
            onMouseLeave={handleHideDeletionPreview}
            onFocus={handleShowDeletionPreview}
            onBlur={handleHideDeletionPreview}
            renderIcon={Close}
            className={`${blockClass}__close-condition`}
            data-name="closeCondition"
            wrapperClassName={`${blockClass}__close-condition-wrapper`}
          />
        </span>
      )}
      {!readOnly && manageActionButtons(conditionIndex, group.conditions) ? (
        <ConditionBuilderAdd
          onClick={() => {
            addConditionHandler?.(conditionIndex);
          }}
          addConditionSubGroupHandler={() => {
            addConditionSubGroupHandler?.(conditionIndex);
          }}
          showConditionSubGroupPreviewHandler={
            showConditionSubGroupPreviewHandler
          }
          hideConditionSubGroupPreviewHandler={
            hideConditionSubGroupPreviewHandler
          }
          enableSubGroup={variant == HIERARCHICAL_VARIANT}
          showConditionPreviewHandler={showConditionPreviewHandler}
          hideConditionPreviewHandler={hideConditionPreviewHandler}
          className={`${blockClass}__gap ${blockClass}__gap-left`}
          group={group}
        />
      ) : null}
    </div>
  );
};

export default ConditionBlock;

ConditionBlock.propTypes = {
  /**
   * callback to add a new condition
   */
  addConditionHandler: PropTypes.func,
  /**
   * callback to add a new condition subgroup
   */
  addConditionSubGroupHandler: PropTypes.func,
  /**
   * object hold aria attributes
   */
  aria: PropTypes.object,

  condition: PropTypes.object,
  conditionIndex: PropTypes.number,
  /**
   * string that decides to show the condition connector
   */
  conjunction: PropTypes.string,

  /**
   * object that hold the current group object where is condition is part of
   */
  group: PropTypes.object,
  /**
   * handler for hiding sub group preview
   */
  hideConditionPreviewHandler: PropTypes.func,
  /**
   * handler for hiding sub group preview
   */
  hideConditionSubGroupPreviewHandler: PropTypes.func,

  isLastCondition: PropTypes.func,
  /**
   *  boolean that decides to show the statement(if/ excl.if)
   */
  isStatement: PropTypes.bool,
  /**
   * callback to update the current condition of the state tree
   */
  onChange: PropTypes.func,
  /**
   * callback to handle the connector(and/or) change
   */
  onConnectorOperatorChange: PropTypes.func,
  /**
   * callback for Remove a condition
   */
  onRemove: PropTypes.func,

  /**
   * callback to handle the statement(if/ excl.if) change
   */
  onStatementChange: PropTypes.func,
  /**
   * handler for showing add condition preview
   */
  showConditionPreviewHandler: PropTypes.func,
  /**
   * handler for showing sub group preview
   */
  showConditionSubGroupPreviewHandler: PropTypes.func,
  /**
   * object that hold the current condition
   */
  state: PropTypes.object,
};
