#!/bin/sh

################################################################################
# Helper script to copy over scss folders from `@carbon/<package>` dependencies
# located in `node_modules`. You can run this script in the terminal by running:
#
# ```
# ./tools/copy-vendor-styles.sh
# ```
################################################################################

set -e

# Start in tools/ even if run from root directory
cd "$(dirname "$0")"

# Go to root
cd ..
root_path=$PWD

echo "Cleaning vendor directory..."

VENDOR_DIR="$PWD/src/globals/scss/vendor"
rm -rf "$VENDOR_DIR"

for package in node_modules/@carbon/*; do
  PKG_NAME="@carbon/$(basename $package)"
  TARGET_DIR="$VENDOR_DIR/$PKG_NAME"
  SCSS_FILES="$package/scss"

  # TODO: this script currently looks up all @carbon packages even if
  # carbon-components does not have a dependency on it. We should update this
  # script to only include direct dependencies
  if [ "$PKG_NAME" = '@carbon/feature-flags' ]; then
    continue
  fi

  if [ -d "$SCSS_FILES" ]; then
    echo "Copying scss files for package: $PKG_NAME to $TARGET_DIR"
    mkdir -p "$TARGET_DIR"
    cp -R $SCSS_FILES "$TARGET_DIR"
  fi
done

for symlink in $(find ../../node_modules/@carbon -type l -maxdepth 1); do
  package=$(readlink $symlink)
  PKG_NAME="@carbon/$(basename $package)"
  TARGET_DIR="$VENDOR_DIR/$PKG_NAME"
  SCSS_FILES="$package/scss"

  # TODO: this script currently looks up all @carbon packages even if
  # carbon-components does not have a dependency on it. We should update this
  # script to only include direct dependencies
  if [ "$PKG_NAME" = '@carbon/feature-flags' ]; then
    continue
  fi

  if [ -d "$SCSS_FILES" ]; then
    echo "Copying scss files for package: $PKG_NAME to $TARGET_DIR"
    mkdir -p "$TARGET_DIR"
    cp -R $SCSS_FILES "$TARGET_DIR"
  fi
done

echo "Success! 🎉"
