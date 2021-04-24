const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

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
let isAdmin = async (req: any, res: any, next: any) => {
    let user = await User.findByPk(req.userId);
    let roles = await user.getRoles();

    // Continue if the user has the admin role
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
            next();
            return;
        }
    }

    // Send 403 if not an admin
    res.status(403).send({
        message: "Require Admin Role!"
    });
    return;
};

// Check if the user is a moderator
let isModerator = async (req: any, res: any, next: any) => {
    let user = await User.findByPk(req.userId);
    let roles = await user.getRoles();

    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
            next();
            return;
        }
    }

    res.status(403).send({
        message: "Require Moderator Role!"
    });
};

// Check if the user is a moderator or an admin
let isModeratorOrAdmin = async (req: any, res: any, next: any) => {
    let user = await User.findByPk(req.userId);
    let roles = await user.getRoles();

    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
            next();
            return;
        }

        if (roles[i].name === "admin") {
            next();
            return;
        }
    }

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
