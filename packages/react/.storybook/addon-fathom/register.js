import { window } from 'global';
import { addons } from '@storybook/addons';
import { STORY_CHANGED } from '@storybook/core-events';

addons.register('fathom', api => {
  (function(f, a, t, h, o, m) {
    a[h] =
      a[h] ||
      function() {
        (a[h].q = a[h].q || []).push(arguments);
      };
    (o = f.createElement('script')), (m = f.getElementsByTagName('script')[0]);
    o.async = 1;
    o.src = t;
    o.id = 'fathom-script';
    m.parentNode.insertBefore(o, m);
  })(document, window, 'https://cdn.usefathom.com/tracker.js', 'fathom');
  fathom('set', 'siteId', 'LLBKOSZK');

  api.on(STORY_CHANGED, () => {
    const pathString = api.getUrlState().path;

    if (typeof window.fathom === 'function') {
      window.fathom('trackPageview', { path: pathString });
    }
  });
});
