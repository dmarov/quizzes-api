**Service for interviews, questionnaires, tests**

*installation*
```
yarn
```

*running*
```
export PG_HOST=127.0.0.1
export PG_USER=quizzes_api
export PG_PASSWORD=secretpassword
```
ensure user quizzes_api exists
ensure database quizzes_api_v1 exists ( imported from sql/quizzes_api_v1.sql )
```
./public/index.js --help
./index.js -p 80 -d http://jwt-sign-server.websm.io/api/v1/decoder
```
refer to ./tests/ directory for examples
