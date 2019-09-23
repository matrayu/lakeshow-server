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
  ('LA Lakers', 'https://s1.ticketm.net/dam/a/3c3/aafab26b-70a8-474d-bbe5-6918cbea63c3_1103711_RETINA_LANDSCAPE_16_9.jpg'),
  ('LA Clippers', 'https://s1.ticketm.net/dam/a/baa/e07f33b1-b831-4795-b43b-e3a66570bbaa_1127441_TABLET_LANDSCAPE_16_9.jpg'),
  ('Toronto Raptors', 'https://s1.ticketm.net/dam/a/0d2/b6e4c3ae-7c1c-4ad3-a3c5-461c8789f0d2_1077301_TABLET_LANDSCAPE_16_9.jpg'),
  ('Golden State Warriors', 'https://s1.ticketm.net/dam/a/e09/b180f6e8-0ff8-4ee2-81ea-a12ec55abe09_1113501_TABLET_LANDSCAPE_3_2.jpg');


INSERT INTO venues (venue_name, venue_image, venue_seatmap)
VALUES
  ('STAPLES Center', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Staples-Center-at-night.jpeg/800px-Staples-Center-at-night.jpeg', 'https://s1.ticketm.net/tmimages/venue/maps/la1/la1257c.gif');

INSERT INTO games (team_id_home, team_id_away, local_date, local_time, venue_id)
VALUES
  (1, 2, '2019-10-25', '18:30:00', 1),
  (1, 3, '2019-10-27', '18:00:00', 1),
  (1, 4, '2019-10-31', '18:30:00', 1),
  (1, 2, '2019-11-15', '18:00:00', 1),
  (1, 2, '2019-12-25', '14:00:00', 1);


INSERT INTO products (game_id, section, seat_row, seat, quantity, purchase_price_ea, list_price_ea, stubhub_price_ea, ticketmaster_price_ea, ebay_price_ea, discount_available, singles_allowed, available)
VALUES
  (1, '114', '18W', '{3,4}', 2, 150.00, 300.00, 600.00, 780.00, 450.00, TRUE, FALSE, TRUE),
  (2, '114', '18W', '{3,4}', 2, 200.00, 320.00, 600.00, 700.00, 450.00, TRUE, FALSE, TRUE),
  (3, '114', '18W', '{3,4}', 2, 400.00, 500.00, 600.00, 790.00, 450.00, TRUE, FALSE, TRUE),
  (4, '114', '18W', '{3,4}', 2, 400.00, 500.00, 600.00, 790.00, 450.00, TRUE, FALSE, TRUE),
  (5, '119', 'J', '{7}', 1, 925.00, 1500.00, 1600.00, 1800.00, 1450.00, TRUE, TRUE, TRUE);


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