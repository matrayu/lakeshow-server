-- Drop table

-- DROP TABLE public.users;

CREATE TABLE users (
	user_id serial NOT NULL,
	gender gender NULL,
	first_name text NOT NULL,
	last_name text NOT NULL,
	username text NOT NULL,
	"password" text NOT NULL,
	email text NOT NULL,
	phone_number varchar NULL,
	logins int4 NOT NULL,
	date_created timestamp NOT NULL DEFAULT now(),
	date_modified timestamp NULL,
	CONSTRAINT users_email_key UNIQUE (email),
	CONSTRAINT users_pkey PRIMARY KEY (user_id),
	CONSTRAINT users_username_key UNIQUE (username)
);


-- Drop table

-- DROP TABLE public.teams;

CREATE TABLE teams (
	team_id serial NOT NULL,
	team_name varchar(255) NOT NULL,
	logo varchar NULL,
	CONSTRAINT teams_pkey PRIMARY KEY (team_id),
	CONSTRAINT teams_team_name_key UNIQUE (team_name)
);

-- Drop table

-- DROP TABLE public.games;

CREATE TABLE games (
	game_id serial NOT NULL,
	team_id_home int2 NOT NULL,
	team_id_away int2 NOT NULL,
	local_date date NOT NULL,
	local_time time NOT NULL,
	venue text NOT NULL,
	CONSTRAINT games_pkey PRIMARY KEY (game_id),
	CONSTRAINT games_fk FOREIGN KEY (team_id_home) REFERENCES teams(team_id) ON UPDATE RESTRICT ON DELETE RESTRICT,
	CONSTRAINT games_fk_1 FOREIGN KEY (team_id_away) REFERENCES teams(team_id) ON UPDATE RESTRICT ON DELETE RESTRICT
);


-- Drop table

-- DROP TABLE public.product_groups;

CREATE TABLE product_groups (
	product_group_id serial NOT NULL,
	CONSTRAINT product_groups_pkey PRIMARY KEY (product_group_id)
);


-- Drop table

-- DROP TABLE public.products;

CREATE TABLE products (
	product_id serial NOT NULL,
	game_id int4 NOT NULL,
	product_group_id int4 NOT NULL,
	"section" varchar(255) NOT NULL,
	seat_row varchar(255) NOT NULL,
	seat varchar(255) NOT NULL,
	quantity int2 NOT NULL DEFAULT 1,
	purchase_price money NULL,
	list_price money NULL,
	stubhub_price money NULL,
	ticketmaster_price money NULL,
	ebay_price money NULL,
	discount_available bool NOT NULL DEFAULT true,
	singles_allowed bool NOT NULL DEFAULT false,
	available bool NOT NULL DEFAULT true,
	date_created timestamp NOT NULL DEFAULT now(),
	CONSTRAINT products_pkey PRIMARY KEY (product_id),
	CONSTRAINT products_fk FOREIGN KEY (game_id) REFERENCES games(game_id) ON UPDATE CASCADE ON DELETE RESTRICT,
	CONSTRAINT products_fk_1 FOREIGN KEY (product_group_id) REFERENCES product_groups(product_group_id) ON UPDATE CASCADE ON DELETE CASCADE
);



-- Drop table

-- DROP TABLE public.product_images;

CREATE TABLE product_images (
	product_image_id serial NOT NULL,
	product_group_id int4 NOT NULL,
	product_image_path varchar NULL,
	product_image_details varchar(255) NULL,
	CONSTRAINT product_images_pkey PRIMARY KEY (product_image_id),
	CONSTRAINT product_images_fk FOREIGN KEY (product_group_id) REFERENCES product_groups(product_group_id) ON UPDATE CASCADE ON DELETE CASCADE
);




-- Drop table

-- DROP TABLE public.seller_products;

CREATE TABLE seller_products (
	seller_product_id serial NOT NULL,
	user_id int4 NOT NULL,
	product_id int4 NOT NULL,
	CONSTRAINT seller_products_pkey PRIMARY KEY (seller_product_id),
	CONSTRAINT seller_products_fk FOREIGN KEY (user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT seller_products_fk_1 FOREIGN KEY (product_id) REFERENCES products(product_id) ON UPDATE CASCADE ON DELETE CASCADE
);



-- Drop table

-- DROP TABLE public.ref_payment_methods;

CREATE TABLE ref_payment_methods (
	payment_method_code serial NOT NULL,
	payment_method_description payment_method NOT NULL,
	CONSTRAINT ref_payment_methods_pkey PRIMARY KEY (payment_method_code)
);


-- Drop table

-- DROP TABLE public.ref_invoice_status_codes;

CREATE TABLE ref_invoice_status_codes (
	invoice_status_code serial NOT NULL,
	invoice_status_description invoice_status NOT NULL,
	CONSTRAINT ref_invoice_status_codes_pkey PRIMARY KEY (invoice_status_code)
);


-- Drop table

-- DROP TABLE public.ref_order_item_status_codes;

CREATE TABLE ref_order_item_status_codes (
	order_item_status_code serial NOT NULL,
	order_item_status_description order_item_status NOT NULL,
	CONSTRAINT ref_order_item_status_codes_pkey PRIMARY KEY (order_item_status_code)
);


-- Drop table

-- DROP TABLE public.ref_order_status_codes;

CREATE TABLE ref_order_status_codes (
	order_status_code serial NOT NULL,
	order_status_description order_status NOT NULL,
	CONSTRAINT ref_order_status_codes_pkey PRIMARY KEY (order_status_code)
);


-- Drop table

-- DROP TABLE public.orders;

CREATE TABLE orders (
	order_id serial NOT NULL,
	user_id int4 NOT NULL,
	order_status_code int4 NOT NULL,
	date_order_placed timestamp NOT NULL DEFAULT now(),
	order_details varchar(255) NULL,
	CONSTRAINT orders_pkey PRIMARY KEY (order_id),
	CONSTRAINT orders_fk FOREIGN KEY (user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE SET NULL,
	CONSTRAINT orders_fk_1 FOREIGN KEY (order_status_code) REFERENCES ref_order_status_codes(order_status_code) ON UPDATE CASCADE ON DELETE RESTRICT
);


-- Drop table

-- DROP TABLE public.invoices;

CREATE TABLE invoices (
	invoice_number serial NOT NULL,
	order_id int4 NOT NULL,
	invoice_status_code int4 NOT NULL,
	invoice_date timestamp NOT NULL DEFAULT now(),
	invoice_details varchar(255) NULL,
	CONSTRAINT invoices_pkey PRIMARY KEY (invoice_number),
	CONSTRAINT invoices_fk FOREIGN KEY (invoice_status_code) REFERENCES ref_invoice_status_codes(invoice_status_code) ON UPDATE CASCADE ON DELETE SET NULL,
	CONSTRAINT invoices_fk_1 FOREIGN KEY (order_id) REFERENCES orders(order_id) ON UPDATE CASCADE ON DELETE SET NULL
);


-- Drop table

-- DROP TABLE public.payments;

CREATE TABLE payments (
	payment_id serial NOT NULL,
	invoice_number int4 NOT NULL,
	payment_date timestamp NOT NULL DEFAULT now(),
	payment_amount money NULL,
	payment_method_code int4 NOT NULL,
	CONSTRAINT payments_pkey PRIMARY KEY (payment_id),
	CONSTRAINT payments_fk FOREIGN KEY (invoice_number) REFERENCES invoices(invoice_number) ON UPDATE CASCADE ON DELETE RESTRICT,
	CONSTRAINT payments_fk_1 FOREIGN KEY (payment_method_code) REFERENCES ref_payment_methods(payment_method_code) ON UPDATE CASCADE ON DELETE RESTRICT
);


-- Drop table

-- DROP TABLE public.order_items;

CREATE TABLE order_items (
	order_item_id serial NOT NULL,
	product_id int4 NOT NULL,
	order_id int4 NOT NULL,
	order_item_status_code int4 NOT NULL,
	order_item_quantity int2 NULL,
	order_item_price money NULL,
	rma_number int4 NULL,
	rma_issued_date timestamp NULL,
	other_order_item_details varchar(255) NULL,
	CONSTRAINT order_items_pkey PRIMARY KEY (order_item_id),
	CONSTRAINT order_items_fk FOREIGN KEY (product_id) REFERENCES products(product_id) ON UPDATE CASCADE ON DELETE RESTRICT,
	CONSTRAINT order_items_fk_1 FOREIGN KEY (order_id) REFERENCES orders(order_id) ON UPDATE CASCADE ON DELETE RESTRICT,
	CONSTRAINT order_items_fk_2 FOREIGN KEY (order_item_status_code) REFERENCES ref_order_item_status_codes(order_item_status_code) ON UPDATE CASCADE ON DELETE RESTRICT
);


-- Drop table

-- DROP TABLE public.shipments;

CREATE TABLE shipments (
	shipment_id serial NOT NULL,
	order_id int4 NOT NULL,
	invoice_number int4 NOT NULL,
	shipment_tracking_number varchar(255) NULL,
	shipment_date timestamp NOT NULL DEFAULT now(),
	other_shipment_details varchar(255) NULL,
	CONSTRAINT shipments_pkey PRIMARY KEY (shipment_id),
	CONSTRAINT shipments_fk FOREIGN KEY (order_id) REFERENCES orders(order_id) ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT shipments_fk_1 FOREIGN KEY (invoice_number) REFERENCES invoices(invoice_number) ON UPDATE CASCADE ON DELETE CASCADE
);


-- Drop table

-- DROP TABLE public.shipment_items;

CREATE TABLE shipment_items (
	shipment_id int4 NOT NULL,
	order_item_id int4 NOT NULL,
	CONSTRAINT shipment_items_fk FOREIGN KEY (shipment_id) REFERENCES shipments(shipment_id) ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT shipment_items_fk_1 FOREIGN KEY (order_item_id) REFERENCES order_items(order_item_id) ON UPDATE CASCADE ON DELETE CASCADE
);





