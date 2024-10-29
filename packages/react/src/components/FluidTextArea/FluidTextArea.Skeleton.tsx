import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import { FormContext } from '../FluidForm/FormContext';

export interface FluidTextAreaSkeletonProps {
  /**
   * Specify an optional className to be applied to the outer FluidForm wrapper
   */
  className?: string;
}

const FluidTextAreaSkeleton: React.FC<FluidTextAreaSkeletonProps> = ({
  className,
  ...other
}) => {
  const prefix = usePrefix();

  return (
    <FormContext.Provider value={{ isFluid: true }}>
      <div
        className={classnames(
          `${prefix}--form-item ${prefix}--text-area--fluid__skeleton`,
          className
        )}
        {...other}>
        <span className={`${prefix}--label ${prefix}--skeleton`} />
        <div className={`${prefix}--skeleton ${prefix}--text-area`} />
      </div>
    </FormContext.Provider>
  );
};

FluidTextAreaSkeleton.propTypes = {
  /**
   * Specify an optional className to be applied to the outer FluidForm wrapper
   */
  className: PropTypes.string,
};

export default FluidTextAreaSkeleton;
