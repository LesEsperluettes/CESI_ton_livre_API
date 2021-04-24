import { Role } from "../models/role";
import { User } from "../models/user";
import { UserRole } from "../models/userRole";

export default async function seed(){
    const admin = await Role.findOne({where: {name: "admin"}});
    
    const user = await User.create({
        username: 'user',
        password: 'password',
        email: 'user@example.com'
    });
    await user.$add('roles',admin?.id);

}