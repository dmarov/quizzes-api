CREATE DATABASE quizzes_api_v1;
/* GRANT ALL ON DATABASE quizzes_api_v1 TO quizzes_api; */
ALTER DATABASE quizzes_api_v1 OWNER TO quizzes_api;
/* GRANT ALL PRIVILEGES ON DATABASE quizzes_api_v1 TO quizzes_api; */
/* GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO quizzes_api; */
/* GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO quizzes_api; */
ALTER DATABASE quizzes_api_v1 RESET ALL;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO quizzes_api;
ALTER TABLE quiz ALTER COLUMN creation_date SET DEFAULT NOW();

