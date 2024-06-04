DROP TABLE IF EXISTS `ad`;
DROP TABLE IF EXISTS `category`;

CREATE TABLE `category` (
  `id`INTEGER PRIMARY KEY AUTOINCREMENT,
  `title` TEXT NOT NULL
  );

CREATE TABLE `ad` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `title` TEXT NOT NULL,
  `description` TEXT,
  `author` TEXT NOT NULL,
  `price` REAL NOT NULL,
  `createdAt` TEXT NOT NULL,
  `picture` TEXT,
  `city` TEXT NOT NULL,
  `category_id` INTEGER,
  FOREIGN KEY (`category_id`) REFERENCES `category`(`id`)
  );

CREATE INDEX `cat_title` ON `category`(`title`);
CREATE INDEX `ad_title` ON `ad`(`title`);

INSERT INTO `category` (`title`) VALUES ("vêtement"), ("voiture"), ("autre");

INSERT INTO `ad` (`title`, `description`, `author`, `price`, `createdAt`, `picture`, `city`, `category_id`) VALUES
  -- Bordeaux
  ("Annonce Bordeaux 1", "Description de l'annonce Bordeaux 1", "Auteur 1", 1.0, "2024-05-01", "https://placebear.com/200/351.jpg", "Bordeaux", "3"),
  ("Annonce Bordeaux 2", "Description de l'annonce Bordeaux 2", "Auteur 2", 15.0, "2024-05-02", "https://placebear.com/200/352.jpg", "Bordeaux", "1"),
  ("Annonce Bordeaux 3", "Description de l'annonce Bordeaux 3", "Auteur 3", 2.0, "2024-05-03", "https://placebear.com/200/353.jpg", "Bordeaux", "2"),
  ("Annonce Bordeaux 4", "Description de l'annonce Bordeaux 4", "Auteur 4", 25.0, "2024-05-04", "https://placebear.com/200/354.jpg", "Bordeaux", "3"),
  ("Annonce Bordeaux 5", "Description de l'annonce Bordeaux 5", "Auteur 5", 3.0, "2024-05-05", "https://placebear.com/200/355.jpg", "Bordeaux", "2"),
  ("Annonce Bordeaux 6", "Description de l'annonce Bordeaux 6", "Auteur 6", 35.0, "2024-05-06", "https://placebear.com/200/356.jpg", "Bordeaux", "1"),
  ("Annonce Bordeaux 7", "Description de l'annonce Bordeaux 7", "Auteur 7", 4.0, "2024-05-07", "https://placebear.com/200/357.jpg", "Bordeaux", "3"),
  ("Annonce Bordeaux 8", "Description de l'annonce Bordeaux 8", "Auteur 8", 45.0, "2024-05-08", "https://placebear.com/200/358.jpg", "Bordeaux", "1"),
  ("Annonce Bordeaux 9", "Description de l'annonce Bordeaux 9", "Auteur 9", 5.0, "2024-05-09", "https://placebear.com/200/359.jpg", "Bordeaux", "2"),
  ("Annonce Bordeaux 10", "Description de l'annonce Bordeaux 10", "Auteur 10", 55.0, "2024-05-10", "https://placebear.com/200/310.jpg", "Bordeaux", "3"),
  ("Annonce Bordeaux 11", "Description de l'annonce Bordeaux 11", "Auteur 11", 6.0, "2024-05-11", "https://placebear.com/200/311.jpg", "Bordeaux", "2"),
  ("Annonce Bordeaux 12", "Description de l'annonce Bordeaux 12", "Auteur 12", 65.0, "2024-05-12", "https://placebear.com/200/312.jpg", "Bordeaux", "1"),
  ("Annonce Bordeaux 13", "Description de l'annonce Bordeaux 13", "Auteur 13", 7.0, "2024-05-13", "https://placebear.com/200/313.jpg", "Bordeaux", "3"),
  ("Annonce Bordeaux 14", "Description de l'annonce Bordeaux 14", "Auteur 14", 75.0, "2024-05-14", "https://placebear.com/200/314.jpg", "Bordeaux", "1"),
  ("Annonce Bordeaux 15", "Description de l'annonce Bordeaux 15", "Auteur 15", 8.0, "2024-05-15", "https://placebear.com/200/315.jpg", "Bordeaux", "1"),
  ("Annonce Bordeaux 16", "Description de l'annonce Bordeaux 16", "Auteur 16", 85.0, "2024-05-16", "https://placebear.com/200/316.jpg", "Bordeaux", "3"),
  ("Annonce Bordeaux 17", "Description de l'annonce Bordeaux 17", "Auteur 17", 9.0, "2024-05-17", "https://placebear.com/200/317.jpg", "Bordeaux", "1"),
  ("Annonce Bordeaux 18", "Description de l'annonce Bordeaux 18", "Auteur 18", 95.0, "2024-05-18", "https://placebear.com/200/318.jpg", "Bordeaux", "1"),
  ("Annonce Bordeaux 19", "Description de l'annonce Bordeaux 19", "Auteur 19", 10.0, "2024-05-19", "https://placebear.com/200/319.jpg", "Bordeaux", "3"),
  ("Annonce Bordeaux 20", "Description de l'annonce Bordeaux 20", "Auteur 20", 105.0, "2024-05-20", "https://placebear.com/200/320.jpg", "Bordeaux", "3"),
  -- Paris
  ("Annonce Paris 1", "Description de l'annonce Paris 1", "Auteur 21", 11.0, "2024-05-01", "https://placebear.com/200/321.jpg", "Paris", "1"),
  ("Annonce Paris 2", "Description de l'annonce Paris 2", "Auteur 22", 115.0, "2024-05-02", "https://placebear.com/200/322.jpg", "Paris", "2"),
  ("Annonce Paris 3", "Description de l'annonce Paris 3", "Auteur 23", 12.0, "2024-05-03", "https://placebear.com/200/323.jpg", "Paris", "1"),
  ("Annonce Paris 4", "Description de l'annonce Paris 4", "Auteur 24", 125.0, "2024-05-04", "https://placebear.com/200/324.jpg", "Paris", "3"),
  ("Annonce Paris 5", "Description de l'annonce Paris 5", "Auteur 25", 13.0, "2024-05-05", "https://placebear.com/200/325.jpg", "Paris", "2"),
  ("Annonce Paris 6", "Description de l'annonce Paris 6", "Auteur 26", 135.0, "2024-05-06", "https://placebear.com/200/326.jpg", "Paris", "3"),
  ("Annonce Paris 7", "Description de l'annonce Paris 7", "Auteur 27", 14.0, "2024-05-07", "https://placebear.com/200/327.jpg", "Paris", "1"),
  ("Annonce Paris 8", "Description de l'annonce Paris 8", "Auteur 28", 145.0, "2024-05-08", "https://placebear.com/200/328.jpg", "Paris", "2"),
  ("Annonce Paris 9", "Description de l'annonce Paris 9", "Auteur 29", 15.0, "2024-05-09", "https://placebear.com/200/329.jpg", "Paris", "1"),
  ("Annonce Paris 10", "Description de l'annonce Paris 10", "Auteur 30", 155.0, "2024-05-10", "https://placebear.com/200/330.jpg", "Paris", "1"),
  ("Annonce Paris 11", "Description de l'annonce Paris 11", "Auteur 31", 16.0, "2024-05-11", "https://placebear.com/200/331.jpg", "Paris", "2"),
  ("Annonce Paris 12", "Description de l'annonce Paris 12", "Auteur 32", 165.0, "2024-05-12", "https://placebear.com/200/332.jpg", "Paris", "1"),
  ("Annonce Paris 13", "Description de l'annonce Paris 13", "Auteur 33", 17.0, "2024-05-13", "https://placebear.com/200/333.jpg", "Paris", "1"),
  ("Annonce Paris 14", "Description de l'annonce Paris 14", "Auteur 34", 175.0, "2024-05-14", "https://placebear.com/200/334.jpg", "Paris", "2"),
  ("Annonce Paris 15", "Description de l'annonce Paris 15", "Auteur 35", 18.0, "2024-05-15", "https://placebear.com/200/335.jpg", "Paris", "3"),
  ("Annonce Paris 16", "Description de l'annonce Paris 16", "Auteur 36", 185.0, "2024-05-16", "https://placebear.com/200/336.jpg", "Paris", "3"),
  ("Annonce Paris 17", "Description de l'annonce Paris 17", "Auteur 37", 19.0, "2024-05-17", "https://placebear.com/200/337.jpg", "Paris", "3"),
  ("Annonce Paris 18", "Description de l'annonce Paris 18", "Auteur 38", 195.0, "2024-05-18", "https://placebear.com/200/338.jpg", "Paris", "1"),
  ("Annonce Paris 19", "Description de l'annonce Paris 19", "Auteur 39", 20.0, "2024-05-19", "https://placebear.com/200/339.jpg", "Paris", "1"),
  ("Annonce Paris 20", "Description de l'annonce Paris 20", "Auteur 40", 205.0, "2024-05-20", "https://placebear.com/200/340.jpg", "Paris", "3"),
  -- Lyon
  ("Annonce Lyon 1", "Description de l'annonce Lyon 1", "Auteur 41", 21.0, "2024-05-01", "https://placebear.com/200/341.jpg", "Lyon", "1"),
  ("Annonce Lyon 2", "Description de l'annonce Lyon 2", "Auteur 42", 215.0, "2024-05-02", "https://placebear.com/200/342.jpg", "Lyon", "2"),
  ("Annonce Lyon 3", "Description de l'annonce Lyon 3", "Auteur 43", 22.0, "2024-05-03", "https://placebear.com/200/343.jpg", "Lyon", "2"),
  ("Annonce Lyon 4", "Description de l'annonce Lyon 4", "Auteur 44", 225.0, "2024-05-04", "https://placebear.com/200/344.jpg", "Lyon", "3"),
  ("Annonce Lyon 5", "Description de l'annonce Lyon 5", "Auteur 45", 23.0, "2024-05-05", "https://placebear.com/200/345.jpg", "Lyon", "1"),
  ("Annonce Lyon 6", "Description de l'annonce Lyon 6", "Auteur 46", 235.0, "2024-05-06", "https://placebear.com/200/346.jpg", "Lyon", "2"),
  ("Annonce Lyon 7", "Description de l'annonce Lyon 7", "Auteur 47", 24.0, "2024-05-07", "https://placebear.com/200/347.jpg", "Lyon", "1"),
  ("Annonce Lyon 8", "Description de l'annonce Lyon 8", "Auteur 48", 245.0, "2024-05-08", "https://placebear.com/200/348.jpg", "Lyon", "3"),
  ("Annonce Lyon 9", "Description de l'annonce Lyon 9", "Auteur 49", 25.0, "2024-05-09", "https://placebear.com/200/349.jpg", "Lyon", "2"),
  ("Annonce Lyon 10", "Description de l'annonce Lyon 10", "Auteur 50", 255.0, "2024-05-10", "https://placebear.com/200/350.jpg", "Lyon", "1"),
  ("Annonce Lyon 11", "Description de l'annonce Lyon 11", "Auteur 51", 26.0, "2024-05-11", "https://placebear.com/200/351.jpg", "Lyon", "1"),
  ("Annonce Lyon 12", "Description de l'annonce Lyon 12", "Auteur 52", 265.0, "2024-05-12", "https://placebear.com/200/352.jpg", "Lyon", "2"),
  ("Annonce Lyon 13", "Description de l'annonce Lyon 13", "Auteur 53", 27.0, "2024-05-13", "https://placebear.com/200/353.jpg", "Lyon", "3"),
  ("Annonce Lyon 14", "Description de l'annonce Lyon 14", "Auteur 54", 275.0, "2024-05-14", "https://placebear.com/200/354.jpg", "Lyon", "1"),
  ("Annonce Lyon 15", "Description de l'annonce Lyon 15", "Auteur 55", 28.0, "2024-05-15", "https://placebear.com/200/355.jpg", "Lyon", "2"),
  ("Annonce Lyon 16", "Description de l'annonce Lyon 16", "Auteur 56", 285.0, "2024-05-16", "https://placebear.com/200/356.jpg", "Lyon", "1"),
  ("Annonce Lyon 17", "Description de l'annonce Lyon 17", "Auteur 57", 29.0, "2024-05-17", "https://placebear.com/200/357.jpg", "Lyon", "3"),
  ("Annonce Lyon 18", "Description de l'annonce Lyon 18", "Auteur 58", 295.0, "2024-05-18", "https://placebear.com/200/358.jpg", "Lyon", "2"),
  ("Annonce Lyon 19", "Description de l'annonce Lyon 19", "Auteur 59", 30.0, "2024-05-19", "https://placebear.com/200/359.jpg", "Lyon", "3"),
  ("Annonce Lyon 20", "Description de l'annonce Lyon 20", "Auteur 60", 305.0, "2024-05-20", "https://placebear.com/200/360.jpg", "Lyon", "1");