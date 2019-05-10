# Theme switcher

The theme switcher allows Carbon developers/contributors to switch experimental
Carbon theme in our vanilla development environment. The theme switcher involves
several internal mechanisms. This section explains some of those.

## Temporary JavaScript feature flags

The build toolchain has a mechanism to create a temporary feature flags
(`demo/feature-flags.js`) from the original JavaScript feature flags
(`src/globals/js/feature-flags.js`). Tempoary feature flags contain the
effective feature flag values, which changes upon theme switcher.

In our vanilla development environment, requests for the original JavaScript
feature flags (`src/globals/js/feature-flags.js`) are re-routed to temporary
feature flags (`demo/feature-flags.js`) to reflect the up-to-date feature flag
values in the UI.

## Theme switcher server

There is a mini-server implemented with
[vanilla node.js HTTP API](https://nodejs.org/api/http.html) as
[a Gulp task](https://github.com/IBM/carbon-components/blob/v9.23.0/gulpfile.js#L280-L302),
that triggers build tasks associated with theme change, with its new effective
feature flag values:

1. Sass build
2. Build to create a tempoarary JavaScript feature flags

When
[the theme switcher toggle button](https://github.com/IBM/carbon-components/blob/v9.23.0/demo/js/components/RootPage.js#L357-L364)
is clicked on, it simply sends a request to
[the theme switcher server](https://github.com/IBM/carbon-components/blob/v9.23.0/demo/js/components/RootPage.js#L302-L309).
The builds described above will trigger subsequent UI updates.

## Detecting change in temporary JavaScript feature flags

When change in temporary JavaScript feature flags are detected, the following
happens:

1. Invalidation of some caches:
   - [Handlebars templates and their configurations (`.config.js`)](https://github.com/IBM/carbon-components/blob/v9.23.0/tools/templates.js#L65)
   - node.js module cache for temporary JavaScript feature flags
2. WebPack (partial) build with the temporary JavaScript feature flags, which
   auto-updates the component JavaScript code

## Detecting new effective theme

Once Sass build finishes upon switching theme,
[code to detect effective CSSOM](https://github.com/IBM/carbon-components/blob/v9.23.0/demo/js/components/RootPage.js#L276-L300),
and then
[code to detect effective theme](https://github.com/IBM/carbon-components/blob/v9.23.0/demo/js/components/RootPage.js#L230-L263)
run. The latter updates UI states, which causes:

1. [Update the theme switcher toggle button](https://github.com/IBM/carbon-components/blob/v9.23.0/demo/js/components/RootPage.js#L362)
2. [Update shown/hidden states of some components with the new detected theme](https://github.com/IBM/carbon-components/blob/v9.23.0/demo/js/components/RootPage.js#L84-L101)
3. Reload the component demo HTML with the fresh Handlebars
   template/configuration
