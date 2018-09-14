#!/usr/local/bin/zsh

curl -X PATCH -i 'http://quizzes.websm.io/users/test/quizzes/2' \
    -H"Authorization: Bearer $(cat ./tokens/eternal-admin.txt)" \
    -H 'Content-Type: application/json' \
    --data '{"id":99,"title":"modified title","tags":["a","b"]}'
