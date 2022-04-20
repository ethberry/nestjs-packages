#!/usr/bin/env bash


echo -e "\033[34mTesting...\n\033[0m";

set -e # this will cause the shell to exit immediately if any command exits with a nonzero exit value.

echo $AWS_SECRET_ACCESS_KEY
export NODE_ENV=test
export GEMUNION_API_KEY=$GEMUNION_API_KEY
export AWS_REGION=$AWS_REGION
export AWS_S3_BUCKET=$AWS_S3_BUCKET
export AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY
export AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID

lerna bootstrap --hoist

lerna run lint --stream

lerna exec -- npm run test
