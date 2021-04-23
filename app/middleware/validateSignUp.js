const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

/**
 * Check if the username or email already exist in database
 * @param {*} req request
 * @param {*} res response
 * @param {*} next 
 */
let checkDuplicateUsernameOrEmail = (req, res, next) => {
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
let checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
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

module.exports = verifySignUp;