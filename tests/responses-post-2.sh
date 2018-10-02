#!/usr/local/bin/zsh

curl -X POST -i 'http://quizzes.websm.io/users/test/quizzes/24/responses' \
    -H"Authorization: Bearer $(cat ./tokens/eternal-admin.txt)" \
    -H"Content-Type: application/json" \
    --data '{"15":"5","16":["1","2","3"],"17":["2","3","1"]}'
