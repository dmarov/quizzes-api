#!/usr/local/bin/zsh

curl -X PATCH -i 'http://quizzes.websm.io/users/new-user' \
    -H"Authorization: Bearer $(cat ./tokens/eternal-api-admin.txt)" \
    -H"Content-Type: application/json" \
    --data '{"name":"old-user"}'
