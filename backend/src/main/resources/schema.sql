CREATE TABLE IF NOT EXISTS addresses
(
    id
    UUID
    PRIMARY
    KEY,
    street
    VARCHAR
(
    255
),
    city VARCHAR
(
    255
),
    state VARCHAR
(
    100
),
    zip_code VARCHAR
(
    20
),
    country VARCHAR
(
    100
)
    );
