#!/usr/local/bin/zsh

curl -X GET -i 'http://quizzes.websm.io/users' \
    -H"Authorization: Bearer $(cat ./tokens/eternal-api-admin.txt)"
