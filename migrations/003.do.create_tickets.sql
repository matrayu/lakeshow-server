CREATE TABLE tickets (
  id SERIAL PRIMARY KEY,
  game INTEGER REFERENCES games(id) ON DELETE CASCADE NOT NULL,
  section INT NOT NULL,
  seat_row INT NOT NULL,
  seats INT [] NOT NULL,
  quantity INT NOT NULL,
  singles_allowed BOOLEAN NOT NULL,
  date_created TIMESTAMP DEFAULT now() NOT NULL
);