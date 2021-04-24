import authJwt from "../middleware/authJwt";
import { adminBoard, allAccess, moderatorBoard, userBoard } from "../controllers/user.controller";

export default (app: any) => {
    app.use(function (req: any, res: any, next: any) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/test/all", allAccess);

    app.get(
        "/api/test/user",
        [authJwt.verifyToken],
        userBoard
    );

    app.get(
        "/api/test/mod",
        [authJwt.verifyToken, authJwt.isModerator],
        moderatorBoard
    );

    app.get(
        "/api/test/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        adminBoard
    );
}