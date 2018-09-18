#!/usr/local/bin/zsh

curl -X GET -i 'http://quizzes.websm.io/users/test/quizzes/2/stats/6' \
    -H"Authorization: Bearer $(cat ./tokens/eternal-admin.txt)"
