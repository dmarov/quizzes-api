#!/usr/local/bin/zsh

curl -X GET -i 'http://quizzes.websm.io/users/test/quizzes/24/stats?dateFrom=2016-01-01&tag=a&tag=b' \
    -H"Authorization: Bearer $(cat ./tokens/eternal-admin.txt)"
