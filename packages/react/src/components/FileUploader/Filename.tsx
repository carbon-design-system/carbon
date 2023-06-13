/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Close, WarningFilled, CheckmarkFilled } from '@carbon/icons-react';
import PropTypes from 'prop-types';
import React from 'react';
import Loading from '../Loading';
import { usePrefix } from '../../internal/usePrefix';
import { ReactAttr } from '../../types/common';

export type FilenameStatus = 'edit' | 'complete' | 'uploading';

export interface FilenameProps
  extends Omit<ReactAttr<HTMLElement>, 'tabIndex'> {
  /**
   * Specify an id that describes the error to be read by screen readers when the filename is invalid
   */
  ['aria-describedby']?: string;

  /**
   * Provide a description of the SVG icon to denote file upload status
   */
  iconDescription?: string;

  /**
   * Specify if the file is invalid
   */
  invalid?: boolean;

  /**
   * Name of the uploaded file
   */
  name?: string;

  /**
   * Status of the file upload
   */
  status?: FilenameStatus;

  /**
   * Provide a custom tabIndex value for the `<Filename>`
   */
  tabIndex?: number | string;
}

function Filename({
  iconDescription,
  status,
  invalid,
  name,
  ['aria-describedby']: ariaDescribedBy,
  ...rest
}: FilenameProps) {
  const prefix = usePrefix();
  switch (status) {
    case 'uploading':
      return (
        <Loading description={iconDescription} small withOverlay={false} />
      );
    case 'edit':
      return (
        <>
          {invalid && <WarningFilled className={`${prefix}--file-invalid`} />}
          <button
            aria-label={`${iconDescription} - ${name}`}
            className={`${prefix}--file-close`}
            type="button"
            {...rest}
            tabIndex={
              rest.tabIndex !== undefined
                ? parseInt(rest.tabIndex as string, 10)
                : undefined
            }
            aria-describedby={invalid ? ariaDescribedBy : undefined}>
            <Close />
          </button>
        </>
      );
    case 'complete':
      return (
        <CheckmarkFilled
          aria-label={iconDescription}
          className={`${prefix}--file-complete`}
          {...rest}
          tabIndex={null}>
          {iconDescription && <title>{iconDescription}</title>}
        </CheckmarkFilled>
      );
    default:
      return null;
  }
}

Filename.propTypes = {
  /**
   * Specify an id that describes the error to be read by screen readers when the filename is invalid
   */
  ['aria-describedby']: PropTypes.string,

  /**
   * Provide a description of the SVG icon to denote file upload status
   */
  iconDescription: PropTypes.string,

  /**
   * Specify if the file is invalid
   */
  invalid: PropTypes.bool,

  /**
   * Name of the uploaded file
   */
  name: PropTypes.string,

  /**
   * Status of the file upload
   */
  status: PropTypes.oneOf(['edit', 'complete', 'uploading']),

  /**
   * Provide a custom tabIndex value for the `<Filename>`
   */
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

Filename.defaultProps = {
  iconDescription: 'Uploading file',
  status: 'uploading',
  tabIndex: '0',
};

export default Filename;
