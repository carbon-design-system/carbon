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
  Incomplete,
  SkillLevelBasic,
  Time,
} from '@carbon/react/icons';
import { GetStartedCard } from '../components/GetStartedCard';
import horizontalMedia from '../assets/horizontal-media.svg';
import '../styles/_get-started-card.scss';

const metadata = [
  { id: 'time', icon: Time, iconDescription: 'Duration' },
  { id: 'skill', icon: SkillLevelBasic, iconDescription: 'Level' },
];

interface WithHorizontalMediaProps {
  label?: string;
  title?: string;
  disabled?: boolean;
}

export const WithHorizontalMedia = ({
  label = 'Label',
  title = 'Get start card example content goes here',
  disabled = false,
}: WithHorizontalMediaProps) => (
  <GetStartedCard
    label={label}
    title={title}
    pictogram={Crossroads}
    decorator={<Incomplete size={20} aria-hidden="true" />}
    media={<img src={horizontalMedia} alt="" />}
    horizontal
    metadata={metadata}
    footerActionIcon={ArrowRight}
    disabled={disabled}
    // eslint-disable-next-line no-console
    onClick={() => console.log('GetStartedCard clicked')}
  />
);
