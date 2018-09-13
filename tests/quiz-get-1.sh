#!/usr/local/bin/zsh

curl -X GET -i 'http://quizzes.websm.io/users/test/quizzes/3' \
    -H"Authorization: Bearer $(cat ./tokens/eternal-admin.txt)"
