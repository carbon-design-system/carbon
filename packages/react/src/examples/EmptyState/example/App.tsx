/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { Button } from '@carbon/react';
import { EmptyStatePreview } from './preview-components/EmptyState/EmptyStatePreview';
import { EmptyStateWithIsometricIllustration } from './preview-components/EmptyState/EmptyStateWithIsometricIllustration';
import { EmptyStateWithPictogramIllustration } from './preview-components/EmptyState/EmptyStateWithPictogramIllustration';
import { EmptyStateUnit } from './preview-components/EmptyState/EmptyStateUnit';
import { NoDataEmptyStatePreview } from './preview-components/NoDataEmptyState/NoDataEmptyStatePreview';
import { ErrorEmptyStatePreview } from './preview-components/ErrorEmptyState/ErrorEmptyStatePreview';
import { NotFoundEmptyStatePreview } from './preview-components/NotFoundEmptyState/NotFoundEmptyStatePreview';
import { NotificationsEmptyStatePreview } from './preview-components/NotificationsEmptyState/NotificationsEmptyStatePreview';
import { UnauthorizedEmptyStatePreview } from './preview-components/UnauthorizedEmptyState/UnauthorizedEmptyStatePreview';
import { NoTagsEmptyStatePreview } from './preview-components/NoTagsEmptyState/NoTagsEmptyStatePreview';
import './index.scss';

type Placement = 'left' | 'centre';

const STORIES = [
  { id: 'default', label: 'Default' },
  { id: 'isometric', label: 'Unit with isometric illustration' },
  { id: 'pictogram', label: 'Unit with pictogram illustration' },
  { id: 'ui', label: 'In a UI' },
  { id: 'no-data', label: 'NoDataEmptyState' },
  { id: 'error', label: 'ErrorEmptyState' },
  { id: 'not-found', label: 'NotFoundEmptyState' },
  { id: 'notifications', label: 'NotificationsEmptyState' },
  { id: 'unauthorized', label: 'UnauthorizedEmptyState' },
  { id: 'no-tags', label: 'NoTagsEmptyState' },
] as const;

type StoryId = (typeof STORIES)[number]['id'];

export const App = () => {
  const [activeId, setActiveId] = useState<StoryId | null>(null);
  const [placement, setPlacement] = useState<Placement>('left');

  const renderStory = () => {
    switch (activeId) {
      case 'default':
        return (
          <EmptyStatePreview
            title="Start by adding data assets"
            subtitleType="default"
          />
        );
      case 'isometric':
        return <EmptyStateWithIsometricIllustration />;
      case 'pictogram':
        return <EmptyStateWithPictogramIllustration />;
      case 'ui':
        return (
          <section>
            <div style={{ padding: '0.5rem 1rem', background: '#e0e0e0' }}>
              <h2 style={{ fontSize: '1.125rem', margin: '0 0 0.5rem' }}>
                Empty State unit
              </h2>
              <label>
                Placement:{' '}
                <select
                  value={placement}
                  onChange={(e) => setPlacement(e.target.value as Placement)}>
                  <option value="left">left</option>
                  <option value="centre">centre</option>
                </select>
              </label>
            </div>
            {/* The transform makes the fixed Header/SideNav position relative
                to this container instead of the viewport, so the buttons above
                stay visible. */}
            <div style={{ position: 'relative', transform: 'translateZ(0)' }}>
              <EmptyStateUnit placement={placement} />
            </div>
          </section>
        );
      case 'no-data':
        return <NoDataEmptyStatePreview />;
      case 'error':
        return <ErrorEmptyStatePreview />;
      case 'not-found':
        return <NotFoundEmptyStatePreview />;
      case 'notifications':
        return <NotificationsEmptyStatePreview />;
      case 'unauthorized':
        return <UnauthorizedEmptyStatePreview />;
      case 'no-tags':
        return <NoTagsEmptyStatePreview />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div style={{ padding: '1rem', background: '#f4f4f4' }}>
        <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
          Empty State Pattern Examples
        </h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {STORIES.map(({ id, label }) => (
            <Button
              key={id}
              size="sm"
              kind={id === activeId ? 'primary' : 'tertiary'}
              onClick={() => setActiveId(id)}>
              {label}
            </Button>
          ))}
        </div>
      </div>

      <div style={{ padding: activeId === 'ui' ? 0 : '2rem' }}>
        {renderStory()}
      </div>
    </div>
  );
};

export default App;
