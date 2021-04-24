import {  } from "jsonwebtoken";
import { hashSync } from "bcryptjs";
import { Op } from "sequelize/types";

import { Role } from "../models/role";
import { User } from "../models/user";


export async function signUp(req: any, res: any){
    // Save User to Database
    try {
        let user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: hashSync(req.body.password, 8)
        })
    
        if (req.body.roles) {
            let roles = await Role.findAll({
                where: {
                  name: {
                    [Op.or]: req.body.roles
                  }
                }
            })
    
            await user.$add('roles',roles)
            res.send({ message: "User was registered successfully!" });
        }else{
            // Set user role to "user"
            await user.$add('roles',1);
            res.send({ message: "User was registered successfully!" });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
    
}