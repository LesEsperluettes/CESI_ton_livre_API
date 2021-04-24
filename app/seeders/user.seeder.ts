import { Role } from "../models/role";
import { User } from "../models/user";
import { UserRole } from "../models/userRole";

export default async function seed(){
    let admin = await Role.findOne({where: {name: 'admin'}})
    let user = await User.create({
        username: 'user',
        password: 'password',
        email: 'user@example.com'
    });
    await UserRole.create({
        roleId: admin?.id,
        userId: user.id
    })
}