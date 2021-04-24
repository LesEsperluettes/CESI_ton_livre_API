import { User } from "../models/user";
import { Role } from "../models/role";

/**
 * Check if the username or email already exist in database
 * @param {*} req request
 * @param {*} res response
 * @param {*} next 
 */
let checkDuplicateUsernameOrEmail = async (req: any, res: any, next: any) => {
    // Username
    let user = await User.findOne({
        where: {
            username: req.body.username
        }
    });

    if (user) {
        res.status(400).send({
            message: "Failed! Username is already in use!"
        });
        return;
    }

    // Email
    user = await User.findOne({
        where: {
            email: req.body.email
        }
    });

    if (user) {
        res.status(400).send({
            message: "Failed! Email is already in use!"
        });
        return;
    }

    next();
};

/**
 * Check if the requested role exist in database
 * @param {*} req request
 * @param {*} res response
 * @param {*} next 
 * @returns 
 */
let checkRolesExisted = async (req: any, res: any, next: any) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            
            const role = await Role.findOne({where: {name: req.body.roles[i]}})

            if (!role) {
                res.status(400).send({
                    message: "Failed! Role does not exist = " + req.body.roles[i]
                });
                return;
            }
        }
    }

    next();
};


const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
    checkRolesExisted: checkRolesExisted
};

export = verifySignUp;