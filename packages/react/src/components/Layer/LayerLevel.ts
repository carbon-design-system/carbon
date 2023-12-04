export const levels = ['one', 'two', 'three'] as const;

export const MIN_LEVEL = 0;
export const MAX_LEVEL = levels.length - 1;

export const LayerLevels = [0, 1, 2] as const;

export type LayerLevel = (typeof LayerLevels)[number];
