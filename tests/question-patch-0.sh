#!/usr/local/bin/zsh

curl -X PATCH -i 'http://quizzes.websm.io/users/test/quizzes/2/questions/1' \
    -H "Authorization: Bearer $(cat ./tokens/eternal-admin.txt)" \
    -H "Content-Type: application/json" \
    --data '{"content":{"type":"image","image":"/data/123abc.jpeg"},"response":{"type":"single option","options":["1","2","3","4"]},"tags":["important"]}'
