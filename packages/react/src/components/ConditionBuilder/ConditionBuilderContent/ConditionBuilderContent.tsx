/**
 * Copyright IBM Corp. 2024, 2026
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
import { Button } from '../../Button';
import { Heading, Section } from '../../Heading';
import { usePrefix } from '../../../internal/usePrefix';
import { Add, TextNewLine } from '@carbon/icons-react';
import ConditionGroupBuilder from '../ConditionGroupBuilder/ConditionGroupBuilder';
import {
  ConditionBuilderContext,
  getEmptyState,
} from '../ConditionBuilderContext/ConditionBuilderProvider';
import { ConditionBuilderButton } from '../ConditionBuilderButton/ConditionBuilderButton';
import ConditionPreview from '../ConditionPreview/ConditionPreview';
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
import { HIERARCHICAL_VARIANT } from '../utils/util';
interface ConditionBuilderContentProps {
  startConditionLabel: string;
  /** @deprecated Use `onChange` (from context) instead. */
  getConditionState?: (state: ConditionBuilderState) => void;
  getActionsState?: (state: Action[]) => void;
  /** @deprecated Use `value` (and `onChange` for controlled mode) instead. */
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
    value: seedValue,
    onChange,
    startActive,
  } = useContext<ConditionBuilderContextProps>(ConditionBuilderContext);

  const initialConditionState = useRef(
    initialState?.state ? JSON.parse(JSON.stringify(initialState?.state)) : null
  );
  // Tracks whether the user has explicitly clicked "Add condition".
  // Used to lift the startActive=false gate after the first click.
  const userActivated = useRef(false);
  const [isConditionBuilderActive, setIsConditionBuilderActive] =
    useState(false);
  const [showConditionGroupPreview, setShowConditionGroupPreview] =
    useState(false);

  const [
    addConditionGroupText,
    conditionHeadingText,
    conditionBuilderHierarchicalText,
    conditionRemovedText,
  ] = useTranslations([
    'addConditionGroupText',
    'conditionHeadingText',
    'conditionBuilderHierarchicalText',
    'conditionRemovedText',
  ]);

  const carbonPrefix = usePrefix();
  const blockClass = `${carbonPrefix}--condition-builder`;
  const [statusMessage, setStatusMessage] = useState('');
  const showConditionGroupPreviewHandler = () => {
    setShowConditionGroupPreview(true);
  };

  const hideConditionGroupPreviewHandler = () => {
    setShowConditionGroupPreview(false);
  };

  useEffect(() => {
    // When startActive is explicitly false, suppress auto-activation until
    // the user has clicked the "Add condition" button (userActivated.current).
    if (startActive === false && !userActivated.current) {
      // getConditionState (legacy) is a state-read callback — calling on mount
      // is intentional for backward compat.
      if (getConditionState) {
        getConditionState(rootState ?? {});
      }
      return;
    }

    if (rootState?.groups?.length) {
      setIsConditionBuilderActive(true);
    } else {
      setIsConditionBuilderActive(false);
    }

    // getConditionState (legacy): fires on every state update including mount.
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
    // `value` takes precedence over `initialState` — skip if the new API is in use.
    if (initialState?.enabledDefault && seedValue === undefined) {
      setRootState?.(initialState.state);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialState]);

  const onStartConditionBuilder = () => {
    userActivated.current = true;
    // Always activate immediately — the useEffect on rootState will also set
    // this, but it fires asynchronously; setting it here ensures the builder
    // is visible in the same React batch as the button click.
    setIsConditionBuilderActive(true);
    if (seedValue !== undefined && onChange !== undefined) {
      // Fully controlled path (value + onChange): the parent owns the state.
      // Just reveal the builder — do NOT call setRootState, which would emit
      // a spurious onChange even when the state is already empty-groups.
      return;
    }
    if (seedValue !== undefined && rootState?.groups?.length) {
      // Uncontrolled seed (value without onChange) and internalState still has
      // groups (e.g. startActive=false on first click) — state is already
      // correct, just reveal the builder.
      return;
    }
    // No seed, or seed was cleared: initialize with legacy initialState or a
    // fresh empty state.
    if (initialConditionState?.current?.groups?.length) {
      setRootState?.(initialConditionState.current);
      initialConditionState.current = null;
    } else {
      setRootState?.(getEmptyState(statementConfigCustom));
    }
  };

  const onRemove = useCallback(
    (groupId) => {
      const groupToRemove = rootState?.groups?.find(
        (group) => group?.id === groupId
      );

      const { preventRemove } =
        (onRemoveItem?.({
          type: 'group',
          state: rootState as ConditionBuilderState,
          item: groupToRemove,
        }) as { preventRemove?: boolean }) ?? {};

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
        setStatusMessage(conditionRemovedText);
      }
    },
    [setRootState, rootState, onRemoveItem, conditionRemovedText]
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
      (onAddItem?.({
        type: 'group',
        state: rootState as ConditionBuilderState,
      }) as { preventAdd?: boolean }) ?? {};
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
      // No status announcement: the new group's property picker popover opens immediately
      // and auto-focuses the search field, which screen readers announce via focus.
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
        onClick={onStartConditionBuilder}>
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
      {/* Visually hidden live region — announces condition add/remove to screen readers */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className={`${carbonPrefix}--visually-hidden`}>
        {statusMessage}
      </div>
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
                setStatusMessage={setStatusMessage}
                conditionRemovedText={conditionRemovedText}
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
            className={`${blockClass}__add-group`}>
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
            group={{
              groupOperator: rootState?.operator,
              id: crypto.randomUUID(),
            }}
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
