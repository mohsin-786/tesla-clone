#!/bin/bash

set -e 

docker pull mohsin01/tesla-clone

docker run -d --rm -p 3000:9005 mohsin01/tesla-clone