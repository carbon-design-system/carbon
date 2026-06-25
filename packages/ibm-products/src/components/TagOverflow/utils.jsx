/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { forwardRef } from 'react';

import * as CarbonIcons from '@carbon/icons-react';

import { TYPES } from './constants';

const tagLabel = (index) => `Tag ${index + 1}`;

export const tags = Array.from({ length: 20 }, (v, k) => ({
  label: tagLabel(k),
  id: `id-${k}`,
}));

export const fiveTags = tags.slice(0, 5);

let longTagsArr = [...fiveTags];
longTagsArr.splice(1, 1, { id: 'id-1', label: 'Business performance' });
const tagTypes = Object.keys(TYPES);

export const longTags = longTagsArr.map((item, i) => {
  return { ...item, tagType: tagTypes[i % tagTypes.length] };
});

// UserAvatar background colors
const colors = [
  'order-1-cyan',
  'order-2-gray',
  'order-3-green',
  'order-4-magenta',
  'order-5-purple',
  'order-6-teal',
  'order-7-cyan',
  'order-8-gray',
  'order-9-green',
  'order-10-magenta',
  'order-11-purple',
  'order-12-teal',
];

// Lists of  first names and last names
//cspell: disable
const firstNames = [
  'Aarav',
  'Aditi',
  'Akshay',
  'Amit',
  'Ananya',
  'Arjun',
  'Avani',
  'Bhavya',
  'Chetan',
  'Devi',
  'Divya',
  'Gaurav',
  'Isha',
  'Kiran',
  'Manoj',
  'Neha',
  'Preeti',
  'Rajesh',
  'Riya',
  'Shreya',
  'Varun',
  'Saurabh',
  'Ajay',
  'Sandip',
  'Sadan',
  'Jyoti',
  'Sapna',
  'Prem',
];

const lastNames = [
  'Agarwal',
  'Bansal',
  'Chopra',
  'Gupta',
  'Jain',
  'Kapoor',
  'Mehta',
  'Patel',
  'Rao',
  'Sharma',
  'Singh',
  'Trivedi',
  'Verma',
  'Yadav',
];
//cspell: enable

// Method to generate random names
const generateName = () => {
  const randomFirstName =
    firstNames[Math.floor(Math.random() * firstNames.length)];
  const randomLastName =
    lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${randomFirstName} ${randomLastName}`;
};

// Users for UserAvatar stories
export const ManyUserAvatarArr = Array.from({ length: 20 }, (v, k) => {
  const name = generateName();
  return {
    id: `id-${k}`,
    label: name,
    backgroundColor: colors[k % colors.length],
    name,
    tooltipText: name,
  };
});

export const UserAvatarArr = ManyUserAvatarArr.slice(0, 10);

// Custom component
export const IconComponent = forwardRef(
  // eslint-disable-next-line react/prop-types
  ({ iconName, iconSize, className }, ref) => {
    const Base = CarbonIcons[iconName];
    return (
      <div className={`custom-icon ${className}`} ref={ref}>
        <Base size={iconSize}></Base>
      </div>
    );
  }
);

// Carbon Icon component names for custom component story
const icons = [
  'Add',
  'Power',
  'Play',
  'SettingsAdjust',
  'SidePanelClose',
  'Stop',
  'VideoPlayer',
  'VolumeUpFilled',
  'ChartBubble',
  'ChartLine',
  'ChartPie',
  'ChartWinLoss',
  'DatabaseMessaging',
  'Playlist',
  'OrderDetails',
];

export const IconComponentArr = icons.map((icon, index) => {
  return { id: `id-${index}`, label: icon, iconName: icon, iconSize: 16 };
});

export const overflowAndModalStrings = {
  allTagsModalTitle: 'All tags',
  allTagsModalSearchLabel: 'Search all tags',
  allTagsModalSearchPlaceholderText: 'Search all tags',
  showAllTagsLabel: 'View all tags',
};
