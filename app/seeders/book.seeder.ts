import * as fs from "fs/promises"; 
import { Book } from "../models/book";

export default async function seed(){
    const cover = await fs.readFile(__dirname + "/../../static/assets/img/0385472579.jpg");
    const coverBuffer = Buffer.from(cover)

    await Book.create({
        id: 1,
        ISBN: '0385472579',
        title: 'Zen speaks',
        authors: 'Zhizhong Cai',
        publishers: 'Anchor Books',
        publishedDate : '1994',
        localisation: 'Shelf B, Position 45',
        CoverImage : coverBuffer
    })
}