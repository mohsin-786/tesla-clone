#!/bin/bash

set -e 

stop=docker ps | awk -F " " '{print $1}'
docker stop $stop