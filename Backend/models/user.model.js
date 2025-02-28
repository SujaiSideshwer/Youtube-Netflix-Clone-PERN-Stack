export const createSchemaSQL = `
CREATE SCHEMA IF NOT EXISTS my_schema;

-- Table 1: Users
CREATE TABLE IF NOT EXISTS my_schema.users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    image VARCHAR(255)
);

-- Table 2: Search History
CREATE TABLE IF NOT EXISTS my_schema.search_history (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    search_history JSONB[],
    CONSTRAINT fk_username FOREIGN KEY (username) REFERENCES my_schema.users(username) ON DELETE CASCADE
);
`;
