BEGIN;

TRUNCATE
  sales,
  users,
  tickets,
  games,
  teams
  RESTART IDENTITY CASCADE;

INSERT INTO teams (team_name, logo)
VALUES
  ('Atlanta Hawks', 'www.teamlogo.com'),
  ('Boston Celtics', 'www.teamlogo.com'),
  ('Brooklyn Nets', 'www.teamlogo.com'),
  ('Chicago Bulls', 'www.teamlogo.com'),
  ('Golden State Warriors', 'www.teamlogo.com'),
  ('LA Clippers', 'www.teamlogo.com'),
  ('LA Lakers', 'www.teamlogo.com');

INSERT INTO games (home_team, away_team, local_date, local_time, venue)
VALUES
  (7, 1, '2019-10-25', '18:30:00', 'STAPLES Center'),
  (7, 2, '2019-10-27', '18:00:00', 'STAPLES Center'),
  (7, 3, '2019-11-02', '18:30:00', 'STAPLES Center'),
  (7, 4, '2019-11-15', '18:00:00', 'STAPLES Center'),
  (7, 5, '2019-11-25', '18:30:00', 'STAPLES Center'),
  (7, 6, '2019-11-30', '18:00:00', 'STAPLES Center'),
  (7, 1, '2019-12-01', '17:30:00', 'STAPLES Center'),
  (7, 2, '2019-12-05', '18:30:00', 'STAPLES Center'),
  (7, 3, '2019-12-06', '15:00:00', 'STAPLES Center'),
  (7, 4, '2019-12-25', '18:30:00', 'STAPLES Center'),
  (7, 5, '2020-01-01', '18:30:00', 'STAPLES Center'),
  (7, 6, '2020-01-05', '18:30:00', 'STAPLES Center'),
  (7, 1, '2020-01-10', '18:30:00', 'STAPLES Center'),
  (7, 2, '2020-01-13', '18:30:00', 'STAPLES Center');


INSERT INTO users (username, full_name, email, password)
VALUES
  ('dunder', 'Dunder Mifflin', 'dunder@email.com', '$2a$12$AmM8ZuvNAXf5FKYtyQ1xCus6Nm.YPbPazD3IAibAwZQWxdR7znkvW'),
  ('b.deboop', 'Bodeep Deboop', 'deboop@email.com', '$2a$12$LwaEMhzGB1wQLmXmZch57e.t.N8YFZR49Ax4oHD1nGAYLxWJ5e0zK'),
  ('c.bloggs', 'Charlie Bloggs', 'bloggs@email.com', '$2a$12$HOjNkF3P/VqJB7YEuOKvx.yPokHFP0Bdkkk.qpqsOBt42D8xMkVlK'),
  ('s.smith', 'Sam Smith', 'smith@email.com', '$2a$12$c228lzGCIVZ0rOSQuz/LVOSuOysnJIXeMASEzMaQW40SQ5B0ODkYK'),
  ('lexlor', 'Alex Taylor', 'lexlor@email.com', '$2a$12$hOYu4F/2DFGyZnS4ir28pu7Oy2JKePsc0d8h87cNfNealWurUhOoO'),
  ('wippy', 'Ping Won In', 'wippy@email.com', '$2a$12$VD04zwnrQZ/2.6Pw.ijzQuebC.M4ZZxH3UUq3IxaDzb.AvXus4k0S');

INSERT INTO tickets (game_id, section, seat_row, seats, quantity, singles_allowed, available)
VALUES
  (1, '114', '18W', '{3,4}', 2, FALSE, FALSE),
  (2, '114', '18W', '{3,4}', 2, FALSE, FALSE),
  (3, '114', '18W', '{3,4}', 2, FALSE, FALSE),
  (4, '114', '18W', '{3,4}', 2, FALSE, FALSE),
  (5, '114', '18W', '{3,4}', 2, FALSE, FALSE),
  (6, '114', '18W', '{3,4}', 2, FALSE, FALSE),
  (7, '114', '18W', '{3,4}', 2, FALSE, TRUE),
  (8, '114', '18W', '{3,4}', 2, FALSE, FALSE),
  (9, '114', '18W', '{3,4}', 2, FALSE, FALSE),
  (10, '114', '18W', '{3,4}', 2, FALSE, FALSE),
  (11, '114', '18W', '{3,4}', 2, FALSE, FALSE),
  (12, '114', '18W', '{3,4}', 2, FALSE, TRUE);

INSERT INTO sales (user_id, tickets_id)
VALUES
  (1, 1),
  (1, 2),
  (3, 3),
  (4, 4),
  (5, 5),
  (1, 6),
  (2, 11),
  (3, 8),
  (1, 9),
  (5, 10);

COMMIT;