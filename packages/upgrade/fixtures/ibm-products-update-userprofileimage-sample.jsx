import React from 'react';
import { UserProfileImage } from '@carbon/ibm-products';
import { Add } from '@carbon/react/icons';

const ImageUrl =
  'https://assets.ibm.com/is/image/ibm/oday?wid1278&hei=718&fit=constrain,0&qlt=85,0';

export const Example = () => (
  <>
    <UserProfileImage
      size="md"
      tooltipAlignment="bottom"
      backgroundColor="light-purple"
      theme="light"
      tooltipText="Thomas Watson"
      className="myClass"
      initials="thomas j. watson"
    />
    <UserProfileImage
      size="md"
      tooltipAlignment="bottom"
      backgroundColor="light-purple"
      theme="light"
      tooltipText="Thomas Watson"
      className="myClass"
      kind="group"
    />
    <UserProfileImage
      size="md"
      tooltipAlignment="bottom"
      backgroundColor="light-purple"
      theme="light"
      tooltipText="Thomas Watson"
      className="myClass"
      icon={() => <Add size={20} />}
    />
    <UserProfileImage
      size="md"
      tooltipAlignment="bottom"
      backgroundColor="light-purple"
      theme="light"
      tooltipText="Thomas Watson"
      className="myClass"
      image={ImageUrl}
      imageDescription="Avatar of Thomas Watson"
    />
    <MyComponent
      size="md"
      tooltipAlignment="bottom"
      backgroundColor="light-purple"
      theme="light"
      tooltipText="Thomas Watson"
      className="myClass"
      initials="thomas j. watson"
    />
  </>
);
