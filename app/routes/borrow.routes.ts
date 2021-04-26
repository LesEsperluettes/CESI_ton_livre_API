import authJwt from "../middleware/authJwt";
import { getBookBorrow, getBorrow, getUserBorrows, postBorrow } from "../controllers/borrow.controller";

export default (app: any) => {
    app.use(function (req: any, res: any, next: any) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/borrow",
        [authJwt.verifyToken],
        postBorrow
    )

    app.get(
        "/borrow/:id",
        [authJwt.verifyToken],
        getBorrow
    )

    app.get(
        "/borrow/book/:ISBN",
        [authJwt.verifyToken],
        getBookBorrow
    )

    app.get(
        "/borrow/user/:id",
        [authJwt.verifyToken],
        getUserBorrows
    )
}