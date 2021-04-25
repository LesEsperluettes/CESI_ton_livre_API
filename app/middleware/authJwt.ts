import * as jwt from 'jsonwebtoken';
import config from '../config/auth.config';

import { User } from '../models/user';
import { Role } from '../models/role';
import { NextFunction, Request, Response } from 'express';


let verifyToken = (req: any, res: any, next: any) => {
    let token = req.headers["x-access-token"];

    // Check if the token is provided, send 403 if not
    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    // Verify the jwt token, send 401 if wrong, continue if correct
    jwt.verify(token, config.secret, (err: any, decoded: any) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.id;
        next();
    });
};

// Check if the user is admin
let isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findByPk(req.body.userId);
    let roles = await user?.$get('roles');

    // Continue if the user has the admin role
    roles?.forEach(role => {
        console.log('isAdmin : '+(role.name === "admin"))
        if (role.name === "admin") {

            return next();
        }
    });

    console.log('test')

    // Send 403 if not an admin
    res.status(403).send({
        message: "Require Admin Role!"
    });
};

// Check if the user is a moderator
let isModerator = async (req: any, res: any, next: any) => {
    let user = await User.findByPk(req.userId);
    let roles = await user?.$get('roles');

    roles?.forEach(role => {
        if (role.name === "moderator") {
            next();
            return;
        }
    });

    res.status(403).send({
        message: "Require Moderator Role!"
    });
};

// Check if the user is a moderator or an admin
let isModeratorOrAdmin = async (req: any, res: any, next: any) => {
    let user = await User.findByPk(req.userId);
    let roles = await user?.$get('roles');

    roles?.forEach(role => {
        if (role.name === "moderator" || role.name === "admin") {
            next();
            return;
        }
    });

    res.status(403).send({
        message: "Require Moderator or Admin Role!"
    });
};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isModerator: isModerator,
    isModeratorOrAdmin: isModeratorOrAdmin
};
export = authJwt;
