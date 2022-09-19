// Ambient module to allow the importing of .mdx files in storybook .tsx files
declare module '*.mdx' {
  const content: unknown;
  export default content;
}
