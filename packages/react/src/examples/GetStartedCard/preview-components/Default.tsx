/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {
  ArrowRight,
  Crossroads,
  SkillLevelBasic,
  Time,
} from '@carbon/react/icons';
import { GetStartedCard } from '../components/GetStartedCard';
import '../styles/_get-started-card.scss';

const metadata = [
  { id: 'time', icon: Time, iconDescription: '2 mins' },
  { id: 'skill', icon: SkillLevelBasic, iconDescription: 'Beginner' },
];

interface DefaultProps {
  label?: string;
  title?: string;
  disabled?: boolean;
}

export const Default = ({
  label = 'Label',
  title = 'Title',
  disabled = false,
}: DefaultProps) => (
  <GetStartedCard
    label={label}
    title={title}
    pictogram={Crossroads}
    metadata={metadata}
    footerActionIcon={ArrowRight}
    disabled={disabled}
    // eslint-disable-next-line no-console
    onClick={() => console.log('GetStartedCard clicked')}
  />
);
