#!/usr/local/bin/zsh

curl -X GET -i 'http://quizzes.websm.io/users/test/quizzes/2/questions' \
    -H"Authorization: Bearer $(cat ./tokens/eternal-admin.txt)"
    -H"Content-Type: application/json"
    --data '{"content":{"type":"text","text":"who are you?"},"response":{"type":"single option","options":["mario","human","dragon","something else"]},"tags":["important"]}'
