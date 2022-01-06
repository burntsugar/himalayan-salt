#!/bin/bash
if [ $1 = 'demo' ]
then
    node ./dist/demo.js
else
    node ./dist/himalayan-salt.js $@
fi