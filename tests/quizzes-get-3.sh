#!/usr/local/bin/zsh

curl -X GET -i 'http://quizzes.websm.io/users/test/quizzes?tags=new&tags=exiting' \
    -H"Authorization: Bearer $(cat ./tokens/eternal-admin.txt)"
