#!/bin/sh

set -e

yarn build
yarn test:unit --browser ChromeHeadless_Travis --browser Firefox
if [[ -n "$RUN_EACH" ]]; then find tests/spec -name "*.js" ! -name left-nav_spec.js -print0 | xargs -0 -n 1 -P 1 yarn test:unit -- -d -f; fi
if [[ -n "$AAT_TOKEN" ]]; then yarn test:a11y; fi
