#!/bin/bash

(date '+TIME:%H:%M:%S'; echo 'ServerA' ; curl 127.0.0.1:3001; echo '' ;echo 'ServerB' ; curl 127.0.0.1:3002; echo '') >> log.txt
