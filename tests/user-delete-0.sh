#!/usr/local/bin/zsh

curl -X DELETE -i 'http://quizzes.websm.io/users/new-user' \
    -H"Authorization: Bearer $(cat ./tokens/eternal-api-admin.txt)" \
