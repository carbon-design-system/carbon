/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {
  TextAreaProps,
  TextInputProps,
  type DatePickerProps,
} from '@carbon/react';
import { CarbonIconType } from '@carbon/icons-react';
import { NumberInputProps } from '@carbon/react/lib/components/NumberInput/NumberInput';
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
    component: React.ComponentType<any>;
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
  type?: any;
  config?: any;
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

type ConditionBuilderTextKeys =
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
  | 'clearSearchText'
  | 'actionsText'
  | 'then'
  | 'removeActionText'
  | 'addActionText'
  | 'invalidText'
  | 'invalidNumberWarnText'
  | 'conditionBuilderText'
  | 'actionSectionText'
  | 'conditionHeadingText'
  | 'addPropertyText'
  | 'addOperatorText'
  | 'addValueText'
  | 'conditionBuilderHierarchicalText';
export type ConditionBuilderProps = {
  inputConfig: inputConfig;
  initialState?: InitialState;
  getActionsState?: (state: Action[] | undefined) => void;
  getConditionState: (state: ConditionBuilderState | undefined) => void;
  getOptions?: (
    state: ConditionBuilderState,
    condition: Condition
  ) => Promise<Option[]>;
  actions?: Action[];
  className?: string;
  popOverSearchThreshold: number;
  startConditionLabel?: string;
  variant?: 'Non-Hierarchical' | 'Hierarchical';
  translateWithId?: (id: ConditionBuilderTextKeys) => string;
  statementConfigCustom: statementConfig[];
  onAddItem?: (config: AddItemConfig) => { preventAdd: boolean };
  onRemoveItem?: (config: RemoveItemConfig) => { preventRemove: boolean };
  readOnly?: boolean;
};

export type InitialState = {
  state: ConditionBuilderState;
  enabledDefault?: boolean;
};

export interface ConditionBuilderContextInputProps extends PropsWithChildren {
  children?: ReactNode;
  inputConfig?: inputConfig;
  popOverSearchThreshold: number;
  getOptions?: (
    state: ConditionBuilderState,
    condition: Condition
  ) => Promise<Option[]>;
  variant?: string;
  translateWithId?: (id: ConditionBuilderTextKeys) => string;
  statementConfigCustom?: statementConfig[];
  conditionBuilderRef?: ForwardedRef<HTMLDivElement>;
  readOnly?: boolean;
}

export type ConditionBuilderContextProps = {
  rootState?: ConditionBuilderState;
  setRootState?: Dispatch<SetStateAction<ConditionBuilderState>>;
  actionState?: Action[];
  setActionState?: Dispatch<SetStateAction<Action[]>>;
  onAddItem?: (config: AddItemConfig) => { preventAdd: boolean };
  onRemoveItem?: (config: RemoveItemConfig) => { preventRemove: boolean };
} & ConditionBuilderContextInputProps;
