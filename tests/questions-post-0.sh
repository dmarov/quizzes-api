#!/usr/local/bin/zsh

curl -X POST -i 'http://quizzes.websm.io/users/test/quizzes/2/questions' \
    -H"Authorization: Bearer $(cat ./tokens/eternal-admin.txt)" \
    -H"Content-Type: application/json" \
    --data '{"content":{"type":"text","text":"????"},"response":{"type":"single option","options":["1","2","3","4"]},"tags":["important"]}'
