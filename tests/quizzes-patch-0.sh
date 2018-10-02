#!/usr/local/bin/zsh

curl -X PATCH -i 'http://quizzes.websm.io/users/test/quizzes' \
    -H "Authorization: Bearer $(cat ./tokens/eternal-admin.txt)" \
    -H 'Content-Type: application/json' \
    --data '[{"id":2,"sort":9},{"id":4,"sort":10}]'
