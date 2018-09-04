#!/usr/local/bin/zsh

curl -X GET -i http://quizzes.websm.io/api/v1/users/test/quizzes \
    -H"Authorization: Bearer $(cat ./tokens/eternal-admin.txt)"
