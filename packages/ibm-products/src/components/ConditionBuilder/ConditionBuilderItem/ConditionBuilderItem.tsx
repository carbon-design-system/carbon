/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  PropsWithChildren,
  KeyboardEvent,
  ReactNode,
  Ref,
} from 'react';

import {
  Popover,
  PopoverContent,
  Layer,
  Heading,
  Section,
} from '@carbon/react';
import PropTypes from 'prop-types';
import { Add, CarbonIconType } from '@carbon/react/icons';
import { ConditionBuilderButton } from '../ConditionBuilderButton/ConditionBuilderButton';
import { useTranslations } from '../utils/useTranslations';
import { ConditionBuilderContext } from '../ConditionBuilderContext/ConditionBuilderProvider';
import { handleKeyDownForPopover } from '../utils/handleKeyboardEvents';
import {
  Condition,
  Action,
  Option,
  ConfigType,
} from '../ConditionBuilder.types';
import {
  blockClass,
  checkForMultiSelectOperator,
  getValue,
} from '../utils/util';
import { translationsObject } from '../ConditionBuilderContext/translationObject';
import { useEvent } from '../utils/useEvent';

interface ConditionBuilderItemProps extends PropsWithChildren {
  className?: string;

  label?: string | Option | Option[];
  renderIcon?: CarbonIconType;
  title?: string;
  showToolTip?: boolean;
  popOverClassName?: string;
  type?: string;
  description?: string;
  condition?: Action & Condition;
  config?: ConfigType;
  renderChildren?: (
    ref: Ref<HTMLDivElement | null>,
    closePopover: () => void
  ) => ReactNode;
  onChange?: (val: string) => void;
  tabIndex?: number;
  onMouseEnter?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onFocus?: React.FocusEventHandler<HTMLButtonElement>;
  onBlur?: React.FocusEventHandler<HTMLButtonElement>;
}
export const ConditionBuilderItem = ({
  children,
  className,
  label,
  renderIcon,
  title,
  type,
  showToolTip,
  condition,
  popOverClassName,
  config,
  renderChildren,
  onChange,
  description,
  ...rest
}: ConditionBuilderItemProps) => {
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);

  const { conditionBuilderRef, statementConfigCustom, readOnly } = useContext(
    ConditionBuilderContext
  );

  const statementIdMap = {
    ifAll: translationsObject.ifText,
    ifAny: translationsObject.ifText,
    unlessAll: translationsObject.unlessText,
    unlessAny: translationsObject.unlessText,
  };
  //Appending statements from custom statement configuration if present
  statementConfigCustom?.forEach((statement) => {
    statementIdMap[statement.id] = statement.label;
  });

  const [
    invalidText,
    addConditionText,
    addPropertyText,
    addOperatorText,
    addValueText,
    labelText,
  ] = useTranslations(
    [
      'invalidText',
      'addConditionText',
      'addPropertyText',
      'addOperatorText',
      'addValueText',
      label,
    ],
    statementIdMap
  );

  const getCustomOperatorLabel = (propertyLabel) => {
    return (
      propertyLabel &&
      config?.operators?.find((operator) => {
        return operator.id === propertyLabel;
      })
    );
  };

  const getPropertyDetails = () => {
    const { property, operator } = condition || {};
    if (
      label === 'INVALID' ||
      (rest['data-name'] === 'propertyField' && property === 'INVALID') ||
      (rest['data-name'] === 'operatorField' && operator === 'INVALID')
    ) {
      return {
        propertyLabel: invalidText,
        isInvalid: true,
      };
    }
    if (rest['data-name'] == 'operatorField' && type == 'custom') {
      return {
        isInvalid: false,
        propertyLabel: getCustomOperatorLabel(label)?.id,
      };
    }
    const propertyId =
      rest['data-name'] == 'valueField' && type
        ? getValue(type, label, config)
        : labelText;

    return {
      isInvalid: false,
      propertyLabel: propertyId,
    };
  };
  const { propertyLabel, isInvalid } = getPropertyDetails();

  useEffect(() => {
    /**
     * rest['data-name'] holds the current field name
     * popoverToOpen hold the next popover to be opened if required
     */
    if (condition) {
      const currentField = rest['data-name'];
      //if any condition is changed, state prop is triggered
      if (condition.popoverToOpen && currentField !== condition.popoverToOpen) {
        // close the previous popover
        closePopover();
      } else if (
        currentField == 'valueField' &&
        type === 'option' &&
        !checkForMultiSelectOperator(condition, config)
      ) {
        //close the current popover if the field is valueField and  is a single select dropdown. For all other inputs ,popover need to be open on value changes.
        closePopover();
      }
      if (condition.popoverToOpen == currentField) {
        //current popover need to be opened
        setTimeout(() => {
          openPopOver();
        });
      }
    } else {
      // when we change any statement(if/ excl.if) which is not part of condition state, label change is triggered.
      //close popOver when statement is changed.
      closePopover();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [condition, label]);

  useEffect(() => {
    //this will focus the first input field in the popover
    if (open && popoverRef.current) {
      const firstFocusableElement = popoverRef?.current?.querySelector(
        'input,textarea'
      ) as HTMLInputElement;
      if (firstFocusableElement) {
        setTimeout(() => firstFocusableElement.focus(), 0);
      }
    }
  }, [popoverRef, open]);

  //This code is added to address the issue in ComposeModal, where popovers are not getting closed on outside click(#18872)
  //This is added as a work around to unblock users to use conditionBuilder in Tearsheets or Compose modal
  useEvent(popoverRef, 'focusout', (event) => {
    const focusEvent = event as FocusEvent;
    const relatedTarget = focusEvent.relatedTarget as Node | null;

    const popoverEl = popoverRef.current;
    if (!popoverEl) {
      return;
    }

    const focusLeftPopover =
      relatedTarget && !popoverEl.contains(relatedTarget);
    const targetInsidePopover = popoverEl.contains(focusEvent.target as Node);

    const targetEl = focusEvent.target as Element | null;
    const focusMovedToDatePicker = targetEl?.closest('.flatpickr-calendar');

    if ((focusLeftPopover || !targetInsidePopover) && !focusMovedToDatePicker) {
      closePopover();
    }
  });

  const manageInvalidSelection = () => {
    //when the user didn't select any value , we need to show as incomplete
    if (
      (rest['data-name'] === 'propertyField' && !condition?.property) ||
      (rest['data-name'] === 'operatorField' && !condition?.operator) ||
      (rest['data-name'] === 'valueField' && !condition?.value)
    ) {
      onChange?.('INVALID');
    }
  };
  const closePopover = () => {
    if (open) {
      manageInvalidSelection();
    }
    setOpen(false);
  };
  const openPopOver = () => {
    if (readOnly) {
      return;
    }
    setOpen(true);
  };
  const togglePopover = () => {
    if (children || renderChildren) {
      setOpen(!open);
    }
  };

  const handleKeyDownHandler = (evt: KeyboardEvent) => {
    handleKeyDownForPopover(evt, conditionBuilderRef, popoverRef, closePopover);
    if (evt.key === 'Escape') {
      manageInvalidSelection();
    }
  };

  const getLabel = () => {
    if (config?.operators && rest['data-name'] === 'operatorField') {
      return getCustomOperatorLabel(propertyLabel)?.label ?? addOperatorText;
    } else if (propertyLabel) {
      return propertyLabel;
    } else if (rest['data-name'] === 'propertyField') {
      return addPropertyText;
    } else if (rest['data-name'] === 'operatorField') {
      return addOperatorText;
    } else if (rest['data-name'] === 'valueField') {
      return addValueText;
    } else {
      return addConditionText;
    }
  };

  return (
    <Popover
      open={open}
      isTabTip
      role="gridcell"
      className={`${popOverClassName} ${blockClass}__popover`}
      ref={popoverRef}
      onRequestClose={() => {
        // Workaround: prevent closing the popover when a date is selected
        // from the flatpickr calendar, which is rendered outside the popover DOM.
        // The flatpickr calendar is appended outside the popover DOM, so clicks on it
        // trigger onRequestClose. We use the global event object to check the click target.
        // carbon issue: https://github.com/carbon-design-system/carbon/issues/21690
        const target = (event as MouseEvent)?.target as Element | null;
        if (target?.closest('.flatpickr-calendar')) {
          return;
        }
        closePopover();
      }}
    >
      <ConditionBuilderButton
        label={getLabel()}
        hideLabel={!label ? true : false}
        onClick={togglePopover}
        className={className}
        aria-haspopup
        aria-expanded={open}
        renderIcon={
          renderIcon ? renderIcon : label == undefined ? Add : undefined
        }
        showToolTip={showToolTip}
        isInvalid={isInvalid}
        description={description}
        {...rest}
      />

      {open && (
        <PopoverContent
          className={`${blockClass}__popover-content-wrapper`}
          role="dialog"
          aria-label={title}
          onKeyDown={handleKeyDownHandler}
        >
          <Layer>
            <Section>
              <Heading className={`${blockClass}__item__title`}>
                {title}
              </Heading>
              <div className={`${blockClass}__popover-content`}>
                {renderChildren
                  ? renderChildren(popoverRef, closePopover)
                  : children}
              </div>
            </Section>
          </Layer>
        </PopoverContent>
      )}
    </Popover>
  );
};

ConditionBuilderItem.propTypes = {
  /**
   * provide the contents of the popover
   */
  children: PropTypes.node,
  /**
   * Provide an optional class to be applied to the containing node.
   */
  className: PropTypes.string,
  /**
   * current condition state object
   */
  condition: PropTypes.object,

  /**
   * this is the config object again the current property from inputConfig
   */

  config: PropTypes.object,

  /**
   * text to be displayed in the field
   */
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]),

  /**
   * callback to update the current condition of the state tree
   */
  onChange: PropTypes.func,

  /**
   * class name for popover
   */
  popOverClassName: PropTypes.string,

  /**
   * callback prop that returns the jsx for children
   */
  renderChildren: PropTypes.func,

  /**
   * Optional prop to allow overriding the icon rendering.
   */
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

  /**
   * show tool tip
   */
  showToolTip: PropTypes.bool,

  /**
   * title of the popover
   */
  title: PropTypes.string,
  /**
   * input type
   */
  type: PropTypes.string,
};
