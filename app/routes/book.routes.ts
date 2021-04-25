import { NextFunction, Request, Response } from "express";
import { createBook, getBook } from "../controllers/book.controller";
import authJwt from "../middleware/authJwt";


export default (app: any) => {
    app.use(function (req: Request, res: Response, next: NextFunction) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get(
        "/api/book/:ISBN",
        [authJwt.verifyToken],
        getBook
    );

    app.post(
        "/api/book",
        [authJwt.verifyToken, authJwt.isAdmin],
        createBook
    )
}