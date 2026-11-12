/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {
  Tearsheet,
  Coachmark,
  CoachmarkBeacon,
  CoachmarkOverlayElements,
  CoachmarkOverlayElement,
  PageHeader,
  SidePanel,
} from '@carbon/ibm-products';
import { Button, Form, TextInput } from '@carbon/react';

export const MyTearsheet = () => (
  <Tearsheet
    open={true}
    onClose={() => {}}
    title="Simple Tearsheet"
    label="Customer data"
    actions={[
      { label: 'Cancel', onClick: () => {} },
      { label: 'Submit', onClick: () => {} },
    ]}>
    <Form>
      <TextInput id="name" labelText="Name" />
    </Form>
  </Tearsheet>
);

export const MyCoachmark = () => (
  <Coachmark
    align="bottom"
    closeIconDescription="Close"
    positionTune={{ x: 0, y: 0 }}
    target={<CoachmarkBeacon label="Show information" />}
    theme="light">
    <CoachmarkOverlayElements closeButtonLabel="Done">
      <CoachmarkOverlayElement
        title="Hello World"
        description="this is a description test"
      />
    </CoachmarkOverlayElements>
  </Coachmark>
);

export const MyPageHeader = () => (
  <PageHeader
    title="Page title"
    subtitle="Optional subtitle"
    breadcrumbs={[{ href: '#', key: 'home', label: 'Home' }]}
    breadcrumbOverflowAriaLabel="Open breadcrumb menu"
  />
);

export const Other = () => <SidePanel open />;
