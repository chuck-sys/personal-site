#!/usr/bin/bash
# To be run in the root directory of the project itself. Builds the project and then pushes to gh-pages
# branch
set -e
bundle exec jekyll build
\cd _site
git add .
git commit -S -m "update: $(date)"
git push
\cd ..
