import { Request, Response } from "express";
import { Book } from "../models/book";

export async function getBook(req: Request, res: Response) {
    try {
        const book = await Book.findByPk(req.body.ISBN);

        // TODO query OpenLibrary API (+ add tag it)
        if(!book) return res.status(404).send({message: "Book cannot be found"})

        // Check if the book is borrowed
        const borrowed = await book.$get('borrow')

        res.status(200).send({
            ISBN: book.ISBN,
            title: book.title,
            authors: book.authors,
            publishers: book.publishers,
            publishedDate: book.publishedDate,
            localisation: book.localisation,
            CoverImage: book.CoverImage,
            available: !borrowed // Available if not borrowed
        });

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export async function createBook(req: Request, res: Response){
    
}