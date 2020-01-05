ALTER TABLE products ADD date_modified timestamp NULL DEFAULT now();
ALTER TABLE games ADD date_created timestamp NULL DEFAULT now();
ALTER TABLE games ADD date_modified timestamp NULL DEFAULT now();
