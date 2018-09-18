#!/usr/local/bin/zsh

curl -X POST -i 'http://quizzes.websm.io/users/test/quizzes/2/responses' \
    -H"Authorization: Bearer $(cat ./tokens/eternal-admin.txt)" \
    -H"Content-Type: application/json" \
    --data '{"1":"2","2":"1","3":"1"}'
