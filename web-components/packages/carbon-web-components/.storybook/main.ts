import type { StorybookConfig } from '@storybook/web-components-vite';
import { mergeConfig } from 'vite';
import { litStyleLoader, litTemplateLoader } from '@mordech/vite-lit-loader';
import viteSVGResultCarbonIconLoader from '../tools/vite-svg-result-carbon-icon-loader';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
  ],
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  async viteFinal(config) {
    // Merge custom configuration into the default config
    const x = mergeConfig(config, {
      // Add dependencies to pre-optimization)
      // resolve: {
      //   alias: [{ find: "@", replacement: resolve(__dirname, "node_modules") }]
      // },
      // resolve: {
      //   alias: { 
      //     '@carbon/web-components/es/icons': path.resolve(__dirname, '@carbon/icons/lib') },
      // },
      plugins: [litStyleLoader(), litTemplateLoader(), viteSVGResultCarbonIconLoader()],
      optimizeDeps: {
        include: ['@storybook/web-components'],
        exclude: ['lit', 'lit-html']
      },
    });

    // console.log(x)
    return x;
  },
  docs: {
    autodocs: 'tag',
  },
};
export default config;
