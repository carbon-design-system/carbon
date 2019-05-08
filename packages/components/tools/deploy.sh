#!/bin/sh

set -e

echo "Building carbon-components for deployment..."

# Start in tools/ even if run from root directory
cd "$(dirname "$0")"

# Go to root
cd ..

SRC_DIR=./demo
DEST_DIR=../../demo/components

yarn build-dev-rollup
rm -Rf $DEST_DIR
mkdir -p $DEST_DIR
cp -r $SRC_DIR/code $DEST_DIR/
cp -r $SRC_DIR/component $DEST_DIR/
cp $SRC_DIR/demo.css $DEST_DIR/
cp $SRC_DIR/demo.css.map $DEST_DIR/
cp $SRC_DIR/demo.min.js $DEST_DIR/
cp $SRC_DIR/feature-flags.js $DEST_DIR/
cp $SRC_DIR/index.html $DEST_DIR/

echo "Success! 🎉"
