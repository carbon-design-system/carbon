/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import FormLabel from './FormLabel';
import { Tooltip } from '../Tooltip';
import { Information } from '@carbon/icons-react';
import { ActionableNotification } from '../Notification';
import { Toggletip, ToggletipButton, ToggletipContent } from '../Toggletip';
import './form-label-stories.scss';

export default {
  title: 'Components/FormLabel',
  component: FormLabel,
};

export const Default = () => <FormLabel>Form label</FormLabel>;

export const WithTooltip = (controls) => {
  const { align } = controls;
  return (
    <>
      <div className="form-wrapper">
        <FormLabel>Form label with Tooltip</FormLabel>
        <Tooltip
          align="bottom"
          label="This can be used to provide more information about a field.">
          <button className="cds--tooltip__trigger" type="button">
            <Information />
          </button>
        </Tooltip>
      </div>
      <div className="form-wrapper">
        <FormLabel>Form label with Toggletip</FormLabel>
        <Toggletip align={align}>
          <ToggletipButton label="Show information">
            <Information />
          </ToggletipButton>
          <ToggletipContent>
            This can be used to provide more information about a field.
          </ToggletipContent>
        </Toggletip>
      </div>
      <ActionableNotification
        kind="info"
        hideCloseButton
        lowContrast
        inline
        className="notification"
        aria-label="Accessibility note on form labels"
        actionButtonLabel="Accessibility button note on form labels"
        title="Accessibility note">
        <p>
          <strong>Note:</strong>
          &nbsp; It is not recommended to include interactive items, such as
          links or tooltips, inside a form label for accessibility reasons. For
          this reason, we place the tooltip and toggletip as sibling components
          rather than children. You can read more about this &nbsp;
          <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label#accessibility_concerns">
            here
          </a>
          &nbsp; and &nbsp;
          <a href="https://css-tricks.com/html-inputs-and-labels-a-love-story/#aa-dont-put-interactive-elements-inside-labels">
            here
          </a>
          .
        </p>
      </ActionableNotification>
    </>
  );
};
