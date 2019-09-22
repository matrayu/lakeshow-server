-- Drop table

-- DROP TABLE public.users;

CREATE TABLE users (
	id serial NOT NULL,
	gender gender NULL,
	first_name varchar(255) NOT NULL,
	last_name varchar(255) NOT NULL,
	username varchar(255) NOT NULL UNIQUE,
	"password" varchar(255) NOT NULL,
	email varchar(255) NOT NULL UNIQUE,
	dob date NOT NULL,
	phone_number varchar NULL,
	visits int4 NOT NULL DEFAULT 1,
	date_created timestamp NOT NULL DEFAULT now(),
	date_modified timestamp NULL,
	CONSTRAINT users_email_key UNIQUE (email),
	CONSTRAINT users_pkey PRIMARY KEY (id),
	CONSTRAINT users_username_key UNIQUE (username)
);


-- Drop table

-- DROP TABLE public.teams;

CREATE TABLE teams (
	id serial NOT NULL,
	team_name varchar(255) NOT NULL,
	logo varchar NULL,
	CONSTRAINT teams_pkey PRIMARY KEY (id),
	CONSTRAINT teams_team_name_key UNIQUE (team_name)
);

-- Drop table

-- DROP TABLE public.games;

CREATE TABLE games (
	id serial NOT NULL,
	team_id_home int2 NOT NULL,
	team_id_away int2 NOT NULL,
	local_date date NOT NULL,
	local_time time NOT NULL,
	venue varchar(255)  NOT NULL,
	CONSTRAINT games_pkey PRIMARY KEY (id),
	CONSTRAINT games_fk FOREIGN KEY (team_id_home) REFERENCES teams(id) ON UPDATE RESTRICT ON DELETE RESTRICT,
	CONSTRAINT games_fk_1 FOREIGN KEY (team_id_away) REFERENCES teams(id) ON UPDATE RESTRICT ON DELETE RESTRICT
);

-- Drop table

-- DROP TABLE public.products;

CREATE TABLE products (
	id serial NOT NULL,
	game_id int4 NOT NULL,
	"section" varchar(255) NOT NULL,
	seat_row varchar(255) NOT NULL,
	seat INT [] NOT NULL,
	quantity int2 NOT NULL DEFAULT 1,
	purchase_price_ea money NULL,
	list_price_ea money NULL,
	stubhub_price_ea money NULL,
	ticketmaster_price_ea money NULL,
	ebay_price_ea money NULL,
	discount_available bool NOT NULL DEFAULT true,
	singles_allowed bool NOT NULL DEFAULT false,
	available bool NOT NULL DEFAULT true,
	date_created timestamp NOT NULL DEFAULT now(),
	CONSTRAINT products_pkey PRIMARY KEY (id),
	CONSTRAINT products_fk FOREIGN KEY (game_id) REFERENCES games(id) ON UPDATE CASCADE ON DELETE RESTRICT
);



-- Drop table

-- DROP TABLE public.product_images;

CREATE TABLE product_images (
	id serial NOT NULL,
	product_id int4 NOT NULL,
	product_image_path varchar NULL,
	product_image_details varchar(255) NULL,
	CONSTRAINT product_images_pkey PRIMARY KEY (id),
	CONSTRAINT product_images_fk FOREIGN KEY (product_id) REFERENCES products(id) ON UPDATE CASCADE ON DELETE CASCADE
);




-- Drop table

-- DROP TABLE public.seller_products;

CREATE TABLE seller_products (
	id serial NOT NULL,
	user_id int4 NOT NULL,
	product_id int4 NOT NULL,
	CONSTRAINT seller_products_pkey PRIMARY KEY (id),
	CONSTRAINT seller_products_fk FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT seller_products_fk_1 FOREIGN KEY (product_id) REFERENCES products(id) ON UPDATE CASCADE ON DELETE CASCADE
);



-- Drop table

-- DROP TABLE public.ref_payment_methods;

CREATE TABLE ref_payment_methods (
	id serial NOT NULL,
	payment_method_description payment_method NOT NULL,
	CONSTRAINT ref_payment_methods_pkey PRIMARY KEY (id)
);


-- Drop table

-- DROP TABLE public.ref_invoice_status_codes;

CREATE TABLE ref_invoice_status_codes (
	id serial NOT NULL,
	invoice_status_description invoice_status NOT NULL,
	CONSTRAINT ref_invoice_status_codes_pkey PRIMARY KEY (id)
);


-- Drop table

-- DROP TABLE public.ref_order_item_status_codes;

CREATE TABLE ref_order_item_status_codes (
	id serial NOT NULL,
	order_item_status_description order_item_status NOT NULL,
	CONSTRAINT ref_order_item_status_codes_pkey PRIMARY KEY (id)
);


-- Drop table

-- DROP TABLE public.ref_order_status_codes;

CREATE TABLE ref_order_status_codes (
	id serial NOT NULL,
	order_status_description order_status NOT NULL,
	CONSTRAINT ref_order_status_codes_pkey PRIMARY KEY (id)
);


-- Drop table

-- DROP TABLE public.orders;

CREATE TABLE orders (
	id serial NOT NULL,
	user_id int4 NOT NULL,
	order_status_code int4 NOT NULL,
	date_order_placed timestamp NOT NULL DEFAULT now(),
	order_details varchar(255) NULL,
	CONSTRAINT orders_pkey PRIMARY KEY (id),
	CONSTRAINT orders_fk FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE SET NULL,
	CONSTRAINT orders_fk_1 FOREIGN KEY (order_status_code) REFERENCES ref_order_status_codes(id) ON UPDATE CASCADE ON DELETE RESTRICT
);


-- Drop table

-- DROP TABLE public.invoices;

CREATE TABLE invoices (
	id serial NOT NULL,
	order_id int4 NOT NULL,
	invoice_status_code int4 NOT NULL,
	invoice_date timestamp NOT NULL DEFAULT now(),
	invoice_details varchar(255) NULL,
	CONSTRAINT invoices_pkey PRIMARY KEY (id),
	CONSTRAINT invoices_fk FOREIGN KEY (id) REFERENCES ref_invoice_status_codes(id) ON UPDATE CASCADE ON DELETE SET NULL,
	CONSTRAINT invoices_fk_1 FOREIGN KEY (order_id) REFERENCES orders(id) ON UPDATE CASCADE ON DELETE SET NULL
);


-- Drop table

-- DROP TABLE public.payments;

CREATE TABLE payments (
	id serial NOT NULL,
	invoice_number int4 NOT NULL,
	payment_date timestamp NOT NULL DEFAULT now(),
	payment_amount money NULL,
	payment_method_code int4 NOT NULL,
	CONSTRAINT payments_pkey PRIMARY KEY (id),
	CONSTRAINT payments_fk FOREIGN KEY (invoice_number) REFERENCES invoices(id) ON UPDATE CASCADE ON DELETE RESTRICT,
	CONSTRAINT payments_fk_1 FOREIGN KEY (payment_method_code) REFERENCES ref_payment_methods(id) ON UPDATE CASCADE ON DELETE RESTRICT
);


-- Drop table

-- DROP TABLE public.order_items;

CREATE TABLE order_items (
	id serial NOT NULL,
	product_id int4 NOT NULL,
	order_id int4 NOT NULL,
	order_item_status_code int4 NOT NULL,
	order_item_quantity int2 NULL,
	order_item_price money NULL,
	rma_number int4 NULL,
	rma_issued_date timestamp NULL,
	other_order_item_details varchar(255) NULL,
	CONSTRAINT order_items_pkey PRIMARY KEY (id),
	CONSTRAINT order_items_fk FOREIGN KEY (product_id) REFERENCES products(id) ON UPDATE CASCADE ON DELETE RESTRICT,
	CONSTRAINT order_items_fk_1 FOREIGN KEY (order_id) REFERENCES orders(id) ON UPDATE CASCADE ON DELETE RESTRICT,
	CONSTRAINT order_items_fk_2 FOREIGN KEY (order_item_status_code) REFERENCES ref_order_item_status_codes(id) ON UPDATE CASCADE ON DELETE RESTRICT
);


-- Drop table

-- DROP TABLE public.shipments;

CREATE TABLE shipments (
	id serial NOT NULL,
	order_id int4 NOT NULL,
	invoice_number int4 NOT NULL,
	shipment_tracking_number varchar(255) NULL,
	shipment_date timestamp NOT NULL DEFAULT now(),
	other_shipment_details varchar(255) NULL,
	CONSTRAINT shipments_pkey PRIMARY KEY (id),
	CONSTRAINT shipments_fk FOREIGN KEY (order_id) REFERENCES orders(id) ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT shipments_fk_1 FOREIGN KEY (invoice_number) REFERENCES invoices(id) ON UPDATE CASCADE ON DELETE CASCADE
);


-- Drop table

-- DROP TABLE public.shipment_items;

CREATE TABLE shipment_items (
	shipment_id int4 NOT NULL,
	order_item_id int4 NOT NULL,
	CONSTRAINT shipment_items_fk FOREIGN KEY (shipment_id) REFERENCES shipments(id) ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT shipment_items_fk_1 FOREIGN KEY (order_item_id) REFERENCES order_items(id) ON UPDATE CASCADE ON DELETE CASCADE
);





