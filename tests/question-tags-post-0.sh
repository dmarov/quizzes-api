#!/usr/local/bin/zsh

curl -X POST -i 'http://quizzes.websm.io/users/test/quizzes/2/questions/1/tags' \
    -H "Authorization: Bearer $(cat ./tokens/eternal-admin.txt)" \
    -H "Content-Type: application/json" \
    --data '"new"'
