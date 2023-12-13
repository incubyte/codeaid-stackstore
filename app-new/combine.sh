#!/bin/bash

cd ./dist/stack-store-new/

[ ! -d "../../../public/vangular2-dist" ] && mkdir -p "../../../public/angular2-dist"

# Concatenate the JavaScript files into single files
cat runtime*.js > ../../../public/angular2-dist/runtime.js
cat polyfills*.js > ../../../public/angular2-dist/polyfills.js
cat main*.js > ../../../public/angular2-dist/main.js
cat vendor*.js > ../../../public/angular2-dist/vendor.js
