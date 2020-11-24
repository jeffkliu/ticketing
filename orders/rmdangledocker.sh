#!/bin/sh

docker rmi $(docker images |grep 'jeffliu0/auth')
docker rmi $(docker images |grep 'jeffliu0/tickets')
docker rmi $(docker images |grep 'jeffliu0/client1')
docker rmi $(docker images |grep 'jeffliu0/orders')
docker rmi $(sudo docker images -f 'dangling=true' -q) -f