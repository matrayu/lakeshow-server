-- Drop table

-- DROP TABLE public.listings;

CREATE TABLE listings (
	id serial NOT NULL,
	user_id int4 NOT NULL,
	available bool NOT NULL DEFAULT true,
	qty int2 not NULL,
	discount_available bool NOT NULL DEFAULT true,
	singles_allowed bool NOT NULL DEFAULT false,
	CONSTRAINT listings_pkey PRIMARY KEY (id),
	CONSTRAINT listings_fk FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT listings_fk FOREIGN KEY (available) REFERENCES products(id) ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT listings_fk FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- Drop table

-- DROP TABLE public.product_listings_users;

CREATE TABLE product_listings_users (
	id serial NOT NULL,
    product_id int4 NOT NULL UNIQUE,
	listing_id int4 NOT NULL,
    user_id int NOT NULL,
	CONSTRAINT product_listings_users_pkey PRIMARY KEY (id),
	CONSTRAINT product_listings_users_fk FOREIGN KEY (product_id) REFERENCES products(id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT product_listings_users_fk_1 FOREIGN KEY (listing_id) REFERENCES listings(id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT product_listings_users_fk_2 FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);



-- Alter table

-- ALTER TABLE public.products

ALTER TABLE products 
    ADD CONSTRAINT products_fk_1 FOREIGN KEY (listing_id) REFERENCES listings(id) ON UPDATE CASCADE ON DELETE CASCADE;
    