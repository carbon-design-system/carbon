#!/bin/sh

set -e

git clean -f
mv storybook-static ../storybook-static
cd ../storybook-static
echo "web-components.carbondesignsystem.com" > CNAME
touch .nojekyll

git init
git config user.name "carbon-bot"
git config user.email "carbon@us.ibm.com"
git fetch "https://git:${GH_TOKEN}@github.com/carbon-design-system/carbon-web-components.git" gh-pages

set +e

git add .
git commit -m "Deploy to GitHub Pages"

if [ $? -eq 0 ]; then
  git push --force "https://git:${GH_TOKEN}@github.com/carbon-design-system/carbon-web-components.git" main:gh-pages > /dev/null 2>&1
fi
