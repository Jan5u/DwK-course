#! /bin/bash
rand=$(echo $RANDOM | md5sum | head -c 32) 

while true
do 
    echo "$(date +"%y-%m-%dT%T"): $rand"
    sleep 5
done