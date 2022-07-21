CREATE TABLE iroha_user(
    account VARCHAR(40),
    password VARCHAR(100),
    email VARCHAR(50),
    publicKey TEXT UNIQUE,
    firstName VARCHAR(20),
    lastName VARCHAR(20),
    PRIMARY KEY (account)
);

CREATE TABLE cryptography(
    privateKey TEXT,
    publicKey TEXT UNIQUE,
    PRIMARY KEY(privateKey),
    FOREIGN KEY(publicKey) REFERENCES iroha_user(publicKey)
);

INSERT INTO iroha_user(account,password,email,publicKey,firstName,lastName) VALUES
 ('admin@japan','$2a$10$zyuHf8stAfSXiOzaoEsgQerQ2sRJkZjekhSfXrsKxPNl00TK4H2Cy',
 'admin@admin.com',
 '313a07e6384776ed95447710d15e59148473ccfc052a681317a72a69f2a49910','admin','admin'),
 ('test@japan','$2a$10$zyuHf8stAfSXiOzaoEsgQerQ2sRJkZjekhSfXrsKxPNl00TK4H2Cy',
 'test@test.com',
 '444d21c29c22e482bb5ce0897ea64d4105206082f4b733172ec75999c560fc27','test','test');
 
 INSERT INTO cryptography(privateKey,publicKey) VALUES (
    'f101537e319568c765b2cc89698325604991dca57b9716b58016b253506cab70','313a07e6384776ed95447710d15e59148473ccfc052a681317a72a69f2a49910'
 ),(
    'dc912d600558905e250113b274eb1ddf030363da1ee957bc9bc25eac803d631b','444d21c29c22e482bb5ce0897ea64d4105206082f4b733172ec75999c560fc27'
 );