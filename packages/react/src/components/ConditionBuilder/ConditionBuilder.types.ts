/**
 * Copyright IBM Corp. 2024, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type React from 'react';
import type { TextAreaProps } from '../TextArea';
import type { TextInputProps } from '../TextInput';
import type { DatePickerProps } from '../DatePicker';
import type { NumberInputProps } from '../NumberInput';
import type { CarbonIconType } from '@carbon/icons-react';
import {
  Dispatch,
  ForwardedRef,
  PropsWithChildren,
  ReactNode,
  SetStateAction,
} from 'react';

export type LogicalOperator = 'and' | 'or';
export type StatementOperator = 'ifAll' | 'ifAny' | 'unlessAll' | 'unlessAny';

type CoreOperator = 'is';
type NumberOperator = 'greater' | 'greaterEqual' | 'lower' | 'lowerEqual';
type StringOperator = 'startsWith' | 'endsWith';
type ArrayOperator = 'contains';
type OptionOperator = 'oneOf';
type DateOperator = 'before' | 'after';

export type Operator =
  | LogicalOperator
  | StatementOperator
  | CoreOperator
  | NumberOperator
  | StringOperator
  | ArrayOperator
  | OptionOperator
  | DateOperator;

export type OperatorGroups =
  | 'logical'
  | 'statement'
  | 'core'
  | 'number'
  | 'string'
  | 'array'
  | 'option'
  | 'date';

export type Operators = {
  logical: LogicalOperator;
  statement: StatementOperator;
  core: CoreOperator;
  number: NumberOperator;
  string: StringOperator;
  array: ArrayOperator;
  option: OptionOperator;
  date: DateOperator;
};

type Item = { id: string; label: string };

export type option = Item & { icon?: CarbonIconType };

export type PropertyConfigOption = {
  type: 'option';

  config?: {
    options?: option[];
    operators?: (Item & { isMultiSelect?: boolean })[];
  };
};

export interface PropertyConfigText {
  type: 'text';
  config: TextInputProps & { operators?: Item[] };
}

export interface PropertyConfigTextArea {
  type: 'textarea';
  config: TextAreaProps & { operators?: Item[] };
}

export interface PropertyConfigNumber {
  type: 'number';
  config: {
    operators?: Item[];
    min?: number;
    max?: number;
    step?: number;
    unit?: string;
  } & NumberInputProps;
}

export type PropertyConfigDate = {
  type: 'date';
  config: DatePickerProps & { operators?: Item[] };
};

export type PropertyConfigTime = {
  type: 'time';
  config: { operators?: Item[]; timeZones: string[] };
};

export type PropertyConfigCustom = {
  type: 'custom';
  config: {
    component: React.ComponentType<unknown>;
    operators?: Item[];
    valueFormatter?: (value: string) => string;
  };
};

export type ConfigType =
  | PropertyConfigOption['config']
  | PropertyConfigTextArea['config']
  | PropertyConfigText['config']
  | PropertyConfigNumber['config']
  | PropertyConfigDate['config']
  | PropertyConfigTime['config']
  | PropertyConfigCustom['config'];
export type Property = Item & {
  icon?: CarbonIconType;
  description?: string;
  type?: string;
  config?: ConfigType;
  getIsDisabled?: (args: {
    conditionState: Condition;
    group?: ConditionGroup;
  }) => boolean;
  getIsHidden?: (args: {
    conditionState: Condition;
    group?: ConditionGroup;
  }) => boolean;
} & ConfigType;

export type inputConfig = { properties: Property[] };

export type Option = Item & { icon?: CarbonIconType };
export type Condition = {
  property?: string;
  operator?: Operator | '' | 'INVALID';
  value?: string | Option[] | Option;
  id?: string | number;
  popoverToOpen?: string;
};

export type ConditionGroup = {
  conditions?: (ConditionGroup | Condition)[];
  groupOperator?: LogicalOperator;
  statement?: StatementOperator;
  id: string;
};

export type ConditionBuilderState = {
  groups?: ConditionGroup[];
  operator?: LogicalOperator;
};

export type Action = { id?: string | number; label?: string };

export type variantsType = 'Non-Hierarchical' | 'Hierarchical';

export type statementConfig = Item & {
  connector: 'and' | 'or';
  secondaryLabel?: string;
};
type AddItemType = 'condition' | 'subgroup' | 'group';
type AddItemConfig = {
  type: AddItemType;
  state: ConditionBuilderState;
  group?: ConditionGroup;
};

type RemoveItemType = 'condition' | 'subgroup' | 'group' | 'action';
type RemoveItemConfig = {
  type: RemoveItemType;
  state: ConditionBuilderState;
  item?: Condition | ConditionGroup | Action;
  group?: ConditionGroup;
};

export type ConditionBuilderTextKeys =
  | 'ifText'
  | 'unlessText'
  | 'excl_if'
  | 'and'
  | 'or'
  | 'is'
  | 'ifAll'
  | 'ifAny'
  | 'unlessAll'
  | 'unlessAny'
  | 'greater'
  | 'greaterEqual'
  | 'lower'
  | 'lowerEqual'
  | 'startsWith'
  | 'endsWith'
  | 'contains'
  | 'oneOf'
  | 'before'
  | 'after'
  | 'between'
  | 'addConditionText'
  | 'addConditionGroupText'
  | 'addSubgroupText'
  | 'conditionText'
  | 'propertyText'
  | 'operatorText'
  | 'valueText'
  | 'connectorText'
  | 'conditionRowText'
  | 'conditionRowGroupText'
  | 'removeConditionText'
  | 'addConditionRowText'
  | 'startText'
  | 'endText'
  | 'searchPropertiesText'
  | 'clearSearchText'
  | 'actionsText'
  | 'then'
  | 'removeActionText'
  | 'addActionText'
  | 'invalidText'
  | 'invalidNumberWarnText'
  | 'conditionBuilderText'
  | 'conditionBuilderGroupText'
  | 'actionSectionText'
  | 'conditionHeadingText'
  | 'addPropertyText'
  | 'addOperatorText'
  | 'addValueText'
  | 'conditionBuilderHierarchicalText'
  | 'conditionRemovedText';
export type ConditionBuilderProps = {
  inputConfig: inputConfig;
  /**
   * @deprecated Use `value` (and `onChange` for controlled mode) instead.
   * `initialState` will be removed in a future major release.
   */
  initialState?: InitialState;
  getActionsState?: (state: Action[] | undefined) => void;
  /**
   * @deprecated Use `onChange` instead. `getConditionState` will be removed
   * in a future major release.
   */
  getConditionState?: (state: ConditionBuilderState | undefined) => void;
  getOptions?: (
    state: ConditionBuilderState,
    condition: Condition
  ) => Promise<Option[]>;
  actions?: Action[];
  className?: string;
  /** When omitted, defaults to 4. A search field appears in option popovers
   *  when the option list length exceeds this threshold. */
  popOverSearchThreshold?: number;
  startConditionLabel?: string;
  variant?: 'Non-Hierarchical' | 'Hierarchical';
  translateWithId?: (id: ConditionBuilderTextKeys) => string;
  /** Override the default four statements (if all / if any / unless all / unless any).
   *  When omitted, the built-in defaults are used. */
  statementConfigCustom?: statementConfig[];
  onAddItem?: (config: AddItemConfig) => { preventAdd: boolean } | undefined;
  onRemoveItem?: (
    config: RemoveItemConfig
  ) => { preventRemove: boolean } | undefined;
  readOnly?: boolean;
  /**
   * When `false`, the builder starts behind the "Add condition" button even
   * if `value` contains groups. The user must click the button to activate.
   * Defaults to `true` (builder activates immediately when groups are present).
   */
  startActive?: boolean;
  /**
   * Pre-populate the builder with an existing condition state.
   *
   * - **Uncontrolled seed** (no `onChange`): the builder uses this as its
   *   starting state and then manages state internally — equivalent to
   *   `initialState.state` but without the `enabledDefault` flag.
   * - **Controlled** (with `onChange`): the parent owns the state on every
   *   render. Must be kept in sync via `onChange`.
   */
  value?: ConditionBuilderState;
  /**
   * Called with the full new state on every change.
   * - Pair with `value` for fully controlled mode.
   * - Omit to use `value` as a one-time uncontrolled seed.
   * - Can also be used standalone instead of `getConditionState`.
   */
  onChange?: (state: ConditionBuilderState) => void;
};

export type InitialState = {
  state: ConditionBuilderState;
  enabledDefault?: boolean;
};

export interface ConditionBuilderContextInputProps extends PropsWithChildren {
  children?: ReactNode;
  inputConfig?: inputConfig;
  popOverSearchThreshold?: number;
  getOptions?: (
    state: ConditionBuilderState,
    condition: Condition
  ) => Promise<Option[]>;
  variant?: string;
  translateWithId?: (id: ConditionBuilderTextKeys) => string;
  statementConfigCustom?: statementConfig[];
  conditionBuilderRef?: ForwardedRef<HTMLDivElement>;
  readOnly?: boolean;
  startActive?: boolean;
  value?: ConditionBuilderState;
  onChange?: (state: ConditionBuilderState) => void;
}

export type ConditionBuilderContextProps = {
  rootState?: ConditionBuilderState;
  setRootState?: Dispatch<SetStateAction<ConditionBuilderState>>;
  actionState?: Action[];
  setActionState?: Dispatch<SetStateAction<Action[]>>;
  onAddItem?: (config: AddItemConfig) => { preventAdd: boolean } | undefined;
  onRemoveItem?: (
    config: RemoveItemConfig
  ) => { preventRemove: boolean } | undefined;
} & ConditionBuilderContextInputProps;
