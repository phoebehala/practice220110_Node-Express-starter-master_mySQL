require("dotenv").config();
const mysql = require('mysql2');

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    database:process.env.DB_NAME,
    password:process.env.DB_PASSWORD,
});

let sql = "SELECT * FROM posts;";   // sql statement  // select all of the posta from posta
pool.execute(sql, function(err, result){
    if (err) throw err;
    console.log(result);

    result.forEach((res)=>{
        console.log(res.title);
    })
})

                    // Using Promise Wrapper
                    // MySQL2 also support Promise API. Which works very well with ES7 async await.
module.exports = pool.promise();