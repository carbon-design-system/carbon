/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { AILabel, AILabelContent } from '@carbon/react';
import {
  ArrowRight,
  Crossroads,
  Incomplete,
  SkillLevelBasic,
  Time,
} from '@carbon/react/icons';
import { GetStartedCard } from '../components/GetStartedCard';
import '../styles/_get-started-card.scss';

const metadata = [
  { id: 'time', icon: Time, iconDescription: 'Duration' },
  { id: 'skill', icon: SkillLevelBasic, iconDescription: 'Level' },
];

interface WithAILabelAndActionsProps {
  label?: string;
  title?: string;
  disabled?: boolean;
}

export const WithAILabelAndActions = ({
  label = 'Label',
  title = 'Get start card example content goes here',
  disabled = false,
}: WithAILabelAndActionsProps) => (
  <GetStartedCard
    clickable={false}
    label={label}
    title={title}
    pictogram={Crossroads}
    decorator={
      <AILabel align="bottom-end" size="xs">
        <AILabelContent>
          <div>
            <p className="secondary">AI explained</p>
            <h2>88%</h2>
            <p className="secondary bold">Confidence score</p>
            <p className="secondary">
              Suggested because it matches the steps you completed recently.
            </p>
          </div>
        </AILabelContent>
      </AILabel>
    }
    headerActions={[
      {
        id: 'progress',
        icon: Incomplete,
        label: 'View progress',
        // eslint-disable-next-line no-console
        onClick: () => console.log('Progress clicked'),
      },
    ]}
    metadata={metadata}
    footerActionIcon={ArrowRight}
    footerActionLabel="Start"
    disabled={disabled}
    // eslint-disable-next-line no-console
    onFooterActionClick={() => console.log('Footer action clicked')}
  />
);
