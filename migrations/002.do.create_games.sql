CREATE TABLE games (
  id SERIAL PRIMARY KEY,
  home_team INTEGER REFERENCES teams(id),
  away_team INTEGER REFERENCES teams(id),
  local_date DATE NOT NULL,
  local_time TIME NOT NULL,
  venue TEXT NOT NULL
);