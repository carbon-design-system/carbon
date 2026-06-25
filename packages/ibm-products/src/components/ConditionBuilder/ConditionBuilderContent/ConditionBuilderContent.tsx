/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { Button } from '@carbon/react';
import { Add, TextNewLine } from '@carbon/react/icons';
import ConditionGroupBuilder from '../ConditionGroupBuilder/ConditionGroupBuilder';
import {
  ConditionBuilderContext,
  getEmptyState,
} from '../ConditionBuilderContext/ConditionBuilderProvider';
import { ConditionBuilderButton } from '../ConditionBuilderButton/ConditionBuilderButton';
import uuidv4 from '../../../global/js/utils/uuidv4';
import ConditionPreview from '../ConditionPreview/ConditionPreview';
import { Heading } from '@carbon/react';
/**@ts-ignore */
import { Section } from '@carbon/react';
import GroupConnector from '../ConditionBuilderConnector/GroupConnector';
import ConditionBuilderActions from '../ConditionBuilderActions/ConditionBuilderActions';
import { useTranslations } from '../utils/useTranslations';
import {
  Action,
  ConditionBuilderContextProps,
  ConditionBuilderState,
  ConditionGroup,
  InitialState,
} from '../ConditionBuilder.types';
import { blockClass, HIERARCHICAL_VARIANT } from '../utils/util';
interface ConditionBuilderContentProps {
  startConditionLabel: string;
  getConditionState: (state: ConditionBuilderState) => void;
  getActionsState?: (state: Action[]) => void;
  initialState?: InitialState;
  actions?: Action[];
}
const ConditionBuilderContent = ({
  startConditionLabel,
  getConditionState,
  getActionsState,
  initialState,
  actions,
}: ConditionBuilderContentProps) => {
  const {
    rootState,
    setRootState,
    variant,
    actionState,
    onAddItem,
    onRemoveItem,
    readOnly,
    statementConfigCustom,
  } = useContext<ConditionBuilderContextProps>(ConditionBuilderContext);

  const initialConditionState = useRef(
    initialState?.state ? JSON.parse(JSON.stringify(initialState?.state)) : null
  );
  const [isConditionBuilderActive, setIsConditionBuilderActive] =
    useState(false);
  const [showConditionGroupPreview, setShowConditionGroupPreview] =
    useState(false);

  const [
    addConditionGroupText,
    conditionHeadingText,
    conditionBuilderHierarchicalText,
  ] = useTranslations([
    'addConditionGroupText',
    'conditionHeadingText',
    'conditionBuilderHierarchicalText',
  ]);
  const showConditionGroupPreviewHandler = () => {
    setShowConditionGroupPreview(true);
  };

  const hideConditionGroupPreviewHandler = () => {
    setShowConditionGroupPreview(false);
  };

  useEffect(() => {
    if (rootState?.groups?.length) {
      setIsConditionBuilderActive(true);
    } else {
      setIsConditionBuilderActive(false);
    }

    if (getConditionState) {
      getConditionState(rootState ?? {});
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rootState]);

  useEffect(() => {
    getActionsState?.(actionState ?? []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionState]);
  useEffect(() => {
    if (initialState?.enabledDefault) {
      setRootState?.(initialState.state);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialState]);

  const onStartConditionBuilder = () => {
    //when add condition button is clicked.
    setIsConditionBuilderActive(true);
    if (initialConditionState?.current?.groups?.length) {
      setRootState?.(initialConditionState.current);
      initialConditionState.current = null;
    } else {
      setRootState?.(getEmptyState(statementConfigCustom)); //here we can set an empty skeleton object for an empty condition builder,
    }

    //or we can even pre-populate some existing builder and continue editing
  };

  const onRemove = useCallback(
    (groupId) => {
      const groupToRemove = rootState?.groups?.find(
        (group) => group?.id === groupId
      );

      const { preventRemove } =
        onRemoveItem?.({
          type: 'group',
          state: rootState as ConditionBuilderState,
          item: groupToRemove,
        }) ?? {};

      if (!preventRemove) {
        const groups = rootState?.groups?.filter(
          (group) => groupId !== group?.id
        );
        setRootState?.({
          ...rootState,
          groups: rootState ? groups : [],
        });
        //set the initial state to empty.
        if (groups?.length === 0) {
          initialConditionState.current = null;
        }
      }
    },
    [setRootState, rootState, onRemoveItem]
  );

  const onChangeHandler = (updatedGroup, groupIndex) => {
    /**
     * This method is triggered from inner components. This will be called every time when any change is to be updated in the rootState.
     * This gets the updated group as argument.
     */
    if (rootState && rootState.groups) {
      const groups = [
        ...(rootState.groups ? rootState.groups.slice(0, groupIndex) : []),
        updatedGroup,
        ...(rootState.groups ? rootState.groups.slice(groupIndex + 1) : []),
      ];
      setRootState?.({
        ...rootState,
        groups,
      });
    }
  };

  const addConditionGroupHandler = () => {
    const { preventAdd } =
      onAddItem?.({
        type: 'group',
        state: rootState as ConditionBuilderState,
      }) ?? {};
    if (!preventAdd) {
      const newGroup = getEmptyState(statementConfigCustom)
        .groups?.[0] as ConditionGroup;
      setRootState?.({
        ...rootState,
        groups:
          rootState && rootState.groups
            ? [...rootState.groups, newGroup]
            : [newGroup],
      });
    }
  };

  const getColorIndex = () => {
    const groupLength = rootState?.groups?.length ?? 0;
    return groupLength % 5;
  };

  if (!isConditionBuilderActive) {
    return (
      <Button
        className={`${blockClass}__addConditionText-button`}
        renderIcon={(props) => <Add {...props} />}
        iconDescription={startConditionLabel}
        kind="ghost"
        size="sm"
        onClick={onStartConditionBuilder}
      >
        {startConditionLabel}
      </Button>
    );
  }
  const wrapperRole =
    variant === HIERARCHICAL_VARIANT
      ? { role: 'treegrid', 'aria-label': conditionBuilderHierarchicalText }
      : null;

  return (
    <>
      <Section className={`${blockClass}__heading`} level={4}>
        <Heading>{conditionHeadingText}</Heading>
      </Section>

      <div className={`${blockClass}__content-container`} {...wrapperRole}>
        {rootState &&
          rootState?.groups?.map((eachGroup, groupIndex) => (
            <div key={eachGroup.id} className={`${blockClass}__group-wrapper`}>
              <ConditionGroupBuilder
                className={`${blockClass}__group`}
                aria={{
                  level: 1,
                  posinset: groupIndex * 2 + 1,
                  setsize:
                    (rootState.groups && rootState.groups.length * 2) ?? 0,
                }}
                group={eachGroup}
                onRemove={() => {
                  onRemove(eachGroup.id);
                }}
                onChange={(updatedGroup) => {
                  onChangeHandler(updatedGroup, groupIndex);
                }}
              />

              {/* displaying the connector field between groups */}
              {rootState.groups && groupIndex < rootState.groups.length - 1 && (
                <GroupConnector />
              )}
            </div>
          ))}

        {/* button to add a new group */}
        {!readOnly && variant == HIERARCHICAL_VARIANT && (
          <div
            role="row"
            tabIndex={-1}
            aria-level={1}
            className={`${blockClass}__add-group`}
          >
            {
              <ConditionBuilderButton
                renderIcon={TextNewLine}
                onClick={addConditionGroupHandler}
                onMouseEnter={showConditionGroupPreviewHandler}
                onMouseLeave={hideConditionGroupPreviewHandler}
                onFocus={showConditionGroupPreviewHandler}
                onBlur={hideConditionGroupPreviewHandler}
                className={`${blockClass}__add-condition-group `}
                hideLabel
                label={addConditionGroupText}
                wrapperProps={{
                  role: 'gridcell',
                  'aria-label': addConditionGroupText,
                }}
              />
            }
          </div>
        )}

        {variant === HIERARCHICAL_VARIANT ? (
          <ConditionPreview
            previewType="newGroup"
            colorIndex={getColorIndex()}
            className={
              showConditionGroupPreview
                ? `${blockClass}__visible`
                : `${blockClass}__hidden`
            }
            group={{ groupOperator: rootState?.operator, id: uuidv4() }}
          />
        ) : null}
      </div>
      {actions && (
        <ConditionBuilderActions
          actions={actions}
          className={`${blockClass}__actions-container`}
        />
      )}
    </>
  );
};

export default ConditionBuilderContent;

ConditionBuilderContent.propTypes = {
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
   * callback functions that will provide the updated action state back.
   */
  getActionsState: PropTypes.func,
  /**
   * This is a callback function that returns the updated state
   */
  getConditionState: PropTypes.func.isRequired,
  /**
   * Optional prop if the condition building need to start from a predefined initial state
   */
  initialState: PropTypes.shape({
    state: PropTypes.shape({
      groups: PropTypes.arrayOf(
        PropTypes.shape({
          groupOperator: PropTypes.string,
          statement: PropTypes.string,
          conditions: PropTypes.arrayOf(
            PropTypes.oneOfType([
              PropTypes.shape({
                property: PropTypes.string,
                operator: PropTypes.string,
                value: PropTypes.oneOfType([
                  PropTypes.string,
                  PropTypes.arrayOf(
                    PropTypes.shape({
                      id: PropTypes.string,
                      label: PropTypes.string,
                    })
                  ),
                  PropTypes.shape({
                    id: PropTypes.string,
                    label: PropTypes.string,
                  }),
                ]),
              }),
              PropTypes.object,
            ])
          ),
        })
      ),
      operator: PropTypes.string,
    }),
    enabledDefault: PropTypes.bool,
  }),
  /* Provide a label to the button that starts condition builder
   */
  startConditionLabel: PropTypes.string.isRequired,
};
