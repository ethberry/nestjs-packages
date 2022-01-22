#!/usr/bin/env bash

echo -e "\033[34mRenaming...\n\033[0m";

set -e # this will cause the shell to exit immediately if any command exits with a nonzero exit value.

find /home/runner/work/nestjs-packages/ -name '*obfuscated.js' | xargs -I{} rename -f 's/-obfuscated//' {}
