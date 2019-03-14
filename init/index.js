var faker = require('faker');
var db = require('../database/connection');

module.exports.init = async () => {
    try {
        await db.query(
            "CREATE TABLE IF NOT EXISTS `books` (" +
            "`id` INT UNSIGNED AUTO_INCREMENT," +
            "`title` TEXT NOT NULL," +
            "`date` DATE NOT NULL," +
            "`author` TEXT NOT NULL," +
            "`description` TEXT NOT NULL," +
            "`image` TEXT NOT NULL," +
            "PRIMARY KEY (`id`)" +
            ");"
        );

        const result = await db.query("SELECT COUNT(`id`) as count FROM `books`");

        if (result[0].count < 1e5) {
            let promises = [];
            for (let i = 0; i < 100; i++) {
                let values = [];
                for (let j = 0; j < 1000; j++) {
                    values.push([
                        faker.lorem.sentence(),
                        faker.date.past(10).toISOString().substring(0, 10),
                        `${faker.name.lastName()} ${faker.name.firstName()}`,
                        faker.lorem.paragraph(),
                        faker.image.image()
                    ]);
                }
                promises.push(new Promise(async (resolve, reject) => {
                    try {
                        await db.query(
                            "INSERT INTO `books`" +
                            "(`title`, `date`, `author`, `description`, `image`)" +
                            "VALUES ?", [values]);
                        resolve();
                    } catch (err) {
                        reject(err);
                    }
                }));
            }

            Promise.all(promises)
                .then((results) => {
                    console.log("Data initialized ... ");
                })
                .catch((err) => {
                    throw err;
                });
        }
    } catch (e) {
        console.log("Error with initializing: " + e.message);
    }
};