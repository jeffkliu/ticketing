#!/bin/sh

docker rmi $(docker images |grep 'jeffliu0/auth')
docker rmi $(sudo docker images -f 'dangling=true' -q) -f