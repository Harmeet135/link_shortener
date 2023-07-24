-- Table: alias
CREATE TABLE alias (
  id int(11) NOT NULL AUTO_INCREMENT,
  link_id int(11) NOT NULL,
  alias varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (id),
  INDEX link_id (link_id),
  INDEX alias (alias)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
