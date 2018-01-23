

CREATE TABLE blog (
    id SERIAL NOT NULL,
    entry character varying NOT NULL,
    signiture character varying NOT NULL,
    created_at timestamp NOT NULL default now(),
    updated_at timestamp NOT NULL default now(),
    is_deleted boolean DEFAULT false NOT NULL,
);

ALTER TABLE ONLY blog ADD CONSTRAINT blog_pkey PRIMARY KEY (id);
ALTER TABLE blog OWNER TO postgres;
