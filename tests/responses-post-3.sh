#!/usr/local/bin/zsh

curl -X POST -i 'http://quizzes.websm.io/users/test/quizzes/24/responses' \
    -H"Authorization: Bearer $(cat ./tokens/eternal-admin.txt)" \
    -H"Content-Type: application/json" \
    --data '{"15":"1","16":["5","2","3"],"17":["3","2","1"]}'
