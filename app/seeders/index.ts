import roleSeeder from "./role.seeder"
import userSeeder from "./user.seeder"

export async function seed(){
    await roleSeeder();
    await userSeeder();
}