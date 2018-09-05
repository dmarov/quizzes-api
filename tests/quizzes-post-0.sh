#!/usr/local/bin/zsh

curl -X POST -i 'http://quizzes.websm.io/users/test/quizzes?limit=10&offset=0' \
    -H "Authorization: Bearer $(cat ./tokens/eternal-admin.txt)" \
    -H 'Content-Type: application/json' \
    --data '{"title":"another one exiting quiz"}'
