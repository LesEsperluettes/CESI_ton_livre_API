import { decode, sign, verify } from "jsonwebtoken";
import { compareSync, hashSync } from "bcryptjs";
import { Op } from "sequelize";

import config from '../config/auth.config';

import { Role } from "../models/role";
import { Request, Response } from "express";
import { Console } from "node:console";
import { User } from "../models/user";

/**
 * Sign up function
 * @param req 
 * @param res 
 */
export async function signUp(req: Request, res: Response) {
    console.log('[Route] POST /auth/signup')
    // Save User to Database
    try {
        let user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: hashSync(req.body.password, 8)
        })

        // Set user role to "user"
        await user.$add('roles', 1);
        res.send({ message: "User was registered successfully!" });
    } catch (error) {
        console.log('[ERROR] POST /auth/signup : '+ error.message)
        res.status(500).send({ message: error.message });
    }
}

/**
 * Sign in function
 * @param req 
 * @param res 
 * @returns 
 */
export async function signIn(req: Request, res: Response) {
    console.log('[Route] POST /auth/signin')
    try {
        // Retrieve the user from database, send 404 if it doesn't exist
        const user = await User.findOne({
            where: {
                username: req.body.username
            }
        })

        if (!user) return res.status(404).send({ message: "User Not found." });
        
        // Check user password, send 401 if invalid
        let passwordIsValid = compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }

        // Retrieve login token
        let token = sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // 24 hours
        });
        
        // Add user roles for the response
        var authorities: any = [];
        let userRoles = await user.$get('roles');
        userRoles.forEach(role => {
            authorities.push("ROLE_" + role.name.toUpperCase());
        })

        res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

/**
 * POST /auth/validate
 * @param req 
 * @param res 
 */
export async function validateToken(req: Request, res: Response){
    console.log('[Route] POST /auth/validate')
    try {
        let decoded: any = await verify(req.body.token,config.secret);
        
        let user = await User.findByPk(decoded.id)
        if(!user) return res.status(404).send({message : "Token invalid"});
        
        res.status(200).send({message : "Token still valid"});
    }catch(error){
        res.status(440).send({message : "Auth token expired, please re-login"});
    }
}