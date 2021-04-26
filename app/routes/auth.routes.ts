import verifySignUp from "../middleware/validateSignUp";
import { signIn, signUp, validateToken } from "../controllers/auth.controller";

export default (app: any) => {
    app.use(function (req: any, res: any, next: any) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/auth/signup",
        [
            verifySignUp.checkDuplicateUsernameOrEmail,
            verifySignUp.checkRolesExisted
        ],
        signUp
    );

    app.post("/auth/signin", signIn);

    app.post("/auth/validate", validateToken)
}