#!/usr/local/bin/zsh

curl -X PATCH -i 'http://quizzes.websm.io/users/test/quizzes/1' \
    -H"Authorization: Bearer $(cat ./tokens/eternal-admin.txt)" \
    -H 'Content-Type: application/json' \
    --data '{"title":"modified title"}'
