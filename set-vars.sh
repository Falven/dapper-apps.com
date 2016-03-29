#!/bin/bash
# execute in current shell to set environment variables.
# . set-vars.sh

while read line;
do
    export "$line";
done < vars.env