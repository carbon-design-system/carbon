#!/bin/sh

set -e

yarn build
<<<<<<< HEAD
yarn test:unit -- --browser ChromeHeadless --browser Firefox
=======
yarn test:unit --browser ChromeHeadless_Travis --browser Firefox
>>>>>>> 67b12c6702c09c3d79d0e0e3e3d999bd6e109109
if [[ -n "$RUN_EACH" ]]; then find tests/spec -name "*.js" ! -name left-nav_spec.js -print0 | xargs -0 -n 1 -P 1 yarn test:unit -- -d -f; fi
if [[ -n "$AAT_TOKEN" ]]; then yarn test:a11y; fi
