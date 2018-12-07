export const fontWeights = {
  light: 300,
  regular: 400,
  semibold: 600,
};

export function fontWeight(weight) {
  if (!fontWeights[weight]) {
    throw new Error(
      `Unable to find font weight: \`${weight}\`. Expected one of: ` +
        `[${Object.keys(fontWeights).join(', ')}]`
    );
  }
  return {
    fontWeight: fontWeights[weight],
  };
}
