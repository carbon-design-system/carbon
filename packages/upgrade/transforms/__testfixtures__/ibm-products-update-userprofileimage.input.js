import React from 'react';
import { UserProfileImage } from '@carbon/ibm-products';
import { Add } from '@carbon/react/icons';

const ImageUrl =
  'https://img.freepik.com/free-photo/portrait-man-cartoon-style_23-2151133939.jpg?semt=ais_hybrid';

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
      kind="user"
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
  </>
);
