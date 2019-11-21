BEGIN;

TRUNCATE
  products
  RESTART IDENTITY CASCADE;

INSERT INTO products (game_id, section, seat_row, seat, quantity, purchase_price_ea, list_price_ea, stubhub_price_ea, ticketmaster_price_ea, ebay_price_ea, discount_available, singles_allowed, available)
VALUES
  (1,'114','18W','{3,4}',2,222.00,577.00,703.00,702.00,756.00,TRUE,FALSE,FALSE),
(2,'114','18W','{3,4}',2,164.00,426.00,519.00,518.00,559.00,TRUE,FALSE,FALSE),
(3,'114','18W','{3,4}',2,164.00,426.00,519.00,518.00,559.00,TRUE,FALSE,FALSE),
(4,'114','18W','{3,4}',2,164.00,263.00,320.00,320.00,345.00,TRUE,FALSE,FALSE),
(5,'114','18W','{3,4}',2,172.00,276.00,336.00,336.00,362.00,TRUE,FALSE,FALSE),
(6,'114','18W','{3,4}',2,245.00,637.00,777.00,774.00,835.00,TRUE,FALSE,FALSE),
(7,'114','18W','{3,4}',2,164.00,426.00,519.00,518.00,559.00,TRUE,FALSE,FALSE),
(8,'114','18W','{3,4}',2,164.00,426.00,519.00,518.00,559.00,TRUE,FALSE,FALSE),
(9,'114','18W','{3,4}',2,130.00,338.00,412.00,411.00,443.00,TRUE,FALSE,FALSE),
(10,'114','18W','{3,4}',2,172.00,253.00,308.00,308.00,332.00,TRUE,FALSE,TRUE),
(11,'114','18W','{3,4}',2,164.00,263.00,320.00,320.00,345.00,TRUE,FALSE,TRUE),
(12,'114','18W','{3,4}',2,130.00,192.00,234.00,234.00,252.00,TRUE,FALSE,TRUE),
(13,'114','18W','{3,4}',2,195.00,312.00,380.00,380.00,409.00,TRUE,FALSE,TRUE),
(14,'114','18W','{3,4}',2,245.00,613.00,747.00,745.00,804.00,TRUE,FALSE,TRUE),
(15,'114','18W','{3,4}',2,195.00,312.00,380.00,380.00,409.00,TRUE,FALSE,TRUE),
(16,'114','18W','{3,4}',2,172.00,276.00,336.00,336.00,362.00,TRUE,FALSE,TRUE),
(17,'114','18W','{3,4}',2,195.00,287.00,350.00,349.00,376.00,TRUE,FALSE,TRUE),
(18,'114','18W','{3,4}',2,130.00,192.00,234.00,234.00,252.00,TRUE,FALSE,TRUE),
(19,'114','18W','{3,4}',2,164.00,242.00,295.00,295.00,318.00,TRUE,FALSE,TRUE),
(20,'114','18W','{3,4}',2,110.00,162.00,197.00,197.00,213.00,TRUE,FALSE,TRUE),
(21,'114','18W','{3,4}',2,110.00,162.00,197.00,197.00,213.00,TRUE,FALSE,TRUE),
(22,'114','18W','{3,4}',2,245.00,392.00,478.00,477.00,514.00,TRUE,FALSE,TRUE),
(23,'114','18W','{3,4}',2,172.00,253.00,308.00,308.00,332.00,TRUE,FALSE,TRUE),
(24,'114','18W','{3,4}',2,164.00,242.00,295.00,295.00,318.00,TRUE,FALSE,TRUE),
(25,'114','18W','{3,4}',2,222.00,356.00,434.00,433.00,467.00,TRUE,FALSE,TRUE),
(26,'114','18W','{3,4}',2,110.00,162.00,197.00,197.00,213.00,TRUE,FALSE,TRUE),
(27,'114','18W','{3,4}',2,130.00,192.00,234.00,234.00,252.00,TRUE,FALSE,TRUE),
(28,'114','18W','{3,4}',2,210.00,336.00,409.00,409.00,441.00,TRUE,FALSE,TRUE),
(29,'114','18W','{3,4}',2,172.00,253.00,308.00,308.00,332.00,TRUE,FALSE,TRUE),
(30,'114','18W','{3,4}',2,210.00,336.00,409.00,409.00,441.00,TRUE,FALSE,TRUE),
(31,'114','18W','{3,4}',2,222.00,356.00,434.00,433.00,467.00,TRUE,FALSE,TRUE),
(32,'114','18W','{3,4}',2,210.00,309.00,376.00,376.00,405.00,TRUE,FALSE,TRUE),
(33,'114','18W','{3,4}',2,222.00,356.00,434.00,433.00,467.00,TRUE,FALSE,TRUE),
(34,'114','18W','{3,4}',2,164.00,263.00,320.00,320.00,345.00,TRUE,FALSE,TRUE),
(35,'114','18W','{3,4}',2,164.00,242.00,295.00,295.00,318.00,TRUE,FALSE,TRUE),
(36,'114','18W','{3,4}',2,110.00,162.00,197.00,197.00,213.00,TRUE,FALSE,TRUE),
(37,'114','18W','{3,4}',2,130.00,192.00,234.00,234.00,252.00,TRUE,FALSE,TRUE),
(38,'114','18W','{3,4}',2,110.00,162.00,197.00,197.00,213.00,TRUE,FALSE,TRUE),
(39,'114','18W','{3,4}',2,245.00,361.00,440.00,439.00,473.00,TRUE,FALSE,TRUE),
(40,'114','18W','{3,4}',2,130.00,192.00,234.00,234.00,252.00,TRUE,FALSE,TRUE),
(41,'114','18W','{3,4}',2,110.00,176.00,214.00,214.00,231.00,TRUE,FALSE,TRUE),
(42,'114','18W','{3,4}',2,79.00,117.00,142.00,143.00,154.00,TRUE,FALSE,FALSE),
(43,'114','18W','{3,4}',2,79.00,117.00,142.00,143.00,154.00,TRUE,FALSE,FALSE);

COMMIT;