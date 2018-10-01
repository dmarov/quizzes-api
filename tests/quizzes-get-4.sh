#!/usr/local/bin/zsh

curl -X GET -i 'http://quizzes.websm.io/users/test/quizzes?tags=a' \
    -H"Authorization: Bearer $(cat ./tokens/eternal-admin.txt)"
