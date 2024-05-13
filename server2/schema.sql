CREATE DATABASE facture_db
 CHARACTER SET utf8mb4
 COLLATE utf8mb4_unicode_ci;
USE facture_db;

CREATE TABLE User (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(50),
    prenom VARCHAR(50),
    adresse VARCHAR(100),
    telephone VARCHAR(20),
    email VARCHAR(50),
    password VARCHAR(50),
    role VARCHAR(10) default 'client' 
);

CREATE TABLE Facture (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50),
    date DATE,
    montant FLOAT,
    status VARCHAR(10),
    id_user INT,
    FOREIGN KEY (id_user) REFERENCES User(id)
);

CREATE TABLE Compte (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT,
    solde FLOAT,
    numero VARCHAR(50),
    cvv VARCHAR(10),
    date_expiration DATE,
    FOREIGN KEY (id_user) REFERENCES User(id)
);


