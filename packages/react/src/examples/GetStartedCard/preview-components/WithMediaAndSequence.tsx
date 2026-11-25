/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { ArrowRight, SkillLevelBasic, Time } from '@carbon/react/icons';
import { GetStartedCard } from '../components/GetStartedCard';
import abstractImage from '../assets/abstract-image.svg';
import '../styles/_get-started-card.scss';

const metadata = [
  { id: 'time', icon: Time, iconDescription: '2 mins' },
  { id: 'skill', icon: SkillLevelBasic, iconDescription: 'Beginner' },
];

interface WithMediaAndSequenceProps {
  label?: string;
  title?: string;
  sequence?: number;
  disabled?: boolean;
}

export const WithMediaAndSequence = ({
  label = 'Label',
  title = 'Title',
  sequence = 3,
  disabled = false,
}: WithMediaAndSequenceProps) => (
  <GetStartedCard
    label={label}
    title={title}
    sequence={sequence}
    media={<img src={abstractImage} alt="" />}
    metadata={metadata}
    footerActionIcon={ArrowRight}
    disabled={disabled}
    // eslint-disable-next-line no-console
    onClick={() => console.log('GetStartedCard clicked')}
  />
);
