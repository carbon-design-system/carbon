import { FeatureFlagsElement } from '../src/components/feature-flags/index';

let flagsInstance: FeatureFlagsElement | null = new FeatureFlagsElement();

export function setFeatureFlagsInstance(instance: FeatureFlagsElement) {
  flagsInstance = instance;
}

export function getFeatureFlagsInstance(): FeatureFlagsElement | null {
  return flagsInstance;
}

export function isFeatureFlagEnabled(flag: string): boolean {
  if (!flagsInstance) {
    console.warn('FeatureFlags instance is not set');
    return false;
  }
  return flagsInstance.isFeatureFlagEnabled(flag);
}
