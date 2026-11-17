/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { SidePanel } from '@carbon/ibm-products';
import {
  PageHeader,
  Button,
  Form,
  TextInput,
  Theme,
  Tearsheet,
  Coachmark,
  CoachmarkBeacon,
} from '@carbon/react';

export const MyTearsheet = () => (
  <Tearsheet open={true} onClose={() => {}}>
    <Tearsheet.Header>
      <Tearsheet.HeaderContent title="Simple Tearsheet" label="Customer data"></Tearsheet.HeaderContent>
    </Tearsheet.Header>
    <Tearsheet.Body>
      <Tearsheet.MainContent>

        <Form>
          <TextInput id="name" labelText="Name" />
        </Form>

      </Tearsheet.MainContent>
    </Tearsheet.Body>
    <Tearsheet.Footer
      actions={[
        { label: 'Cancel', onClick: () => {} },
        { label: 'Submit', onClick: () => {} },
      ]} />
  </Tearsheet>
);

export const MyCoachmark = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleBeaconClick = () => {
    setIsOpen(isOpen => !isOpen);
  };

  return (
    <Theme theme="white"><Coachmark align="bottom" position={{ x: 0, y: 0 }} open={isOpen}><CoachmarkBeacon
          label="Show information"
          buttonProps={{
            onClick: handleBeaconClick,
            id: "CoachmarkBtn"
          }} /><Coachmark.Content><Coachmark.Content.Header closeIconDescription="Close" /><Coachmark.Content.Body><h2>Hello World</h2><p>this is a description test</p><Button size="sm">Done</Button></Coachmark.Content.Body></Coachmark.Content></Coachmark></Theme>
  );
};

export const MyPageHeader = () => (
  <PageHeader><PageHeader.BreadcrumbBar
      breadcrumbs={[{ href: '#', key: 'home', label: 'Home' }]}
      breadcrumbOverflowAriaLabel="Open breadcrumb menu" /><PageHeader.Content title="Page title"><PageHeader.ContentText subtitle="Optional subtitle" /></PageHeader.Content></PageHeader>
);

export const Other = () => <SidePanel open />;
