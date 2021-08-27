#!/bin/bash

watch -n 0.5 "(date '+TIME:%H:%M:%S'; echo 'ServerA' ; curl 127.0.0.1:3001; echo '' ;echo 'ServerB' ; curl 127.0.0.1:5001; echo '') >> log.txt"