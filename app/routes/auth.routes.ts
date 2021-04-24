import verifySignUp from "../middleware/validateSignUp";
import { signIn, signUp } from "../controllers/auth.controller";

export default (app: any) => {
    app.use(function (req: any, res: any, next: any) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/auth/signup",
        [
            verifySignUp.checkDuplicateUsernameOrEmail,
            verifySignUp.checkRolesExisted
        ],
        signUp
    );

    app.post("/api/auth/signin", signIn);
}