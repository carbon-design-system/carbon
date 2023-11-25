export type LayerLevel = 0 | 1 | 2;

export const levels = ['one', 'two', 'three'];

export const MIN_LEVEL = 0;
export const MAX_LEVEL = (levels.length - 1) as LayerLevel;
