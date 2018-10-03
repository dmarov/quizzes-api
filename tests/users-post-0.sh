#!/usr/local/bin/zsh

curl -X POST -i 'http://quizzes.websm.io/users' \
    -H"Authorization: Bearer $(cat ./tokens/eternal-api-admin.txt)" \
    -H"Content-Type: application/json" \
    --data '{"name":"new-user"}'
