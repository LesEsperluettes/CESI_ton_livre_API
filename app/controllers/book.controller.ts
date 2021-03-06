import { Request, Response } from "express";
import { Book } from "../models/book";
import * as fs from "fs/promises";

import { File, Form, Part } from 'multiparty';

async function getBooksInfos(book: Book) {
    const borrowed = await book.$get('borrow')

    let base64 = '';
    if (book.CoverImage) {
        base64 = book.CoverImage.toString('base64');
    } else {
        // Send default image if database is not populated
        base64 = await fs.readFile(__dirname + "/../../static/assets/img/default.png", { encoding: 'base64' });
    }

    return {
        ISBN: book.ISBN,
        title: book.title,
        authors: book.authors,
        publishers: book.publishers,
        publishedDate: book.publishedDate,
        localisation: book.localisation,
        coverImage: base64,
        available: !borrowed // Available if not borrowed
    };
}

export async function getBook(req: Request, res: Response) {
    console.log('[Route] GET /book')
    try {
        const book = await Book.findOne({ where: { ISBN: req.params.ISBN } });

        // TODO query OpenLibrary API (+ add tag it)
        if (!book) return res.status(404).send({ message: "Book cannot be found" })

        return await getBooksInfos(book);

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

/**
 * GET /books
 * @param req 
 * @param res 
 */
export async function getBooks(req: Request, res: Response) {
    console.log('[Route] GET /books')
    try {
        const books = await Book.findAll();

        if (!books) return res.status(404).send({ message: "Books cannot be found" });

        let result: any = []
        const addResult = async (books: any, result: any) => {
            for(let i=0; i<books.length;i++){
                let info = await getBooksInfos(books[i])
                result.push(info)
            }
            return;
        }
        await addResult(books,result);
        
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export async function createBook(req: any, res: any) {
    try {
        let form = new Form();

        /*form.on('part', function (part: Part) {
            if (!part.filename) return;
            console.log(part.filename)

            let buffers: Buffer[] = [];

            part.on('data', function (buffer: Buffer) {
                buffers.push(buffer);
            })

            part.on('end', function () {
                let buffer = Buffer.concat(buffers);

                fs.writeFile(__dirname + "/../../static/assets/img/tmp/" + part.filename, buffer)
            })
        });*/

        let book = await Book.create({
            ISBN: req.body.ISBN,
            title: req.body.title,
            authors: req.body.authors,
            publishers: req.body.publishers,
            publishedDate: req.body.publishedDate,
            localisation: req.body.localisation
        })

        res.send({ message: "Book was registered successfully!" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }

}