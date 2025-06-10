#!/bin/bash
set -e

git checkout main

echo "-------"
echo "git pull"
echo "-------"

git pull

echo "-------"
echo "npm build"
echo "-------"

npm run build

echo "-------"
echo "firebase deploy"
echo "-------"

firebase deploy

