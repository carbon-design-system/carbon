import { User } from "@carbon/react/icons";
import React from 'react';
import { UserAvatar } from '@carbon/ibm-products';
import { Add } from '@carbon/react/icons';

const ImageUrl =
  'https://img.freepik.com/free-photo/portrait-man-cartoon-style_23-2151133939.jpg?semt=ais_hybrid';

export const Example = () => (
  <>
    <UserAvatar
      size="md"
      tooltipAlignment="bottom"
      backgroundColor="order-5-purple"
      tooltipText="Thomas Watson"
      className="myClass"
      name="thomas j. watson" />
    <UserAvatar
      size="md"
      tooltipAlignment="bottom"
      backgroundColor="order-5-purple"
      tooltipText="Thomas Watson"
      className="myClass"
      renderIcon={User} />
    <UserAvatar
      size="md"
      tooltipAlignment="bottom"
      backgroundColor="order-5-purple"
      tooltipText="Thomas Watson"
      className="myClass"
      renderIcon={() => <Add size={20} />} />
    <UserAvatar
      size="md"
      tooltipAlignment="bottom"
      backgroundColor="order-5-purple"
      tooltipText="Thomas Watson"
      className="myClass"
      image={ImageUrl}
      imageDescription="Avatar of Thomas Watson" />
  </>
);
