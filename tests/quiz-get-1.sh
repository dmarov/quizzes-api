#!/usr/local/bin/zsh

curl -X GET -i 'http://quizzes.websm.io/users/test/quizzes/5' \
    -H"Authorization: Bearer $(cat ./tokens/eternal-admin.txt)"
