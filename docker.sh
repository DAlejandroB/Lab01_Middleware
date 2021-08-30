#!/bin/bash
docker rm $1
docker run -p $3:$4  -d  --name $1 $2