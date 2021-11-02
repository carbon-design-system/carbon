/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as FeatureFlags from '@carbon/feature-flags';
import {
  Tile as TileNext,
  ClickableTile as ClickableTileNext,
  SelectableTile as SelectableTileNext,
  ExpandableTile as ExpandableTileNext,
  TileAboveTheFoldContent as TileAboveTheFoldContentNext,
  TileBelowTheFoldContent as TileBelowTheFoldContentNext,
} from './next/Tile';
import {
  Tile as TileClassic,
  ClickableTile as ClickableTileClassic,
  SelectableTile as SelectableTileClassic,
  ExpandableTile as ExpandableTileClassic,
  TileAboveTheFoldContent as TileAboveTheFoldContentClassic,
  TileBelowTheFoldContent as TileBelowTheFoldContentClassic,
} from './Tile';

export const Tile = FeatureFlags.enabled('enable-v11-release')
  ? TileNext
  : TileClassic;

export const ClickableTile = FeatureFlags.enabled('enable-v11-release')
  ? ClickableTileNext
  : ClickableTileClassic;

export const SelectableTile = FeatureFlags.enabled('enable-v11-release')
  ? SelectableTileNext
  : SelectableTileClassic;

export const ExpandableTile = FeatureFlags.enabled('enable-v11-release')
  ? ExpandableTileNext
  : ExpandableTileClassic;

export const TileAboveTheFoldContent = FeatureFlags.enabled(
  'enable-v11-release'
)
  ? TileAboveTheFoldContentNext
  : TileAboveTheFoldContentClassic;

export const TileBelowTheFoldContent = FeatureFlags.enabled(
  'enable-v11-release'
)
  ? TileBelowTheFoldContentNext
  : TileBelowTheFoldContentClassic;
