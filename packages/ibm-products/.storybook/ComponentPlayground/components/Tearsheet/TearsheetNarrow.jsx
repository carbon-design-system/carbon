/**
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';

import { TearsheetNarrow as CCTearsheetNarrow } from '../../../../src';

const TearsheetNarrow = (props) => {
  return (
    <CCTearsheetNarrow
      actions={[
        {
          key: 1,
          kind: 'primary',
          label: 'Create',
          onClick: function noRefCheck() {},
        },
        {
          key: 2,
          kind: 'secondary',
          label: 'Close',
          onClick: () => props.setIsOpen(false),
        },
      ]}
      closeIconDescription="Close the tearsheet"
      description="This is a description for the tearsheet, providing an opportunity to   describe the flow."
      hasCloseIcon
      open={props.isOpen}
      label="The label of the tearsheet"
      onClose={() => props.setIsOpen(false)}
      title="Title of the tearsheet"
    >
      <div className="tearsheet-stories__narrow-content-block">
        Tearsheet stuff
      </div>
    </CCTearsheetNarrow>
  );
};
TearsheetNarrow.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
};

export default TearsheetNarrow;
