--
-- PostgreSQL database dump
--

-- Dumped from database version 10.4
-- Dumped by pg_dump version 10.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: question; Type: TABLE; Schema: public; Owner: quizzes_api
--

CREATE TABLE public.question (
    id integer NOT NULL,
    quiz_id integer NOT NULL,
    content jsonb NOT NULL,
    response jsonb NOT NULL,
    sort integer NOT NULL,
    creation_date timestamp with time zone DEFAULT now() NOT NULL,
    tags jsonb DEFAULT '[]'::jsonb NOT NULL
);


ALTER TABLE public.question OWNER TO quizzes_api;

--
-- Name: question_id_seq; Type: SEQUENCE; Schema: public; Owner: quizzes_api
--

CREATE SEQUENCE public.question_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.question_id_seq OWNER TO quizzes_api;

--
-- Name: question_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: quizzes_api
--

ALTER SEQUENCE public.question_id_seq OWNED BY public.question.id;


--
-- Name: quiz; Type: TABLE; Schema: public; Owner: quizzes_api
--

CREATE TABLE public.quiz (
    id integer NOT NULL,
    user_id integer NOT NULL,
    title text NOT NULL,
    creation_date timestamp with time zone DEFAULT now() NOT NULL,
    sort integer NOT NULL,
    tags jsonb DEFAULT '[]'::jsonb NOT NULL
);


ALTER TABLE public.quiz OWNER TO quizzes_api;

--
-- Name: quiz_id_seq; Type: SEQUENCE; Schema: public; Owner: quizzes_api
--

CREATE SEQUENCE public.quiz_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.quiz_id_seq OWNER TO quizzes_api;

--
-- Name: quiz_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: quizzes_api
--

ALTER SEQUENCE public.quiz_id_seq OWNED BY public.quiz.id;


--
-- Name: response; Type: TABLE; Schema: public; Owner: quizzes_api
--

CREATE TABLE public.response (
    id integer NOT NULL,
    quiz_id integer NOT NULL,
    creation_date timestamp with time zone DEFAULT now() NOT NULL,
    content jsonb NOT NULL
);


ALTER TABLE public.response OWNER TO quizzes_api;

--
-- Name: responses_id_seq; Type: SEQUENCE; Schema: public; Owner: quizzes_api
--

CREATE SEQUENCE public.responses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.responses_id_seq OWNER TO quizzes_api;

--
-- Name: responses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: quizzes_api
--

ALTER SEQUENCE public.responses_id_seq OWNED BY public.response.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: quizzes_api
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    name character varying(100) NOT NULL
);


ALTER TABLE public."user" OWNER TO quizzes_api;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: quizzes_api
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO quizzes_api;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: quizzes_api
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: question id; Type: DEFAULT; Schema: public; Owner: quizzes_api
--

ALTER TABLE ONLY public.question ALTER COLUMN id SET DEFAULT nextval('public.question_id_seq'::regclass);


--
-- Name: quiz id; Type: DEFAULT; Schema: public; Owner: quizzes_api
--

ALTER TABLE ONLY public.quiz ALTER COLUMN id SET DEFAULT nextval('public.quiz_id_seq'::regclass);


--
-- Name: response id; Type: DEFAULT; Schema: public; Owner: quizzes_api
--

ALTER TABLE ONLY public.response ALTER COLUMN id SET DEFAULT nextval('public.responses_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: quizzes_api
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Name: question question_id; Type: CONSTRAINT; Schema: public; Owner: quizzes_api
--

ALTER TABLE ONLY public.question
    ADD CONSTRAINT question_id PRIMARY KEY (id);


--
-- Name: quiz quiz_id; Type: CONSTRAINT; Schema: public; Owner: quizzes_api
--

ALTER TABLE ONLY public.quiz
    ADD CONSTRAINT quiz_id PRIMARY KEY (id);


--
-- Name: response response_id; Type: CONSTRAINT; Schema: public; Owner: quizzes_api
--

ALTER TABLE ONLY public.response
    ADD CONSTRAINT response_id PRIMARY KEY (id);


--
-- Name: user user_id; Type: CONSTRAINT; Schema: public; Owner: quizzes_api
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_id PRIMARY KEY (id);


--
-- Name: question question_quiz_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: quizzes_api
--

ALTER TABLE ONLY public.question
    ADD CONSTRAINT question_quiz_id_fkey FOREIGN KEY (quiz_id) REFERENCES public.quiz(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: quiz quiz_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: quizzes_api
--

ALTER TABLE ONLY public.quiz
    ADD CONSTRAINT quiz_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: response response_quiz_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: quizzes_api
--

ALTER TABLE ONLY public.response
    ADD CONSTRAINT response_quiz_id_fkey FOREIGN KEY (quiz_id) REFERENCES public.quiz(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: quizzes_api
--

REVOKE ALL ON SCHEMA public FROM postgres;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO quizzes_api;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

