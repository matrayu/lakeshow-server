BEGIN;

TRUNCATE
  shipment_items,
  shipments,
  order_items,
  payments,
  invoices,
  orders,
  ref_order_status_codes,
  ref_order_item_status_codes,
  ref_invoice_status_codes,
  ref_payment_methods,
  seller_products,
  product_groups,
  product_images,
  products,
  games,
  venues,
  teams,
  users
  RESTART IDENTITY CASCADE;

INSERT INTO users (gender, first_name, last_name, username, password, email, dob, phone_number, visits)
VALUES
  ('male', 'Mike', 'Dello', 'mdello', 'Tester12!', 'mdello@aol.com','1980-05-04', '3103429876', 1),
  ('male', 'Matt', 'Fried', 'matrayu', '$2a$12$Dhuzep9dG/kxlc7x/B/azOnkyANhEHgxCBlwMeaZWMS6MBRYtxczm', 'mfried@aol.com','1980-08-03', '310344444', 1),
  ('male', 'Fred', 'Banks', 'fbanks', 'Tester12!', 'fbanks@aol.com','1999-09-18', '4243258469', 1);


INSERT INTO teams (team_name, logo)
VALUES
  ('Atlanta Hawks','https://s1.ticketm.net/dam/a/478/e03cbcd0-152d-40a9-b101-a6cc15a2d478_89831_RETINA_PORTRAIT_16_9.jpg'),
  ('Boston Celtics','https://s1.ticketm.net/dam/a/8d4/8d941ea2-4a9b-4f7e-80e4-ac8984b528d4_238861_RETINA_PORTRAIT_3_2.jpg'),
  ('Brooklyn Nets','https://s1.ticketm.net/dam/a/3c3/aafab26b-70a8-474d-bbe5-6918cbea63c3_1103711_RETINA_PORTRAIT_3_2.jpg'),
  ('Charlotte Hornets','https://s1.ticketm.net/dam/a/949/a7d02c0d-d3c5-4c48-ba09-8fd44ee3d949_1043081_RETINA_PORTRAIT_3_2.jpg'),
  ('Chicago Bulls','https://s1.ticketm.net/dam/a/4c7/8b8c3cf9-a216-40c8-8b41-b55b540004c7_28951_RETINA_PORTRAIT_3_2.jpg'),
  ('Cleveland Cavaliers','https://s1.ticketm.net/dam/a/06d/64703593-659b-4a97-9522-1fc4bc31206d_651341_RETINA_PORTRAIT_16_9.jpg'),
  ('Dallas Mavericks','https://s1.ticketm.net/dam/a/af3/57b73d7e-2f19-4a3a-9424-91d82a692af3_170171_RETINA_PORTRAIT_16_9.jpg'),
  ('Denver Nuggets','https://s1.ticketm.net/dam/a/ba1/5ff27d6f-da5f-4fd2-8c6f-ad59b82afba1_1105351_RETINA_PORTRAIT_3_2.jpg'),
  ('Detroit Pistons','https://s1.ticketm.net/dam/a/d6c/5e920228-27cd-4cbb-80b1-eee6215ffd6c_417241_RETINA_PORTRAIT_16_9.jpg'),
  ('Golden State Warriors','https://s1.ticketm.net/dam/a/e09/b180f6e8-0ff8-4ee2-81ea-a12ec55abe09_1113501_RETINA_PORTRAIT_3_2.jpg'),
  ('Houston Rockets','https://s1.ticketm.net/dam/a/e75/4a0c2cee-d0df-4727-bb7e-5d838643ce75_651361_RETINA_PORTRAIT_3_2.jpg'),
  ('Indiana Pacers','https://s1.ticketm.net/dam/a/f12/a62c4033-aea5-46f9-ae66-387381441f12_1126481_RETINA_PORTRAIT_16_9.jpg'),
  ('LA Clippers','https://s1.ticketm.net/dam/a/baa/e07f33b1-b831-4795-b43b-e3a66570bbaa_1127441_RETINA_PORTRAIT_3_2.jpg'),
  ('Los Angeles Lakers','https://s1.ticketm.net/dam/a/441/6c483401-d57c-41b7-aee7-bb94e5b58441_29091_RETINA_PORTRAIT_3_2.jpg'),
  ('Memphis Grizzlies','https://s1.ticketm.net/dam/a/57d/12c0d0a6-5d62-4c05-bb97-05dae6b8157d_864201_RETINA_PORTRAIT_3_2.jpg'),
  ('Miami Heat','https://s1.ticketm.net/dam/a/29e/08af8650-5b69-4c79-b56e-a4545098b29e_29011_RETINA_PORTRAIT_16_9.jpg'),
  ('Milwaukee Bucks','https://s1.ticketm.net/dam/a/b44/d4ed1ef5-89c2-403f-8684-2e7ac5e81b44_28941_RETINA_PORTRAIT_3_2.jpg'),
  ('Minnesota Timberwolves','https://s1.ticketm.net/dam/c/8d5/f95bdd17-1d94-4e98-9295-641e4db558d5_105621_RETINA_PORTRAIT_16_9.jpg'),
  ('New Orleans Pelicans','https://s1.ticketm.net/dam/c/8d5/f95bdd17-1d94-4e98-9295-641e4db558d5_105621_RETINA_PORTRAIT_16_9.jpg'),
  ('New York Knicks','https://s1.ticketm.net/dam/a/e72/a1498932-2e83-4033-acdb-2c9024885e72_485461_RETINA_PORTRAIT_3_2.jpg'),
  ('Oklahoma City Thunder','https://s1.ticketm.net/dam/a/b63/b26ef102-70cb-40a2-8e1f-3efe8f03ab63_29241_TABLET_LANDSCAPE_16_9.jpg'),
  ('Orlando Magic','https://s1.ticketm.net/dam/a/084/d6561be7-919e-4228-a5e1-8edc07cf6084_29111_RETINA_PORTRAIT_16_9.jpg'),
  ('Philadelphia 76ers','https://s1.ticketm.net/dam/a/793/61323289-47fa-4023-b250-a68f835a0793_651381_RETINA_PORTRAIT_3_2.jpg'),
  ('Phoenix Suns','https://s1.ticketm.net/dam/a/021/705fdac6-22ce-441c-9f76-5bddf586b021_779401_RETINA_PORTRAIT_3_2.jpg'),
  ('Portland Trail Blazers','https://s1.ticketm.net/dam/a/f6f/b64b32ce-dbfb-4231-afc0-1f56ac078f6f_1154781_RETINA_PORTRAIT_3_2.jpg'),
  ('Sacramento Kings','https://s1.ticketm.net/dam/a/c95/09e42d6b-15aa-4a2c-92b1-dad02397ac95_81111_RETINA_PORTRAIT_16_9.jpg'),
  ('San Antonio Spurs','https://s1.ticketm.net/dam/a/06c/3da037f9-d27d-4620-b2b1-89c2150e706c_29221_RETINA_PORTRAIT_16_9.jpg'),
  ('Toronto Raptors','https://s1.ticketm.net/dam/a/0d2/b6e4c3ae-7c1c-4ad3-a3c5-461c8789f0d2_1077301_RETINA_PORTRAIT_3_2.jpg'),
  ('Utah Jazz','https://s1.ticketm.net/dam/a/e4c/943fb984-7844-4e82-b0cd-176a58921e4c_483271_RETINA_PORTRAIT_3_2.jpg'),
  ('Washington Wizards','https://s1.ticketm.net/dam/a/5b2/380cb85f-d59c-4760-8ded-561109a855b2_29281_RETINA_PORTRAIT_16_9.jpg');


INSERT INTO venues (venue_name, venue_image, venue_seatmap)
VALUES
  ('STAPLES Center', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Staples-Center-at-night.jpeg/800px-Staples-Center-at-night.jpeg', 'https://s1.ticketm.net/tmimages/venue/maps/la1/la1257c.gif');

INSERT INTO games (season, season_game_id, team_id_home, team_id_away, local_date, local_time, venue_id, game_note)
VALUES
  (2019,1,14,29,'2019-10-25','19:30:00',1,'Opening Night'),
  (2019,2,14,4,'2019-10-27','18:30:00',1,''),
  (2019,3,14,15,'2019-10-29','19:30:00',1,''),
  (2019,4,14,16,'2019-11-08','19:30:00',1,''),
  (2019,5,14,28,'2019-11-10','18:30:00',1,''),
  (2019,6,14,10,'2019-11-13','19:00:00',1,''),
  (2019,7,14,26,'2019-11-15','19:30:00',1,''),
  (2019,8,14,1,'2019-11-17','18:30:00',1,''),
  (2019,9,14,21,'2019-11-19','19:30:00',1,''),
  (2019,10,14,30,'2019-11-29','19:30:00',1,'Thanksgiving'),
  (2019,11,14,7,'2019-12-01','13:00:00',1,''),
  (2019,12,14,18,'2019-12-08','18:30:00',1,''),
  (2019,13,14,8,'2019-12-22','18:30:00',1,''),
  (2019,14,14,13,'2019-12-25','17:00:00',1,'Christmas Day'),
  (2019,15,14,7,'2019-12-29','18:30:00',1,''),
  (2019,16,14,24,'2020-01-01','19:30:00',1,'New Years Day'),
  (2019,17,14,19,'2020-01-03','19:30:00',1,''),
  (2019,18,14,9,'2020-01-05','19:00:00',1,''),
  (2019,19,14,20,'2020-01-07','19:30:00',1,''),
  (2019,20,14,6,'2020-01-13','19:30:00',1,''),
  (2019,21,14,22,'2020-01-15','19:30:00',1,''),
  (2019,22,14,13,'2020-01-28','19:00:00',1,''),
  (2019,23,14,25,'2020-01-31','19:30:00',1,''),
  (2019,24,14,27,'2020-02-04','19:30:00',1,''),
  (2019,25,14,11,'2020-02-06','19:30:00',1,''),
  (2019,26,14,24,'2020-02-10','19:30:00',1,''),
  (2019,27,14,15,'2020-02-21','19:30:00',1,''),
  (2019,28,14,2,'2020-02-23','12:30:00',1,''),
  (2019,29,14,19,'2020-02-25','19:00:00',1,''),
  (2019,30,14,23,'2020-03-03','19:00:00',1,''),
  (2019,31,14,17,'2020-03-06','19:30:00',1,''),
  (2019,32,14,3,'2020-03-10','19:30:00',1,''),
  (2019,33,14,11,'2020-03-12','19:30:00',1,''),
  (2019,34,14,8,'2020-03-15','18:00:00',1,''),
  (2019,35,14,29,'2020-03-18','19:00:00',1,''),
  (2019,36,14,12,'2020-04-01','19:30:00',1,''),
  (2019,37,14,21,'2020-04-05','18:30:00',1,''),
  (2019,38,14,5,'2020-04-07','19:30:00',1,''),
  (2019,39,14,10,'2020-04-09','19:30:00',1,''),
  (2019,40,14,18,'2020-04-12','18:30:00',1,''),
  (2019,41,14,26,'2020-04-14','19:30:00',1,'Last Home Game'),
  (2019,42,14,10,'2019-10-14','19:30:00',1,'Preseason'),
  (2019,43,14,10,'2019-10-16','19:30:00',1,'Preseason');
  


INSERT INTO products (game_id, section, seat_row, seat, quantity, purchase_price_ea, list_price_ea, stubhub_price_ea, ticketmaster_price_ea, ebay_price_ea, discount_available, singles_allowed, available)
VALUES
  (1,'114','18W','{3,4}',2,79.00,158.00,198.00,192.00,207.00,TRUE,FALSE,TRUE),
  (2,'114','18W','{3,4}',2,79.00,158.00,198.00,192.00,207.00,TRUE,FALSE,TRUE),
  (3,'114','18W','{3,4}',2,222.00,444.00,555.00,540.00,582.00,TRUE,FALSE,TRUE),
  (4,'114','18W','{3,4}',2,164.00,328.00,410.00,399.00,430.00,TRUE,FALSE,TRUE),
  (5,'114','18W','{3,4}',2,164.00,328.00,410.00,399.00,430.00,TRUE,FALSE,TRUE),
  (6,'114','18W','{3,4}',2,164.00,328.00,410.00,399.00,430.00,TRUE,FALSE,TRUE),
  (7,'114','18W','{3,4}',2,172.00,344.00,430.00,418.00,451.00,TRUE,FALSE,TRUE),
  (8,'114','18W','{3,4}',2,245.00,490.00,613.00,596.00,642.00,TRUE,FALSE,TRUE),
  (9,'114','18W','{3,4}',2,164.00,328.00,410.00,399.00,430.00,TRUE,FALSE,TRUE),
  (10,'114','18W','{3,4}',2,164.00,328.00,410.00,399.00,430.00,TRUE,FALSE,TRUE),
  (11,'114','18W','{3,4}',2,130.00,260.00,325.00,316.00,341.00,TRUE,FALSE,TRUE),
  (12,'114','18W','{3,4}',2,172.00,344.00,430.00,418.00,451.00,TRUE,FALSE,TRUE),
  (13,'114','18W','{3,4}',2,164.00,328.00,410.00,399.00,430.00,TRUE,FALSE,TRUE),
  (14,'114','18W','{3,4}',2,130.00,260.00,325.00,316.00,341.00,TRUE,FALSE,TRUE),
  (15,'114','18W','{3,4}',2,195.00,390.00,488.00,474.00,511.00,TRUE,FALSE,TRUE),
  (16,'114','18W','{3,4}',2,245.00,490.00,613.00,596.00,642.00,TRUE,FALSE,TRUE),
  (17,'114','18W','{3,4}',2,195.00,390.00,488.00,474.00,511.00,TRUE,FALSE,TRUE),
  (18,'114','18W','{3,4}',2,172.00,344.00,430.00,418.00,451.00,TRUE,FALSE,TRUE),
  (19,'114','18W','{3,4}',2,195.00,390.00,488.00,474.00,511.00,TRUE,FALSE,TRUE),
  (20,'114','18W','{3,4}',2,130.00,260.00,325.00,316.00,341.00,TRUE,FALSE,TRUE),
  (21,'114','18W','{3,4}',2,164.00,328.00,410.00,399.00,430.00,TRUE,FALSE,TRUE),
  (22,'114','18W','{3,4}',2,110.00,220.00,275.00,268.00,289.00,TRUE,FALSE,TRUE),
  (23,'114','18W','{3,4}',2,110.00,220.00,275.00,268.00,289.00,TRUE,FALSE,TRUE),
  (24,'114','18W','{3,4}',2,245.00,490.00,613.00,596.00,642.00,TRUE,FALSE,TRUE),
  (25,'114','18W','{3,4}',2,172.00,344.00,430.00,418.00,451.00,TRUE,FALSE,TRUE),
  (26,'114','18W','{3,4}',2,164.00,328.00,410.00,399.00,430.00,TRUE,FALSE,TRUE),
  (27,'114','18W','{3,4}',2,222.00,444.00,555.00,540.00,582.00,TRUE,FALSE,TRUE),
  (28,'114','18W','{3,4}',2,110.00,220.00,275.00,268.00,289.00,TRUE,FALSE,TRUE),
  (29,'114','18W','{3,4}',2,130.00,260.00,325.00,316.00,341.00,TRUE,FALSE,TRUE),
  (30,'114','18W','{3,4}',2,210.00,420.00,525.00,511.00,551.00,TRUE,FALSE,TRUE),
  (31,'114','18W','{3,4}',2,172.00,344.00,430.00,418.00,451.00,TRUE,FALSE,TRUE),
  (32,'114','18W','{3,4}',2,210.00,420.00,525.00,511.00,551.00,TRUE,FALSE,TRUE),
  (33,'114','18W','{3,4}',2,222.00,444.00,555.00,540.00,582.00,TRUE,FALSE,TRUE),
  (34,'114','18W','{3,4}',2,210.00,420.00,525.00,511.00,551.00,TRUE,FALSE,TRUE),
  (35,'114','18W','{3,4}',2,222.00,444.00,555.00,540.00,582.00,TRUE,FALSE,TRUE),
  (36,'114','18W','{3,4}',2,164.00,328.00,410.00,399.00,430.00,TRUE,FALSE,TRUE),
  (37,'114','18W','{3,4}',2,164.00,328.00,410.00,399.00,430.00,TRUE,FALSE,TRUE),
  (38,'114','18W','{3,4}',2,110.00,220.00,275.00,268.00,289.00,TRUE,FALSE,TRUE),
  (39,'114','18W','{3,4}',2,130.00,260.00,325.00,316.00,341.00,TRUE,FALSE,TRUE),
  (40,'114','18W','{3,4}',2,110.00,220.00,275.00,268.00,289.00,TRUE,FALSE,TRUE),
  (41,'114','18W','{3,4}',2,245.00,490.00,613.00,596.00,642.00,TRUE,FALSE,TRUE),
  (42,'114','18W','{3,4}',2,130.00,260.00,325.00,316.00,341.00,TRUE,FALSE,TRUE),
  (43,'114','18W','{3,4}',2,110.00,220.00,275.00,268.00,289.00,TRUE,FALSE,TRUE);


INSERT INTO product_images (product_id, product_image_path, product_image_details)
VALUES
  (1, 'www.productid1_imagepath.com', 'these are the details for product id 1'),
  (2, 'www.productid2_imagepath.com', 'these are the details for product id 2'),
  (3, 'www.productid3_imagepath.com', 'these are the details for product id 3'),
  (4, 'www.productid4_imagepath.com', 'these are the details for product id 4'),
  (5, 'www.productid5_imagepath.com', 'these are the details for product id 5');


INSERT INTO seller_products (user_id, product_id)
VALUES
  (1,1),
  (1,2),
  (1,3),
  (2,4),
  (1,5);

INSERT INTO ref_payment_methods (payment_method_description)
VALUES
  ('Credit Card'),
  ('Paypal'),
  ('Venmo'),
  ('Cash');

INSERT INTO ref_invoice_status_codes (invoice_status_description)
VALUES
  ('Issued'),
  ('Paid');

INSERT INTO ref_order_item_status_codes (order_item_status_description)
VALUES
  ('Delivered'),
  ('Out of Stock');

INSERT INTO ref_order_status_codes (order_status_description)
VALUES
  ('Cancelled'),
  ('Completed');








/* INSERT INTO orders (user_id, order_status_code, date_order_placed, order_details)
VALUES
  (1, 2, '2019-08-03', 'These are some details on order number 1'),
  (1, 2, '2019-09-15', 'These are some details on order number 2'); */

/* INSERT INTO invoices (order_id, invoice_status_code, invoice_date, invoice_details)
VALUES
  (1, 2, '2019-08-03', 'These are some details on invoice number 1'),
  (2, 2, '2019-09-15', 'These are some details on invoice number 2');

INSERT INTO payments (invoice_number, payment_date, payment_amount, payment_method_code)
VALUES
  (1, '2019-08-03', 600.00, 2),
  (2, '2019-09-15', 900.00, 2);
 */
/* INSERT INTO order_items (product_id, order_id, order_item_status_code, order_item_quantity, order_item_price, rma_number, rma_issued_date, other_order_item_details)
VALUES
  (1, 1, 1, 1, 300.00, NULL, NULL, 'these are some details on order item 1'),
  (2, 1, 1, 1, 300.00, NULL, NULL, 'these are some details on order item 2'),
  (3, 2, 1, 1, 450.00, NULL, NULL, 'these are some details on order item 3'),
  (4, 2, 1, 1, 450.00, NULL, NULL, NULL); */

/* INSERT INTO shipments (order_id, invoice_number, shipment_tracking_number, shipment_date, other_shipment_details)
VALUES
  (1, 1, 'UPS12345667', '2019-08-11', 'These are some details on the shipping of order 1'),
  (2, 2, 'FEDEX123234123321', '2019-09-20', NULL);

INSERT INTO shipment_items (shipment_id, order_item_id)
VALUES
  (1, 1),
  (1, 2),
  (2, 3),
  (2, 4); */

COMMIT;