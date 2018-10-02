#!/usr/local/bin/zsh

curl -X PATCH -i 'http://quizzes.websm.io/users/test/quizzes?limit=10&offset=0' \
    -H "Authorization: Bearer $(cat ./tokens/eternal-admin.txt)" \
    -H 'Content-Type: application/json' \
    --data '[{"id":2,"sort":9},{"id":4,"sort":10}]'
