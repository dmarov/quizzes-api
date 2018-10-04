**Service for interviews (probably for questionnaires, tests)**

*installation*
```
yarn
```

*running*
```
export PG_HOST=127.0.0.1
export PG_PORT=5432
export PG_PASSWORD=secret_password_for_quizzes_api
```

create user quizzes_api

create database quizzes_api_v1 imported from sql/quizzes_api_v1.sql

set owner to `quizzes_api` for `quizzes_api_v1`

run server
```
cd public
./index.js --help
./index.js -p 80 -d http://jwt-sign-server.websm.io/api/v1/decoder
```

refer to ./tests/ directory for examples

refer to ./doc/README.txt for documentation clarifications

refer to http://localhost:port for incomplete documentation
