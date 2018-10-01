db - database structure
    quizzes.xmi - created with `umbrello`

api - api structure
    openapi.html created with redoc-cli
    `redoc-cli bundle -o openapi.html openapi.yml` 


question content types:
    text:
    {
        "type": "text",
        "text": "question?"
    }
    image:
    {
        "type": "image",
        "src": "/data/123abc.jpg"
    }

question response types:
    single option:
    {
        "type": "single option",
        "options": ["1", "2", "3"]
    }
    multiple options:
    {
        "type": "multiple options",
        "options": ["1", "2", "3"]
    }
