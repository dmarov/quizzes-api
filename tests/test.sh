#!/usr/local/bin/zsh
../public/index.js -p=9876 -d='http://localhost/api/v1/decoder' &;
# ../index.js -p=9876 -d='http://jwt-sign-server.websm.io/api/v1/decoder'

curl -X GET -i http://localhost:9876/api/v1 \
    -H'Authorization: Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MzU3MDUyOTMsImV4cCI6MTUzNTc5MTY5M30.I2FRuLu0fmd4ILoy-9VUX_QckWL9qn6rpg4nioC9mIvTDIKXKUMTF_Krph14n3CvgOBV_ZRuOZjFDpOWZ5dbntRsBQTerBNJR5wKMQtJFYoJZy9hJiy558OdzqA9zdjVvTVPUt7S8EAffOViubuMU0gM7XJWUWJuNMP4ReG6HQ1uUViA1pctG6k9WXqryuH4z4ejOA9MfVlnnPnI3Pj0ueC1VJeofqSBWlPeYglmUZJ2qc8_1phHuNnlPAj0WNcRvUiYufQZ6aJXmUQ85lo2cIxcW0QT9aAL10HogdlOsoUNRZGNafijgSvyWF_DVzUEbqKa1AajIIFMTZUI61ZN_A'
