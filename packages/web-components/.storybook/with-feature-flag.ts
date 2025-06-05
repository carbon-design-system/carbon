import { FeatureFlagsElement } from '../src/components/feature-flags/index';

let flagsInstance: FeatureFlagsElement | null = new FeatureFlagsElement();

export function setFeatureFlagsInstance(instance: FeatureFlagsElement) {
  flagsInstance = instance;
}

export function getFeatureFlagsInstance(): FeatureFlagsElement | null {
  return flagsInstance;
}

export function findClosestFeatureFlags(
  el: HTMLElement
): FeatureFlagsElement | null {
  let parent = el.parentNode;
  while (parent) {
    if (parent instanceof FeatureFlagsElement) {
      return parent;
    }
    parent = (parent as HTMLElement).parentNode;
  }
  return null;
}

export function isFeatureFlagEnabled(
  flag: string,
  fromEl: HTMLElement
): boolean {
  const instance = findClosestFeatureFlags(fromEl);
  if (!instance) {
    console.warn('No <feature-flags> context found for element', fromEl);
    return false;
  }
  return instance.isFeatureFlagEnabled(flag);
}
