-- Adminer 4.6.2 PostgreSQL dump

DROP TABLE IF EXISTS "question";
DROP SEQUENCE IF EXISTS question_id_seq;
CREATE SEQUENCE question_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 17 CACHE 1;

CREATE TABLE "public"."question" (
    "id" integer DEFAULT nextval('question_id_seq') NOT NULL,
    "quiz_id" integer NOT NULL,
    "content" jsonb NOT NULL,
    "response" jsonb NOT NULL,
    "sort" integer NOT NULL,
    "creation_date" timestamptz DEFAULT now() NOT NULL,
    "tags" jsonb DEFAULT '[]' NOT NULL,
    CONSTRAINT "question_id" PRIMARY KEY ("id"),
    CONSTRAINT "question_quiz_id_fkey" FOREIGN KEY (quiz_id) REFERENCES quiz(id) ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE
) WITH (oids = false);


DROP TABLE IF EXISTS "quiz";
DROP SEQUENCE IF EXISTS quiz_id_seq;
CREATE SEQUENCE quiz_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 24 CACHE 1;

CREATE TABLE "public"."quiz" (
    "id" integer DEFAULT nextval('quiz_id_seq') NOT NULL,
    "user_id" integer NOT NULL,
    "title" text NOT NULL,
    "creation_date" timestamptz DEFAULT now() NOT NULL,
    "sort" integer NOT NULL,
    "tags" jsonb DEFAULT '[]' NOT NULL,
    CONSTRAINT "quiz_id" PRIMARY KEY ("id"),
    CONSTRAINT "quiz_user_id_fkey" FOREIGN KEY (user_id) REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE
) WITH (oids = false);


DROP TABLE IF EXISTS "response";
DROP SEQUENCE IF EXISTS responses_id_seq;
CREATE SEQUENCE responses_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 32 CACHE 1;

CREATE TABLE "public"."response" (
    "id" integer DEFAULT nextval('responses_id_seq') NOT NULL,
    "quiz_id" integer NOT NULL,
    "creation_date" timestamptz DEFAULT now() NOT NULL,
    "content" jsonb NOT NULL,
    CONSTRAINT "response_id" PRIMARY KEY ("id"),
    CONSTRAINT "response_quiz_id_fkey" FOREIGN KEY (quiz_id) REFERENCES quiz(id) ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE
) WITH (oids = false);


DROP TABLE IF EXISTS "user";
DROP SEQUENCE IF EXISTS user_id_seq;
CREATE SEQUENCE user_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 11 CACHE 1;

CREATE TABLE "public"."user" (
    "id" integer DEFAULT nextval('user_id_seq') NOT NULL,
    "name" character varying(100) NOT NULL,
    CONSTRAINT "user_id" PRIMARY KEY ("id"),
    CONSTRAINT "user_name" UNIQUE ("name")
) WITH (oids = false);


-- 2018-10-03 11:16:27.612075+03
