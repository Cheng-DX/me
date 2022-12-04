#!/usr/bin/env sh

set -e
pnpm install
pnpm run build

cd docs

echo > .nojekyll

git config --global user.name "Cheng-DX"
git config --global user.email "2337040896@qq.com"

git init
git checkout -B main
git add -A
git commit -m '[GitHub Action] Deploy'

git push -f git@github.com:Cheng-DX/me.git main:gh-pages

cd -
