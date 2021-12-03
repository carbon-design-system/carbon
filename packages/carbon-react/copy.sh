#!/bin/bash


find packages/carbon-react/src/components -type f -name '*.stories.js' | while IFS= read -r match
do
  filename="$(basename $match)";
  directory="$(basename $(dirname $match))";
  react="packages/react/src/components/$directory/next/$filename";

  echo "Match: $match";
  echo "Filename: $filename";
  echo "React: $react";

  mkdir -p $(dirname $react);
  mv $match $react;
  sed -i '' -e "s/'..\/Layer'/'..\/..\/Layer'/g" $react;
done
