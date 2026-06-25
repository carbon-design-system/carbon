/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { ConditionBuilderItem } from '../ConditionBuilderItem/ConditionBuilderItem';
import ConditionConnector from '../ConditionBuilderConnector/ConditionConnector';
import { useTranslations } from '../utils/useTranslations';
import { Bee } from '@carbon/react/icons';
import { ConditionGroup } from '../ConditionBuilder.types';
import { blockClass } from '../utils/util';

interface ConditionPreviewProps {
  previewType: 'newGroup' | 'subGroup' | 'condition';
  group: ConditionGroup;
  colorIndex?: number;
  className?: string;
}
const ConditionPreview = ({
  previewType,
  group,
  colorIndex,
  className,
}: ConditionPreviewProps) => {
  const [animate, setAnimate] = useState(false);
  const [propertyText, operatorText, valueText, ifText] = useTranslations([
    'valueText',
    'operatorText',
    'propertyText',
    'ifText',
  ]);

  useEffect(() => {
    setAnimate(true);
  }, []);
  const getConditionSection = () => {
    return (
      <div className={`${blockClass}__preview-condition`}>
        <ConditionBuilderItem label={propertyText} renderIcon={Bee} />
        <ConditionBuilderItem label={operatorText} />
        <ConditionBuilderItem label={valueText} />
      </div>
    );
  };

  return (
    <>
      {previewType == 'newGroup' && (
        <>
          <div
            className={cx([
              `${blockClass}__group__row ${blockClass}__group-preview ${className}`,
              { [`${blockClass}__group-preview-animate`]: animate },
            ])}
          >
            <ConditionBuilderItem
              className={`${blockClass}__statement-button`}
              label={group.groupOperator}
            />
          </div>
          <div
            data-color-index={colorIndex}
            aria-hidden
            className={cx([
              `${blockClass}__group  ${blockClass}__condition-wrapper ${blockClass}__group-preview ${blockClass}__group-wrapper ${className}`,
              { [`${blockClass}__group-preview-animate`]: animate },
            ])}
          >
            <div className={`${blockClass}__gap`}>
              <ConditionBuilderItem
                className={`${blockClass}__statement-button`}
                label={ifText}
              />
            </div>
            {getConditionSection()}
          </div>
        </>
      )}

      {previewType == 'subGroup' && (
        <div
          className={cx([
            `${blockClass}__group__row ${blockClass}__group-preview ${blockClass}__gap-bottom`,
            { [`${blockClass}__group-preview-animate`]: animate },
          ])}
        >
          <div className={`${blockClass}__condition-block  ${blockClass}__gap`}>
            <ConditionBuilderItem
              label={group.groupOperator}
              className={`${blockClass}__statement-button`}
              popOverClassName={`${blockClass}__gap`}
            />

            <div
              className={`${blockClass}__group ${blockClass}__condition-wrapper`}
            >
              <ConditionConnector
                className={`${blockClass}__gap ${blockClass}__groupConnector`}
                operator={ifText}
              />
              {getConditionSection()}
            </div>
          </div>
        </div>
      )}
      {previewType == 'condition' && (
        <div
          className={cx([
            `${blockClass}__group__row ${blockClass}__group-preview ${blockClass}__gap-bottom`,
            { [`${blockClass}__group-preview-animate`]: animate },
          ])}
        >
          <div className={`${blockClass}__condition-block  ${blockClass}__gap`}>
            <ConditionBuilderItem
              label={group.groupOperator}
              className={`${blockClass}__statement-button`}
              popOverClassName={`${blockClass}__gap`}
            />
            {getConditionSection()}
          </div>
        </div>
      )}
    </>
  );
};

export default ConditionPreview;

ConditionPreview.propTypes = {
  className: PropTypes.string,
  /**
   * index of the color for next group
   */
  colorIndex: PropTypes.number,
  /**
   * current conditional group
   */
  group: PropTypes.object,
  /**
   * type of review to be displayed
   */
  previewType: PropTypes.oneOf(['condition', 'subGroup', 'newGroup']),
};
