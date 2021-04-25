import authJwt from "../middleware/authJwt";
import { createBook, getBook } from "../controllers/book.controller";

export default (app: any) => {
    app.use(function (req: any, res: any, next: any) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get(
        "/book/:ISBN",
        [authJwt.verifyToken],
        getBook
    );

    app.post(
        "/book",
        [authJwt.verifyToken],
        createBook
    )
}