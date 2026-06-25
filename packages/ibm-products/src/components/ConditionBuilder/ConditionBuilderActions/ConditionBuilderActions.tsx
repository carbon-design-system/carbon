/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Close } from '@carbon/react/icons';
/**@ts-ignore */
import { Section, Heading } from '@carbon/react';
import { ConditionBuilderItem } from '../ConditionBuilderItem/ConditionBuilderItem';
import { ConditionBuilderContext } from '../ConditionBuilderContext/ConditionBuilderProvider';
import ConditionBuilderAdd from '../ConditionBuilderAdd/ConditionBuilderAdd';
import uuidv4 from '../../../global/js/utils/uuidv4';
import { ConditionBuilderButton } from '../ConditionBuilderButton/ConditionBuilderButton';
import { useTranslations } from '../utils/useTranslations';
import { ItemOptionForValueField } from '../ConditionBuilderItem/ConditionBuilderItemOption/ItemOptionForValueField';
import { Action, Option } from '../ConditionBuilder.types';
import { blockClass } from '../utils/util';

interface ConditionBuilderActionsProps {
  actions: Action[] | Option[];
  className?: string;
}
const ConditionBuilderActions = ({
  actions,
  className,
}: ConditionBuilderActionsProps) => {
  const {
    actionState = [],
    setActionState,
    readOnly,
    onRemoveItem,
    rootState,
  } = useContext(ConditionBuilderContext);
  const [showDeletionPreview, setShowDeletionPreview] = useState(-1);
  const [
    actionsText,
    thenText,
    andText,
    removeActionText,
    addActionText,
    actionSectionText,
  ] = useTranslations([
    'actionsText',
    'then',
    'and',
    'removeActionText',
    'addActionText',
    'actionSectionText',
  ]);

  const addActionHandler = () => {
    if (readOnly) {
      return;
    }
    const action = {
      id: uuidv4(),
      label: undefined,
      popoverToOpen: 'valueField',
    };
    setActionState?.([...actionState, action]);
  };

  const onchangeHandler = (selectedId: string, actionIndex: number) => {
    const action = actions.find((action) => action.id === selectedId); //fetch the selected action from the input action array

    // same actions can be added multiple times
    const newAction = { ...action, id: actionState[actionIndex].id };
    setActionState?.([
      ...actionState.slice(0, actionIndex),
      newAction,
      ...actionState.slice(actionIndex + 1),
    ]);
  };

  const onRemove = (selectedId) => {
    const actionToRemove = actionState.find(
      (action) => action.id === selectedId
    );
    const { preventRemove } =
      onRemoveItem?.({
        type: 'action',
        state: rootState as any,
        item: actionToRemove,
      }) ?? {};
    if (!preventRemove) {
      setActionState?.(
        actionState.filter((action) => action.id !== selectedId)
      );
    }
  };
  const handleShowDeletionPreview = (index: number) => {
    setShowDeletionPreview(index);
  };
  const handleHideDeletionPreview = () => {
    setShowDeletionPreview(-1);
  };
  return (
    <div className={className}>
      <Section className={`${blockClass}__heading`} level={4}>
        <Heading>{actionsText}</Heading>
      </Section>
      <div
        className={`${blockClass}__condition-wrapper`}
        role="grid"
        aria-label={actionSectionText}
      >
        {actionState?.map((action, index) => (
          <div
            key={action.id}
            role="row"
            className={cx(
              `${blockClass}__condition-block ${blockClass}__gap ${blockClass}__gap-bottom`,
              {
                [`${blockClass}__condition__deletion-preview`]:
                  showDeletionPreview == index,
              }
            )}
          >
            <ConditionBuilderItem
              className={`${blockClass}__statement-button`}
              tabIndex={0}
              popOverClassName={`${blockClass}__gap ${blockClass}__connector`}
              label={index === 0 ? thenText : andText}
            />

            <ConditionBuilderItem
              label={action.label}
              title={actionsText}
              condition={action as Action}
              data-name="valueField"
              type="option"
              popOverClassName={`${blockClass}__action-block`}
            >
              <ItemOptionForValueField
                conditionState={{
                  value: action.label,
                }}
                onChange={(selection) => onchangeHandler(selection.id, index)}
                config={{ options: actions as Option[] }}
              />
            </ConditionBuilderItem>
            {!readOnly && (
              <span role="gridcell" aria-label={removeActionText}>
                <ConditionBuilderButton
                  hideLabel
                  label={removeActionText}
                  onClick={() => onRemove(action.id)}
                  onMouseEnter={() => handleShowDeletionPreview(index)}
                  onMouseLeave={handleHideDeletionPreview}
                  onFocus={() => handleShowDeletionPreview(index)}
                  onBlur={handleHideDeletionPreview}
                  renderIcon={Close}
                  className={`${blockClass}__close-condition`}
                  data-name="closeCondition"
                />
              </span>
            )}
            {!readOnly && actionState.length === index + 1 && (
              <ConditionBuilderAdd
                onClick={addActionHandler}
                className={`${blockClass}__gap ${blockClass}__gap-left`}
                buttonLabel={addActionText}
                tabIndex={0}
              />
            )}
          </div>
        ))}

        {actionState.length === 0 && (
          <ConditionBuilderAdd
            onClick={addActionHandler}
            className={`${blockClass}__gap ${blockClass}__gap-left`}
            buttonLabel={addActionText}
            tabIndex={0}
          />
        )}
      </div>
    </div>
  );
};

export default ConditionBuilderActions;

ConditionBuilderActions.propTypes = {
  /**
   * optional array of object that give the list of actions.
   */
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  /**
   * Provide an optional class to be applied to the containing node.
   */
  className: PropTypes.string,
};
