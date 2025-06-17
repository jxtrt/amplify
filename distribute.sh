#!/bin/bash
mkdir -p ./dist
cd ./src
zip -r ../dist/amplify.zip *
cd ..