/**
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Tearsheet } from '../../../../src';
import { Form, FormGroup, TextInput } from '@carbon/react';

const TearsheetWide = (props) => {
  return (
    <Tearsheet
      actions={[
        {
          key: 1,
          kind: 'primary',
          label: 'Replace',
          onClick: function noRefCheck() {},
        },
        {
          key: 2,
          kind: 'secondary',
          label: 'Back',
          onClick: function noRefCheck() {},
        },
        {
          key: 4,
          kind: 'ghost',
          label: 'Cancel',
          onClick: () => props.setIsOpen(false),
        },
      ]}
      closeIconDescription="Close the tearsheet"
      description="This is a description for the tearsheet, providing an opportunity to   describe the flow over a couple of lines in the header of the tearsheet."
      label="The label of the tearsheet"
      onClose={() => props.setIsOpen(false)}
      open={props.isOpen}
      title="Title of the tearsheet"
    >
      <Form aria-label="Title of the tearsheet">
        <p>Main content</p>
        <FormGroup legendText="">
          <TextInput
            id="tss-ft1"
            labelText="Enter an important value here"
            style={{
              // stylelint-disable-next-line carbon/layout-use
              marginBottom: '1em',
            }}
          />
          <TextInput
            id="tss-ft2"
            labelText="Here is a light entry field:"
            light
            style={{
              // stylelint-disable-next-line carbon/layout-use
              marginBottom: '1em',
            }}
          />
        </FormGroup>
      </Form>
    </Tearsheet>
  );
};
TearsheetWide.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
};

export default TearsheetWide;
