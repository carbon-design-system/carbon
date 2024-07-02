import PropTypes from 'prop-types';
import React, {
  useEffect,
  useMemo,
  useState,
  ReactElement,
  ReactNode,
} from 'react';
import classNames from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import Checkbox, { CheckboxProps } from './Checkbox';
import { noopFn } from '../../internal/noopFn';

export enum NestedCheckboxStates {
  Checked,
  Indeterminate,
  Unchecked,
}

export interface NestedCheckboxProps extends CheckboxProps {
  /**
   * Provide a collection of `<Checkbox> and <NestedCheckbox>` components to render in the group
   */
  children?: ReactNode;
}

const NestedCheckbox = React.forwardRef(
  ({
    checked,
    children,
    className,
    defaultChecked,
    id,
    invalid,
    onChange = noopFn,
    readOnly,
    warn,
    slug,
    ...rest
  }: NestedCheckboxProps) => {
    const [childrenCheckState, setChildrenCheckState] = useState(() => {
      const map = new Map();
      React.Children.forEach(children, (child) => {
        const { checked: childChecked, id } =
          (child as ReactElement)?.props ?? undefined;
        map.set(id, checked ?? childChecked ?? false);
      });
      return map;
    });
    useEffect(() => {
      const map = new Map();
      React.Children.forEach(children, (child) => {
        const {
          checked: childChecked,
          id,
          onChange,
        } = (child as ReactElement)?.props ?? undefined;
        map.set(id, checked ?? childChecked ?? false);
        if (typeof onChange === 'function' && checked) {
          onChange(null, { checked, id });
        }
      });
      setChildrenCheckState(map);
    }, [checked, children]);

    const childrenCheckedCount = useMemo(() => {
      let counter = 0;
      childrenCheckState.forEach((value) => (counter += value ? 1 : 0));
      return counter;
    }, [childrenCheckState]);

    const prefix = usePrefix();
    const showWarning = !readOnly && !invalid && warn;
    const wrapperClasses = classNames(
      `${prefix}--form-item`,
      `${prefix}--nested-checkbox-wrapper`,
      className,
      {
        [`${prefix}--nested-checkbox-wrapper--readonly`]: readOnly,
        [`${prefix}--nested-checkbox-wrapper--invalid`]: !readOnly && invalid,
        [`${prefix}--nested-checkbox-wrapper--warning`]: showWarning,
        [`${prefix}--nested-checkbox-wrapper--slug`]: slug,
      }
    );

    const handleOnChange = (event, { checked, id }) => {
      const map = new Map();
      React.Children.forEach(children, (child) => {
        const { id } = (child as ReactElement)?.props ?? undefined;
        map.set(id, checked);
      });
      setChildrenCheckState(map);
      if (typeof onChange === 'function') {
        onChange(event, { checked, id });
      }
    };

    const propagateChange = (event, count) => {
      if (checked && count === 0) {
        onChange(event, { checked: false, id });
      } else if (!checked && count === React.Children.count(children)) {
        onChange(event, { checked: true, id });
      }
    };

    function getCheckboxes() {
      const mappedChildren = React.Children.map(children, (checkbox) => {
        // const nestedCheckbox = checkbox as React.FunctionComponentElement<any>;
        // if (nestedCheckbox.type &&
        //   nestedCheckbox.type.displayName !== undefined &&
        //   nestedCheckbox.type.displayName.includes('NestedCheckbox')) {
        //   return React.cloneElement(nestedCheckbox as ReactElement, {});
        // } else
        if (checkbox) {
          const { id, onChange } =
            (checkbox as ReactElement)?.props ?? undefined;
          const handleChildChange = (event, { checked, id }) => {
            const map = new Map(childrenCheckState.set(id, checked));
            setChildrenCheckState(map);
            const inc = checked ? 1 : -1;
            const updatedCheckedCount = childrenCheckedCount + inc;
            propagateChange(event, updatedCheckedCount);

            if (typeof onChange === 'function') {
              onChange(event, { checked, id });
            }
          };
          const newProps = {
            checked: childrenCheckState.get(id),
            onChange: handleChildChange,
          };
          return React.cloneElement(checkbox as ReactElement, newProps);
        }
      });

      return mappedChildren;
    }

    return (
      <div className={wrapperClasses}>
        <Checkbox
          checked={childrenCheckedCount === React.Children.count(children)}
          defaultChecked={defaultChecked}
          id={id}
          indeterminate={
            childrenCheckedCount > 0 &&
            childrenCheckedCount < React.Children.count(children)
          }
          invalid={invalid}
          onChange={handleOnChange}
          readOnly={readOnly}
          warn={warn}
          slug={slug}
          {...rest}
        />
        <div className={`${prefix}--nested-checkbox__children`}>
          {getCheckboxes()}
        </div>
      </div>
    );
  }
);

NestedCheckbox.propTypes = {
  /**
   * Specify whether the underlying input should be checked
   */
  checked: PropTypes.bool,

  /**
   * The list of children checkboxes to be within this nested CheckBox
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the <label> node
   */
  className: PropTypes.string,

  /**
   * Specify whether the underlying input should be checked by default
   */
  defaultChecked: PropTypes.bool,

  /**
   * Specify whether the Checkbox should be disabled
   */
  disabled: PropTypes.bool,

  /**
   * Provide text for the form group for additional help
   */
  helperText: PropTypes.node,

  /**
   * Specify whether the label should be hidden, or not
   */
  hideLabel: PropTypes.bool,

  /**
   * Provide an `id` to uniquely identify the Checkbox input
   */
  id: PropTypes.string.isRequired,

  /**
   * Specify whether the Checkbox is in an indeterminate state
   */
  indeterminate: PropTypes.bool,

  /**
   * Specify whether the Checkbox is currently invalid
   */
  invalid: PropTypes.bool,

  /**
   * Provide the text that is displayed when the Checkbox is in an invalid state
   */
  invalidText: PropTypes.node,

  /**
   * Provide a label to provide a description of the Checkbox input that you are
   * exposing to the user
   */
  labelText: PropTypes.node.isRequired,

  /**
   * Provide an optional handler that is called when the internal state of
   * Checkbox changes. This handler is called with event and state info.
   * `(event, { checked, id }) => void`
   */
  onChange: PropTypes.func,

  /**
   * Specify whether the Checkbox is read-only
   */
  readOnly: PropTypes.bool,

  /**
   * **Experimental**: Provide a `Slug` component to be rendered inside the `Checkbox` component
   */
  slug: PropTypes.node,

  /**
   * Specify a title for the <label> node for the Checkbox
   */
  title: PropTypes.string,

  /**
   * Specify whether the Checkbox is currently in warning state
   */
  warn: PropTypes.bool,

  /**
   * Provide the text that is displayed when the Checkbox is in warning state
   */
  warnText: PropTypes.node,
};

NestedCheckbox.displayName = 'NestedCheckbox';

export default NestedCheckbox;
