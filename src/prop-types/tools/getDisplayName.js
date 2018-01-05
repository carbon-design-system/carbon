const cachedDisplayNames = new WeakMap();

/**
 * `getDisplayName` is a utility function for getting a name from a given
 * component type. It supports names from React elements, Stateless Functional
 * Components, and Class-based Components
 */
const getDisplayName = type => {
  if (typeof type === 'string') {
    return type;
  }

  if (cachedDisplayNames.has(type)) {
    return cachedDisplayNames.get(type);
  }

  let displayName;

  if (typeof type.displayName === 'string') {
    displayName = type.displayName;
  }
  if (!displayName) {
    displayName = type.name || 'Unknown';
  }

  cachedDisplayNames.set(type, displayName);

  return displayName;
};

export default getDisplayName;
