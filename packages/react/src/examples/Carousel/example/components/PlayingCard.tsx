/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

interface PlayingCardProps {
  label: string;
}

export const PlayingCard: React.FC<PlayingCardProps> = ({ label }) => {
  return (
    <div className="PlayingCard">
      <div style={{ position: 'absolute', top: 16, left: 16 }}>{label}</div>
      <div style={{ position: 'absolute', bottom: 16, right: 16 }}>{label}</div>
    </div>
  );
};
