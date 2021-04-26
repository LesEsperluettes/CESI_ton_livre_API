import { Role } from "../models/role";

export default async function seed() {
    console.log('Seeding role model...');
    await Role.create({
        id: 1,
        name: "user"
    });

    await Role.create({
        id: 2,
        name: "moderator"
    });

    await Role.create({
        id: 3,
        name: "admin"
    });
}