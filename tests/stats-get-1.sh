#!/usr/local/bin/zsh

curl -X GET -i 'http://quizzes.websm.io/users/test/quizzes/2/stats?dateFrom=2018-07-07&dateTo=2018-07-08' \
    -H"Authorization: Bearer $(cat ./tokens/eternal-admin.txt)"
