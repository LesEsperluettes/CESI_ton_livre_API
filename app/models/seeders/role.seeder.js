const db = require("../../models");
const Role = db.role;

module.exports = {
    seed() {
        console.log('Seeding role model...');
        Role.create({
            id: 1,
            name: "user"
        });

        Role.create({
            id: 2,
            name: "moderator"
        });

        Role.create({
            id: 3,
            name: "admin"
        });

    }
}
