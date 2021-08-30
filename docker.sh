#!/bin/bash
docker rm $1
docker run -d --name $1 $2