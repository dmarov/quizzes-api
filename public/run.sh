#!/bin/sh
export PG_HOST=127.0.0.1
export PG_POT=5432
export PG_USER=quizzes_api
export PG_PASSWORD=NRuWlO0uLsG75ySUSE3KDuF7or0M1WLwEkTcXk8q
./index.js -p 80 -d http://jwt-sign-server.websm.io/api/v1/decoder

