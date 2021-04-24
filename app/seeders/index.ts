import roleSeeder from "./role.seeder"
import userSeeder from "./user.seeder"
import bookSeeder from "./book.seeder"

export async function seed(){
    await roleSeeder();
    await userSeeder();
    await bookSeeder();
}