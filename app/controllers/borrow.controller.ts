import { now } from "lodash";
import { Book } from "../models/book";
import { Borrow } from "../models/borrow";
import { User } from "../models/user";

/**
 * POST /borrow
 * @param req 
 * @param res 
 */
export async function postBorrow(req: any, res: any){
    let borrow = await Borrow.create({
        borrowDate: new Date(),
        duration: 30
    })

    const book = await Book.findByPk(req.body.bookId);
    if(!book) return res.status(404).send({message : "This book cannot be found"})
    
    const borrowed = await book.$get('borrow')
    if(borrowed) return res.status(404).send({message : "This book is not available"})

    borrow.$set('userId',req.userId);
    borrow.$set('bookId',book.id);

    res.send({ message: "This book was successfully borrowed!" });
}

/**
 * GET /borrow/:id
 * @param req 
 * @param res 
 */
export async function getBorrow(req: any, res: any){
    try{
        const borrow = await Borrow.findByPk(req.params.id);

        if(!borrow) return res.status(404).send({message : "This borrow cannot be found"})

        res.status(200).send({
            id: borrow.id,
            borrowDate: borrow.borrowDate,
            duration: borrow.duration,
            userId: borrow.userId,
            bookId: borrow.bookId
        })
    }catch(error){
        res.status(500).send({ message: error.message });
    }
}

/**
 * GET /borrow/book/:ISBN
 * @param req 
 * @param res 
 */
export async function getBookBorrow(req: any, res: any){
    try{
        const book = await Book.findOne({where: {ISBN: req.params.ISBN}})

        if(!book) return res.status(404).send({message : "This book cannot be found"})

        const borrow = await book.$get('borrow')

        if(!borrow) return res.status(404).send({message : "This book is not borrowed currently"})

        res.status(200).send({
            id: borrow.id,
            borrowDate: borrow.borrowDate,
            duration: borrow.duration,
            userId: borrow.userId,
            bookId: borrow.bookId
        })
    }catch(error){
        res.status(500).send({ message: error.message });
    }
}

/**
 * GET /borrows/user/:id
 * @param req 
 * @param res 
 */
export async function getUserBorrows(req: any, res: any){
    try{
        const user = await User.findByPk(req.params.id)

        if(!user) return res.status(404).send({message : "This user cannot be found"})

        const borrows = await user.$get('borrows')

        if(!borrows) return res.status(404).send({message : "This user has no borrow"})

        let result: any = []
        borrows.forEach((borrow: Borrow) => {
            result.push({
                id: borrow.id,
                borrowDate: borrow.borrowDate,
                duration: borrow.duration,
                userId: borrow.userId,
                bookId: borrow.bookId
            })
        });

        res.status(200).send(result);
    }catch(error){
        res.status(500).send({ message: error.message });
    }
}