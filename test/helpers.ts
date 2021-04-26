import { sequelize } from '../sequelize';
import roleSeeder from '../app/seeders/role.seeder';
import { User } from '../app/models/user';

export function resetDatabase(callback: Function){
    sequelize.sync({ force: true }).then(() => {
        roleSeeder();
        callback();
    })
}