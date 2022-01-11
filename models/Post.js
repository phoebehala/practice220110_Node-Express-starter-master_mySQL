const db = require('../config/db')

class Post{
    constructor(title, body){
        this.title =title;
        this.body = body;
    }

    // save to db
    save(){
        let d = new Date();
        let yyyy=d.getFullYear();
        let mm = d.getMonth()+1;
        let dd = d.getDate();

        let createAtDate = `${yyyy}-${mm}-${dd}`

        // create ssql statement
        let sql =`
            INSERT INTO posts(
                title,
                body,
                created_at
            )
            VALUES(
                '${this.title}',
                '${this.body}',
                '${createAtDate}'
            )
        `;

        // return an array
        //const newPost = await db.execute(sql)
        //const [rowData, fied] = await db.execute(sql)
        const [rowData, _] = db.execute(sql)
        return rowData

    }

    /* static method
        instead of saying:
            const p = new Post();
            p.findAll()
        saying:
            Post.findAll();
    */
    static findAll(){
        let sql = "SELECT * FROM posts;"
        return db.execute(sql);
    }

    static findById(id){
        let sql = `SELECT * FROM posts WHERE id = ${id};`
        return db.execute(sql); // return promise
    }

    
}


module.exports = Post;
