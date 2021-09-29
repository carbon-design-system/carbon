/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  Close16,
  WarningFilled16,
  CheckmarkFilled16,
} from '@carbon/icons-react';
import { settings } from 'carbon-components';
import PropTypes from 'prop-types';
import React from 'react';
import Loading from '../Loading';
import deprecate from '../../prop-types/deprecate.js';

const { prefix } = settings;

function Filename({ iconDescription, status, label, invalid, ...rest }) {
  switch (status) {
    case 'uploading':
      return (
        <Loading description={iconDescription} small withOverlay={false} />
      );
    case 'edit':
      return (
        <>
          {invalid && <WarningFilled16 className={`${prefix}--file-invalid`} />}
          <button
            aria-label={iconDescription ? iconDescription : label}
            className={`${prefix}--file-close`}
            type="button"
            {...rest}>
            <Close16 />
          </button>
        </>
      );
    case 'complete':
      return (
        <CheckmarkFilled16
          aria-label={iconDescription}
          className={`${prefix}--file-complete`}
          {...rest}>
          {iconDescription && <title>{iconDescription}</title>}
        </CheckmarkFilled16>
      );
    default:
      return null;
  }
}

Filename.propTypes = {
  /**
   * The iconDescription prop is deprecated. Use aria-label, aria-labelledby, or aria-describedby to label your component.
   */
  iconDescription: deprecate(
    PropTypes.string,
    'The iconDescription prop has been deprecated, use the `label` prop instead. This prop will be removed in the next major release of Carbon.'
  ),
  /**
   * Specify if the file is invalid
   */
  invalid: PropTypes.bool,

  /**
   * Use the label prop to describe the Filename. This is needed for accessibility.
   */
  label: PropTypes.string,

  /**
   * Status of the file upload
   */
  status: PropTypes.oneOf(['edit', 'complete', 'uploading']),

  /**
   * Provide a custom tabIndex value for the <Filename>
   */
  tabIndex: PropTypes.string,
};

Filename.defaultProps = {
  iconDescription: 'Uploading file',
  status: 'uploading',
  tabIndex: '0',
};

export default Filename;
