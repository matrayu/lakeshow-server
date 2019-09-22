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
  teams,
  users
  RESTART IDENTITY CASCADE;

INSERT INTO users (gender, first_name, last_name, username, password, email, phone_number, logins)
VALUES
  ('male', 'Mike', 'Dello', 'mdello', 'tester123', 'mdello@aol.com', '3103429876', 1);


INSERT INTO teams (team_name, logo)
VALUES
  ('LA Lakers', 'www.lakerslogo.com'),
  ('LA Clippers', 'www.clipperslogo.com');

INSERT INTO games (team_id_home, team_id_away, local_date, local_time, venue)
VALUES
  (1, 2, '2019-10-25', '18:30:00', 'STAPLES Center'),
  (2, 1, '2019-10-27', '18:00:00', 'STAPLES Center');

INSERT INTO product_groups (product_group_id)
VALUES
  (1),
  (2);

INSERT INTO product_images (product_group_id, product_image_path, product_image_details)
VALUES
  (1, 'www.imagepath6.com', 'these are the details for ticket grouping 6'),
  (2, 'www.imagepath7.com', 'these are the details for ticket grouping 7');

INSERT INTO products (game_id, product_group_id, section, seat_row, seat, quantity, purchase_price, list_price, stubhub_price, ticketmaster_price, ebay_price, discount_available, singles_allowed, available)
VALUES
  (1, 1, '114', '18W', '3', 1, 150.00, 300.00, 400.00, 400.00, 450.00, TRUE, FALSE, TRUE),
  (1, 1, '114', '18W', '4', 1, 150.00, 300.00, 400.00, 400.00, 450.00, TRUE, FALSE, TRUE),
  (2, 2, '114', '18W', '3', 1, 150.00, 300.00, 400.00, 400.00, 450.00, TRUE, FALSE, TRUE),
  (2, 2, '114', '18W', '4', 1, 150.00, 300.00, 400.00, 400.00, 450.00, TRUE, FALSE, TRUE);

INSERT INTO seller_products (user_id, product_id)
VALUES
  (1,1),
  (1,2),
  (1,3),
  (1,4);

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

INSERT INTO orders (user_id, order_status_code, date_order_placed, order_details)
VALUES
  (1, 2, '2019-08-03', 'These are some details on order number 1'),
  (1, 2, '2019-09-15', 'These are some details on order number 2');

INSERT INTO invoices (order_id, invoice_status_code, invoice_date, invoice_details)
VALUES
  (1, 2, '2019-08-03', 'These are some details on invoice number 1'),
  (2, 2, '2019-09-15', 'These are some details on invoice number 2');

INSERT INTO payments (invoice_number, payment_date, payment_amount, payment_method_code)
VALUES
  (1, '2019-08-03', 600.00, 2),
  (2, '2019-09-15', 900.00, 2);

INSERT INTO order_items (product_id, order_id, order_item_status_code, order_item_quantity, order_item_price, rma_number, rma_issued_date, other_order_item_details)
VALUES
  (1, 1, 1, 1, 300.00, NULL, NULL, 'these are some details on order item 1'),
  (2, 1, 1, 1, 300.00, NULL, NULL, 'these are some details on order item 2'),
  (3, 2, 1, 1, 450.00, NULL, NULL, 'these are some details on order item 3'),
  (4, 2, 1, 1, 450.00, NULL, NULL, NULL);

INSERT INTO shipments (order_id, invoice_number, shipment_tracking_number, shipment_date, other_shipment_details)
VALUES
  (1, 1, 'UPS12345667', '2019-08-11', 'These are some details on the shipping of order 1'),
  (2, 2, 'FEDEX123234123321', '2019-09-20', NULL);

INSERT INTO shipment_items (shipment_id, order_item_id)
VALUES
  (1, 1),
  (1, 2),
  (2, 3),
  (2, 4);

COMMIT;