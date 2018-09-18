#!/usr/local/bin/zsh

curl -X DELETE -i 'http://quizzes.websm.io/users/test/quizzes/2/questions/2' \
    -H "Authorization: Bearer $(cat ./tokens/eternal-admin.txt)"
