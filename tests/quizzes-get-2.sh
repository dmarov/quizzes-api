#!/usr/local/bin/zsh

curl -X GET -i 'http://quizzes.websm.io/users/unexistent/quizzes?limit=10&offset=0' \
    -H"Authorization: Bearer $(cat ./tokens/eternal-admin.txt)"
