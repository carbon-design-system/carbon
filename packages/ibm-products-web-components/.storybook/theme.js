import { create } from 'storybook/theming';
import packageInfo from '../package.json';

const { description, version } = packageInfo;

export default create({
  base: 'white',
  brandTitle: `${description} v${version}`,
  fontBase: "'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif",
  fontCode: "'IBM Plex Mono', Menlo, 'DejaVu Sans Mono', Courier, monospace",
  brandUrl: packageInfo.repository.url,
});
