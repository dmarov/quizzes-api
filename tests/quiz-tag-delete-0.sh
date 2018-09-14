#!/usr/local/bin/zsh

curl -X DELETE -i 'http://quizzes.websm.io/users/test/quizzes/2/tags/new%20tag' \
    -H "Authorization: Bearer $(cat ./tokens/eternal-admin.txt)" \
